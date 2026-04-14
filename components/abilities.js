import { createDots } from "./dots.js";
import { renderXpPanel } from "./xp.js";
import { updateCharacter } from "../storage.js";

export function renderAbilities(root, charId, character) {
  // Ensure data structure exists
  if (!character.data.abilities) character.data.abilities = {};

  function saveAbility(name, value) {
    updateCharacter(charId, c => {
      if (!c.data.abilities) c.data.abilities = {};
      c.data.abilities[name] = value;
    });
  }

  function saveSpecialty(name, value) {
    updateCharacter(charId, c => {
      if (!c.data.specialties) c.data.specialties = {};
      c.data.specialties[name] = value;
    });
  }

  // --- Talents ---
  const blockTalents = document.createElement("section");
  blockTalents.className = "block";
  blockTalents.innerHTML = `<h2>Talents</h2>`;

  const talents = [
    "Acting","Alertness","Athletics","Brawl","Dodge",
    "Empathy","Intimidation","Larceny","Leadership","Subterfuge"
  ];

  talents.forEach(name => {
    const row = document.createElement("div");
    row.className = "row";

    const specialty = character.data.specialties?.[name] || "";
    const rating = character.data.abilities?.[name] || 0;

    row.innerHTML = `
      <div>
        <strong>${name}</strong><br>
        <small>Specialty:</small>
        <input type="text" value="${specialty}" style="width:120px">
      </div>
    `;

    const input = row.querySelector("input");
    input.addEventListener("input", () => saveSpecialty(name, input.value));

    row.appendChild(createDots(10, rating, v => saveAbility(name, v)));
    blockTalents.appendChild(row);
  });

  root.appendChild(blockTalents);

  // --- Skills ---
  const blockSkills = document.createElement("section");
  blockSkills.className = "block";
  blockSkills.innerHTML = `<h2>Skills</h2>`;

  const skills = [
    "Animal Ken","Archery","Crafts","Etiquette","Herbalism",
    "Melee","Music","Ride","Stealth","Survival"
  ];

  skills.forEach(name => {
    const row = document.createElement("div");
    row.className = "row";

    const specialty = character.data.specialties?.[name] || "";
    const rating = character.data.abilities?.[name] || 0;

    row.innerHTML = `
      <div>
        <strong>${name}</strong><br>
        <small>Specialty:</small>
        <input type="text" value="${specialty}" style="width:120px">
      </div>
    `;

    const input = row.querySelector("input");
    input.addEventListener("input", () => saveSpecialty(name, input.value));

    row.appendChild(createDots(10, rating, v => saveAbility(name, v)));
    blockSkills.appendChild(row);
  });

  root.appendChild(blockSkills);

  // --- Knowledges ---
  const blockKnow = document.createElement("section");
  blockKnow.className = "block";
  blockKnow.innerHTML = `<h2>Knowledges</h2>`;

  const knows = [
    "Academics","Hearth Wisdom","Investigation","Law","Linguistics",
    "Medicine","Occult","Politics","Science","Seneschal"
  ];

  knows.forEach(name => {
    const row = document.createElement("div");
    row.className = "row";

    const specialty = character.data.specialties?.[name] || "";
    const rating = character.data.abilities?.[name] || 0;

    row.innerHTML = `
      <div>
        <strong>${name}</strong><br>
        <small>Specialty:</small>
        <input type="text" value="${specialty}" style="width:120px">
      </div>
    `;

    const input = row.querySelector("input");
    input.addEventListener("input", () => saveSpecialty(name, input.value));

    row.appendChild(createDots(10, rating, v => saveAbility(name, v)));
    blockKnow.appendChild(row);
  });

  root.appendChild(blockKnow);

  // XP panel
  renderXpPanel(root);
}