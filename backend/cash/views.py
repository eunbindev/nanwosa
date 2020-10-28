from django.shortcuts import render

from rest_framework import viewsets, generics
from .serializers import *
from .models import Post

from django_filters.rest_framework import DjangoFilterBackend


class CashList(generics.ListAPIView):
    queryset = Cash.objects.all()
    serializer_class = CashListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['seller']


class CashCreate(generics.CreateAPIView):
    queryset = Cash.objects.all()
    serializer_class = CashCreateSerializer
