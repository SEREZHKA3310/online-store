from urllib.parse import urljoin
from django.db import transaction
from django.conf import settings
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Product, Customer, Order
from rest_framework import serializers
from .models import Order, OrderItem, ProductVariant, Customer

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'category', 'description', 'images', 'main_image']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        request = self.context.get('request')
        if not request:
            return ret
        images = ret.get('images')
        if isinstance(images, list):
            media_base = request.build_absolute_uri(settings.MEDIA_URL)
            ret['images'] = [
                path
                if isinstance(path, str) and path.startswith(('http://', 'https://'))
                else urljoin(media_base, str(path).lstrip('/'))
                for path in images
                if path
            ]
        return ret


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already exists.')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists.')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )
        Customer.objects.get_or_create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='variant.id')
    name = serializers.CharField(source='variant.product.name')
    main_image = serializers.SerializerMethodField()
    images = serializers.JSONField(source='variant.product.images')
    description = serializers.JSONField(source='variant.product.description')
    size = serializers.CharField(source='variant.size')
    price = serializers.FloatField(source='variant.price')
    count = serializers.IntegerField(source='quantity')

    class Meta:
        model = OrderItem
        fields = [
            'id', 'name', 'main_image', 'images', 
            'description', 'count', 'size', 'price'
        ]

    def get_main_image(self, obj):
        if obj.variant.product.main_image:
            return obj.variant.product.main_image.url
        return None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True, read_only=True)
    input_items = serializers.JSONField(write_only=True, required=False)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'payment', 'status', 'items', 'input_items', 'total_price']
        read_only_fields = ['id', 'status']
    
    def get_total_price(self, obj):

        return float(obj.get_total_price())

    def create(self, validated_data):
        items_data = validated_data.pop('input_items')
        validated_data.pop('total_price', None)
        user = self.context['request'].user
        customer, _ = Customer.objects.get_or_create(user=user)
        with transaction.atomic():
            order = Order.objects.create(
                customer=customer,
                **validated_data
            )
            for item in items_data:
                variant = ProductVariant.objects.select_for_update().get(
                    id=item['id']
                )
                OrderItem.objects.create(
                    order=order,
                    variant=variant,
                    quantity=item['count']
                )

            return order