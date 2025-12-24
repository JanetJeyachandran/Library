const books = [];

function createBook(title, author, pages, read) {
  return { id: Date.now(), title, author, pages, read };
}

function addBook(book) {
  books.push(book);
  showBooks();
}

function showBooks() {
  const container = document.querySelector("#books");
  container.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.dataset.id = book.id;

    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not Read"}</p>
      <button class="toggle">Toggle Read</button>
      <button class="delete">Delete</button>
    `;

    container.appendChild(div);
  });
}

document.querySelector("#addBookBtn").addEventListener("click", () => {
  document.querySelector("#bookDialog").showModal();
});

document.querySelector("#closeDialog").addEventListener("click", () => {
  document.querySelector("#bookDialog").close();
});

document.querySelector("#bookForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const book = createBook(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  addBook(book);
  e.target.reset();
  bookDialog.close();
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".book");
  if (!card) return;

  const id = Number(card.dataset.id);

  if (e.target.classList.contains("delete")) {
    const index = books.findIndex(book => book.id === id);
    books.splice(index, 1);
    showBooks();
  }

  if (e.target.classList.contains("toggle")) {
    const book = books.find(book => book.id === id);
    book.read = !book.read;
    showBooks();
  }
});
