import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/jay261203", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/jaydarji-ai", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:jaytailor261203@gmail.com", icon: Mail, label: "Email" },
];

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >
      <div className="w-px h-16 bg-border mx-auto" />
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
          title={link.label}
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
      <div className="w-px h-16 bg-border mx-auto" />
    </motion.div>
  );
};

export default SocialSidebar;
