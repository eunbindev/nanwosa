from rest_framework import serializers
from .models import Buy


class BuyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buy
        fields = ('buyer', 'seller', 'post', 'name', 'address',
                  'phone', 'dealtype', 'status', 'tracknum', 'about', 'postTitle', 'price')


class BuyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buy
        fields = '__all__'


class BuyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buy
        fields = '__all__'
