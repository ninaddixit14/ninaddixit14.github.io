import profilePhoto from "@/assets/profile-photo.jpg";
const Hero = () => {
  return <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-primary rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <img src={profilePhoto} alt="Ninad Dixit - Game Developer" className="relative w-64 h-64 rounded-full object-cover border-4 border-primary/20" />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Ninad Dixit
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                Game Developer & Designer
              </p>
            </div>
            <p className="text-lg text-foreground/80 max-w-xl">Passionate about creating immersive gaming experiences. Specializing in gameplay mechanics, level design, and bringing creative visions to life.
          </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#projects" className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:shadow-glow-primary transition-all duration-300 hover:scale-105">
                View Projects
              </a>
              <a href="#connect" className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold border border-primary/20 hover:border-primary transition-all duration-300 hover:scale-105">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;