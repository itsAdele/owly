const BASE_URL = "https://openlibrary.org";

// Recupera libri per categoria
async function fetchBooksByCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${category}.json`);
    const data = await response.json();
    return data.works || [];
  } catch (error) {
    console.error("Errore fetchBooksByCategory:", error);
    return [];
  }
}

// Recupera descrizione libro tramite key
async function fetchBookDescription(key) {
  try {
    const response = await fetch(`${BASE_URL}${key}.json`);
    const data = await response.json();
    return data.description ? (typeof data.description === 'string' ? data.description : data.description.value) : "Descrizione non disponibile.";
  } catch (error) {
    console.error("Errore fetchBookDescription:", error);
    return "Descrizione non disponibile.";
  }
}

// Ottieni URL copertina
function getCoverUrl(book) {
  if (book.cover_id) return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
  if (book.cover_edition_key) return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
  return "img/no_cover.png"; // placeholder locale
}
