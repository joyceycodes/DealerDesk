# Generated by Django 4.0.3 on 2022-10-25 18:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_customer_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salerecord',
            name='automobile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='sale_record', to='sales_rest.automobilevo'),
        ),
    ]
