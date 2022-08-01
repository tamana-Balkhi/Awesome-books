const booksContainer = document.getElementById('booksContainer');
const title = document.getElementById('title');
const authorName = document.getElementById('author');
const addButton = document.getElementById('addBtn');

const arrBooks = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(title, author) {
  const book = new Book(title, author);
  arrBooks.push(book);
  console.log(arrBooks);
}

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  addBook(title.value, authorName.value);
  title.value = '';
  authorName.value = '';
});

