<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import HeartPiece from "@/components/HeartPiece.vue";
import { RouterLink } from "vue-router";
import { getHeartPieces } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { HeartPiece as HeartPieceType } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const { heartPiecesCount, heartPiecesPercent } = useProgress();

const heartPieces = ref<HeartPieceType[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>("");

const fetchHeartPieces = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    const params: { q?: string } = {};
    if (searchQuery.value) params.q = searchQuery.value;
    heartPieces.value = await getHeartPieces(params);
  } catch (e) {
    error.value = "Failed to load Heart Pieces. Is the server running?";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

let debounceTimer: ReturnType<typeof setTimeout>;
watch(searchQuery, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchHeartPieces, 300);
});

onMounted(fetchHeartPieces);
</script>

<template>
  <section class="list-section">
    <div class="list-inner">
      <h2 class="section-heading">Heart Pieces</h2>
      <p class="list-subtitle">Collect all 36 to maximise Link's life force</p>

      <!-- Progress -->
      <div class="progress-block">
        <div class="progress-label">
          <span class="progress-label-text">Heart Pieces Found</span>
          <span class="progress-label-count">{{ heartPiecesCount }} / 36</span>
        </div>
        <div class="oot-progress-track">
          <div
            class="oot-progress-fill heart-fill"
            :style="{ width: heartPiecesPercent + '%' }"
          ></div>
        </div>
      </div>

      <!-- Search -->
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          class="oot-input"
          placeholder="Search by location or description..."
        />
      </div>

      <p class="result-count" v-if="!isLoading">
        {{ heartPieces.length }} heart piece{{
          heartPieces.length !== 1 ? "s" : ""
        }}
        found
      </p>

      <div v-if="isLoading" class="state-block">
        <div class="spinner"></div>
        <p>Searching Hyrule...</p>
      </div>

      <div v-else-if="error" class="state-block state-block--error">
        {{ error }}
      </div>

      <template v-else>
        <div v-if="heartPieces.length > 0" class="cards-grid">
          <HeartPiece
            v-for="h in heartPieces.slice(0, limit || heartPieces.length)"
            :key="h.id"
            :HeartPiece="h"
          />
        </div>
        <div v-else class="state-block">No heart pieces match your search.</div>
      </template>
    </div>
  </section>

  <div v-if="showButton" class="view-all-block">
    <RouterLink to="/heartpieces" class="btn-gold"
      >View All Heart Pieces</RouterLink
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

.heart-fill {
  background: linear-gradient(90deg, #7a2020, var(--red-bright)) !important;
  box-shadow: 0 0 8px rgba(200, 50, 50, 0.4) !important;
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
