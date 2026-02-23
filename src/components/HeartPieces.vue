<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import HeartPiece from "@/components/HeartPiece.vue";
import { RouterLink } from "vue-router";
import { fetchHeartPieces } from "@/services/api";
import { useProgress } from "@/composables/useProgress";
import type { HeartPiece as HeartPieceType } from "@/types";

defineProps<{
  limit?: number;
  showButton?: boolean;
}>();

const { heartPiecesCount, heartPiecesPercent } = useProgress();

const allHeartPieces = ref<HeartPieceType[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const searchQuery = ref<string>("");

// Filter client-side instead of sending params to a server
const heartPieces = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return allHeartPieces.value;
  return allHeartPieces.value.filter(
    (h) =>
      h.location?.toLowerCase().includes(q) ||
      h.description?.toLowerCase().includes(q),
  );
});

const loadHeartPieces = async (): Promise<void> => {
  try {
    isLoading.value = true;
    error.value = null;
    allHeartPieces.value = await fetchHeartPieces();
  } catch (e) {
    error.value = "Failed to load Heart Pieces.";
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadHeartPieces);
</script>
