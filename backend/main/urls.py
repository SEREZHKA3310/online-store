from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, prices_by_product

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('by_product/<int:pk>/', prices_by_product),
    path('', include(router.urls)),
]
