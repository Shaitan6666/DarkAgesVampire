export function loadCharacters() {
  return JSON.parse(localStorage.getItem("characters") || "[]");
}

export function saveCharacters(list) {
  localStorage.setItem("characters", JSON.stringify(list));
}

export function getCharacter(id) {
  const list = loadCharacters();
  return list.find(c => c.id === id);
}

export function updateCharacter(id, updater) {
  const list = loadCharacters();
  const index = list.findIndex(c => c.id === id);
  if (index === -1) return;

  updater(list[index]); // modify the character
  saveCharacters(list);
}

export function createCharacter() {
  const list = loadCharacters();
  const id = Date.now();

  list.push({
    id,
    name: "New Character",
    data: {} // all sheet data goes here
  });

  saveCharacters(list);
  return id;
}

export function deleteCharacter(id) {
  const list = loadCharacters().filter(c => c.id !== id);
  saveCharacters(list);
}
