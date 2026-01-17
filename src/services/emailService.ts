import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  private static readonly TO_EMAIL = process.env.TO_EMAIL || 'delivered@resend.dev';
  private static readonly REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL;

  static async sendContactNotification(data: ContactEmailData): Promise<EmailResponse> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured');
      }

      const { name, email, subject, message } = data;

      const htmlContent = this.generateContactEmailHTML(data);
      const textContent = this.generateContactEmailText(data);

      console.log('Sending notification email to:', this.TO_EMAIL);

      const response = await resend.emails.send({
        from: this.FROM_EMAIL,
        to: this.TO_EMAIL,
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: htmlContent,
        text: textContent,
      });

      console.log('Notification email sent:', response);

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error: any) {
      console.error('Email sending failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }
  }

  static async sendConfirmationEmail(data: ContactEmailData): Promise<EmailResponse> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured');
      }

      const { name, email, subject } = data;

      const htmlContent = this.generateConfirmationEmailHTML(name, subject);
      const textContent = this.generateConfirmationEmailText(name, subject);

      console.log('Sending confirmation email to:', email);

      const response = await resend.emails.send({
        from: this.FROM_EMAIL,
        to: email,
        replyTo: this.REPLY_TO_EMAIL || this.TO_EMAIL,
        subject: 'Thank you for contacting me!',
        html: htmlContent,
        text: textContent,
      });

      console.log('Confirmation email sent:', response);

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error: any) {
      console.error('Confirmation email failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message || 'Failed to send confirmation email',
      };
    }
  }

  private static generateContactEmailHTML(data: ContactEmailData): string {
    const { name, email, subject, message } = data;
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #4F46E5; padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Message</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">Contact Details</h2>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                          <strong style="color: #6B7280;">Name:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <span style="color: #111827;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                          <strong style="color: #6B7280;">Email:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                          <strong style="color: #6B7280;">Subject:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                          <span style="color: #111827;">${subject}</span>
                        </td>
                      </tr>
                    </table>
                    
                    <div style="margin-top: 30px;">
                      <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
                      <div style="background-color: #F9FAFB; padding: 20px; border-radius: 6px; border-left: 4px solid #4F46E5;">
                        <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                    <p style="color: #6B7280; font-size: 12px; margin: 0;">
                      This email was sent from your portfolio contact form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  private static generateContactEmailText(data: ContactEmailData): string {
    const { name, email, subject, message } = data;
    
    return `
New Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form
    `.trim();
  }

  private static generateConfirmationEmailHTML(name: string, subject: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #10B981; padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Message Received!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Hi <strong>${name}</strong>,
                    </p>
                    
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Thank you for reaching out! I've received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.
                    </p>
                    
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      I typically respond within 24-48 hours during business days.
                    </p>
                    
                    <div style="background-color: #F0FDF4; padding: 20px; border-radius: 6px; border-left: 4px solid #10B981; margin-top: 30px;">
                      <p style="color: #166534; font-size: 14px; margin: 0;">
                        <strong>💡 Tip:</strong> If your message is urgent, feel free to follow up directly at ${this.REPLY_TO_EMAIL || this.TO_EMAIL}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                    <p style="color: #6B7280; font-size: 14px; margin: 0 0 10px 0;">
                      Best regards,<br>
                      <strong>Daniel Forson</strong>
                    </p>
                    <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                      This is an automated confirmation email
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  private static generateConfirmationEmailText(name: string, subject: string): string {
    return `
Hi ${name},

Thank you for reaching out! I've received your message regarding "${subject}" and will get back to you as soon as possible.

I typically respond within 24-48 hours during business days.

If your message is urgent, feel free to follow up directly at ${this.REPLY_TO_EMAIL || this.TO_EMAIL}

Best regards,
Daniel Forson

---
This is an automated confirmation email
    `.trim();
  }
}
