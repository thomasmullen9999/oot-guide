<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import heartPiecesData from "@/data/heartpieces.json";

const route = useRoute();
const heartPiece = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  heartPiece.value = heartPiecesData.heartpieces.find((h) => h.id === id);
});
</script>

<template>
  <section class="bg-red-50 py-10 px-4" v-if="heartPiece">
    <div class="container m-auto max-w-2xl">
      <RouterLink
        to="/heartpieces"
        class="text-red-500 hover:text-red-600 flex items-center gap-1 mb-6"
      >
        &larr; Back to Heart Pieces
      </RouterLink>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold">Heart Piece #{{ heartPiece.id }}</h1>
          <span class="text-2xl">❤️</span>
        </div>
        <p class="text-red-500 font-semibold mb-3">{{ heartPiece.location }}</p>
        <p class="text-gray-600 leading-relaxed">
          {{ heartPiece.description }}
        </p>
      </div>
    </div>
  </section>
  <section v-else class="text-center py-20 text-gray-500">
    Heart piece not found.
  </section>
</template>
