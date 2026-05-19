from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

# Create your models here.
class Customer(models.Model):
     user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.JSONField()
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    main_image = models.ImageField(upload_to="products/main_images/", blank=True, null=True)
    images = models.JSONField(default=list)


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['product', 'size'], name='unique_product_size')
        ]

class Order(models.Model):
    STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered'),
    ('return_requested', 'Return Requested'),
    ('returned', 'Returned'),
    ('cancelled', 'Cancelled'),
]
    PAYMENT_CHOICES = [
        ('SBP', 'SBP'),
        ('cash', 'Cash'),
        ('card', 'Card'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='card')
    delivered_at = models.DateTimeField(null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)

    def get_total_price(self):
        total = 0
        for item in self.items.all():
            total += item.get_total_price()
        return total

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.PROTECT
    )
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.variant.price * self.quantity
    
class ReturnRequest(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='returns'
    )

    reason = models.TextField()

    approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def can_return(self):
        if not self.order.delivered_at:
            return False

        return timezone.now() <= self.order.delivered_at + timedelta(days=14)