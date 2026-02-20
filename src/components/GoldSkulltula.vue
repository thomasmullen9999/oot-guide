<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import locationsData from "@/data/locations.json";
import { useProgress } from "@/composables/useProgress";
import type { GoldSkulltula as GoldSkulltulaType, Location } from "@/types";

const props = defineProps<{
  GoldSkulltula: GoldSkulltulaType;
}>();

const { isSkulltulaComplete, toggleSkulltula } = useProgress();

const showFullDescription = ref<boolean>(false);

const truncatedDescription = computed<string>(() => {
  const description = props.GoldSkulltula?.description;
  if (!description) return "";
  return showFullDescription.value
    ? description
    : description.substring(0, 100) + "...";
});

const matchedLocation = computed<Location | undefined>(() => {
  if (!props.GoldSkulltula?.location) return undefined;
  return locationsData.locations.find(
    (l) =>
      props.GoldSkulltula.location
        .toLowerCase()
        .includes(l.name.toLowerCase()) ||
      l.name.toLowerCase().includes(props.GoldSkulltula.location.toLowerCase()),
  );
});

const isComplete = computed<boolean>(() =>
  isSkulltulaComplete(props.GoldSkulltula.id),
);
</script>

<template>
  <div
    v-if="GoldSkulltula"
    class="skulltula-card"
    :class="{ 'skulltula-card--complete': isComplete }"
  >
    <!-- Number badge -->
    <div class="skulltula-header">
      <span class="skulltula-number"
        >#{{ String(GoldSkulltula.number).padStart(3, "0") }}</span
      >
      <span class="skulltula-location-badge">{{ GoldSkulltula.location }}</span>
      <img
        src="@/assets/img/skulltulatoken.png"
        alt="Token"
        class="skulltula-token"
      />
    </div>

    <hr class="gold-divider" />

    <!-- Description -->
    <div class="skulltula-body">
      <p class="skulltula-desc">{{ truncatedDescription }}</p>
      <button
        @click="showFullDescription = !showFullDescription"
        class="skulltula-toggle"
      >
        {{ showFullDescription ? "▲ Less" : "▼ More" }}
      </button>
    </div>

    <hr class="gold-divider" />

    <!-- Footer -->
    <div class="skulltula-footer">
      <RouterLink
        v-if="matchedLocation"
        :to="'/locations/' + matchedLocation.id"
        class="skulltula-loc-link"
      >
        ⟨ {{ GoldSkulltula.location }} ⟩
      </RouterLink>
      <span v-else class="skulltula-loc-text"
        >⟨ {{ GoldSkulltula.location }} ⟩</span
      >

      <div class="skulltula-actions">
        <button
          @click="toggleSkulltula(GoldSkulltula.id)"
          class="skulltula-collect"
          :class="{ 'skulltula-collect--done': isComplete }"
        >
          {{ isComplete ? "✓ Collected" : "Collect" }}
        </button>
        <RouterLink
          :to="'/goldskulltulas/' + GoldSkulltula.id"
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
.skulltula-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.25rem;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
}

.skulltula-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.skulltula-card:hover {
  border-color: var(--gold-dim);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.skulltula-card:hover::before {
  opacity: 1;
}

.skulltula-card--complete {
  opacity: 0.55;
  border-color: var(--green);
}

.skulltula-card--complete::before {
  background: linear-gradient(90deg, transparent, var(--green), transparent);
  opacity: 1;
}

.skulltula-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.skulltula-number {
  font-family: "Cinzel", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
  flex-shrink: 0;
}

.skulltula-location-badge {
  font-family: "Cinzel", serif;
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  background: var(--deep);
  border: 1px solid var(--border);
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skulltula-token {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(201, 168, 76, 0.4));
}

.skulltula-body {
  padding: 0.5rem 0;
}

.skulltula-desc {
  font-family: "Crimson Text", serif;
  font-size: 1rem;
  color: var(--text-dim);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.skulltula-toggle {
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

.skulltula-toggle:hover {
  color: var(--gold);
}

.skulltula-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.25rem;
  flex-wrap: wrap;
}

.skulltula-loc-link,
.skulltula-loc-text {
  font-family: "Cinzel", serif;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
}

.skulltula-loc-link:hover {
  color: var(--gold);
}

.skulltula-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.skulltula-collect {
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

.skulltula-collect:hover {
  border-color: var(--gold-dim);
  color: var(--gold);
}

.skulltula-collect--done {
  border-color: var(--green);
  color: var(--green-bright);
  background: rgba(61, 122, 90, 0.1);
}
</style>
