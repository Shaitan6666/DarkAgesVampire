import { createDots } from "./dots.js";
import { renderXpPanel } from "./xp.js";
import { updateCharacter } from "../storage.js";

export function renderSheet(root, charId, character) {
  // Ensure data structure exists
  if (!character.data.sheet) character.data.sheet = {};
  const data = character.data.sheet;

  function saveField(field, value) {
    updateCharacter(charId, c => {
      if (!c.data.sheet) c.data.sheet = {};
      c.data.sheet[field] = value;
    });
  }

  // -------------------------
  // CHARACTER INFO
  // -------------------------
  const blockInfo = document.createElement("section");
  blockInfo.className = "block";

  blockInfo.innerHTML = `
    <h2>Character</h2>
    <div class="row"><label>Name</label><input type="text" value="${data.name || ""}"></div>
    <div class="row"><label>Clan</label><input type="text" value="${data.clan || ""}"></div>
    <div class="row"><label>Generation</label><input type="text" value="${data.generation || ""}"></div>
    <div class="row"><label>Sire</label><input type="text" value="${data.sire || ""}"></div>
  `;

  const infoInputs = blockInfo.querySelectorAll("input");
  infoInputs[0].addEventListener("input", e => saveField("name", e.target.value));
  infoInputs[1].addEventListener("input", e => saveField("clan", e.target.value));
  infoInputs[2].addEventListener("input", e => saveField("generation", e.target.value));
  infoInputs[3].addEventListener("input", e => saveField("sire", e.target.value));

  root.appendChild(blockInfo);

  // -------------------------
  // ATTRIBUTES
  // -------------------------
  const blockAttr = document.createElement("section");
  blockAttr.className = "block";

  blockAttr.innerHTML = `
    <h2>Attributes</h2>

    <h3>Physical</h3>
    <div class="row"><label>Strength</label></div>
    <div class="row"><label>Dexterity</label></div>
    <div class="row"><label>Stamina</label></div>

    <h3>Social</h3>
    <div class="row"><label>Charisma</label></div>
    <div class="row"><label>Manipulation</label></div>
    <div class="row"><label>Appearance</label></div>

    <h3>Mental</h3>
    <div class="row"><label>Perception</label></div>
    <div class="row"><label>Intelligence</label></div>
    <div class="row"><label>Wits</label></div>
  `;

  const attrNames = [
    "Strength","Dexterity","Stamina",
    "Charisma","Manipulation","Appearance",
    "Perception","Intelligence","Wits"
  ];

  const rows = blockAttr.querySelectorAll(".row");

  rows.forEach((row, index) => {
    const name = attrNames[index];
    const rating = data[name] || 1;

    row.appendChild(
      createDots(5, rating, v => saveField(name, v))
    );
  });

  root.appendChild(blockAttr);

  // -------------------------
  // WILLPOWER
  // -------------------------
  const blockWill = document.createElement("section");
  blockWill.className = "block";

  const willMax = data.willMax || 5;
  const willCurrent = data.willCurrent || 3;

  blockWill.innerHTML = `
    <h2>Willpower</h2>
    <p>Rating × 1 XP per dot</p>
    <div class="row"><label>Max</label></div>
    <div class="row"><label>Current</label></div>
  `;

  const willRows = blockWill.querySelectorAll(".row");

  willRows[0].appendChild(
    createDots(10, willMax, v => saveField("willMax", v))
  );

  willRows[1].appendChild(
    createDots(10, willCurrent, v => saveField("willCurrent", v))
  );

  root.appendChild(blockWill);

  // -------------------------
  // BLOOD POOL
  // -------------------------
  const blockBlood = document.createElement("section");
  blockBlood.className = "block";

  const blood = data.blood || 0;

  blockBlood.innerHTML = `
    <h2>Blood Pool</h2>
    <p>Max 10</p>
    <div class="row" id="blood-row"></div>
  `;

  const bloodRow = blockBlood.querySelector("#blood-row");

  for (let i = 0; i < 10; i++) {
    const box = document.createElement("span");
    box.style.width = "16px";
    box.style.height = "16px";
    box.style.border = "1px solid #d4b46a";
    box.style.marginRight = "4px";
    box.style.background = i < blood ? "#d4b46a" : "transparent";

    box.addEventListener("click", () => {
      const newValue = i + 1;
      saveField("blood", newValue);
      box.style.background = "#d4b46a";

      [...bloodRow.children].forEach((b, idx) => {
        b.style.background = idx < newValue ? "#d4b46a" : "transparent";
      });
    });

    bloodRow.appendChild(box);
  }

  root.appendChild(blockBlood);

  // -------------------------
  // HEALTH
  // -------------------------
  const blockHealth = document.createElement("section");
  blockHealth.className = "block";

  const healthStates = [
    "Bruised",
    "Hurt",
    "Injured",
    "Wounded",
    "Mauled",
    "Crippled"
  ];

  blockHealth.innerHTML = `
    <h2>Health</h2>
    ${healthStates
      .map((h, i) => {
        const key = `health_${i}`;
        const checked = data[key] ? "checked" : "";
        return `
          <div class="row">
            <label>${h}</label>
            <input type="checkbox" ${checked}>
          </div>
        `;
      })
      .join("")}
  `;

  const healthInputs = blockHealth.querySelectorAll("input");

  healthInputs.forEach((input, i) => {
    input.addEventListener("change", () => {
      saveField(`health_${i}`, input.checked);
    });
  });

  root.appendChild(blockHealth);

  // -------------------------
  // XP PANEL
  // -------------------------
  renderXpPanel(root);
}