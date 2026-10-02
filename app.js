const exhibits = [
  {
    id: "sky",
    title: "Why the sky looks blue",
    category: "Science",
    time: "5 min",
    symbol: "☼",
    color: "#477f9d",
    summary: "A colour story written in sunlight, air, and the way our eyes receive scattered light.",
    content: "Sunlight looks white, but it contains many colours. As light travels through Earth’s atmosphere, tiny molecules scatter the shorter blue wavelengths more strongly than the longer red wavelengths. Blue light reaches us from every direction, so a clear daytime sky appears blue. At sunset the light passes through more atmosphere, scattering away much of the blue and leaving warmer reds and oranges.",
    fact: "The colour is not painted onto the sky. It is an effect created by scattered sunlight.",
    quiz: { question: "Which colour of light is scattered most strongly by air molecules?", options: ["Blue", "Red", "Orange"], answer: 0 }
  },
  {
    id: "qr",
    title: "How QR codes store information",
    category: "Technology",
    time: "4 min",
    symbol: "⌘",
    color: "#59658b",
    summary: "The small squares that turn a camera into a fast, dependable reader of digital information.",
    content: "A QR code is a grid of dark and light squares that represents data. The large squares in three corners help a phone identify the code’s position and angle. The smaller pattern stores information such as a web address or contact details. QR codes also include error correction, so a scanner can often read them even when part of the image is damaged or covered.",
    fact: "The three large corner markers tell a scanner how the code is positioned before it reads the data.",
    quiz: { question: "Why can a QR code often still work when part of it is damaged?", options: ["It uses error correction", "It connects to Wi-Fi", "It has a hidden backup image"], answer: 0 }
  },
  {
    id: "bee",
    title: "How honeybees share directions",
    category: "Nature",
    time: "5 min",
    symbol: "✦",
    color: "#c58b39",
    summary: "A worker bee can describe the direction and distance of food with a dance inside a dark hive.",
    content: "When a honeybee finds a good food source, it may perform a waggle dance for other bees. The direction of the dance in relation to the hive’s vertical surface corresponds to the food’s direction in relation to the sun. The length and energy of the waggle help communicate distance. This lets the colony share useful information without spoken language or maps.",
    fact: "Bees use gravity inside the hive as a reference for the sun’s position outside.",
    quiz: { question: "What does the bee’s waggle dance communicate?", options: ["Food location", "The weather tomorrow", "A warning about predators only"], answer: 0 }
  },
  {
    id: "bug",
    title: "The first computer bug",
    category: "History",
    time: "3 min",
    symbol: "↯",
    color: "#ce725d",
    summary: "The famous story behind a word every programmer now knows.",
    content: "In 1947, engineers working on the Harvard Mark II computer found a moth trapped in one of its relays. They taped it into their logbook and described the work as removing a bug. The word bug had already been used for mechanical faults, but this incident became a well-known piece of computing history. The logbook is preserved by the Smithsonian Institution.",
    fact: "The original moth was real, but the word bug was already used for technical problems before 1947.",
    quiz: { question: "Where was the famous moth found?", options: ["Inside a computer relay", "Under a keyboard", "In a printer"], answer: 0 }
  },
  {
    id: "illusion",
    title: "Why optical illusions fool us",
    category: "Design",
    time: "5 min",
    symbol: "◉",
    color: "#816b9c",
    summary: "Your eyes collect information, but your brain has to make a quick and sometimes imperfect guess.",
    content: "Vision is not a direct photograph of the world. Your brain interprets contrast, shadow, surrounding objects, and past experience to estimate size, depth, and colour. Optical illusions use these shortcuts to produce a result that differs from physical reality. They do not show that your eyes are broken. They reveal the useful assumptions your visual system usually makes.",
    fact: "An illusion works because the brain uses context to make fast predictions about what it sees.",
    quiz: { question: "What often causes an optical illusion?", options: ["The brain’s interpretation of context", "A problem with the screen", "A change in eyesight"], answer: 0 }
  },
  {
    id: "maps",
    title: "Why old maps look unfamiliar",
    category: "History",
    time: "4 min",
    symbol: "⌁",
    color: "#638575",
    summary: "Maps are tools made for a purpose, and that purpose shapes what they show and what they leave out.",
    content: "Older maps may look unusual because mapmakers had limited measurements, different priorities, and different ideas about what was important. A trade map might make ports and routes large, while a religious map might place a sacred site at its centre. Even modern maps make choices: a flat map must distort some combination of size, shape, direction, or distance.",
    fact: "Every flat world map involves distortion because a sphere cannot be flattened without changing something.",
    quiz: { question: "Why do maps need to make trade-offs?", options: ["Earth is spherical", "Paper is always too small", "Colours are limited"], answer: 0 }
  },
  {
    id: "memory",
    title: "Why a song gets stuck in your head",
    category: "Science",
    time: "4 min",
    symbol: "♫",
    color: "#b26a78",
    summary: "A short, repetitive musical phrase can keep replaying after the music has stopped.",
    content: "An earworm is a piece of music that repeats in the mind without deliberate effort. Catchy phrases are often short, repetitive, and slightly incomplete, which may encourage the brain to keep rehearsing them. Earworms are common and usually harmless. Listening to the full song, switching attention to another activity, or completing a mental task can sometimes interrupt the loop.",
    fact: "Repetition and an unfinished musical pattern can make a tune especially memorable.",
    quiz: { question: "Which feature can help make a song memorable?", options: ["A short repeated phrase", "Only very loud volume", "A long silence"], answer: 0 }
  },
  {
    id: "leaf",
    title: "How leaves change colour",
    category: "Nature",
    time: "5 min",
    symbol: "❋",
    color: "#a47039",
    summary: "Autumn colour is already present in a leaf, but it becomes visible when green chlorophyll breaks down.",
    content: "During the growing season, chlorophyll makes leaves look green and helps plants capture light. As days become shorter and temperatures change, many trees stop producing chlorophyll. Yellow and orange pigments that were present all along become visible. Some trees also create red pigments when sugars remain in the leaf under the right conditions.",
    fact: "Yellow and orange pigments are often present in leaves before autumn, but chlorophyll hides them.",
    quiz: { question: "What pigment makes many summer leaves look green?", options: ["Chlorophyll", "Melanin", "Hemoglobin"], answer: 0 }
  }
];

