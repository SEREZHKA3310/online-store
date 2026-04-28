from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_product_media_fields"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="mainImage",
            field=models.ImageField(blank=True, null=True, upload_to="products/"),
        ),
    ]
