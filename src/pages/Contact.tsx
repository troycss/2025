import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="section">
      <div className="container">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a question or want to work together? I'd love to hear from you."
        />
        <ContactForm />
      </div>
    </div>
  );
}
