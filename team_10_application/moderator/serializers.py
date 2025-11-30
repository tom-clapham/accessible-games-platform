from reports.models import Report, ReviewedReports
from rest_framework import serializers

class ReportSerializer(serializers.ModelSerializer):

    reviewed_by = serializers.SerializerMethodField()
    reviewed_at = serializers.SerializerMethodField()
    review_reason = serializers.SerializerMethodField()
    review_action = serializers.SerializerMethodField()

    def get_reviewed_by(self, obj):
        if hasattr(obj, 'reviewed_report') and obj.reviewed_report.reviewed_by:
            return obj.reviewed_report.reviewed_by.username
        return None
    def get_reviewed_at(self, obj):
        if hasattr(obj, 'reviewed_report'):
            return obj.reviewed_report.reviewed_at
        return None
    def get_review_reason(self, obj):
        if hasattr(obj, 'reviewed_report'):
            return obj.reviewed_report.review_reason
        return None
    def get_review_action(self, obj):
        if hasattr(obj, 'reviewed_report'):
            return obj.reviewed_report.review_action
        return None
    
    class Meta:
        model = Report
        fields = ['id', 'userId', 'gameId', 'postId', 'report_type', 'description', 'created_at', 'reviewed_by', 'reviewed_at', 'review_reason', 'review_action']