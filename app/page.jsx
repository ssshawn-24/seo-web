"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  Flower2,
  Leaf,
  Mail,
  MapPin,
  Moon,
  Sparkles,
  SunMedium,
  Wind,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1800&q=85";

const practices = [
  {
    name: "Vinyasa",
    time: "Morning flow",
    detail: "Fluid sequences paced by breath, warmth, and steady attention.",
    icon: SunMedium,
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Yin",
    time: "Late afternoon",
    detail: "Long-held floor shapes for connective tissue, patience, and quiet release.",
    icon: Moon,
    image:
      "https://images.unsplash.com/photo-1599447292461-66aa19cf3166?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Restorative",
    time: "Evening reset",
    detail: "Supported postures, blankets, bolsters, and a nervous-system exhale.",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Breathwork",
    time: "Weekly circle",
    detail: "Simple practices for spacious lungs, softer focus, and emotional steadiness.",
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
  },
];

const teachers = [
  {
    name: "Mara Chen",
    focus: "Restorative, breathwork",
    quote:
      "I teach because softness is a skill, and people deserve a room where nothing has to be proven.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Elena Ruiz",
    focus: "Vinyasa, mobility",
    quote:
      "I teach to help movement feel less like performance and more like coming home to the body.",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Noah Patel",
    focus: "Yin, meditation",
    quote:
      "I teach the quiet practices because stillness can be brave, practical, and deeply kind.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  },
];

const schedule = [
  {
    day: "Mon",
    date: "07",
    className: "Soft Vinyasa",
    time: "7:30 AM",
    seats: 6,
    room: "Sun Room",
    level: "All levels, bring a light layer.",
  },
  {
    day: "Tue",
    date: "08",
    className: "Yin for Hips",
    time: "6:00 PM",
    seats: 3,
    room: "Garden Room",
    level: "Beginner-friendly, props provided.",
  },
  {
    day: "Wed",
    date: "09",
    className: "Restorative Reset",
    time: "7:15 PM",
    seats: 8,
    room: "Still Room",
    level: "Quiet practice, no experience needed.",
  },
  {
    day: "Thu",
    date: "10",
    className: "Breathwork Circle",
    time: "6:30 PM",
    seats: 5,
    room: "Garden Room",
    level: "Avoid heavy meals two hours prior.",
  },
  {
    day: "Sat",
    date: "12",
    className: "Slow Morning Flow",
    time: "9:00 AM",
    seats: 2,
    room: "Sun Room",
    level: "Some flow experience helpful.",
  },
];

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function useFirstScrollChime() {
  const [enabled, setEnabled] = useState(false);
  const playedRef = useRef(false);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const playChime = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const audioContext = contextRef.current || new AudioContext();
      contextRef.current = audioContext;

      const now = audioContext.currentTime;
      const notes = [523.25, 659.25, 783.99];

      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.045, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.9);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(now + index * 0.08);
        oscillator.stop(now + index * 0.08 + 0.95);
      });
    };

    window.addEventListener("scroll", playChime, { passive: true, once: true });

    return () => window.removeEventListener("scroll", playChime);
  }, [enabled]);

  return { enabled, setEnabled, played: playedRef.current };
}

function TeacherQuote({ quote }) {
  const [typed, setTyped] = useState(quote);
  const intervalRef = useRef(null);

  const typeQuote = () => {
    window.clearInterval(intervalRef.current);
    setTyped("");
    let index = 0;

    intervalRef.current = window.setInterval(() => {
      index += 1;
      setTyped(quote.slice(0, index));

      if (index >= quote.length) {
        window.clearInterval(intervalRef.current);
      }
    }, 18);
  };

  useEffect(() => () => window.clearInterval(intervalRef.current), []);

  return (
    <p
      className="teacher-quote"
      onMouseEnter={typeQuote}
      onFocus={typeQuote}
      tabIndex={0}
      aria-label={quote}
    >
      {typed}
      <span className="quote-caret" aria-hidden="true" />
    </p>
  );
}

