from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token as AuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import status

from main.models import Product, Order
from .serializers import LoginSerializer, ProductSerializer, RegisterSerializer, OrderPaymentSerializer
from .payment import SBPPayment, CardPayment, CashPayment, PaymentAdapter

class ArticlePagination(PageNumberPagination):
    page_size = 3  # По умолчанию 10 статей на страницу
    page_size_query_param = 'page_size'  # Пользователь может менять размер страницы
    max_page_size = 100  # Максимум 100 статей на страницу

# Create your views here.
class ProductViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('pk')
    serializer_class = ProductSerializer
    pagination_class = ArticlePagination


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