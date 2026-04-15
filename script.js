console.log("SCRIPT.JS IS RUNNING");


// Import storage helpers
import {
  loadCharacters,
  createCharacter,
  deleteCharacter
} from "./storage.js";

// DOM elements
const listRoot = document.getElementById("character-list");
const newBtn = document.getElementById("new-character");

// Render the list of characters
function renderList() {
  listRoot.innerHTML = "";
  const chars = loadCharacters();

  chars.forEach(char => {
    const item = document.createElement("div");
    item.className = "char-item";
    item.innerHTML = `
      <span class="name">${char.name}</span>
      <span class="delete">🗑️</span>
    `;

    // Tap → open character
    item.addEventListener("click", () => {
      window.location.href = `character.html?id=${char.id}`;
    });

    // Hold → show delete
    let timer;
    item.addEventListener("touchstart", () => {
      timer = setTimeout(() => {
        item.classList.add("hold");
      }, 600);
    });

    item.addEventListener("touchend", () => clearTimeout(timer));

    // Delete button
    item.querySelector(".delete").addEventListener("click", e => {
      e.stopPropagation();
      deleteCharacter(char.id);
      renderList();
    });

    listRoot.appendChild(item);
  });
}

// Create new character
newBtn.addEventListener("click", () => {
  const id = createCharacter();
  window.location.href = `char.html?id=${id}`;
});

// Initial render
renderList();
