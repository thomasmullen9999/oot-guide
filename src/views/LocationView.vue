<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { fetchLocations } from "@/services/api";
import type { Location } from "@/types";

const route = useRoute();
const allLocations = ref<Location[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const location = computed(() =>
  allLocations.value.find((l) => l.id === Number(route.params.id)),
);

onMounted(async () => {
  try {
    allLocations.value = await fetchLocations();
  } catch (e) {
    error.value = "Failed to load location.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="view-wrapper">
    <RouterLink to="/locations" class="back-link"
      >← Back to Locations</RouterLink
    >

    <!-- Loading -->
    <div v-if="isLoading" class="state-block">
      <div class="spinner"></div>
      <p>Searching Hyrule...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-block state-block--error">
      {{ error }}
    </div>

    <!-- Not found -->
    <div v-else-if="!location" class="state-block state-block--error">
      Location not found.
    </div>

    <!-- Content -->
    <template v-else>
      <div class="oot-card detail-card">
        <div class="location-header">
          <h1 class="detail-title">{{ location.name }}</h1>
          <span class="location-icon">🗺️</span>
        </div>

        <hr class="gold-divider" />

        <p class="detail-description">{{ location.description }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.view-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.back-link {
  font-family: "Cinzel", serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--gold);
}

.detail-card {
  padding: 2rem;
}

.location-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.detail-title {
  font-family: "Cinzel", serif;
  font-size: 1.75rem;
  color: var(--parchment);
}

.location-icon {
  font-size: 1.75rem;
  filter: drop-shadow(0 0 6px rgba(201, 168, 76, 0.3));
}

.detail-description {
  font-family: "Crimson Text", serif;
  font-size: 1.1rem;
  color: var(--text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.detail-subheading {
  font-family: "Cinzel", serif;
  font-size: 0.85rem;
  color: var(--gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.detail-body {
  font-family: "Crimson Text", serif;
  font-size: 1.05rem;
  color: var(--text);
  margin-bottom: 1.5rem;
}

.state-block {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-dim);
  font-family: "Crimson Text", serif;
  font-style: italic;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.state-block--error {
  color: var(--red-bright);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
