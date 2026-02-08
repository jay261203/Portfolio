import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Car Parking Space Detector",
    description:
      "AI-powered system that automatically identifies available parking spots in real-time using computer vision techniques.",
    tags: ["Python", "Tensorflow", "Keras", "OpenCV"],
    category: "ai",
  },
  {
    title: "BlogsByMe",
    description:
      "Full-stack blogging platform with user authentication, password reset, blog management, and dynamic content rendering.",
    tags: ["HTML", "CSS", "JavaScript", "Django"],
    category: "web",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="section-title flex items-center gap-3">
            <FolderOpen className="w-6 h-6 text-primary" />
            projects
          </h2>
          <a href="#" className="link-underline text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
            View all <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-lg overflow-hidden group"
            >
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80">
                  <div className="flex gap-4">
                    <Button size="icon" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <Button variant="outline" size="sm" className="group/btn">
                  View Code
                  <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
