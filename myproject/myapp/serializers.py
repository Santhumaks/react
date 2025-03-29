from rest_framework import serializers
from .models import User
from .models import Project

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'phno', 'email', 'username', 'password', 'address', 'status', 'created_at']
        read_only_fields= ["id"]
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'user', 'project_title', 'project_description', 'project_duration', 'budget', 'created_at', 'status']