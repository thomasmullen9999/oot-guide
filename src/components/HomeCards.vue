<script setup>
import Card from "@/components/Card.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg"
      >
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">Walkthrough</h2>
          <p class="mt-2 mb-4">
            Step-by-step guide through all 10 chapters of the game.
          </p>
          <RouterLink
            to="/walkthrough"
            class="inline-block bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
            >View Walkthrough</RouterLink
          >
        </Card>
        <Card bg="bg-yellow-100">
          <h2 class="text-2xl font-bold">Gold Skulltulas</h2>
          <p class="mt-2 mb-4">
            Track down all 100 Gold Skulltula tokens hidden across Hyrule.
          </p>
          <RouterLink
            to="/goldskulltulas"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >View Skulltulas</RouterLink
          >
        </Card>
        <Card bg="bg-red-100">
          <h2 class="text-2xl font-bold">Heart Pieces</h2>
          <p class="mt-2 mb-4">
            Find all 36 heart pieces to maximise Link's health.
          </p>
          <RouterLink
            to="/heartpieces"
            class="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            >View Heart Pieces</RouterLink
          >
        </Card>
        <Card bg="bg-yellow-50">
          <h2 class="text-2xl font-bold">Locations</h2>
          <p class="mt-2 mb-4">
            Explore every area in Hyrule with detailed descriptions.
          </p>
          <RouterLink
            to="/locations"
            class="inline-block bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600"
            >View Locations</RouterLink
          >
        </Card>
        <Card bg="bg-blue-100">
          <h2 class="text-2xl font-bold">Items</h2>
          <p class="mt-2 mb-4">
            Browse every item, weapon, medallion and upgrade in the game.
          </p>
          <RouterLink
            to="/items"
            class="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >View Items</RouterLink
          >
        </Card>
      </div>
    </div>
  </section>
</template>
