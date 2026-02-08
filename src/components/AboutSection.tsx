import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import jayImage from "@/assets/jay-darji.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title mb-12 flex items-center gap-3"
        >
          <User className="w-6 h-6 text-primary" />
          about-me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-foreground text-lg">Hello, I'm Jay!</p>
            <p className="text-muted-foreground leading-relaxed">
              I'm a self-taught Software Developer and AI Engineer based in Ahmedabad, India. 
              With over a year of hands-on experience in Artificial Intelligence, I specialize 
              in designing, developing, and deploying intelligent AI solutions—particularly 
              AI agents that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Driven by curiosity and a passion for innovation, I've been building web 
              applications and software systems. I love transforming ideas into impactful, 
              user-focused digital experiences. If you're looking for someone who can merge 
              technical expertise with creative thinking to build meaningful projects, let's connect!
            </p>
            <Button variant="outline" className="group">
              Read more
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center relative"
          >
            <div className="relative">
              <div className="dots-pattern absolute -right-4 -bottom-4 w-24 h-24 opacity-50" />
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border border-border">
                <img
                  src={jayImage}
                  alt="Jay Darji"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
