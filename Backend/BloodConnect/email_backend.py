from django.core.mail.backends.smtp import EmailBackend
from django.conf import settings
import dkim

class DKIMBackend(EmailBackend):
    def _send(self, email_message):
        """A helper method that does the actual sending + DKIM signing."""
        print('DKIM CONFIGURATION RUNNING')
        if not email_message.recipients():
            print('EXECUTED')
            print(email_message.recipients())
            return False
        try:
            message_string = email_message.message().as_string()
            print(message_string)
            signature = dkim.dkim_sign(message_string,
                                  settings.DKIM_SELECTOR,
                                  settings.DKIM_DOMAIN,
                                  settings.DKIM_PRIVATE_KEY)
            print('SIGNATURE HAPPENING')
            print(signature)
            test = self.connection.sendmail(email_message.from_email,
                    email_message.recipients(),
                    signature+message_string)
            print(test)
        except:
            if not self.fail_silently:
                raise
            return False
        return True