const state = { category: "All", query: "", saved: new Set(JSON.parse(localStorage.getItem("museum-saved") || "[]")) };
const categories = ["All", ...new Set(exhibits.map((exhibit) => exhibit.category))];

const grid = document.querySelector("#exhibit-grid");
const filterBar = document.querySelector("#filter-bar");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#exhibit-dialog");
const dialogContent = document.querySelector("#dialog-content");
const favouritesCount = document.querySelector("#favourites-count");

function filteredExhibits() {
  return exhibits.filter((exhibit) => {
    const inCategory = state.category === "All" || exhibit.category === state.category;
    const text = `${exhibit.title} ${exhibit.category} ${exhibit.summary}`.toLowerCase();
    return inCategory && text.includes(state.query.toLowerCase());
  });
}

function updateSaved() {
  localStorage.setItem("museum-saved", JSON.stringify([...state.saved]));
  favouritesCount.textContent = state.saved.size;
}

function renderFilters() {
  filterBar.innerHTML = categories.map((category) => `
    <button class="filter-button ${state.category === category ? "is-active" : ""}" type="button" data-category="${category}">${category}</button>
  `).join("");
  filterBar.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    state.category = button.dataset.category;
    renderFilters();
    renderExhibits();
  }));
}

function renderExhibits() {
  const visible = filteredExhibits();
  grid.innerHTML = "";
  const template = document.querySelector("#exhibit-template");
  visible.forEach((exhibit) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".exhibit-card");
    card.querySelector(".card-art").style.setProperty("--card-color", exhibit.color);
    card.querySelector(".card-symbol").textContent = exhibit.symbol;
    card.querySelector(".card-category").textContent = exhibit.category;
    card.querySelector(".card-time").textContent = exhibit.time;
    card.querySelector(".card-title").textContent = exhibit.title;
    card.querySelector(".card-summary").textContent = exhibit.summary;
    card.querySelector(".card-link").addEventListener("click", () => openExhibit(exhibit));
    grid.appendChild(fragment);
  });
  resultCount.textContent = `${visible.length} exhibit${visible.length === 1 ? "" : "s"} on display`;
  emptyState.hidden = visible.length !== 0;
}

