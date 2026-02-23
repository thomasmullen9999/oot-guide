<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import { RouterLink } from "vue-router";
import { fetchItems } from "@/services/api";
import type { Item } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const allItems = ref<Item[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const selectedCategory = ref<string>("All");

const categories = computed<string[]>(() => {
  const cats = [...new Set(allItems.value.map((i) => i.category))].sort();
  return ["All", ...cats];
});

const filteredItems = computed(() => {
  return selectedCategory.value === "All"
    ? allItems.value
    : allItems.value.filter((i) => i.category === selectedCategory.value);
});

const loadItems = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    allItems.value = await fetchItems();
  } catch (e) {
    error.value = "Failed to load Items.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadItems);
</script>

<template>
  <section class="list-section">
    <div class="list-inner">
      <h2 class="section-heading">Items</h2>
      <p class="list-subtitle">
        Every weapon, tool and treasure in Link's arsenal
      </p>

      <!-- Category filters -->
      <div class="filter-row">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['btn-ghost', selectedCategory === cat ? 'active' : '']"
        >
          {{ cat }}
        </button>
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
          {{ filteredItems.length }} item{{
            filteredItems.length !== 1 ? "s" : ""
          }}
          found
        </p>
        <div v-if="filteredItems.length > 0" class="cards-grid">
          <ItemCard
            v-for="item in filteredItems.slice(
              0,
              limit || filteredItems.length,
            )"
            :key="item.id"
            :Item="item"
          />
        </div>
        <div v-else class="state-block">No items match your selection.</div>
      </template>
    </div>
  </section>

  <div v-if="showButton" class="view-all-block">
    <RouterLink to="/items" class="btn-gold">View All Items</RouterLink>
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
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2rem;
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
