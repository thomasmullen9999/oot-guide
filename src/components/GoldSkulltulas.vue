<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import GoldSkulltula from "@/components/GoldSkulltula.vue";
import { RouterLink } from "vue-router";
import { getSkulltulas } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { GoldSkulltula as GoldSkulltulaType } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const { skulltulasCount, skulltulasPercent } = useProgress();

const skulltulas = ref<GoldSkulltulaType[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>("");
const selectedLocation = ref<string>("All");

const locations = computed<string[]>(() => {
  const locs = [...new Set(skulltulas.value.map((s) => s.location))].sort();
  return ["All", ...locs];
});

const fetchSkulltulas = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    const params: { q?: string; location?: string } = {};
    if (searchQuery.value) params.q = searchQuery.value;
    if (selectedLocation.value !== "All")
      params.location = selectedLocation.value;
    skulltulas.value = await getSkulltulas(params);
  } catch (e) {
    error.value = "Failed to load Gold Skulltulas. Is the server running?";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

let debounceTimer: ReturnType<typeof setTimeout>;
watch([searchQuery, selectedLocation], () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchSkulltulas, 300);
});

onMounted(fetchSkulltulas);
</script>

<template>
  <section class="list-section">
    <div class="list-inner">
      <h2 class="section-heading">Gold Skulltulas</h2>
      <p class="list-subtitle">Hunt down all 100 tokens hidden across Hyrule</p>

      <!-- Progress -->
      <div class="progress-block">
        <div class="progress-label">
          <span class="progress-label-text">Tokens Collected</span>
          <span class="progress-label-count">{{ skulltulasCount }} / 100</span>
        </div>
        <div class="oot-progress-track">
          <div
            class="oot-progress-fill"
            :style="{ width: skulltulasPercent + '%' }"
          ></div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          class="oot-input"
          placeholder="Search by location, description or number..."
        />
        <select
          v-model="selectedLocation"
          class="oot-input"
          style="flex: 0 0 220px"
        >
          <option v-for="loc in locations" :key="loc" :value="loc">
            {{ loc }}
          </option>
        </select>
      </div>

      <!-- Count -->
      <p class="result-count" v-if="!isLoading">
        {{ skulltulas.length }} skulltula{{
          skulltulas.length !== 1 ? "s" : ""
        }}
        found
      </p>

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
        <div v-if="skulltulas.length > 0" class="cards-grid">
          <GoldSkulltula
            v-for="s in skulltulas.slice(0, limit || skulltulas.length)"
            :key="s.id"
            :GoldSkulltula="s"
          />
        </div>
        <div v-else class="state-block">No skulltulas match your search.</div>
      </template>
    </div>
  </section>

  <div v-if="showButton" class="view-all-block">
    <RouterLink to="/goldskulltulas" class="btn-gold"
      >View All Skulltulas</RouterLink
    >
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

.progress-block {
  max-width: 480px;
  margin: 0 auto 2.5rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label-text {
  font-family: "Cinzel", serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.progress-label-count {
  font-family: "Cinzel", serif;
  font-size: 0.65rem;
  color: var(--gold);
}

.filter-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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
