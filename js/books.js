/* eslint-disable no-plusplus */
import * as storage from './dataStorage.js';

class BooksManager {
  constructor(booksContainer) {
    this.arrBooks = [];
    this.booksContainer = booksContainer;
  }

  get getBooks() {
    return this.arrBooks;
  }

  set setBooks(arr) {
    this.arrBooks = [...arr];
  }

  Book(title, author) {
    this.title = title;
    this.author = author;
  }

  displayBooks() {
    this.booksContainer.innerHTML = '';
    for (let i = 0; i < this.arrBooks.length; i++) {
      const book = this.arrBooks[i];
      const bookBody = document.createElement('div');
      const title = document.createElement('p');
      const author = document.createElement('p');
      const removeButton = document.createElement('button');

      title.textContent = book.title;
      author.textContent = book.author;
      removeButton.id = `remove${i}`;
      removeButton.textContent = 'remove';
      removeButton.classList.add('remove');
      bookBody.classList.add('bookdiv');
      bookBody.append(title, author, removeButton);
      this.booksContainer.append(bookBody);
    }
  }

  addBook(title, author) {
    this.arrBooks.push(new this.Book(title, author));
    this.displayBooks();
  }

  removeBook(index) {
    this.arrBooks = this.arrBooks.filter((_, position) => position !== index);
    this.displayBooks();
  }
}

const booksContainer = document.getElementById('booksContainer');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const addButton = document.getElementById('addBtn');
const storageAvailable = storage.storageAvailable();
const booksManager = new BooksManager(booksContainer);

if (storageAvailable) {
  booksManager.setBooks = storage.getBooks;
}

addButton.addEventListener('click', () => {
  if (inputTitle.validity.valid && inputAuthor.validity.valid) {
    booksManager.addBook(inputTitle.value, inputAuthor.value);

    if (storageAvailable) {
      storage.setBooks(booksManager.getBooks());
    }
    inputTitle.value = '';
    inputAuthor.value = '';
  }
});

booksContainer.addEventListener('click', (event) => {
  const regex = /(?<=remove)\d+/;
  const { id } = event.target;
  if (regex.test(id)) {
    const index = parseInt(id.match(regex)[0], 10);
    booksManager.removeBook(index);
    if (storageAvailable) {
      storage.setBooks(booksManager.getBooks());
    }
  }
});

export default function showBooks() {
  booksContainer.displayBooks();
}