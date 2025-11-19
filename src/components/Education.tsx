import { GraduationCap } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <div className="bg-gradient-card p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Bachelor's Degree in Game Development
              </h3>
              <p className="text-primary font-semibold mb-3">
                Currently in 3rd Year
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Pursuing comprehensive education in game development, covering game design theory, 
                programming, 3D graphics, animation, and interactive media. Active participant in 
                game jams and collaborative projects, consistently applying theoretical knowledge 
                to practical game development scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
