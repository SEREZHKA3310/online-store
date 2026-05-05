from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, login_view, prices_by_product, profile_view, register_view, pay_order_view

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('by_product/<int:pk>/', prices_by_product),
    path('login', login_view),
    path('login/', login_view),
    path('me', profile_view),
    path('me/', profile_view),
    path('auth/register/', register_view),
    path('auth/login/', login_view),
    path('auth/profile/', profile_view),
    path('order/pay/', pay_order_view, name='pay_order'),
    path('', include(router.urls)),
]
