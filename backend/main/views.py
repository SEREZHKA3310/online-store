from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductViewSet(ReadOnlyModelViewSet):  # ← Только чтение!
    queryset = Product.objects.all()
    serializer_class = ProductSerializer