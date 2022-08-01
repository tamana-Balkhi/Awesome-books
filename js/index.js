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
  displayBooks();
});

function displayBooks() {
  for (let i = 0; i < arrBooks.length; i++) {
    const book = arrBooks[i];
    const bookBody = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h3');
    const removeButton = document.createElement('button');

    title.textContent = book.title;
    author.textContent = book.author;
    removeButton.textContent = 'remove';
    bookBody.append(title, author, removeButton);
    booksContainer.append(bookBody);
  }

}
displayBooks();
