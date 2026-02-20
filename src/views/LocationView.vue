<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import locationsData from "@/data/locations.json";

const route = useRoute();
const location = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  location.value = locationsData.locations.find((l) => l.id === id);
});
</script>

<template>
  <section class="bg-yellow-50 py-10 px-4" v-if="location">
    <div class="container m-auto max-w-2xl">
      <RouterLink
        to="/locations"
        class="text-yellow-600 hover:text-yellow-700 flex items-center gap-1 mb-6"
      >
        &larr; Back to Locations
      </RouterLink>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold">{{ location.name }}</h1>
          <span class="text-2xl">🗺️</span>
        </div>
        <p class="text-gray-600 leading-relaxed">{{ location.description }}</p>
      </div>
    </div>
  </section>
  <section v-else class="text-center py-20 text-gray-500">
    Location not found.
  </section>
</template>
