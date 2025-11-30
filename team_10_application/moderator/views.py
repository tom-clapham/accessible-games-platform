from reports.models import Report, ReviewedReports
from reports.serializers import ReviewedReportsSerializer
from users.models import CustomUser
from moderator.permissions import IsModerator
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ReportSerializer
from rest_framework.permissions import AllowAny

@permission_classes([IsModerator])
class ModeratorDashboardView(APIView):
    def get(self, request):
        currentUser = request.user.username
        return Response({"username": currentUser})


@permission_classes([IsModerator])
class ModeratorReportView(APIView):
    def get(self, request):
        # reports = Report.objects.all().order_by('-created_at')
        # reviewed_reports = ReviewedReports.objects.all().order_by('-reviewed_at')
        # report_serializer = ReportSerializer(reports, many=True)
        # reviewed_report_serializer = ReviewedReportSerializer(reviewed_reports, many=True)

        reports = Report.objects.select_related('reviewed_report', 'reviewed_report__reviewed_by').all().order_by('-created_at')
        reports = ReportSerializer(reports, many=True)
        return Response(reports.data)
    
@permission_classes([IsModerator])
class ReviewedReportsView(APIView):
    def get(self, request):
        # Select all reviewed reports
        reviewed_reports = ReviewedReports.objects.order_by('-reviewed_at')[:5]
        serializer = ReviewedReportsSerializer(reviewed_reports, many=True)
        return Response(serializer.data)
    
@permission_classes([IsModerator])
class ModeratorReviewReportView(APIView):
    def post(self, request, report_id):
        report = Report.objects.get(id=report_id)
        review_reason = request.data.get('review_reason')
        review_action = request.data.get('review_action')
        moderator = request.user if request.user.is_authenticated else None 
        reviewed_report, created = ReviewedReports.objects.get_or_create(
            report=report,
            defaults={
                'reviewed_by': moderator,
                'review_reason': review_reason,
                'review_action': review_action
            }
        )

        if review_action == 'DELETE':
            if report.postId:
                report.postId.delete()
            elif report.gameId:
                report.gameId.delete()

        serializer = ReportSerializer(report)
        return Response(serializer.data)
        
