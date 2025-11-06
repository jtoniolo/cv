/**
 * Contact form data model
 * Represents the structure of the contact form submission
 */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact?: 'email' | 'phone';
  interests?: string[];
}
