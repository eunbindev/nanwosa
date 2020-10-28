from django.conf.urls import url, include

from . import views

urlpatterns = [
    url('buy$', views.BuyList.as_view(), name='buyList'),
    url('buy/(?P<id>\d+)/$', views.BuyDetail.as_view(), name="BuyDetail"),
    url('buy/update/(?P<id>\d+)$',
        views.BuyUpdate.as_view(), name='postUpdate'),
    url('buy/create/$', views.BuyCreate.as_view(), name='buyCreate'),

]
