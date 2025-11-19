const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <div className="bg-gradient-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            I'm a passionate game developer currently in my third year of college, dedicated to crafting engaging and 
            innovative gaming experiences. My journey in game development has allowed me to work on diverse projects, 
            from fast-paced action games to strategic roguelikes.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            With expertise in both Unity and Unreal Engine, I specialize in implementing complex gameplay mechanics, 
            designing immersive levels, and creating intuitive user interfaces. I'm constantly learning and pushing 
            the boundaries of what's possible in interactive entertainment, combining technical proficiency with 
            creative vision to deliver memorable gaming experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
