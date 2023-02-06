from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from events.models import Event
from events.serializers import EventSerializer


class ListCreateEventView(ListCreateAPIView):
    """
        get:
        Lists all Events ordered by starting date.

        post:
        Creates an Event.
    """
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        query = self.request.GET.get('search', '')  # search is the params and '' the default value
        queryset = Event.objects.filter(title__icontains=query).order_by('-start')
        return queryset


class RetrieveUpdateDeleteEventView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Retrieves a specific Event by ID and displays all the information about it.

        patch:
        Updates the status of a specific Event.

        delete:
        Deletes a Event by ID.

    """
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it
    lookup_field = 'id'
    lookup_url_kwarg = 'id_event'
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [IsAuthenticated, IsInvolvedInFriendship | IsAdminUser]


class ListHomeEventsView(ListAPIView):
    """
        get:
        Lists all Events of the Home of the logged-in User ordered by starting date.
    """

    serializer_class = EventSerializer

    def get_queryset(self):
        id_home = self.request.user.home
        if id_home:
            query = self.request.GET.get('search', '')  # search is the params and '' the default value
            queryset = Event.objects.filter(creator_id__home=id_home, title__contains=query).order_by('-start')
        else:
            queryset = []
        return queryset
