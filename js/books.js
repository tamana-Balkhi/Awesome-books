/* eslint-disable no-plusplus */
import * as storage from './dataStorage.js';

const booksContainer = document.getElementById('booksContainer');
const title = document.getElementById('title');
const authorName = document.getElementById('author');
const addButton = document.getElementById('addBtn');
const storageAvailable = storage.storageAvailable();
let arrBooks = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

export default function displayBooks() {
  if (storageAvailable) {
    arrBooks = storage.getBooks();
  }

  booksContainer.innerHTML = '';
  for (let i = 0; i < arrBooks.length; i++) {
    const book = arrBooks[i];
    const bookBody = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const removeButton = document.createElement('button');

    title.textContent = book.title;
    author.textContent = book.author;
    removeButton.id = `remove${i}`;
    removeButton.textContent = 'remove';
    bookBody.append(title, author, removeButton);
    booksContainer.append(bookBody);
  }
}

function addBook(title, author) {
  const book = new Book(title, author);
  arrBooks.push(book);

  if (storageAvailable) {
    storage.setBooks(arrBooks);
  }

  displayBooks();
}

function removeBook(index) {
  arrBooks = arrBooks.filter((_, position) => position !== index);
  if (storageAvailable) {
    storage.setBooks(arrBooks);
  }

  displayBooks();
}

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  addBook(title.value, authorName.value);
  title.value = '';
  authorName.value = '';
});

booksContainer.addEventListener('click', (event) => {
  const regex = /(?<=remove)\d+/;
  const { id } = event.target;
  if (regex.test(id)) {
    const index = parseInt(id.match(regex)[0], 10);
    removeBook(index);
  }
});
