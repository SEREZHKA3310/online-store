from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):
     user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.JSONField()

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
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)