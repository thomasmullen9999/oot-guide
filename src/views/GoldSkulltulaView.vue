<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { fetchSkulltulas } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { GoldSkulltula } from "@/types";

const route = useRoute();
const id = Number(route.params.id);

const { toggleSkulltula } = useProgress();

const allSkulltulas = ref<GoldSkulltula[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const skulltula = computed(() => allSkulltulas.value.find((s) => s.id === id));

onMounted(async () => {
  try {
    allSkulltulas.value = await fetchSkulltulas();
  } catch (e) {
    error.value = "Failed to load skulltula.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="view-wrapper">
    <RouterLink to="/goldskulltulas" class="back-link">
      ← Back to Gold Skulltulas
    </RouterLink>

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
    <div v-else-if="!skulltula" class="state-block state-block--error">
      Skulltula not found.
    </div>

    <!-- Content -->
    <template v-else>
      <div class="detail-layout">
        <main class="detail-main">
          <div class="oot-card detail-card">
            <div class="token-header">
              <span class="token-number">Token #{{ skulltula.id }}</span>
              <span class="oot-badge">{{ skulltula.location }}</span>
            </div>

            <hr class="gold-divider" />

            <h1 class="detail-title">{{ skulltula.location }}</h1>

            <p class="detail-description">{{ skulltula.description }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="detail-sidebar">
          <div class="oot-card detail-card">
            <h3 class="sidebar-heading">Progress</h3>
            <hr class="gold-divider" />
            <p class="sidebar-body">
              Mark this token as collected to track your progress toward the 100
              Gold Skulltulas reward.
            </p>
            <!--             <button
              @click="toggleSkulltula(id)"
              :class="['btn-gold', 'collect-btn', collected ? 'collected' : '']"
            >
              {{ collected ? "✓ Collected" : "Mark as Collected" }}
            </button> -->
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

.token-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.token-number {
  font-family: "Cinzel", serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  text-transform: uppercase;
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
  background: linear-gradient(135deg, var(--green), var(--green-bright));
  color: var(--midnight);
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
