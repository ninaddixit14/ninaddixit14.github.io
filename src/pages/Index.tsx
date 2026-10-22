import { useEffect, useState } from "react";
import SceneCanvas from "@/components/SceneCanvas";
import { PROJECTS, type Project } from "@/data/projects";

const HERO_SHOT = { p: "dusk", seed: 7, sun: 0.7 } as const;

const ProjectSection = ({ p }: { p: Project }) => {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setFading(true);
    setTimeout(() => { setShown(i); setFading(false); }, 220);
  };

  return (
    <article className="proj" id={p.id}>
      <div className="stage">
        <SceneCanvas shot={p.shots[shown]} ariaLabel={`${p.title} screenshot ${shown + 1}`} style={{ opacity: fading ? 0 : 1 }} />
        <div className="stage-in">
          <div className="wrap">
            <div className="meta">
              {p.year && <span className="pill">{p.year}</span>}
              <span className="pill">{p.engine}</span>
            </div>
            <h3>{p.title}</h3>
            <p className="tagline">{p.tagline}</p>
          </div>
        </div>
      </div>
      <div className="wrap proj-body">
        <div>
          <p>{p.text}</p>
          <dl className="facts">
            {p.role && <div><dt>Role</dt><dd>{p.role}</dd></div>}
            {p.team && <div><dt>Team</dt><dd>{p.team}</dd></div>}
            {p.tools && <div><dt>Tools</dt><dd>{p.tools}</dd></div>}
          </dl>
          <a className="btn primary proj-link" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel}</a>
        </div>
        <div className="shots">
          {p.shots.map((s, i) => (
            <button key={i} type="button" className="shot" aria-pressed={i === active} aria-label={`Show ${p.title} screenshot ${i + 1}`} onClick={() => select(i)}>
              <SceneCanvas shot={s} />
            </button>
          ))}
          <p className="shots-note">Select a shot to view it full size.</p>
        </div>
      </div>
    </article>
  );
};

const Index = () => {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const featured = PROJECTS[0];

  return (
    <div className="pf">
      <header className={`bar${solid ? " solid" : ""}`}>
        <div className="wrap">
          <a className="mark" href="#top" aria-label="Ninad Dixit, back to top">ND</a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="hero">
          <SceneCanvas shot={HERO_SHOT} animate className="hero-canvas" />
          <div className="hero-in">
            <div className="wrap">
              <div>
                <p className="role">Game developer, Unity and Unreal Engine</p>
                <h1><span>Ninad</span><span>Dixit</span></h1>
                <p className="lede">I build gameplay mechanics and design levels that are fun to move through. Fourth-year game development student.</p>
              </div>
              <a className="now" href={`#${featured.id}`}>
                <div className="th"><SceneCanvas shot={featured.shots[0]} /></div>
                <div><small>Featured project</small><b>{featured.title}</b></div>
              </a>
            </div>
          </div>
        </section>

        <section className="index" id="work" aria-label="All projects">
          <div className="wrap index-grid">
            {PROJECTS.map((p) => (
              <a key={p.id} className="tile" href={`#${p.id}`}>
                <SceneCanvas shot={p.shots[0]} />
                <span><b>{p.title}</b><i>{p.engine}</i></span>
              </a>
            ))}
          </div>
        </section>

        <div>{PROJECTS.map((p) => <ProjectSection key={p.id} p={p} />)}</div>

        <section className="block" id="about">
          <div className="wrap about">
            <h2>I design how a game feels to play</h2>
            <div className="about-copy">
              <p>I’m a fourth-year game development student. My favourite part of the job is the moment a mechanic stops being an idea and starts being fun to repeat, and the moment a space teaches a player what to do without a tutorial.</p>
              <p>I work in both Unity and Unreal Engine and prototype fast, so ideas get in front of real players early.</p>
              <dl className="skills">
                <div className="row"><dt>Engines</dt><dd><span className="chip">Unity</span><span className="chip">Unreal Engine</span></dd></div>
                <div className="row"><dt>Languages</dt><dd><span className="chip">C#</span><span className="chip">C++</span></dd></div>
                <div className="row"><dt>Craft</dt><dd><span className="chip">Level design</span><span className="chip">Game mechanics</span><span className="chip">Game engine UI/UX</span></dd></div>
                <div className="row"><dt>Tools</dt><dd><span className="chip">Git</span><span className="chip">Diversion</span><span className="chip">Visual Studio</span><span className="chip">Photoshop</span></dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <SceneCanvas shot={PROJECTS[1].shots[1]} />
          <div className="wrap">
            <h2>Let’s build<br />something</h2>
            <p>Looking for a teammate, a collaborator or an intern? Send me a message and I’ll get back to you soon.</p>
            <div className="links">
              <a className="btn primary" href="mailto:ninaddixit14@gmail.com">Email me</a>
              <a className="btn" href="tel:+916362860544">+91 6362860544</a>
              <a className="btn" href="https://github.com/ninaddixit14" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="btn" href="https://www.linkedin.com/in/ninaddixit14/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn" href="https://drive.google.com/file/d/1H0AuOV5-Cp8l4yrSkn9qcQUQ68V7h5mH/view?usp=drive_link" target="_blank" rel="noopener noreferrer">View My Resume</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap"><span>© {new Date().getFullYear()} Ninad Dixit</span><span>Built for players</span></div>
      </footer>
    </div>
  );
};

export default Index;
