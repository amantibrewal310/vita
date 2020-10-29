# Generated by Django 3.1.1 on 2020-10-27 17:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('membership_type', models.CharField(choices=[('Enterprise', 'ent'), (
                    'Professional', 'pro'), ('Free', 'free')], default='Free', max_length=30)),
                ('price', models.IntegerField(default=15)),
                ('braintree_plan_id', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='UserMembership',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('braintree_customer_id', models.CharField(max_length=40)),
                ('membership', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.SET_NULL, to='membership.membership')),
                ('user', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('braintree_subscription_id', models.CharField(max_length=40)),
                ('active', models.BooleanField(default=True)),
                ('user_membership', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='membership.usermembership')),
            ],
        ),
    ]
