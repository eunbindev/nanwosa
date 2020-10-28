from rest_framework import serializers
from .models import Cash


class CashListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cash
        fields = '__all__'


class CashCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cash
        fields = ('type', 'detail', 'price', 'bank', 'account',
                  'buy', 'seller')
