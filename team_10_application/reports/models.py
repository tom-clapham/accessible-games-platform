from django.db import models

# Create your models here.
class Report(models.Model):
    # Validate choices for report_type in database
    REPORT_TYPE_CHOICES = {
        "INAPP": "Inappropriate Content",
        "INACC": "Inaccurate Information",
        "MALIC": "Malicious",
        "SPAM": "Spam",
        "OTHR": "Other",
    }
    userId = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE)
    gameId = models.ForeignKey("games.Game", on_delete=models.CASCADE, blank=True, null=True)
    report_type = models.CharField(max_length=30, choices=REPORT_TYPE_CHOICES)
    description = models.TextField()

    def __str__(self):
        return self.report_type

    
    

