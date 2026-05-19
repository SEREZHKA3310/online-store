from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, login_view, prices_by_product, profile_view, register_view, pay_order_view, CheckoutView, OrderDetailView, OrderCancelView, UserOrdersView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('by_product/<int:pk>/', prices_by_product),
    path('login', login_view),
    path('me', profile_view),
    path('order/pay/', pay_order_view, name='pay_order'),
    path('checkout', CheckoutView.as_view(), name='checkout'),
    path("orders/", UserOrdersView.as_view()),
    path("orders/<int:order_id>/", OrderDetailView.as_view()),
    path("orders/cancel/", OrderCancelView.as_view()),
    path('', include(router.urls)),
]
