// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function Ui() {

}

// Add book to list
Ui.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

// Show alert
Ui.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes to div
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.getElementById('book-form');

    // Add div to parent above form
    container.insertBefore(div, form);
    
    // Timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
    
}

// Delete book
Ui.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear feelds
Ui.prototype.clearFeelds = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    //  Instantiate book     
    const book = new Book(title, author, isbn);

    // Instantiate UI 
    const ui = new Ui(); 

    // Validate form
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields.', 'error');
        return
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('Book Added!', 'success');

        // Clear feelds
        ui.clearFeelds();
    } 
    
});

// Add event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
    e.preventDefault();

    // Instantiate UI 
    const ui = new Ui();

    ui.deleteBook(e.target);

    ui.showAlert('Book removed', 'success');
    
});