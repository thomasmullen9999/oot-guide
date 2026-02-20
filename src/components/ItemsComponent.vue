<script setup>
import { reactive, computed, ref } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import itemsData from "@/data/items.json";

defineProps({
  limit: Number,
  showButton: { type: Boolean, default: false },
});

const state = reactive({ items: itemsData.items });
const selectedCategory = ref("All");

const categories = computed(() => {
  const cats = [...new Set(state.items.map((i) => i.category))];
  return ["All", ...cats];
});

const filteredItems = computed(() =>
  selectedCategory.value === "All"
    ? state.items
    : state.items.filter((i) => i.category === selectedCategory.value),
);
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-600 mb-6 text-center">Items</h2>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 hover:bg-blue-100',
            'px-4 py-1 rounded-full text-sm border border-blue-200 transition',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ItemCard v-for="item in filteredItems" :key="item.id" :Item="item" />
      </div>
    </div>
  </section>
</template>
