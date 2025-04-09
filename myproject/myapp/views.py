from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from myapp.models import User
from myapp.models import Project
from myapp.models import Meeting
from myapp.serializers import MeetingSerializer
from myapp.serializers import UserSerializer
from myapp.serializers import ProjectSerializer

# R
@api_view(['GET'])
def get_example_data(request):
    examples = User.objects.filter(status=True)
    serializer = UserSerializer(examples, many=True)
    response = Response(serializer.data)
    connection.close()  
    return response
    
@api_view(['GET'])
def get_allprojects(request):
    examples = Project.objects.filter(status="pending")   
    serializer = ProjectSerializer(examples, many=True)
    response = Response(serializer.data)
    connection.close()  
    return response

@api_view(['GET'])
def get_scheduled_meetings(request):
    meetings = Meeting.objects.filter(meeting_status='scheduled')
    serializer = MeetingSerializer(meetings, many=True)
    response = Response(serializer.data)
    connection.close()
    return response

# # R(1)
@api_view(['GET'])
def get_single_example(request, pk):
    try:
        example = User.objects.get(pk=pk , status=True)    
    except User.DoesNotExist:
        connection.close()
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(example)
    response = Response(serializer.data)
    connection.close()
    return response

@api_view(['GET'])
def get_projects_by_userid(request, user_id):
    try:
        projects = Project.objects.filter(user_id=user_id)
        if not projects.exists():
            return Response({"error": "No projects found for this user"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_meetings_by_user(request, user_id):
    try:
        # Step 1: Get all project IDs for the user
        project_ids = Project.objects.filter(user_id=user_id).values_list('id', flat=True)

        if not project_ids:
            return Response({"error": "No projects found for this user."}, status=status.HTTP_404_NOT_FOUND)

        # Step 2: Get all meetings related to those projects
        meetings = Meeting.objects.filter(project_id__in=project_ids)

        if not meetings.exists():
            return Response({"message": "No meetings found for this user."}, status=status.HTTP_200_OK)

        # Step 3: Serialize and return
        serializer = MeetingSerializer(meetings, many=True)
        response = Response(serializer.data, status=status.HTTP_200_OK)
        connection.close()
        return response

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
# C
@api_view(['POST'])
def create_example_data(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer Errors:", serializer.errors)
        response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    connection.close()
    return response

@api_view(['POST'])
def create_meeting(request):
    serializer = MeetingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer Errors:", serializer.errors)
        response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    connection.close()
    return response


@api_view(["POST"])
def add_projectByid(request):
    serializer = ProjectSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Project added successfully!", "project": serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# U
@api_view(['PUT'])
def update_example_data(request, pk):
    try:
        example = User.objects.get(pk=pk)
    except User.DoesNotExist:
        connection.close()
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(example, data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data)
    else:
        response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    connection.close()
    return response

# # D
@api_view(['PATCH'])  
def soft_delete_example(request, pk):
    try:
        example = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    example.status = False  
    example.save()
    
    return Response({"message": "Record marked as inactive"}, status=status.HTTP_200_OK)


@api_view(['PATCH'])  
def soft_delete_project(request, pk,st):
    try:
        example = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    example.status = st 
    example.save()
    
    return Response({"message": "Record marked as inactive"}, status=status.HTTP_200_OK)
