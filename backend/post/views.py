from django.shortcuts import render

from rest_framework import viewsets, generics
from .serializers import *
from .models import Post

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['writer']


class PostListSearch(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=category', 'title']


class PostDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer


class PostUpdate(generics.UpdateAPIView):
    lookup_field = 'id'
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


class PostDelete(generics.DestroyAPIView):
    lookup_field = 'id'
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
