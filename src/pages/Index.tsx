import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Connect from "@/components/Connect";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Connect />
      </main>
      <footer className="py-8 text-center text-foreground/60 border-t border-primary/10">
        <p>© 2024 Ninad Dixit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
