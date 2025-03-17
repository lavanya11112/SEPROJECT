
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <MotionDiv animation="fade-in" className="mb-16 mt-12">
            <h1 className="text-4xl md:text-5xl font-medium text-center mb-3">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Have questions or feedback? We're here to help! Reach out to our team.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <MotionDiv animation="fade-in" className="space-y-8">
              <div>
                <h2 className="text-2xl font-medium mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">
                    123 Restaurant Street<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-muted-foreground">info@flavoursofindia.com</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Opening Hours</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>11:00 AM - 10:00 PM</span>
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span>12:00 PM - 11:00 PM</span>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv animation="fade-in">
              <form onSubmit={handleSubmit} className="space-y-6 bg-secondary p-8 rounded-xl">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="johndoe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Reservation Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </MotionDiv>
          </div>

          {/* Map Section */}
          <MotionDiv animation="fade-in" className="mb-20">
            <div className="bg-gray-200 h-96 rounded-xl w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986613799748!3d40.69714941954754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1652528626452!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>
          </MotionDiv>
        </Container>
      </main>
      <Footer />
    </>
  );
}