function openExhibit(exhibit) {
  const isSaved = state.saved.has(exhibit.id);
  dialogContent.innerHTML = `
    <div class="dialog-art" style="--dialog-color: ${exhibit.color}"><span aria-hidden="true">${exhibit.symbol}</span></div>
    <div class="dialog-body">
      <div class="card-meta"><span>${exhibit.category}</span><span>${exhibit.time} read</span></div>
      <h2 id="dialog-title">${exhibit.title}</h2>
      <p>${exhibit.content}</p>
      <div class="key-fact"><strong>Key fact</strong><p>${exhibit.fact}</p></div>
      <section class="quiz" aria-labelledby="quiz-title">
        <h3 id="quiz-title">A small knowledge check</h3>
        <p>${exhibit.quiz.question}</p>
        <div class="quiz-options">
          ${exhibit.quiz.options.map((option, index) => `<button class="quiz-option" type="button" data-index="${index}">${option}</button>`).join("")}
        </div>
        <p class="quiz-feedback" aria-live="polite"></p>
      </section>
      <button class="dialog-save ${isSaved ? "is-saved" : ""}" type="button">${isSaved ? "Saved to your collection" : "Save this exhibit"}</button>
    </div>
  `;
  dialogContent.querySelectorAll(".quiz-option").forEach((button) => button.addEventListener("click", () => {
    const selected = Number(button.dataset.index);
    const correct = selected === exhibit.quiz.answer;
    dialogContent.querySelectorAll(".quiz-option").forEach((item) => { item.disabled = true; });
    button.classList.add(correct ? "is-correct" : "is-wrong");
    if (!correct) dialogContent.querySelector(`[data-index="${exhibit.quiz.answer}"]`).classList.add("is-correct");
    dialogContent.querySelector(".quiz-feedback").textContent = correct ? "Correct. Nice observation!" : `Not quite. The answer is: ${exhibit.quiz.options[exhibit.quiz.answer]}.`;
  }));
  dialogContent.querySelector(".dialog-save").addEventListener("click", () => {
    const saving = !state.saved.has(exhibit.id);
    if (saving) state.saved.add(exhibit.id); else state.saved.delete(exhibit.id);
    updateSaved();
    openExhibit(exhibit);
  });
  dialog.showModal();
}

function renderFeatured() {
  const exhibit = exhibits[0];
  document.querySelector("#featured-exhibit").innerHTML = `
    <div class="featured-art" style="--featured-color: ${exhibit.color}"><span class="featured-symbol" aria-hidden="true">${exhibit.symbol}</span></div>
    <div class="featured-content">
      <div class="card-meta"><span>${exhibit.category}</span><span>${exhibit.time} read</span></div>
      <h3>${exhibit.title}</h3>
      <p>${exhibit.summary}</p>
      <button class="button button-primary" id="featured-open" type="button">Enter exhibit <span aria-hidden="true">→</span></button>
    </div>
  `;
  document.querySelector("#featured-open").addEventListener("click", () => openExhibit(exhibit));
}

searchInput.addEventListener("input", (event) => { state.query = event.target.value.trim(); renderExhibits(); });
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#surprise-button").addEventListener("click", () => openExhibit(exhibits[Math.floor(Math.random() * exhibits.length)]));
document.querySelector("#favourites-button").addEventListener("click", () => {
  state.category = "All";
  state.query = "";
  searchInput.value = "";
  renderFilters();
  grid.innerHTML = "";
  const saved = exhibits.filter((exhibit) => state.saved.has(exhibit.id));
  if (!saved.length) { document.querySelector("#collection").scrollIntoView(); emptyState.hidden = false; emptyState.textContent = "Your saved collection is empty. Open an exhibit and select Save this exhibit."; resultCount.textContent = "0 saved exhibits"; return; }
  state.query = "";
  const original = exhibits.filter((exhibit) => state.saved.has(exhibit.id));
  const template = document.querySelector("#exhibit-template");
  original.forEach((exhibit) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".card-art").style.setProperty("--card-color", exhibit.color);
    fragment.querySelector(".card-symbol").textContent = exhibit.symbol;
    fragment.querySelector(".card-category").textContent = exhibit.category;
    fragment.querySelector(".card-time").textContent = exhibit.time;
    fragment.querySelector(".card-title").textContent = exhibit.title;
    fragment.querySelector(".card-summary").textContent = exhibit.summary;
    fragment.querySelector(".card-link").addEventListener("click", () => openExhibit(exhibit));
    grid.appendChild(fragment);
  });
  emptyState.hidden = true;
  resultCount.textContent = `${saved.length} saved exhibit${saved.length === 1 ? "" : "s"}`;
  document.querySelector("#collection").scrollIntoView();
});

renderFeatured();
renderFilters();
renderExhibits();
updateSaved();
