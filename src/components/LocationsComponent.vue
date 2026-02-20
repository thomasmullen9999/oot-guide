<script setup>
import { reactive } from "vue";
import LocationCard from "@/components/LocationCard.vue";
import locationsData from "@/data/locations.json";

defineProps({
  limit: Number,
  showButton: { type: Boolean, default: false },
});

const state = reactive({
  locations: locationsData.locations,
});
</script>

<template>
  <section class="bg-yellow-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-yellow-600 mb-6 text-center">
        Locations
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LocationCard
          v-for="location in state.locations.slice(
            0,
            limit || state.locations.length,
          )"
          :key="location.id"
          :Location="location"
        />
      </div>
    </div>
  </section>
</template>
