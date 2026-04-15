import { createDots } from "./dots.js";
import { renderXpPanel } from "./xp.js";
import { updateCharacter } from "../storage.js";

export function renderTraits(root, charId, character) {
  // Ensure data structure exists
  if (!character.data.traits) character.data.traits = {};
  const data = character.data.traits;

  function saveTrait(section, index, field, value) {
    updateCharacter(charId, c => {
      if (!c.data.traits) c.data.traits = {};
      if (!c.data.traits[section]) c.data.traits[section] = [];
      if (!c.data.traits[section][index]) c.data.traits[section][index] = { name: "", rating: 0 };
      c.data.traits[section][index][field] = value;
    });
  }

  function saveVirtue(name, value) {
    updateCharacter(charId, c => {
      if (!c.data.traits) c.data.traits = {};
      if (!c.data.traits.virtues) c.data.traits.virtues = {};
      c.data.traits.virtues[name] = value;
    });
  }

  function saveRoadName(value) {
    updateCharacter(charId, c => {
      if (!c.data.traits) c.data.traits = {};
      c.data.traits.roadName = value;
    });
  }

  function saveRoadRating(value) {
    updateCharacter(charId, c => {
      if (!c.data.traits) c.data.traits = {};
      c.data.traits.roadRating = value;
    });
  }

  // -------------------------
  // OTHER TRAITS
  // -------------------------
  const blockOther = document.createElement("section");
  blockOther.className = "block";
  blockOther.innerHTML = `<h2>Other Traits</h2>`;

  for (let i = 0; i < 4; i++) {
    const saved = data.other?.[i] || { name: "", rating: 0 };

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <input type="text" value="${saved.name}" placeholder="Trait name..." style="width:140px">
    `;

    const input = row.querySelector("input");
    input.addEventListener("input", () => saveTrait("other", i, "name", input.value));

    row.appendChild(
      createDots(7, saved.rating, v => saveTrait("other", i, "rating", v))
    );

    blockOther.appendChild(row);
  }

  root.appendChild(blockOther);

  // -------------------------
  // VIRTUES
  // -------------------------
  const blockVirtues = document.createElement("section");
  blockVirtues.className = "block";
  blockVirtues.innerHTML = `
    <h2>Virtues</h2>
    <p>Rating × 3 XP</p>
  `;

  const virtues = [
    "Conscience / Conviction",
    "Self-Control / Instinct",
    "Courage"
  ];

  virtues.forEach(name => {
    const rating = data.virtues?.[name] || 1;

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `<span>${name}</span>`;

    row.appendChild(
      createDots(7, rating, v => saveVirtue(name, v))
    );

    blockVirtues.appendChild(row);
  });

  root.appendChild(blockVirtues);

  // -------------------------
  // ROAD
  // -------------------------
  const blockRoad = document.createElement("section");
  blockRoad.className = "block";

  const roadName = data.roadName || "";
  const roadRating = data.roadRating || 1;

  blockRoad.innerHTML = `
    <h2>Road</h2>
    <p>Rating × 2 XP</p>
    <div class="row">
      <input type="text" value="${roadName}" placeholder="Road of..." style="width:140px">
    </div>
  `;

  const roadRow = blockRoad.querySelector(".row");
  const roadInput = roadRow.querySelector("input");

  roadInput.addEventListener("input", () => saveRoadName(roadInput.value));

  roadRow.appendChild(
    createDots(9, roadRating, v => saveRoadRating(v))
  );

  root.appendChild(blockRoad);

  // -------------------------
  // XP PANEL
  // -------------------------
  renderXpPanel(root, charId, character);
}
