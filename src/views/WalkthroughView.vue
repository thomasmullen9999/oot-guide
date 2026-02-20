<script setup>
import { ref } from "vue";

const chapters = [
  {
    id: 1,
    title: "Chapter 1 — The Beginning (Child Link)",
    summary: "Link awakens in Kokiri Forest and begins his journey.",
    steps: [
      "Speak to the Great Deku Tree to receive the Kokiri Sword from the maze behind the training area.",
      "Buy the Deku Shield from the Kokiri Shop for 40 Rupees.",
      "Enter the Great Deku Tree and complete the dungeon to obtain the Kokiri's Emerald (Spiritual Stone of the Forest).",
      "Leave Kokiri Forest and head across Hyrule Field to Hyrule Castle.",
    ],
  },
  {
    id: 2,
    title: "Chapter 2 — Hyrule Castle & Death Mountain",
    summary: "Meet Princess Zelda and climb Death Mountain to help the Gorons.",
    steps: [
      "Sneak into Hyrule Castle and meet Princess Zelda. She will ask you to collect the three Spiritual Stones.",
      "Speak to Impa, who will teach you Zelda's Lullaby and escort you out of the castle.",
      "Head north from Kakariko Village up Death Mountain Trail to reach Goron City.",
      "Play Saria's Song to Darunia to earn his trust and gain access to Dodongo's Cavern.",
      "Complete Dodongo's Cavern to receive the Goron's Ruby (Spiritual Stone of Fire).",
    ],
  },
  {
    id: 3,
    title: "Chapter 3 — Zora's Domain & Jabu-Jabu's Belly",
    summary: "Travel to Zora's Domain and rescue Princess Ruto.",
    steps: [
      "Head east across Hyrule Field and follow Zora's River north to reach Zora's Domain.",
      "Play Zelda's Lullaby on the Triforce symbol to open the waterfall leading to King Zora.",
      "Dive in Zora's Domain to collect the Silver Scale from the diving mini-game.",
      "Use a fish in a bottle to gain access to Lord Jabu-Jabu's Belly.",
      "Complete Jabu-Jabu's Belly and rescue Princess Ruto to receive Zora's Sapphire (Spiritual Stone of Water).",
    ],
  },
  {
    id: 4,
    title: "Chapter 4 — The Temple of Time & Becoming Adult Link",
    summary: "Open the Door of Time and pull the Master Sword.",
    steps: [
      "Return to Castle Town and enter the Temple of Time.",
      "Place the three Spiritual Stones on the altar and play the Song of Time to open the Door of Time.",
      "Pull the Master Sword from the Pedestal of Time — Link will be transported seven years into the future.",
      "Receive the Light Medallion from Rauru in the Chamber of Sages.",
    ],
  },
  {
    id: 5,
    title: "Chapter 5 — The Forest Temple",
    summary:
      "Adult Link's first dungeon — rescue the four Poe Sisters and defeat Phantom Ganon.",
    steps: [
      "Head to Kakariko Village and speak to Sheik, who will teach you the Minuet of Forest.",
      "Travel through the Lost Woods and Sacred Forest Meadow to reach the Forest Temple.",
      "Collect the Bow inside the temple.",
      "Defeat the four Poe Sisters to unlock the twisted corridors.",
      "Defeat Phantom Ganon to receive the Forest Medallion from Saria.",
    ],
  },
  {
    id: 6,
    title: "Chapter 6 — The Fire Temple",
    summary: "Rescue the Gorons from Volvagia inside Death Mountain.",
    steps: [
      "Equip the Goron Tunic (buy from Goron City or receive from Darunia's son).",
      "Enter the Fire Temple via Death Mountain Crater.",
      "Collect the Megaton Hammer inside the dungeon.",
      "Free all imprisoned Gorons across the temple's floors.",
      "Defeat Volvagia to receive the Fire Medallion from Darunia.",
    ],
  },
  {
    id: 7,
    title: "Chapter 7 — The Ice Cavern & Water Temple",
    summary:
      "Brave the frozen cavern then navigate the Water Temple's shifting depths.",
    steps: [
      "Enter the Ice Cavern north of Zora's Domain. Collect the Iron Boots and learn the Serenade of Water from Sheik.",
      "Equip the Zora Tunic (buy from Zora's Domain or receive from King Zora after thawing him with blue fire).",
      "Enter the Water Temple on the lakebed of Lake Hylia using the Iron Boots.",
      "Raise and lower the water level across three tiers to progress through the dungeon.",
      "Collect the Longshot from Dark Link's room.",
      "Defeat Morpha to receive the Water Medallion from Princess Ruto.",
    ],
  },
  {
    id: 8,
    title: "Chapter 8 — The Bottom of the Well & Shadow Temple",
    summary: "Descend into darkness in Kakariko Village.",
    steps: [
      "As a child, play the Song of Storms in the windmill to drain the well in Kakariko Village.",
      "Return as an adult and enter the Bottom of the Well. Collect the Lens of Truth.",
      "Learn the Nocturne of Shadow from Sheik near the entrance to the Shadow Temple.",
      "Enter the Shadow Temple and use the Lens of Truth to navigate invisible paths and enemies.",
      "Collect the Hover Boots inside the dungeon.",
      "Defeat Bongo Bongo to receive the Shadow Medallion from Impa.",
    ],
  },
  {
    id: 9,
    title: "Chapter 9 — The Spirit Temple",
    summary:
      "One dungeon, two timelines — complete both the child and adult sections.",
    steps: [
      "Travel through the Haunted Wasteland and Desert Colossus to reach the Spirit Temple.",
      "Enter as a child first to complete the child section and collect the Silver Gauntlets.",
      "Return as an adult with the Silver Gauntlets equipped to complete the adult section.",
      "Collect the Mirror Shield inside the adult section.",
      "Defeat Twinrova to receive the Spirit Medallion from Nabooru.",
    ],
  },
  {
    id: 10,
    title: "Chapter 10 — Ganon's Castle & The Final Battle",
    summary: "Storm Ganon's Castle and end Ganondorf's reign.",
    steps: [
      "Receive the Light Arrows from Zelda after collecting all six medallions.",
      "Enter Ganon's Castle and complete the six barrier rooms (Forest, Fire, Water, Shadow, Spirit, Light) to destroy the barrier.",
      "Collect the Golden Gauntlets in the castle to remove large pillars blocking your path.",
      "Climb the tower and confront Ganondorf. Use the Light Arrows to stun him, then strike with the Master Sword.",
      "Escape the collapsing castle before time runs out.",
      "Face Ganon in his true beast form. Strike his tail with the Master Sword after stunning him with Light Arrows.",
      "Zelda will seal Ganon away. Hyrule is saved!",
    ],
  },
];

const openChapter = ref(null);
const toggle = (id) => {
  openChapter.value = openChapter.value === id ? null : id;
};
</script>

<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container m-auto max-w-3xl">
      <h2 class="text-3xl font-bold text-green-700 mb-2 text-center">
        Walkthrough
      </h2>
      <p class="text-center text-gray-500 mb-8">
        A chapter-by-chapter guide to completing Ocarina of Time.
      </p>

      <div class="space-y-4">
        <div
          v-for="chapter in chapters"
          :key="chapter.id"
          class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <button
            @click="toggle(chapter.id)"
            class="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
          >
            <div>
              <h3 class="text-lg font-bold text-green-700">
                {{ chapter.title }}
              </h3>
              <p class="text-gray-500 text-sm mt-1">{{ chapter.summary }}</p>
            </div>
            <span class="text-green-600 text-xl ml-4">
              {{ openChapter === chapter.id ? "▲" : "▼" }}
            </span>
          </button>

          <div
            v-if="openChapter === chapter.id"
            class="px-5 pb-5 border-t border-gray-100"
          >
            <ol class="mt-4 space-y-3 list-decimal list-inside">
              <li
                v-for="(step, index) in chapter.steps"
                :key="index"
                class="text-gray-600 leading-relaxed"
              >
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
