<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

interface NavLink {
  to: string;
  label: string;
}

const route = useRoute();

const isActiveLink = (routePath: string): boolean => {
  if (routePath === "/") return route.path === "/";
  return route.path.startsWith(routePath);
};

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/walkthrough", label: "Walkthrough" },
  { to: "/goldskulltulas", label: "Skulltulas" },
  { to: "/heartpieces", label: "Heart Pieces" },
  { to: "/locations", label: "Locations" },
  { to: "/items", label: "Items" },
  { to: "/stats", label: "Progress" },
];
</script>

<template>
  <nav class="nav-root">
    <div class="nav-inner">
      <!-- Logo -->
      <RouterLink to="/" class="nav-brand">
        <span class="nav-brand-triforce">▲</span>
        <span class="nav-brand-text">Ocarina of Time</span>
        <span class="nav-brand-sub">HYRULE GUIDE</span>
      </RouterLink>

      <!-- Links -->
      <div class="nav-links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="['nav-link', isActiveLink(link.to) ? 'nav-link--active' : '']"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-root {
  background: var(--deep);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.nav-root::after {
  content: "";
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 2rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-brand-triforce {
  color: var(--gold);
  font-size: 1.4rem;
  line-height: 1;
  filter: drop-shadow(0 0 6px rgba(201, 168, 76, 0.6));
}

.nav-brand-text {
  font-family: "Cinzel", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.05em;
}

.nav-brand-sub {
  font-family: "Cinzel", serif;
  font-size: 0.5rem;
  color: var(--text-dim);
  letter-spacing: 0.2em;
  align-self: flex-end;
  margin-bottom: 2px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.nav-link {
  font-family: "Cinzel", serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  padding: 0.4rem 0.85rem;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--gold);
  border-color: var(--border);
  background: rgba(201, 168, 76, 0.05);
}

.nav-link--active {
  color: var(--gold);
  border-color: var(--gold-dim);
  background: rgba(201, 168, 76, 0.08);
}
</style>
