from decimal import Decimal, ROUND_HALF_UP

from django.db import migrations


PRODUCTS = [
    {
        "id": 1,
        "name": "Alyaska kurtka",
        "base_price": Decimal("15.522"),
        "mainImage": "products/shirt1.png",
        "images": ["/shirt1.png", "/shirt2.png", "/shirt3.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 2,
        "name": "Layered Skirt",
        "base_price": Decimal("10.842"),
        "mainImage": "products/cloth2.png",
        "images": ["/cloth2.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 3,
        "name": "Minimalist Hat",
        "base_price": Decimal("6.162"),
        "mainImage": "products/cloth3.png",
        "images": ["/cloth3.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 4,
        "name": "Neon Accent Sneakers",
        "base_price": Decimal("10.062"),
        "mainImage": "products/cloth4.png",
        "images": ["/cloth4.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 5,
        "name": "Alyaska kurtka",
        "base_price": Decimal("15.522"),
        "mainImage": "products/shirt1.png",
        "images": ["/shirt1.png", "/shirt2.png", "/shirt3.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 6,
        "name": "Layered Skirt",
        "base_price": Decimal("10.842"),
        "mainImage": "products/cloth2.png",
        "images": ["/cloth2.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 7,
        "name": "Minimalist Hat",
        "base_price": Decimal("6.162"),
        "mainImage": "products/cloth3.png",
        "images": ["/cloth3.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 8,
        "name": "Neon Accent Sneakers",
        "base_price": Decimal("10.062"),
        "mainImage": "products/cloth4.png",
        "images": ["/cloth4.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
    {
        "id": 9,
        "name": "Alyaska kurtka",
        "base_price": Decimal("15.522"),
        "mainImage": "products/shirt1.png",
        "images": ["/shirt1.png", "/shirt2.png", "/shirt3.png"],
        "info": [
            "Легкий оверсайз-фит.",
            "Рост Амира 189 см, размер на Амире М.",
            "Рост Кристины 173 см, размер на Кристине M.",
        ],
        "description": [
            "— 60% ШЕРСТЬ МЕРИНОС, 40% ПОЛИЭСТЕР, 600ГР ",
            "— ВЫДЕРЖИТ ДО -5 ",
            "— БРЕНДИРОВАННАЯ ФУРНИТУРА",
            "— ВОРОТНИК-СТОЙКА",
            "— РЕМЕНЬ НА ПОЯСЕ",
            "— ВНУТРЕННИЙ КАРМАН",
            "— ВЫШИВКА ЛОГОТИПА НА СПИНЕ",
            "— ОТПРАВКА НАЧНЕТСЯ ЧЕРЕЗ 4-6 НЕДЕЛЬ",
        ],
    },
]


def quantize_price(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def seed_products_and_variants(apps, schema_editor):
    Product = apps.get_model("main", "Product")
    ProductVariant = apps.get_model("main", "ProductVariant")

    for item in PRODUCTS:
        product, _ = Product.objects.update_or_create(
            id=item["id"],
            defaults={
                "name": item["name"],
                "mainImage": item["mainImage"],
                "images": item["images"],
                "info": item["info"],
                "description": item["description"],
            },
        )

        base = item["base_price"]
        variant_prices = {
            "S": quantize_price(base * Decimal("0.90")),
            "M": quantize_price(base),
            "L": quantize_price(base * Decimal("1.15")),
        }

        for size, price in variant_prices.items():
            ProductVariant.objects.update_or_create(
                product=product,
                size=size,
                defaults={
                    "price": price,
                    "stock": 25,
                },
            )


def rollback_products_and_variants(apps, schema_editor):
    Product = apps.get_model("main", "Product")
    ProductVariant = apps.get_model("main", "ProductVariant")

    product_ids = [item["id"] for item in PRODUCTS]
    ProductVariant.objects.filter(product_id__in=product_ids).delete()
    Product.objects.filter(id__in=product_ids).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0003_alter_product_mainimage"),
    ]

    operations = [
        migrations.RunPython(seed_products_and_variants, rollback_products_and_variants),
    ]
