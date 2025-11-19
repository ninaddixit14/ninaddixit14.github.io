import { ExternalLink, FileText } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "WTC, What The Creature!",
      description: "A 2.5D roguelike survivor game with 25+ unique ability cards to play with. Features dynamic gameplay with diverse card combinations and strategic depth.",
      tags: ["Roguelike", "Unity", "Game Design"],
      link: "#", // User will add actual link
    },
    {
      title: "Malloc",
      description: "Fast-paced prototype game developed in Unreal Engine during a game jam. Showcases rapid prototyping skills and creative problem-solving under time constraints.",
      tags: ["Unreal Engine", "Game Jam", "Prototype"],
      link: "#",
    },
    {
      title: "Russ, Fight the Power",
      description: "Current project in development during college studies. An ambitious title exploring innovative gameplay mechanics and narrative design.",
      tags: ["In Development", "Unity", "Narrative Design"],
      link: "#",
    },
    {
      title: "Documents",
      description: "Collection of game design documents, technical documentation, and research papers developed throughout my academic journey.",
      tags: ["Documentation", "Game Design", "Research"],
      link: "#",
      isDocument: true,
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-card p-6 rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-glow-accent transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.isDocument ? (
                  <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                ) : (
                  <ExternalLink className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                {project.isDocument ? "View Documents" : "View Project"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
