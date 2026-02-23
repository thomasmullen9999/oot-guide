<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import LocationCard from "@/components/LocationCard.vue";
import { RouterLink } from "vue-router";
import { fetchLocations } from "@/services/api";
import type { Location } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const allLocations = ref<Location[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>("");

const locations = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return allLocations.value;
  return allLocations.value.filter(
    (l) =>
      l.name?.toLowerCase().includes(q) ||
      l.description?.toLowerCase().includes(q),
  );
});

const loadLocations = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    allLocations.value = await fetchLocations();
  } catch (e) {
    error.value = "Failed to load Locations.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadLocations);
</script>

<template>
  <section class="list-section">
    <div class="list-inner">
      <h2 class="section-heading">Locations</h2>
      <p class="list-subtitle">
        Every region, dungeon and hidden corner of Hyrule
      </p>

      <!-- Search -->
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          class="oot-input"
          placeholder="Search locations..."
        />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="state-block">
        <div class="spinner"></div>
        <p>Searching Hyrule...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-block state-block--error">
        {{ error }}
      </div>

      <!-- Grid -->
      <template v-else>
        <p class="result-count">
          {{ locations.length }} location{{
            locations.length !== 1 ? "s" : ""
          }}
          found
        </p>
        <div v-if="locations.length > 0" class="cards-grid">
          <LocationCard
            v-for="location in locations.slice(0, limit || locations.length)"
            :key="location.id"
            :Location="location"
          />
        </div>
        <div v-else class="state-block">No locations match your search.</div>
      </template>
    </div>
  </section>

  <div v-if="showButton" class="view-all-block">
    <RouterLink to="/locations" class="btn-gold">View All Locations</RouterLink>
  </div>
</template>

<style scoped>
.list-section {
  padding: 4rem 2rem;
  min-height: 60vh;
}

.list-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.list-subtitle {
  font-family: "Crimson Text", serif;
  font-style: italic;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: 2.5rem;
}

.filter-row {
  margin-bottom: 1.5rem;
}

.result-count {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
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

.view-all-block {
  text-align: center;
  padding: 2rem;
}
</style>
