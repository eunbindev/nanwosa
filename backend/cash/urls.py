from django.conf.urls import url, include

from . import views

urlpatterns = [
    url('cash/$', views.CashList.as_view(), name='cashList'),
    url('cash/create/$', views.CashCreate.as_view(), name='CashCreate'),

]
