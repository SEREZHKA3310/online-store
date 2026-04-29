from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.pagination import PageNumberPagination

from .models import Product
from .serializers import ProductSerializer

class ArticlePagination(PageNumberPagination):
    page_size = 9  # По умолчанию 10 статей на страницу
    page_size_query_param = 'page_size'  # Пользователь может менять размер страницы
    max_page_size = 100  # Максимум 100 статей на страницу

# Create your views here.
class ProductViewSet(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ArticlePagination