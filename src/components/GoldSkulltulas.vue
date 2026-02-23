<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import GoldSkulltula from "@/components/GoldSkulltula.vue";
import { RouterLink } from "vue-router";
import { fetchSkulltulas } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { GoldSkulltula as GoldSkulltulaType } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const { skulltulasCount, skulltulasPercent } = useProgress();

const allSkulltulas = ref<GoldSkulltulaType[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>("");
const selectedLocation = ref<string>("All");

const locations = computed<string[]>(() => {
  const locs = [...new Set(allSkulltulas.value.map((s) => s.location))].sort();
  return ["All", ...locs];
});

const skulltulas = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  return allSkulltulas.value.filter((s) => {
    const matchesLocation =
      selectedLocation.value === "All" || s.location === selectedLocation.value;
    const matchesSearch =
      !q ||
      s.location?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.id?.toString().includes(q);
    return matchesLocation && matchesSearch;
  });
});

const loadSkulltulas = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    allSkulltulas.value = await fetchSkulltulas();
  } catch (e) {
    error.value = "Failed to load Gold Skulltulas.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadSkulltulas);
</script>
