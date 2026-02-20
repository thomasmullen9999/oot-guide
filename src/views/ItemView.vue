<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import itemsData from "@/data/items.json";

const route = useRoute();
const item = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  item.value = itemsData.items.find((i) => i.id === id);
});
</script>

<template>
  <section class="bg-blue-50 py-10 px-4" v-if="item">
    <div class="container m-auto max-w-2xl">
      <RouterLink
        to="/items"
        class="text-blue-500 hover:text-blue-600 flex items-center gap-1 mb-6"
      >
        &larr; Back to Items
      </RouterLink>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-2xl font-bold">{{ item.name }}</h1>
          <span
            class="text-sm bg-blue-100 text-blue-700 rounded-full px-3 py-1"
            >{{ item.category }}</span
          >
        </div>
        <p class="text-gray-600 leading-relaxed mt-4">{{ item.description }}</p>
      </div>
    </div>
  </section>
  <section v-else class="text-center py-20 text-gray-500">
    Item not found.
  </section>
</template>
