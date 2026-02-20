import { ref, computed, watch } from "vue";

const SKULLTULA_KEY = "oot_skulltulas_completed";
const HEARTPIECE_KEY = "oot_heartpieces_completed";

const completedSkulltulas = ref<number[]>(
  JSON.parse(localStorage.getItem(SKULLTULA_KEY) || "[]"),
);
const completedHeartPieces = ref<number[]>(
  JSON.parse(localStorage.getItem(HEARTPIECE_KEY) || "[]"),
);

watch(
  completedSkulltulas,
  (val: number[]) => localStorage.setItem(SKULLTULA_KEY, JSON.stringify(val)),
  { deep: true },
);

watch(
  completedHeartPieces,
  (val: number[]) => localStorage.setItem(HEARTPIECE_KEY, JSON.stringify(val)),
  { deep: true },
);

export function useProgress() {
  const toggleSkulltula = (id: number): void => {
    const idx = completedSkulltulas.value.indexOf(id);
    if (idx === -1) completedSkulltulas.value.push(id);
    else completedSkulltulas.value.splice(idx, 1);
  };

  const toggleHeartPiece = (id: number): void => {
    const idx = completedHeartPieces.value.indexOf(id);
    if (idx === -1) completedHeartPieces.value.push(id);
    else completedHeartPieces.value.splice(idx, 1);
  };

  const isSkulltulaComplete = (id: number): boolean =>
    completedSkulltulas.value.includes(id);

  const isHeartPieceComplete = (id: number): boolean =>
    completedHeartPieces.value.includes(id);

  const skulltulasCount = computed(() => completedSkulltulas.value.length);
  const heartPiecesCount = computed(() => completedHeartPieces.value.length);

  const skulltulasPercent = computed(() =>
    Math.round((completedSkulltulas.value.length / 100) * 100),
  );
  const heartPiecesPercent = computed(() =>
    Math.round((completedHeartPieces.value.length / 36) * 100),
  );

  const resetAll = (): void => {
    completedSkulltulas.value = [];
    completedHeartPieces.value = [];
  };

  return {
    completedSkulltulas,
    completedHeartPieces,
    toggleSkulltula,
    toggleHeartPiece,
    isSkulltulaComplete,
    isHeartPieceComplete,
    skulltulasCount,
    heartPiecesCount,
    skulltulasPercent,
    heartPiecesPercent,
    resetAll,
  };
}
