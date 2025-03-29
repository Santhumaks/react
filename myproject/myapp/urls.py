from django.urls import path
from myapp.views import create_example_data,get_example_data,get_single_example,update_example_data,soft_delete_example,add_projectByid,get_projects_by_userid,get_allprojects,soft_delete_project
urlpatterns = [
    path('example/', get_example_data, name='get_example_data'),  
    path('example/<int:pk>/', get_single_example, name='get_single_example'), 
    path('example/create/', create_example_data, name='create_example_data'), 
    path('example/update/<int:pk>/', update_example_data, name='update_example_data'),  
    path('records/<int:pk>/soft-delete/', soft_delete_example, name='soft-delete-example'),
    path('project/create/',add_projectByid,name='add_projectByid'),
    path('project/user/<int:user_id>/', get_projects_by_userid, name='get_projects_by_userid'),
    path('project/',get_allprojects, name='get_allprojects'),
    path('project/<int:pk>/<str:st>/soft-delete/', soft_delete_project, name='soft-delete-project')
]
