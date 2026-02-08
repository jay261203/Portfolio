import { motion } from "framer-motion";
import { Wrench, Brain, Code, Layout, Server, Database, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI and ML",
    icon: Brain,
    skills: ["Tensorflow", "HuggingFace", "Langchain", "Langgraph", "OpenCV", "Vector DB"],
  },
  {
    title: "Languages",
    icon: Code,
    skills: ["Python", "JavaScript", "C", "SQL"],
  },
  {
    title: "Front End",
    icon: Layout,
    skills: ["HTML", "CSS", "JavaScript", "React JS"],
  },
  {
    title: "Back End",
    icon: Server,
    skills: ["Flask", "FastAPI", "Django", "Node.js", "Express.js"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "Redis", "Qdrant", "Chroma"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "GCP", "Docker", "Git", "Linux"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title mb-12 flex items-center gap-3"
        >
          <Wrench className="w-6 h-6 text-primary" />
          skills
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-foreground transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
