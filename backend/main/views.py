from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from main.models import Product
from .serializers import ProductSerializer

class ArticlePagination(PageNumberPagination):
    page_size = 9  # По умолчанию 10 статей на страницу
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