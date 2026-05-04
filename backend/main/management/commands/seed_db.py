from django.core.management.base import BaseCommand
from django.db import connection

from main.models import Product, ProductVariant


def _reset_sqlite_autoincrement(*models):
    if connection.vendor != "sqlite":
        return
    with connection.cursor() as cursor:
        for model in models:
            cursor.execute(
                "DELETE FROM sqlite_sequence WHERE name = %s",
                [model._meta.db_table],
            )


def _m(filename: str) -> str:
    return f"products/main_images/{filename}"

class Command(BaseCommand):
    help = "Удаляет старые товары и заполняет базу новыми товарами"

    def handle(self, *args, **kwargs):
        ProductVariant.objects.all().delete()
        Product.objects.all().delete()
        _reset_sqlite_autoincrement(ProductVariant, Product)

        # Файлы в media — имена как на диске (в т.ч. с пробелами). У каждого товара ровно 3 URL в images.
        products = [
            {
                "name": "Платье асимметричного кроя",
                "main_image": _m("Asymmetric Dress.png"),
                "description": ["Миди-платье с асимметричным низом, плотная ткань, удобная посадка."],
                "images": [
                    _m("Asymmetric Dress.png"),
                    _m("Asymmetric Dress.png"),
                    _m("Asymmetric Dress.png"),
                ],
                "info": ["Тип: платье", "Материал: полиэстер с вискозой", "Уход: деликатная стирка 30°"],
                "variants": [
                    {"size": "XS", "price": "7190.00", "stock": 5},
                    {"size": "S", "price": "7340.00", "stock": 8},
                    {"size": "M", "price": "7495.00", "stock": 6},
                ],
            },
            {
                "name": "Топ с геометрическим принтом",
                "main_image": _m("Bold Geometric Top.png"),
                "description": ["Футболка-топ с контрастным геометрическим рисунком, хлопок."],
                "images": [
                    "products/images/Bold Geometric Top.png",
                    "products/images/Bold Geometric Top.png",
                    "products/images/Bold Geometric Top.png",
                ],
                "info": ["Тип: верх", "Материал: хлопок 95%", "Стиль: casual / street"],
                "variants": [
                    {"size": "S", "price": "4590.00", "stock": 10},
                    {"size": "M", "price": "4725.00", "stock": 12},
                    {"size": "L", "price": "4860.00", "stock": 7},
                ],
            },
            {
                "name": "Топ oversize с геометрией",
                "main_image": _m("Bold_Geometric_Top.png"),
                "description": ["Свободный топ oversize, мягкий трикотаж, универсальный фасон."],
                "images": [
                    "products/images/Bold_Geometric_Top.png",
                    "products/images/Bold_Geometric_Top.png",
                    "products/images/Bold_Geometric_Top.png",
                ],
                "info": ["Тип: верх", "Посадка: oversize", "Материал: хлопок"],
                "variants": [
                    {"size": "S", "price": "4690.00", "stock": 9},
                    {"size": "M", "price": "4840.00", "stock": 11},
                    {"size": "L", "price": "4990.00", "stock": 8},
                ],
            },
            {
                "name": "Куртка деконструированная",
                "main_image": _m("Deconstructed_Jacket.png"),
                "description": {"text": "Куртка с деконструированным кроем, на сезон весна–осень."},
                "images": [
                    "products/images/Deconstructed_Jacket.png",
                    "products/images/Deconstructed_Jacket.png",
                    "products/images/Deconstructed_Jacket.png",
                ],
                "info": ["Тип: верхняя одежда", "Материал: смесовая ткань", "Крой: oversize"],
                "variants": [
                    {"size": "S", "price": "8290.00", "stock": 4},
                    {"size": "M", "price": "8475.00", "stock": 6},
                    {"size": "L", "price": "8660.00", "stock": 5},
                ],
            },
            {
                "name": "Шапка минималистичная",
                "main_image": _m("Minimalist_Hat.png"),
                "description": {"text": "Двойная вязка, лаконичный силуэт, подходит к пальто и пуховику."},
                "images": [
                    "products/images/Minimalist_Hat.png",
                    "products/images/Minimalist_Hat_2.png",
                    "products/images/Minimalist_Hat_3.png",
                ],
                "info": ["Тип: аксессуар", "Материал: акрил / шерсть", "Размерная сетка: один"],
                "variants": [
                    {"size": "ONE SIZE", "price": "2190.00", "stock": 25},
                ],
            },
            {
                "name": "Кроссовки с неоновым акцентом",
                "main_image": _m("Neon_Accent_Sneakers.png"),
                "description": {"text": "Кроссовки на шнуровке, неоновые вставки, амортизирующая подошва."},
                "images": [
                    "products/images/Neon_Accent_Sneakers.png",
                    "products/images/Neon_Accent_Sneakers.png",
                    "products/images/Neon_Accent_Sneakers.png",
                ],
                "info": ["Тип: обувь", "Материал: текстиль, синтетика", "Подошва: резина"],
                "variants": [
                    {"size": "39", "price": "7890.00", "stock": 4},
                    {"size": "40", "price": "7990.00", "stock": 7},
                    {"size": "41", "price": "8125.00", "stock": 8},
                    {"size": "42", "price": "8290.00", "stock": 5},
                ],
            },
            {
                "name": "Кроссовки City Runner",
                "main_image": _m("Neon_Accen_Sneakers.png"),
                "description": {"text": "Лёгкая городская модель, сетка верха, контрастная подошва."},
                "images": [
                    "products/images/Neon_Accen_Sneakers.png",
                    "products/images/Neon_Accen_Sneakers.png",
                    "products/images/Neon_Accen_Sneakers.png",
                ],
                "info": ["Тип: обувь", "Назначение: город / каждый день", "Материал: текстиль"],
                "variants": [
                    {"size": "40", "price": "7690.00", "stock": 6},
                    {"size": "41", "price": "7840.00", "stock": 9},
                    {"size": "42", "price": "7990.00", "stock": 7},
                    {"size": "43", "price": "8140.00", "stock": 4},
                ],
            },
            {
                "name": "Джинсы широкие Barrel",
                "main_image": _m("Bold Geometric Top.png"),
                "description": {
                    "text": "Широкие джинсы с высокой посадкой и barrel-ногой, плотный деним."
                },
                "images": [
                    "products/images/Bold Geometric Top.png",
                    "products/images/Bold Geometric Top.png",
                    "products/images/Bold Geometric Top.png",
                ],
                "info": ["Тип: штаны / деним", "Посадка: high waist", "Длина: укороченная"],
                "variants": [
                    {"size": "28", "price": "6790.00", "stock": 5},
                    {"size": "30", "price": "6925.00", "stock": 8},
                    {"size": "32", "price": "7080.00", "stock": 6},
                ],
            },
            {
                "name": "Брюки палаццо трикотажные",
                "main_image": _m("Bold_Geometric_Top.png"),
                "description": {
                    "text": "Прямые палаццо из плотного трикотажа, комфортный эластичный пояс."
                },
                "images": [
                    "products/images/Bold_Geometric_Top.png",
                    "products/images/Bold_Geometric_Top.png",
                    "products/images/Bold_Geometric_Top.png",
                ],
                "info": ["Тип: штаны", "Сезон: демисезон", "Состав: хлопок, эластан"],
                "variants": [
                    {"size": "34", "price": "5490.00", "stock": 4},
                    {"size": "36", "price": "5640.00", "stock": 10},
                    {"size": "38", "price": "5790.00", "stock": 9},
                ],
            },
        ]

        for product_data in products:
            variants = product_data.pop("variants")

            product = Product.objects.create(
                name=product_data["name"],
                main_image=product_data["main_image"],
                images=product_data["images"],
                info=product_data["info"],
                description=product_data["description"],
            )

            for variant_data in variants:
                ProductVariant.objects.create(
                    product=product,
                    size=variant_data["size"],
                    price=variant_data["price"],
                    stock=variant_data["stock"],
                )

        self.stdout.write(
            self.style.SUCCESS("Старые товары удалены, новые товары добавлены")
        )
