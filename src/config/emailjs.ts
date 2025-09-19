// EmailJS Configuration
// You need to sign up at https://www.emailjs.com/ and get these credentials
// You can also set these as environment variables in a .env file:
// VITE_EMAILJS_SERVICE_ID=your_service_id
// VITE_EMAILJS_TEMPLATE_ID=your_template_id
// VITE_EMAILJS_PUBLIC_KEY=your_public_key

export const EMAILJS_CONFIG = {
  // Your EmailJS service ID (create a service in EmailJS dashboard)
  SERVICE_ID: 'service_kccfg2s',
  
  // Your EmailJS template ID (create a template in EmailJS dashboard)
  TEMPLATE_ID: 'template_otdv8io',
  
  // Your EmailJS public key (found in your EmailJS dashboard)
  PUBLIC_KEY: '8dnUv1vjAj8lpR0iX'
};

// Template variables that EmailJS will use:
// - {{name}} - Sender's name
// - {{email}} - Sender's email address
// - {{subject}} - Message subject
// - {{message}} - Sender's message
// - {{reply_to}} - Reply-to email address (same as email)

// Make sure your EmailJS template has these variables defined
