const categoryInput = document.getElementById("categoryInput");
const searchBtn = document.getElementById("searchBtn");
const booksContainer = document.getElementById("booksContainer");

// Modal
const modal = document.getElementById("descriptionModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

// Cerca libri
searchBtn.addEventListener("click", async () => {
  const category = categoryInput.value.trim();
  if (!category) return alert("Inserisci una categoria");

  booksContainer.innerHTML = "Caricamento...";
  const books = await fetchBooksByCategory(category);

  if (books.length === 0) {
    booksContainer.innerHTML = "Nessun libro trovato.";
    return;
  }

  booksContainer.innerHTML = "";
  books.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
      <img src="${getCoverUrl(book)}" alt="${book.title}" onerror="this.src='img/no_cover.png'">
      <h3>${book.title}</h3>
      <p>${book.authors.map(a => a.name).join(", ")}</p>
      <button class="descBtn" data-key="${book.key}">Mostra descrizione</button>
    `;

    booksContainer.appendChild(bookDiv);
  });

  // Aggiungi event listener ai pulsanti descrizione
  document.querySelectorAll(".descBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const key = e.target.dataset.key;
      const title = e.target.closest(".book").querySelector("h3").textContent;

      modalTitle.textContent = title;
      modalDescription.textContent = "Caricamento...";
      modal.style.display = "block";

      const description = await fetchBookDescription(key);
      modalDescription.textContent = description;
    });
  });
});

// Chiudi modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
