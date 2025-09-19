import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PixelCard } from './PixelCard';
import { PixelButton } from './PixelButton';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) {return;}

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Log the form data for debugging
    console.log('Sending email with data:', formData);
    console.log('EmailJS Config:', EMAILJS_CONFIG);

    try {
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      console.log('EmailJS Result:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        formRef.current.reset();
      } else {
        console.error('EmailJS returned non-200 status:', result.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              Get In <span className="text-green-500 dark:text-green-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's build something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  LET'S CONNECT
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  I'm always excited to discuss new opportunities, interesting projects, 
                  or just chat about the latest in web development. Whether you're looking 
                  for a frontend developer or want to collaborate on something creative, 
                  I'd love to hear from you!
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <PixelCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 dark:bg-green-400 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-700 dark:text-gray-300">tafsirul.shafin44@gmail.com</p>
                    </div>
                  </div>
                </PixelCard>

                <PixelCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Phone</h4>
                      <p className="text-gray-700 dark:text-gray-300">+880 1580 521 993</p>
                    </div>
                  </div>
                </PixelCard>

                <PixelCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Location</h4>
                      <p className="text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </PixelCard>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">FIND ME ONLINE</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Github, href: 'https://github.com/0SHAFIN', label: 'GitHub', color: 'bg-gray-800' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/tafsirul-islam-shafin-98126a296/', label: 'LinkedIn', color: 'bg-blue-600' },
                    { Icon: Mail, href: 'mailto:tafsirul.shafin44@gmail.com', label: 'Email', color: 'bg-red-500' },
                  ].map(({ Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      className={`w-12 h-12 ${color} border-2 border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 flex items-center justify-center transition-all duration-200 hover:scale-110`}
                      style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <PixelCard glowing className="h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  SEND MESSAGE
                </h3>
                
                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors duration-200"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors duration-200"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    />
                  </div>

                  {/* Hidden reply_to field for EmailJS */}
                  <input type="hidden" name="reply_to" value={formData.email} />

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 calc(100% - 8px))' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or inquiry..."
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors duration-200 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                    </div>
                  )}

                  <PixelButton 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </PixelButton>

                  {/* Test EmailJS Connection */}
                  {/* <button
                    type="button"
                    onClick={() => {
                      console.log('Testing EmailJS connection...');
                      console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
                      console.log('Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
                      console.log('Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Test EmailJS Config
                  </button> */}
                </form>
              </PixelCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};