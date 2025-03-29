from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    phno = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    address = models.TextField()
    status = models.BooleanField(default=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table="users"
class Project(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE, related_name="users")  
    project_title = models.CharField(max_length=255)
    project_description = models.TextField()
    project_duration = models.IntegerField()  
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(default="pending", max_length=20)
    class Meta:
        db_table="projects"
