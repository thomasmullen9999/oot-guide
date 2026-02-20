<script setup>
import { RouterLink } from "vue-router";
defineProps({ Item: Object });
</script>

<template>
  <div v-if="Item" class="bg-white rounded-xl shadow-md p-4">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-bold">{{ Item.name }}</h3>
      <span class="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1">{{
        Item.category
      }}</span>
    </div>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ Item.description }}
    </p>
    <div class="border border-gray-100 mb-4"></div>
    <RouterLink
      :to="'/items/' + Item.id"
      class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
    >
      View Item
    </RouterLink>
  </div>
</template>
