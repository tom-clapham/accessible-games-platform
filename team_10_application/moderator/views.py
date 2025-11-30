from reports.models import Report
from users.models import CustomUser
from moderator.permissions import IsModerator
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
# from reports.serializers import ReportSerializer

@permission_classes([IsModerator])
class ModeratorDashboardView(APIView):
    def get(self, request):
        currentUser = request.user.username
        return Response({"username": currentUser})


# @permission_classes([IsModerator])
# class ModeratorReportView(APIView):
#     def get(self, request):
#         reports = Report.objects.all().order_by('-created_at')
#         serializer = ReportSerializer(reports, many=True)
#         return Response(serializer.data)
