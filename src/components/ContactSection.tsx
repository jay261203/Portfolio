import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  { icon: Mail, label: "Email", value: "jaytailor261203@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "jaydarji-ai", href: "https://linkedin.com/in/jaydarji-ai" },
  { icon: Github, label: "GitHub", value: "jay261203", href: "https://github.com/jay261203" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title mb-12 flex items-center gap-3"
        >
          <Send className="w-6 h-6 text-primary" />
          contact
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed max-w-md">
              I'm interested in freelance opportunities and open to remote positions. 
              If you have a project proposal, job opportunity, or just want to chat, 
              don't hesitate to reach out!
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">Name</label>
                <Input id="name" placeholder="Your name" className="bg-card" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2">Email</label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="bg-card" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-2">Message</label>
                <Textarea id="message" placeholder="Your message" rows={5} className="bg-card resize-none" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-6">Get in touch</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-secondary rounded-lg flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Ahmedabad, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
