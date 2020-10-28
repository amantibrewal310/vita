
from django.core.mail import EmailMessage

# util class with send_email static method 
class Util:
    @staticmethod
    def send_email(data):

        email = EmailMessage(
            subject = data['email_subject'], body = data['email_body'], to = [data['to_email']])
        
        email.send()

        