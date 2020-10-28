from django.shortcuts import render

from rest_framework import viewsets, generics
from .serializers import *
from .models import Buy

from django_filters.rest_framework import DjangoFilterBackend


class BuyCreate(generics.CreateAPIView):
    queryset = Buy.objects.all()
    serializer_class = BuyCreateSerializer


class BuyList(generics.ListAPIView):
    queryset = Buy.objects.all()
    serializer_class = BuyListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['seller', 'buyer', 'post']


class BuyDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = Buy.objects.all()
    serializer_class = BuyDetailSerializer


class BuyUpdate(generics.UpdateAPIView):
    lookup_field = 'id'
    queryset = Buy.objects.all()
    serializer_class = BuyListSerializer
