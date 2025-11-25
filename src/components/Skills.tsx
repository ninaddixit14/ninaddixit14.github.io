import { Code, Gamepad2, Wrench, Palette } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Game Engines",
      icon: Gamepad2,
      skills: ["Unity", "Unreal Engine"],
    },
    {
      title: "Programming",
      icon: Code,
      skills: ["C#", "C++"],
    },
    {
      title: "Game Design",
      icon: Palette,
      skills: ["Level Design", "Game Mechanics", "Game engine UI/UX"],
    },
    {
      title: "Tools & Tech",
      icon: Wrench,
      skills: ["Git", "Diversion", "Visual Studio", "Photoshop"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-gradient-card p-6 rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-glow-accent transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 bg-secondary/50 rounded-lg text-foreground/90 text-sm hover:bg-secondary transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
