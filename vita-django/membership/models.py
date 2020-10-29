from django.db import models
from users.models import NewUser
from django.db.models.signals import post_save
import braintree
from payment.configure import gateway
# Create your models here.

MEMBERSHIP_CHOICES = (
    ('Enterprise', 'ent'),
    ('Professional', 'pro'),
    ('Free', 'free')
)


class Membership(models.Model):

    memebership_type = models.CharField(
        choices=MEMBERSHIP_CHOICES,
        default='Free',
        max_length=30
    )
    price = models.IntegerField(default=15)
    braintree_plan_id = models.CharField(max_length=40)

    def __str__(self):
        return self.memebership_type


class UserMembership(models.Model):
    user = models.OneToOneField(NewUser, on_delete=models.CASCADE)
    braintree_customer_id = models.CharField(max_length=40)
    membership = models.ForeignKey(
        Membership, on_delete=models.SET_NULL, null=True, default=1)

    def __str__(self):
        return self.user.username
# from payment.views import gateway


def post_save_usermembership_create(sender, instance, created, *args, **kwargs):
    if created:
        UserMembership.objects.get_or_create(user=instance)

    user_membership, created = UserMembership.objects.get_or_create(
        user=instance)

    if user_membership.braintree_customer_id is None or user_membership.braintree_customer_id == "":
        result = gateway.customer.create({
            "email": instance.email,
        })
        if result.is_success:
            user_membership.braintree_customer_id = result.customer.id
            user_membership.save()


post_save.connect(post_save_usermembership_create, sender=NewUser)


class Subscription(models.Model):
    user_membership = models.ForeignKey(
        UserMembership, on_delete=models.CASCADE)
    braintree_subscription_id = models.CharField(max_length=40)
    active = models.BooleanField(default=True)

    # def __str__(self):
    #     return self.user_membership.user
