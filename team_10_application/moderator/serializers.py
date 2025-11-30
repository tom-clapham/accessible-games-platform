from reports.models import Report
from rest_framework import serializers

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'gameId', 'postId', 'report_type', 'description', 'created_at']