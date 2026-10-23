import { useEffect, useState } from "react";
import SceneCanvas from "@/components/SceneCanvas";
import HeroPlatformer from "@/components/HeroPlatformer";
import { Button } from "@/components/ui/button";
import { PROJECTS, AWARDS, type Project } from "@/data/projects";

/* Thumbnail columns: keep the rows as even as possible (4 shots read better as 2x2 than 3+1). */
const COLS: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4 };
const colsFor = (n: number) => COLS[n] ?? 3;

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
        {p.shots[shown].p === "img" && p.shots[shown].fit === "contain" && (
          <img className="stage-blur" src={p.shots[shown].src} alt="" aria-hidden="true" />
        )}
        <SceneCanvas shot={p.shots[shown]} controls ariaLabel={p.shots[shown].p === "video" ? `${p.title} trailer` : `${p.title} screenshot ${shown + 1}`} style={{ opacity: fading ? 0 : 1 }} />
        <div className={`stage-in${p.shots[shown].p === "video" ? " hide" : ""}`}>
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
             {p.duration && <div><dt>Duration</dt><dd>{p.duration}</dd></div>}
            {p.tools && <div><dt>Tools</dt><dd>{p.tools}</dd></div>}
          </dl>
          <a className="btn primary proj-link" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel}</a>
        </div>
        <div className="shots" style={{ gridTemplateColumns: `repeat(${colsFor(p.shots.length)}, 1fr)` }}>
          {p.shots.map((s, i) => (
            <Button variant="ghost" key={i} type="button" className={`shot${s.p === "video" ? " video" : ""}`} aria-pressed={i === active} aria-label={s.p === "video" ? `Show ${p.title} trailer` : `Show ${p.title} screenshot ${i + 1}`} onClick={() => select(i)}>
              <SceneCanvas shot={s} />
            </Button>
          ))}
          <p className="shots-note">Select a shot to view it full size.</p>
        </div>
      </div>
      {p.did && p.did.length > 0 && <div className="wrap did">
        <h4 className="did-h">What I did</h4>
        {p.did.map((item) => <div className="item" key={item.title}>
          <div><span className="area">{item.area}</span><h5>{item.title}</h5></div>
          <dl className="steps">
            <div><dt>The goal</dt><dd>{item.goal}</dd></div>
            <div><dt>What I built</dt><dd>{item.built}</dd></div>
            <div><dt>The result</dt><dd>{item.result}</dd></div>
          </dl>
          {p.shots[item.shot] && <figure className="item-media"><div className="frame"><SceneCanvas shot={p.shots[item.shot]} ariaLabel={item.caption} /></div><figcaption>{item.caption}</figcaption></figure>}
        </div>)}
      </div>}
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

  return (
    <div className="pf">
      <header className={`bar${solid ? " solid" : ""}`}>
        <div className="wrap">
          <a className="mark" href="#top" aria-label="Ninad Dixit, back to top">ND</a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#awards">Awards</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="hero">
          <HeroPlatformer />
          <div className="hero-in">
            <div className="wrap">
              <div>
                <p className="role">Game developer, Unity and Unreal Engine</p>
                <h1><span>Ninad</span><span>Dixit</span></h1>
                <p className="lede">I build gameplay mechanics and design levels that are fun to move through. Fourth-year game development student.</p>
              </div>
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

        <section className="block awards" id="awards">
          <div className="wrap">
            <p className="awards-label">Achievements</p>
            <h2>Recognised<br />by the jury</h2>
            <ul className="award-list">
              {AWARDS.map((a) => {
                const head = a.category || a.ceremony;
                const sub = a.category ? `${a.ceremony} · ${a.game}` : a.game;
                return (
                  <li className="award" key={`${a.ceremony}-${a.result}`}>
                    <span className="award-mark" aria-hidden="true">{a.won ? "★" : "◆"}</span>
                    <div><h5>{head}</h5><p>{sub}</p></div>
                    <span className={`award-tag${a.won ? " win" : ""}`}>{a.result}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

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
          <SceneCanvas shot={{ p: "ember", seed: 11, fx: 0.5 }} />
          <div className="wrap">
            <h2>Let’s build<br />something</h2>
            <p>Looking for a teammate, a collaborator or an intern? Send me a message and I’ll get back to you soon.</p>
            <div className="links">
              <a className="btn primary" href="mailto:ninaddixit14@gmail.com">Email me</a>
              <a className="btn" href="tel:+916362860544">+91 6362860544</a>
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
