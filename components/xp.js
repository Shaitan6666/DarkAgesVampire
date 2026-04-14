import { updateCharacter } from "../storage.js";

export function renderXpPanel(root, charId, character) {
  // Ensure data structure exists
  if (!character.data.xp) character.data.xp = {};
  const data = character.data.xp;

  const earnedVal = data.earned || 0;
  const spentVal = data.spent || 0;

  const blockXp = document.createElement("section");
  blockXp.className = "block";

  blockXp.innerHTML = `
    <h2>Experience</h2>

    <div class="row">
      <span>Earned</span>
      <input type="number" value="${earnedVal}" style="width:60px">
    </div>

    <div class="row">
      <span>Spent</span>
      <input type="number" value="${spentVal}" style="width:60px">
    </div>

    <div class="row">
      <span>Available</span>
      <input type="number" value="${earnedVal - spentVal}" style="width:60px" readonly>
    </div>

    <h3>XP Costs Reference</h3>
    <p>Attribute — current rating × 4</p>
    <p>New Ability — 3 xp · Raise Ability — current rating × 2</p>
    <p>Clan Discipline (new) — 10 xp · raise — rating × 5</p>
    <p>Out-of-Clan (new) — 10 xp · raise — rating × 7</p>
    <p>Background — rating × 2 · Virtue — rating × 3</p>
    <p>Road — rating × 2 · Willpower — rating × 2</p>
    <p>New Thaumaturgy Path — 7 xp · Primary — rating × 4 · Secondary — rating × 5</p>
    <p>Specialty — 3 xp · Ritual — (per ST)</p>
  `;

  root.appendChild(blockXp);

  const inputs = blockXp.querySelectorAll("input");
  const [earnedInput, spentInput, availableInput] = inputs;

  function saveXp() {
    const earned = Number(earnedInput.value || 0);
    const spent = Number(spentInput.value || 0);

    updateCharacter(charId, c => {
      if (!c.data.xp) c.data.xp = {};
      c.data.xp.earned = earned;
      c.data.xp.spent = spent;
    });

    availableInput.value = earned - spent;
  }

  earnedInput.addEventListener("input", saveXp);
  spentInput.addEventListener("input", saveXp);
}