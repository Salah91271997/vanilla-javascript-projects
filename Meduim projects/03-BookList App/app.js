// Book Class :Represnt a Book
class Book {
  constructor(title, author, isbm) {
    this.title = title;
    this.author = author;
    this.isbm = isbm;
  }
}

// UI class : Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbm}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // clear alert message
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}
// Store Class :Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, iten) => {
      if (book.isbn === isbn) {
        books.slpice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Event:display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event :add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent sbmit
  e.preventDefault();
  // Get Form Values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  // validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookToList(book);

    // Add book to localStorage
    Store.addBook(book);

    // show success  message
    UI.showAlert("Book Added Successfully", "success");
    // clear fields
    document.querySelector("#book-form").reset();
  }
});

// Event: Remove a Book

document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove Book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showAlert("Book removed Successfully", "success");
});
