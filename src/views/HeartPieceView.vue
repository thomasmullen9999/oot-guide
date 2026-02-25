<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { fetchHeartPieces } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { HeartPiece } from "@/types";

const route = useRoute();
const allHeartPieces = ref<HeartPiece[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const { isHeartPieceComplete, toggleHeartPiece } = useProgress();

const heartPiece = computed(() =>
  allHeartPieces.value.find((h) => h.id === Number(route.params.id)),
);

const isComplete = computed(() =>
  heartPiece.value ? isHeartPieceComplete(heartPiece.value.id) : false,
);

onMounted(async () => {
  try {
    allHeartPieces.value = await fetchHeartPieces();
  } catch (e) {
    error.value = "Failed to load heart piece.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="view-wrapper">
    <RouterLink to="/heartpieces" class="back-link"
      >← Back to Heart Pieces</RouterLink
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
    <div v-else-if="!heartPiece" class="state-block state-block--error">
      Heart piece not found.
    </div>

    <!-- Content -->
    <template v-else>
      <div class="detail-layout">
        <main class="detail-main">
          <div class="oot-card detail-card">
            <div class="piece-header">
              <span class="piece-number"
                >Heart Piece #{{ String(heartPiece.id).padStart(2, "0") }}</span
              >
              <span class="piece-icon">❤️</span>
            </div>

            <hr class="gold-divider" />

            <h1 class="detail-title">{{ heartPiece.location }}</h1>

            <p class="detail-description">{{ heartPiece.description }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="detail-sidebar">
          <div class="oot-card detail-card">
            <h3 class="sidebar-heading">Progress</h3>
            <hr class="gold-divider" />
            <p class="sidebar-body">
              Mark this heart piece as collected to track your progress toward
              Link's maximum life force.
            </p>
            <button
              @click="toggleHeartPiece(heartPiece.id)"
              :class="[
                'btn-gold',
                'collect-btn',
                isComplete ? 'collected' : '',
              ]"
            >
              {{ isComplete ? "✓ Found" : "Mark as Found" }}
            </button>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped>
.view-wrapper {
  max-width: 1100px;
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

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}

.detail-card {
  padding: 2rem;
}

.piece-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.piece-number {
  font-family: "Cinzel", serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  text-transform: uppercase;
}

.piece-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 6px rgba(200, 50, 50, 0.5));
}

.detail-title {
  font-family: "Cinzel", serif;
  font-size: 1.75rem;
  color: var(--parchment);
  margin-bottom: 1rem;
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

.sidebar-heading {
  font-family: "Cinzel", serif;
  font-size: 1rem;
  color: var(--parchment);
  margin-bottom: 0.5rem;
}

.sidebar-body {
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: var(--text-dim);
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.collect-btn {
  width: 100%;
  text-align: center;
  padding: 0.75rem;
}

.collect-btn.collected {
  background: linear-gradient(135deg, #7a2020, var(--red-bright));
  color: var(--parchment);
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
