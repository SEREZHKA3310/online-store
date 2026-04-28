from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="images",
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name="product",
            name="info",
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name="product",
            name="mainImage",
            field=models.CharField(blank=True, default="", max_length=512),
        ),
    ]
