import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Connect = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      link: "mailto:ninad.dixit@example.com", // User can update
      handle: "ninad.dixit@example.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "#", // User will add actual link
      handle: "linkedin.com/in/ninaddixit",
    },
    {
      name: "GitHub",
      icon: Github,
      link: "#",
      handle: "github.com/ninaddixit",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "#",
      handle: "@ninaddixit",
    },
  ];

  return (
    <section id="connect" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Let's Connect
          </span>
        </h2>
        <p className="text-xl text-center text-foreground/80 mb-12">
          Interested in collaboration or just want to chat about games? Feel free to reach out!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-card p-6 rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-glow-accent transition-all duration-300 group flex items-center gap-4"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {social.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{social.handle}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Connect;
