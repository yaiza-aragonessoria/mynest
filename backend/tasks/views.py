from datetime import datetime

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.permissions import HasHome
from tasks.models import Task
from tasks.permissions import IsMemberOfHomeForTask
from tasks.serializers import TaskSerializer, TaskCreationSerializer


class ListCreateTaskView(ListCreateAPIView):
    """
    get: Lists all tasks of the logged-in User's Home in inverted chronological order.

    post: Creates a new Task.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, HasHome]

    def get_queryset(self):
        return Task.objects.filter(creator__home=self.request.user.home).order_by("name")

    def post(self, request, *args, **kwargs):
        req_serializer = TaskCreationSerializer(data=request.data)
        req_serializer.is_valid(raise_exception=True)
        name = req_serializer.validated_data["name"]
        frequency = req_serializer.validated_data["frequency"]
        # Must use "get" because the field is not required
        planned_for = req_serializer.validated_data.get("planned_for", False)
        results = []
        for i in range(frequency):
            data = {'name': name + " #{}".format(i + 1)}
            if planned_for:
                data['planned_for'] = planned_for
            serializer = TaskSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            task = serializer.save(creator=request.user)
            results.append(task)
        return Response(TaskSerializer(results, many=True).data, status=status.HTTP_201_CREATED)


class ListSearchAllTaskView(ListAPIView):
    """
    get: Lists all tasks of the logged-in User's Home with a name containing the parameter "q".
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, HasHome]

    def get_queryset(self):
        return Task.objects.filter(
            name__contains=self.request.GET.get('q', ''), creator__home=self.request.user.home).order_by("name")


class ListSearchMonthTaskView(ListAPIView):
    """
    get: Lists all tasks of the logged-in User's Home for this month with a name containing the parameter "q".
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, HasHome]

    def get_queryset(self):
        return Task.objects.filter(
            planned_for__year=datetime.now().year, planned_for__month=datetime.now().month,
            name__contains=self.request.GET.get('q', ''), creator__home=self.request.user.home).order_by("name")


class RetrieveUpdateDeleteTaskView(RetrieveUpdateDestroyAPIView):
    """
        get: Retrieves a specific Task.
        patch: Updates a specific Task.
        delete: Deletes a Task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsMemberOfHomeForTask]
    lookup_field = 'id'  # field in the database
    lookup_url_kwarg = 'id_task'  # field in the request
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it
