<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Location } from "@/types";
defineProps<{ Location: Location }>();
</script>

<template>
  <div v-if="Location" class="location-card">
    <div class="location-header">
      <h3 class="location-name">{{ Location.name }}</h3>
      <span class="location-icon">🗺️</span>
    </div>

    <hr class="gold-divider" />

    <p class="location-desc">{{ Location.description }}</p>

    <div class="location-footer">
      <RouterLink
        :to="'/locations/' + Location.id"
        class="btn-gold location-btn"
      >
        View Location
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.location-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.25rem;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.location-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.location-card:hover {
  border-color: var(--gold-dim);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.location-card:hover::before {
  opacity: 1;
}

.location-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.location-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--parchment);
  letter-spacing: 0.03em;
  line-height: 1.3;
}

.location-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(201, 168, 76, 0.3));
}

.location-desc {
  font-family: var(--font-ui);
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.7;
  flex: 1;
  /* clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.location-footer {
  margin-top: auto;
}

.location-btn {
  font-size: 0.75rem;
  padding: 0.45rem 1.1rem;
}
</style>
