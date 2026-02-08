import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["AI Engineer", "Software Developer", "Problem Solver", "Creative Coder"];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[currentRole];
    
    if (isTyping) {
      if (displayText.length < role.length) {
        const timeout = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentRole]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="geometric-square w-24 h-24 -top-4 left-1/4 opacity-30" />
        <div className="geometric-square w-16 h-16 bottom-1/4 right-1/4 opacity-20" />
        <div className="dots-pattern absolute w-32 h-32 bottom-20 left-20 opacity-10" />
        <div className="dots-pattern absolute w-24 h-24 top-40 right-20 opacity-10" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              I am{" "}
              <span className="text-primary">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg">
              I craft AI solutions and systems where technologies meet creativity
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <a href="#projects">
                  View my work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Contact me</a>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-2 text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-status-active animate-pulse" />
              <span className="text-muted-foreground">
                Currently working on <span className="text-foreground font-medium">AI Projects</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            <div className="relative">
              <div className="geometric-square w-20 h-20 -left-4 -top-4 z-0" />
              <div className="dots-pattern absolute w-20 h-20 -right-4 -bottom-4 opacity-50" />
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-8xl font-bold text-primary/20">JD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
