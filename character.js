// Import storage helpers
import { getCharacter } from "./storage.js";

// Import page renderers
import { renderSheet } from "./components/sheet.js";
import { renderAbilities } from "./components/abilities.js";
import { renderAdvantages } from "./components/advantages.js";
import { renderTraits } from "./components/traits.js";

// Import navigation setup
import { setupNavigation } from "./components/nav.js";

// Read character ID from URL
const params = new URLSearchParams(window.location.search);
const charId = Number(params.get("id"));
const character = getCharacter(charId);

// DOM references
const app = document.getElementById("app");
const nameHeader = document.getElementById("char-name");

// Update header with character name
nameHeader.textContent = character?.name || "Character";

// Page loader
function loadPage(name) {
  app.innerHTML = "";

  if (name === "sheet") renderSheet(app, charId, character);
  if (name === "abilities") renderAbilities(app, charId, character);
  if (name === "advantages") renderAdvantages(app, charId, character);
  if (name === "traits") renderTraits(app, charId, character);
}

// Setup bottom navigation
setupNavigation(loadPage);

// Load default page
loadPage("sheet");