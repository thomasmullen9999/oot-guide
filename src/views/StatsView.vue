<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProgress } from "@/composables/useProgress";
import { fetchSkulltulas } from "@/services/api";
import { RouterLink } from "vue-router";
import type { GoldSkulltula } from "@/types";

const {
  skulltulasCount,
  heartPiecesCount,
  skulltulasPercent,
  heartPiecesPercent,
  completedSkulltulas,
  resetAll,
} = useProgress();

const allSkulltulas = ref<GoldSkulltula[]>([]);

const skulltulasPerLocation = computed(() => {
  const map: Record<string, { total: number; completed: number }> = {};
  for (const s of allSkulltulas.value) {
    if (!map[s.location]) map[s.location] = { total: 0, completed: 0 };
    map[s.location].total++;
    if (completedSkulltulas.value.includes(s.id)) map[s.location].completed++;
  }
  return Object.entries(map)
    .map(([location, data]) => ({ location, ...data }))
    .sort((a, b) => b.total - a.total);
});

const confirmReset = () => {
  if (confirm("Reset all progress? This cannot be undone.")) resetAll();
};

onMounted(async () => {
  allSkulltulas.value = await fetchSkulltulas();
});
</script>

<template>
  <section class="stats-section">
    <div class="stats-inner">
      <h2 class="section-heading">Your Progress</h2>
      <p class="stats-subtitle">
        Your journey across Hyrule, recorded in the annals of time
      </p>

      <!-- Summary -->
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-card-header">
            <span class="summary-card-label">Gold Skulltulas</span>
            <img
              src="@/assets/img/skulltulatoken.png"
              alt="token"
              class="summary-icon"
            />
          </div>
          <div class="summary-count">
            {{ skulltulasCount }}<span class="summary-total"> / 100</span>
          </div>
          <div class="oot-progress-track" style="margin-top: 1rem">
            <div
              class="oot-progress-fill"
              :style="{ width: skulltulasPercent + '%' }"
            ></div>
          </div>
          <p class="summary-percent">{{ skulltulasPercent }}% complete</p>
          <RouterLink to="/goldskulltulas" class="summary-link"
            >View Skulltulas →</RouterLink
          >
        </div>

        <div class="summary-card">
          <div class="summary-card-header">
            <span class="summary-card-label">Heart Pieces</span>
            <span class="summary-heart">❤️</span>
          </div>
          <div class="summary-count">
            {{ heartPiecesCount }}<span class="summary-total"> / 36</span>
          </div>
          <div class="oot-progress-track" style="margin-top: 1rem">
            <div
              class="oot-progress-fill heart-fill"
              :style="{ width: heartPiecesPercent + '%' }"
            ></div>
          </div>
          <p class="summary-percent">{{ heartPiecesPercent }}% complete</p>
          <RouterLink to="/heartpieces" class="summary-link"
            >View Heart Pieces →</RouterLink
          >
        </div>
      </div>

      <!-- Skulltulas by location -->
      <div class="location-breakdown">
        <h3 class="breakdown-title">Skulltulas by Location</h3>
        <div class="breakdown-list">
          <div
            v-for="row in skulltulasPerLocation"
            :key="row.location"
            class="breakdown-row"
          >
            <div class="breakdown-row-header">
              <span class="breakdown-location">{{ row.location }}</span>
              <span class="breakdown-fraction"
                >{{ row.completed }} / {{ row.total }}</span
              >
            </div>
            <div class="oot-progress-track" style="height: 4px">
              <div
                class="oot-progress-fill"
                :style="{ width: (row.completed / row.total) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reset -->
      <div class="reset-block">
        <button @click="confirmReset" class="reset-btn">
          Reset all progress
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 4rem 2rem;
  min-height: 80vh;
}

.stats-inner {
  max-width: 860px;
  margin: 0 auto;
}

.stats-subtitle {
  font-family: "Crimson Text", serif;
  font-style: italic;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: 3rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

.summary-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
}

.summary-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
}

.summary-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.summary-card-label {
  font-family: "Cinzel", serif;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.summary-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(201, 168, 76, 0.4));
}

.summary-heart {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 6px rgba(200, 50, 50, 0.5));
}

.summary-count {
  font-family: "Cinzel", serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}

.summary-total {
  font-size: 1.2rem;
  color: var(--text-dim);
}

.summary-percent {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  margin-top: 0.5rem;
}

.summary-link {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--gold-dim);
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
  transition: color 0.2s;
}

.summary-link:hover {
  color: var(--gold);
}

.heart-fill {
  background: linear-gradient(90deg, #7a2020, var(--red-bright)) !important;
  box-shadow: 0 0 8px rgba(200, 50, 50, 0.4) !important;
}

.location-breakdown {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.75rem;
  margin-bottom: 2rem;
}

.breakdown-title {
  font-family: "Cinzel", serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.5rem;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breakdown-row-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.breakdown-location {
  font-family: "Crimson Text", serif;
  font-size: 0.95rem;
  color: var(--text);
}

.breakdown-fraction {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  color: var(--text-dim);
  letter-spacing: 0.05em;
}

.reset-block {
  text-align: center;
  padding-top: 1rem;
}

.reset-btn {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.reset-btn:hover {
  color: var(--red-bright);
}
</style>
