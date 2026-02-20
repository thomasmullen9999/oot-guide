<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import locationsData from "@/data/locations.json";
import { useProgress } from "@/composables/useProgress";
import type { HeartPiece as HeartPieceType, Location } from "@/types";

const props = defineProps<{
  HeartPiece: HeartPieceType;
}>();

const { isHeartPieceComplete, toggleHeartPiece } = useProgress();

const showFullDescription = ref<boolean>(false);

const truncatedDescription = computed<string>(() => {
  const description = props.HeartPiece?.description;
  if (!description) return "";
  return showFullDescription.value
    ? description
    : description.substring(0, 100) + "...";
});

const matchedLocation = computed<Location | undefined>(() => {
  if (!props.HeartPiece?.location) return undefined;
  const loc = props.HeartPiece.location.split(" - ")[0];
  return locationsData.locations.find(
    (l) =>
      loc.toLowerCase().includes(l.name.toLowerCase()) ||
      l.name.toLowerCase().includes(loc.toLowerCase()),
  );
});

const isComplete = computed<boolean>(() =>
  isHeartPieceComplete(props.HeartPiece.id),
);
</script>

<template>
  <div
    v-if="HeartPiece"
    class="heart-card"
    :class="{ 'heart-card--complete': isComplete }"
  >
    <div class="heart-header">
      <span class="heart-number"
        >#{{ String(HeartPiece.id).padStart(2, "0") }}</span
      >
      <span class="heart-icon">❤️</span>
    </div>

    <hr class="gold-divider" />

    <div class="heart-body">
      <p class="heart-desc">{{ truncatedDescription }}</p>
      <button
        @click="showFullDescription = !showFullDescription"
        class="heart-toggle"
      >
        {{ showFullDescription ? "▲ Less" : "▼ More" }}
      </button>
    </div>

    <hr class="gold-divider" />

    <div class="heart-footer">
      <RouterLink
        v-if="matchedLocation"
        :to="'/locations/' + matchedLocation.id"
        class="heart-loc-link"
      >
        ⟨ {{ HeartPiece.location }} ⟩
      </RouterLink>
      <span v-else class="heart-loc-text">⟨ {{ HeartPiece.location }} ⟩</span>

      <div class="heart-actions">
        <button
          @click="toggleHeartPiece(HeartPiece.id)"
          class="heart-collect"
          :class="{ 'heart-collect--done': isComplete }"
        >
          {{ isComplete ? "✓ Found" : "Collect" }}
        </button>
        <RouterLink
          :to="'/heartpieces/' + HeartPiece.id"
          class="btn-gold"
          style="font-size: 0.65rem; padding: 0.4rem 1rem"
        >
          Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heart-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.25rem;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
}

.heart-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7a2020, transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.heart-card:hover {
  border-color: #5a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.heart-card:hover::before {
  opacity: 1;
}

.heart-card--complete {
  opacity: 0.55;
  border-color: var(--red);
}

.heart-card--complete::before {
  background: linear-gradient(90deg, transparent, var(--red), transparent);
  opacity: 1;
}

.heart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.heart-number {
  font-family: "Cinzel", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
}

.heart-icon {
  font-size: 1.3rem;
  filter: drop-shadow(0 0 6px rgba(200, 50, 50, 0.5));
}

.heart-body {
  padding: 0.5rem 0;
}

.heart-desc {
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: var(--text-dim);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.heart-toggle {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--gold-dim);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.heart-toggle:hover {
  color: var(--gold);
}

.heart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.25rem;
  flex-wrap: wrap;
}

.heart-loc-link,
.heart-loc-text {
  font-family: "Cinzel", serif;
  font-size: 0.55rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.heart-loc-link:hover {
  color: var(--gold);
}

.heart-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.heart-collect {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.4rem 0.85rem;
  border-radius: 2px;
  border: 1px solid var(--border-bright);
  color: var(--text-dim);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.heart-collect:hover {
  border-color: #7a3030;
  color: var(--red-bright);
}

.heart-collect--done {
  border-color: var(--red);
  color: var(--red-bright);
  background: rgba(179, 64, 64, 0.1);
}
</style>
