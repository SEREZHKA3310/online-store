from urllib.parse import urljoin

from django.conf import settings
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Product, Customer, Order


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'info', 'images', 'main_image']

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


class OrderPaymentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    method = serializers.ChoiceField(choices=[('sbp','СБП'), ('card','Карта'), ('cash','Наличные')])
    def validate_order_id(self, value):
        user = self.context['request'].user
        if not Order.objects.filter(id=value, customer__user=user).exists():
            raise serializers.ValidationError("Заказ не найден или доступ запрещен.")
        return value