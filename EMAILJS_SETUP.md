# EmailJS Setup Guide

This project uses EmailJS to send emails from the contact form without requiring a backend server.

## Step 1: Sign up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

## Step 3: Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email template using these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Sender's message
   - `{{to_name}}` - Your name (recipient)
   - `{{reply_to}}` - Reply-to email address

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Configuration

1. Open `src/config/emailjs.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id',
  PUBLIC_KEY: 'your_actual_public_key'
};
```

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to the contact section
3. Fill out the form and submit
4. Check your email to confirm it's working

## Example Email Template

Here's a simple template you can use:

```
Subject: {{subject}}

Hello,

You have received a new message from your portfolio website:

Name: {{name}}
Email: {{email}}
Subject: {{subject}}
Message: {{message}}

Best regards,
{{to_name}}
```

## Troubleshooting

- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID  
- **"Invalid public key"**: Check your Public Key
- **"Email not sending"**: Verify your email service is properly configured

## Security Notes

- The public key is safe to expose in frontend code
- EmailJS handles rate limiting and spam protection
- Free tier allows 200 emails per month
- Consider upgrading for production use
