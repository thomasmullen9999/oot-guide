<script setup lang="ts">
import { RouterLink } from "vue-router";

const sections = [
  {
    to: "/walkthrough",
    icon: "📖",
    title: "Walkthrough",
    description:
      "A complete chapter-by-chapter guide from Kokiri Forest to Ganon's Castle.",
    cta: "Begin Journey",
  },
  {
    to: "/goldskulltulas",
    icon: "🕷️",
    title: "Gold Skulltulas",
    description:
      "Hunt down all 100 Gold Skulltula tokens hidden across every corner of Hyrule.",
    cta: "View Skulltulas",
  },
  {
    to: "/heartpieces",
    icon: "❤️",
    title: "Heart Pieces",
    description: "Collect all 36 heart pieces to maximise Link's life force.",
    cta: "View Heart Pieces",
  },
  {
    to: "/locations",
    icon: "🗺️",
    title: "Locations",
    description:
      "Every area in Hyrule documented — temples, villages, and hidden places.",
    cta: "Explore",
  },
  {
    to: "/items",
    icon: "🎒",
    title: "Items & Equipment",
    description: "A full index of weapons, tools, medallions, and upgrades.",
    cta: "Browse Items",
  },
  {
    to: "/stats",
    icon: "▲",
    title: "Your Progress",
    description:
      "Track your completion across skulltulas, heart pieces, and more.",
    cta: "View Stats",
  },
];
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">The Legend of Zelda</p>
        <h1 class="hero-title">Ocarina of Time</h1>
        <p class="hero-subtitle">HYRULE FIELD GUIDE</p>
        <p class="hero-desc">
          A complete companion for your journey through Hyrule. From the first
          steps in Kokiri Forest to the final battle against the King of Evil.
        </p>
        <div class="hero-actions">
          <RouterLink to="/walkthrough" class="btn-gold"
            >Begin Walkthrough</RouterLink
          >
          <RouterLink to="/stats" class="btn-ghost">View Progress</RouterLink>
        </div>
      </div>
    </section>

    <!-- Section grid -->
    <section class="sections">
      <div class="sections-inner">
        <div class="sections-grid">
          <RouterLink
            v-for="section in sections"
            :key="section.to"
            :to="section.to"
            class="section-card"
          >
            <div class="section-card-icon">{{ section.icon }}</div>
            <h3 class="section-card-title">{{ section.title }}</h3>
            <p class="section-card-desc">{{ section.description }}</p>
            <span class="section-card-cta">{{ section.cta }} →</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────────── */

.hero {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 6rem 2rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 168, 76, 0.12) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 50% 100%,
      rgba(61, 122, 90, 0.06) 0%,
      transparent 60%
    );
  pointer-events: none;
}

.hero-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  max-width: 680px;
  animation: heroFadeIn 0.8s ease both;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-eyebrow {
  font-family: "Cinzel", serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold-dim);
  margin-bottom: 1rem;
}

.hero-title {
  font-family: "Cinzel", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  color: var(--gold);
  letter-spacing: 0.05em;
  text-shadow: 0 0 60px rgba(201, 168, 76, 0.3);
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-family: "Cinzel", serif;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.hero-desc {
  font-family: "Crimson Text", serif;
  font-size: 1.15rem;
  color: var(--text-dim);
  font-style: italic;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Section cards ───────────────────────────────── */

.sections {
  padding: 5rem 2rem;
}

.sections-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.section-card {
  display: block;
  text-decoration: none;
  padding: 2rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
  animation: cardFadeIn 0.6s ease both;
}

.section-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(201, 168, 76, 0.04) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.section-card:hover {
  border-color: var(--gold-dim);
  transform: translateY(-3px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(201, 168, 76, 0.15);
}

.section-card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.section-card-title {
  font-family: "Cinzel", serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.section-card-desc {
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: var(--text-dim);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.section-card-cta {
  font-family: "Cinzel", serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-dim);
  transition: color 0.2s ease;
}

.section-card:hover .section-card-cta {
  color: var(--gold);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
