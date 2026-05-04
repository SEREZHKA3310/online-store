from urllib.parse import urljoin

from django.conf import settings
from rest_framework.serializers import ModelSerializer

from .models import Product


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