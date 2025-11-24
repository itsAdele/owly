// ELEMENTI 
const categoryInput = document.getElementById("categoryInput");
const searchBtn = document.getElementById("searchBtn");
const booksContainer = document.getElementById("booksContainer");

// MODAL
const modal = document.getElementById("descriptionModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");


// FUNZIONI 

function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.src) el.src = options.src;
  if (options.alt) el.alt = options.alt;

  if (options.dataset) {
    for (let key in options.dataset) {
      el.dataset[key] = options.dataset[key];
    }
  }

  return el;
}

function append(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}


// CARD LIBRO

function createBookCard(book) {
  const card = createElement("div", { className: "book" });

  const img = createElement("img", {
    src: getCoverUrl(book),
    alt: book.title
  });
  img.onerror = () => (img.src = "img/no_cover.png");

  const title = createElement("h3", { text: book.title });

  const authors = createElement("p", {
    text: book.authors.map(a => a.name).join(", ")
  });

  const btn = createElement("button", {
    className: "descBtn",
    text: "Mostra descrizione",
    dataset: { key: book.key }
  });

  append(card, img, title, authors, btn);
  return card;
}


// CERCA LIBRI 

searchBtn.addEventListener("click", async () => {
  const category = categoryInput.value.trim();
  if (!category) return alert("Inserisci una categoria");

  booksContainer.textContent = "Caricamento...";

  const books = await fetchBooksByCategory(category);

  if (books.length === 0) {
    booksContainer.textContent = "Nessun libro trovato.";
    return;
  }

  booksContainer.textContent = "";

  books.forEach(book => {
    booksContainer.appendChild(createBookCard(book));
  });
});


// EVENTO DELEGATO PER I BOTTONI 
booksContainer.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("descBtn")) return;

  const key = e.target.dataset.key;
  const title = e.target.closest(".book").querySelector("h3").textContent;

  modalTitle.textContent = title;
  modalDescription.textContent = "Caricamento...";
  modal.style.display = "block";

  const description = await fetchBookDescription(key);
  modalDescription.textContent = description;
});


// CHIUDI MODAL 

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
