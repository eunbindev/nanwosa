from django.conf.urls import url, include

from . import views

urlpatterns = [
    url('post/$', views.PostList.as_view(), name='postList'),
    url('post/search/$', views.PostListSearch.as_view(), name='postListSearch'),
    url('post/(?P<id>\d+)/$', views.PostDetail.as_view(), name="postDetail"),
    url('post/(?P<id>\d+)/update$',
        views.PostUpdate.as_view(), name='postUpdate'),
    url('post/(?P<id>\d+)/delete$',
        views.PostDelete.as_view(), name='postDelete'),
    url('post/create/$', views.PostCreate.as_view(), name='postCreate'),

]
