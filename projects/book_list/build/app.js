'use strict';

// Book constructer
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// Event Listener when Dom gets loaded
document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);
// Ui Contructor

function UI() {}
UI.prototype.addBookToList = function (book) {
	var list = document.getElementById('book-list');
	// Create tr element
	var row = document.createElement('tr');
	// insert cols
	row.innerHTML = '\n\t\t<td>' + book.title + '</td>\n\t\t<td>' + book.author + '</td>\n\t\t<td>' + book.isbn + '</td>\n\t\t<td><a href="#" class="delete">x</a></td>\n\t';
	list.appendChild(row);
};

// Clear fields
UI.prototype.clearFields = function () {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};
// Show alert
UI.prototype.showAlert = function (msg, className) {
	// Create Div
	var div = document.createElement('div');
	// Add classes
	div.className = 'alert ' + className;
	// Add text
	div.appendChild(document.createTextNode(msg));
	// Get Parent
	var container = document.querySelector('.container');
	var form = document.querySelector('#book-form');
	// Insert alert
	container.insertBefore(div, form);

	// Timout after 3s
	setTimeout(function () {
		document.querySelector('.alert').remove();
	}, 3000);
};

// Delete book
UI.prototype.deleteBook = function (target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
};

// Local Storage

// Get Existing Books From LocalStorage
function getBooksFromLocalStorage() {
	var books = void 0;
	if (localStorage.getItem('books') === null) {
		books = [];
	} else {
		books = JSON.parse(localStorage.getItem('books'));
	}

	books.forEach(function (book) {
		var ui = new UI();
		// Add book to list
		ui.addBookToList(book);
		// Clear fields
		ui.clearFields();
	});
}

// Add Book to LocalStorage
function addBookToLocalStorage(book) {
	var books = void 0;
	if (localStorage.getItem('books') === null) {
		books = [];
	} else {
		books = JSON.parse(localStorage.getItem('books'));
	}
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
}

// Remove Book From LocalStorage

function removeBookFromLocalStorage(bookitem) {
	var bookISBN = bookitem.firstElementChild.nextElementSibling.nextElementSibling.textContent;
	var books = void 0;
	if (localStorage.getItem('books') === null) {
		books = [];
	} else {
		books = JSON.parse(localStorage.getItem('books'));
	}
	books.forEach(function (book, index) {
		if (bookISBN === book.isbn) {
			books.splice(index, 1);
		}
	});

	localStorage.setItem('books', JSON.stringify(books));
}

// Check if there is already a book with the same ISBN
function checkDuplicateISBN(isbn) {
	if (localStorage.getItem('books') === null) {
		return false;
	}
	var books = JSON.parse(localStorage.getItem('books'));;
	for (var i = 0; i < books.length; i++) {
		if (books[i].isbn === isbn) {
			return true;
		}
	}
	return false;
}

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
	// Get form values
	var title = document.getElementById('title').value,
	    author = document.getElementById('author').value,
	    isbn = document.getElementById('isbn').value;

	// Instantiate book (init book)
	var book = new Book(title, author, isbn);

	// Instantiate UI
	var ui = new UI();
	//Validate

	if (title === '' || author === '' || isbn === "") {
		ui.showAlert('Please fill in all fields', 'error');
	} else if (checkDuplicateISBN(isbn)) {
		ui.showAlert('Book already exist', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);
		addBookToLocalStorage(book);

		ui.showAlert('Book Added', 'success');
		// Clear fields
		ui.clearFields();
	}

	e.preventDefault();
});

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function (e) {
	var ui = new UI();
	if (e.target.className === 'delete') {
		ui.deleteBook(e.target);
		removeBookFromLocalStorage(e.target.parentElement.parentElement);
		ui.showAlert('Book Removed', 'success');
	}
	e.preventDefault();
});