function ScheduleRow({ item, isOpen, onToggle }) {
  return (
    <button
      type="button"
      className={`schedule-row ${isOpen ? "is-open" : ""}`}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="schedule-date">
        <span>{item.day}</span>
        <strong>{item.date}</strong>
      </span>
      <span className="schedule-main">
        <span className="schedule-name">{item.className}</span>
        <span className="schedule-meta">{item.time}</span>
        <span className="schedule-extra">
          <MapPin size={15} strokeWidth={1.7} />
          {item.room}
          <span>{item.level}</span>
        </span>
      </span>
      <span className="seat-pill">{item.seats} seats</span>
      <ChevronDown className="schedule-chevron" size={20} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}

export default function Home() {
  const [openSchedule, setOpenSchedule] = useState(0);
  const { enabled, setEnabled } = useFirstScrollChime();
  useRevealOnScroll();

  return (
    <main>
      <section className="hero viewport-section">
        <div className="hero-visual image-zoom" aria-hidden="true">
          <img src={heroImage} alt="" />
          <span className="sunbeam sunbeam-one" />
          <span className="sunbeam sunbeam-two" />
        </div>

        <nav className="topbar" aria-label="Primary navigation">
          <a href="#hero" className="brand-mark" aria-label="Stillroom Yoga home">
            <Flower2 size={22} strokeWidth={1.7} />
            <span>Stillroom Yoga</span>
          </a>
          <div className="nav-links">
            <a href="#practices">Practices</a>
            <a href="#teachers">Teachers</a>
            <a href="#schedule">Schedule</a>
          </div>
          <button
            type="button"
            className={`chime-button ${enabled ? "is-enabled" : ""}`}
            onClick={() => setEnabled(true)}
            aria-pressed={enabled}
            aria-label="Enable first-scroll chime"
            title="Enable first-scroll chime"
          >
            <Bell size={18} strokeWidth={1.7} />
          </button>
        </nav>

        <div className="hero-content" id="hero">
          <p className="eyebrow" data-reveal>
            Boutique studio for slower strength
          </p>
          <h1 data-reveal>Stillroom Yoga</h1>
          <p className="hero-copy" data-reveal>
            Warm morning classes, candlelit evenings, and a practice culture built around breath
            instead of burnout.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="primary-cta" href="#free-class">
              Book your first class
              <ArrowRight size={18} strokeWidth={1.8} />
            </a>
            <span className="quiet-note">First visit is free</span>
          </div>
        </div>
      </section>

      <section className="intro viewport-section">
        <div className="section-kicker" data-reveal>
          <Leaf size={19} strokeWidth={1.7} />
          <span>Grounded by design</span>
        </div>
        <h2 data-reveal>One quiet room, a little sunlight, and enough space to listen.</h2>
        <p data-reveal>
          Our studio keeps classes small, pacing humane, and props within reach. Arrive as you are;
          we will meet the day from there.
        </p>
      </section>

      <section className="practices viewport-section" id="practices">
        <div className="section-heading">
          <p className="eyebrow" data-reveal>
            Practices
          </p>
          <h2 data-reveal>Choose the tempo your body is asking for.</h2>
        </div>
        <div className="practice-grid">
          {practices.map((practice) => {
            const Icon = practice.icon;

            return (
              <article className="practice-card" key={practice.name} data-reveal>
                <div className="practice-image image-zoom">
                  <img src={practice.image} alt={`${practice.name} yoga practice`} />
                </div>
                <div className="practice-content">
                  <Icon size={24} strokeWidth={1.6} />
                  <div>
                    <h3>{practice.name}</h3>
                    <p className="practice-time">{practice.time}</p>
                  </div>
                </div>
                <p>{practice.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="teachers viewport-section" id="teachers">
        <div className="section-heading">
          <p className="eyebrow" data-reveal>
            Teachers
          </p>
          <h2 data-reveal>Guidance with personality, patience, and lived practice.</h2>
        </div>
        <div className="teacher-grid">
          {teachers.map((teacher) => (
            <article className="teacher-card" key={teacher.name} data-reveal>
              <div className="teacher-photo image-zoom">
                <img src={teacher.image} alt={`${teacher.name}, yoga teacher`} />
              </div>
              <div className="teacher-copy">
                <p className="teacher-focus">{teacher.focus}</p>
                <h3>{teacher.name}</h3>
                <TeacherQuote quote={teacher.quote} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="schedule viewport-section" id="schedule">
        <div className="schedule-shell">
          <div className="section-heading">
            <p className="eyebrow" data-reveal>
              This week
            </p>
            <h2 data-reveal>Small classes, visible openings, no rushing at the door.</h2>
          </div>
          <div className="calendar-panel" data-reveal>
            <div className="calendar-header">
              <CalendarDays size={23} strokeWidth={1.6} />
              <div>
                <h3>June studio calendar</h3>
                <p>Seat counts update as the room fills.</p>
              </div>
            </div>
            <div className="schedule-list">
              {schedule.map((item, index) => (
                <ScheduleRow
                  key={`${item.day}-${item.className}`}
                  item={item}
                  isOpen={openSchedule === index}
                  onToggle={() => setOpenSchedule(openSchedule === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="free-class viewport-section" id="free-class">
        <div className="form-visual image-zoom" data-reveal>
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=82"
            alt="Morning yoga class in warm studio light"
          />
        </div>
        <form className="signup-form" data-reveal>
          <p className="eyebrow">First class free</p>
          <h2>Begin with one unhurried visit.</h2>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            Practice interest
            <select name="practice" defaultValue="">
              <option value="" disabled>
                Choose a practice
              </option>
              <option>Vinyasa</option>
              <option>Yin</option>
              <option>Restorative</option>
              <option>Breathwork</option>
            </select>
          </label>
          <button type="submit">
            <Mail size={18} strokeWidth={1.8} />
            Reserve the free class
          </button>
          <p className="form-note">
            We reply with a class match, arrival details, and anything worth bringing.
          </p>
        </form>
      </section>

      <footer>
        <span>Stillroom Yoga</span>
        <span>24 Sage Lane, open windows above the courtyard</span>
        <span>hello@stillroom.yoga</span>
      </footer>
    </main>
  );
}
