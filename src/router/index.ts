import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GoldSkulltulasView from "@/views/GoldSkulltulasView.vue";
import GoldSkulltulaView from "@/views/GoldSkulltulaView.vue";
import HeartPiecesView from "@/views/HeartPiecesView.vue";
import HeartPieceView from "@/views/HeartPieceView.vue";
import LocationsView from "@/views/LocationsView.vue";
import LocationView from "@/views/LocationView.vue";
import ItemsView from "@/views/ItemsView.vue";
import ItemView from "@/views/ItemView.vue";
import WalkthroughView from "@/views/WalkthroughView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import StatsView from "@/views/StatsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/goldskulltulas",
      name: "goldskulltulas",
      component: GoldSkulltulasView,
    },
    {
      path: "/goldskulltulas/:id",
      name: "goldskulltula",
      component: GoldSkulltulaView,
    },
    { path: "/heartpieces", name: "heartpieces", component: HeartPiecesView },
    { path: "/heartpieces/:id", name: "heartpiece", component: HeartPieceView },
    { path: "/locations", name: "locations", component: LocationsView },
    { path: "/locations/:id", name: "location", component: LocationView },
    { path: "/items", name: "items", component: ItemsView },
    { path: "/items/:id", name: "item", component: ItemView },
    { path: "/walkthrough", name: "walkthrough", component: WalkthroughView },
    { path: "/stats", name: "stats", component: StatsView },
    { path: "/:catchAll(.*)", name: "not-found", component: NotFoundView },
  ],
});

export default router;
