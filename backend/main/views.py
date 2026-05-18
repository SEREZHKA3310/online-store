from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.authtoken.models import Token as AuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import status
from rest_framework.views import APIView
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
import numpy as np

from main.models import Product, Order
from .serializers import LoginSerializer, ProductSerializer, RegisterSerializer, OrderSerializer
from .payment import SBPPayment, CardPayment, CashPayment, PaymentAdapter

class ArticlePagination(PageNumberPagination):
    page_size = 3  # По умолчанию 10 статей на страницу
    page_size_query_param = 'page_size'  # Пользователь может менять размер страницы
    max_page_size = 100  # Максимум 100 статей на страницу

# Create your views here.
class ProductViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ArticlePagination

    @action(detail=True, methods=['GET'])
    def similar(self, request, pk=None):
        product = self.get_object()

        products = list(
            Product.objects.exclude(id=product.id)
        )

        # Все значения для encoder
        brands = [[p.brand] for p in Product.objects.all()]
        categories = [[p.category] for p in Product.objects.all()]

        brand_encoder = OneHotEncoder(
            sparse_output=False,
            handle_unknown='ignore'
        )

        category_encoder = OneHotEncoder(
            sparse_output=False,
            handle_unknown='ignore'
        )

        brand_encoder.fit(brands)
        category_encoder.fit(categories)

        target_brand = brand_encoder.transform(
            [[product.brand]]
        )[0]

        target_category = category_encoder.transform(
            [[product.category]]
        )[0]

        target_vector = np.concatenate([
            target_brand,
            target_category,
        ]).reshape(1, -1)

        similarities = []

        for p in products:

            brand_vector = brand_encoder.transform(
                [[p.brand]]
            )[0]

            category_vector = category_encoder.transform(
                [[p.category]]
            )[0]

            vector = np.concatenate([
                brand_vector,
                category_vector,
            ]).reshape(1, -1)

            similarity = cosine_similarity(
                target_vector,
                vector
            )[0][0]

            similarities.append((similarity, p))

        similarities.sort(
            key=lambda x: x[0],
            reverse=True
        )

        result = []

        for similarity, product in similarities[:3]:

            data = ProductSerializer(product).data

            data['similarity'] = round(
                float(similarity),
                3
            )

            result.append(data)

        return Response(result)

@api_view(['GET'])
def prices_by_product(request, pk: int):
    product = get_object_or_404(Product.objects.prefetch_related('variants'), pk=pk)
    data = [
        {'size': v.size, 'price': float(v.price), 'stock': v.stock}
        for v in product.variants.all().order_by('pk')
    ]
    return Response(data)


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token, _ = AuthToken.objects.get_or_create(user=user)
    return Response(
        {
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = authenticate(
        username=serializer.validated_data['username'],
        password=serializer.validated_data['password'],
    )
    if not user:
        return Response(
            {'detail': 'Invalid credentials.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    token, _ = AuthToken.objects.get_or_create(user=user)
    return Response(
        {
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
        }
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response(
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pay_order_view(request):
    serializer = OrderPaymentSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    order = Order.objects.get(id=serializer.validated_data['order_id'], customer__user=request.user)
    method = serializer.validated_data['method']
    amount = order.get_total_price()
    if method == 'sbp':
        adapter = PaymentAdapter(SBPPayment(), 'pay')
    elif method == 'card':
        adapter = PaymentAdapter(CardPayment(), 'make_payment')
    elif method == 'cash':
        adapter = PaymentAdapter(CashPayment(), 'give_cash')
    else:
        return Response({'detail': 'Неверный метод оплаты'}, status=status.HTTP_400_BAD_REQUEST)
    result_message = adapter.pay(amount)
    order.payment = method
    if method != 'cash':
        order.status = 'paid'
    order.save()
    return Response({
        'order_id': order.id,
        'amount': float(amount),
        'method': method,
        'status': order.status,
        'message': result_message
    })

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.user)
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            return Response({
                "id": order.id,
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)