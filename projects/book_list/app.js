// Book constructer
function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;


}

// Event Listener when Dom gets loaded
document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);
// Ui Contructor

function UI(){}
UI.prototype.addBookToList = function(book){
	const list = document.getElementById('book-list');
	// Create tr element
	const row = document.createElement('tr');
	// insert cols
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">x</a></td>
	`
	list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';

}
// Show alert
UI.prototype.showAlert = function(msg, className){
	// Create Div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	// Add text
	div.appendChild(document.createTextNode(msg));
	// Get Parent
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	// Insert alert
	container.insertBefore(div, form);

	// Timout after 3s
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);

}

// Delete book
UI.prototype.deleteBook = function(target) {
	if(target.className === 'delete'){
		target.parentElement.parentElement.remove();
	}
}



// Local Storage

// Get Existing Books From LocalStorage
function getBooksFromLocalStorage() {
    let books;
	if(localStorage.getItem('books') === null){
		books = [];
	}else{
		books = JSON.parse(localStorage.getItem('books'));
	}

    books.forEach(function(book){
    	const ui = new UI();
        // Add book to list
		ui.addBookToList(book);
		// Clear fields
		ui.clearFields();
    });

}

// Add Book to LocalStorage
function addBookToLocalStorage(book) {
    let books;
	if(localStorage.getItem('books') === null){
		books = [];
	}else{
		books = JSON.parse(localStorage.getItem('books'));
	}
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
}

// Remove Book From LocalStorage

function removeBookFromLocalStorage(bookitem){
    let bookISBN = bookitem.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    let books;
    if(localStorage.getItem('books') === null){
		books = [];
	}else{
		books = JSON.parse(localStorage.getItem('books'));
	}
	books.forEach(function(book, index){
   		if(bookISBN === book.isbn){
			books.splice(index, 1);
		}
	});

	localStorage.setItem('books', JSON.stringify(books));
}


// Check if there is already a book with the same ISBN
function checkDuplicateISBN(isbn) {
    if(localStorage.getItem('books') === null){
        return false;    
    }
    let books = JSON.parse(localStorage.getItem('books'));;
   	for(let i = 0; i < books.length; i++) {
        if(books[i].isbn === isbn){
            return true;        
        }
    }
    return false;
}



// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
	// Get form values
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;

    
    
	// Instantiate book (init book)
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();
    //Validate

    if(title === '' || author === '' || isbn === ""){
	    ui.showAlert('Please fill in all fields', 'error');

    }else if(checkDuplicateISBN(isbn)){
        ui.showAlert('Book already exist', 'error');
    }else{
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

document.getElementById('book-list').addEventListener('click', function(e){
	const ui = new UI();
    if(e.target.className === 'delete'){
	    ui.deleteBook(e.target);
        removeBookFromLocalStorage(e.target.parentElement.parentElement);    
	    ui.showAlert('Book Removed', 'success');
    }
	e.preventDefault();
})
