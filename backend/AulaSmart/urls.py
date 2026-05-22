from django.urls import path
from django.http import JsonResponse
from . import views


urlpatterns = [
  

    path(
        '',
        lambda request: JsonResponse({
            "mensaje": "API AulaSmart funcionando"
        }),
        name='api-root'
    ),


    path(
        'dashboard/',
        views.DashboardView.as_view(),
        name='dashboard'
    ),

   

    path(
        'datos/',
        views.DatosView.as_view(),
        name='datos'
    ),


    path(
        'alertas/',
        views.AlertasView.as_view(),
        name='alertas'
    ),

    path(
        'dispositivos/',
        views.DispositivosView.as_view(),
        name='dispositivos'
    ),


    path(
        'historial/',
        views.HistorialView.as_view(),
        name='historial'
    ),

]