// In book.js
let admin = false;

document.addEventListener("DOMContentLoaded", async function () {
  await checkAdmin(); // check if its admin or not
  addBookFunc(); // go to add book
  backButtonf(); // back to dashboard

  // Individual book card elements
  // const bookCard = document.getElementById("book-card");
  // const bookInfo = document.getElementById("book-info");
  // const bookTitle = document.getElementById("book-title");
  // const bookAuthor = document.getElementById("book-author");
  // const bookCopies = document.getElementById("book-copies");
  // const bookActions = document.getElementById("book-actions");
  // const deleteBtn = document.getElementById("delete-btn");
   
  const fetchbo = await fetchAllBooks();
  displayBooks(fetchbo);
  await updateBorrowedButtons();
});

// admin function called here

async function checkAdmin() {
  const isAdmin = await checkIfUserIsAdmin();

  if (isAdmin) {
    console.log("User is admin - show admin features");
    admin = true;
    console.log(admin);
    // Admin can see the button → do nothing
  } else {
    console.log("User is regular user - hide admin features");
    admin = false;
    console.log("button"); // Hide only the Add button
  }
}

// Admin can add Book

function addBookFunc() {
  const addButton = document.getElementById("add-btn");

  if (addButton) {
    // ✅ prevent null error
    if (admin) {
      console.log("admin");
      addButton.classList.remove("hidden");
      addButton.addEventListener("click", () => {
        window.location.href = "./addbook.html";
      });
    } else {
      console.log("user");
      addButton.classList.add("hidden");
    }
  }
}

// go back to the dashboard

function backButtonf() {
  const backButton = document.getElementById("back-btn");
  backButton.addEventListener("click", async (e) => {
    window.location.href = "./Dashboard.html";
  });
}

async function fetchAllBooks() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/book/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.books; // returning books array directly;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

// display Books
async function displayBooks(books) {
  // clear existing content
  const booksGrid = document.getElementById("books-grid");
  booksGrid.innerHTML = "";
  books.forEach((book) => {
    let buttonHTML;

    if (admin) {
      buttonHTML = `<button class="delete-btn" data-book-id="${book._id}">Delete</button>`;
    } else {
      if (book.availableCopies < 1) {
        buttonHTML = `<button class="borrow-btn" data-book-id="${book._id}" disabled style="background-color: #9ca3af; cursor: not-allowed;">Not Available</button>`;
    } else {
        buttonHTML = `<button class="borrow-btn" data-book-id="${book._id}">Borrow</button>`;
    }
    }

    const bookCard = `
         <div class= "book-card">
         <div class= "book-info">
         <h3 class="book-title">${book.title}</h3>
         <p class="book-author">Author: ${book.author}</p>
         <p class="book-copies">Available Copies: ${book.availableCopies}</p>
         </div>
          <div class="book-actions">
                ${buttonHTML}
            </div>
         </div>`;
    booksGrid.innerHTML += bookCard;
  });

  // clicking of the delete and borrow button

  if (admin) {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const bookId = e.target.getAttribute('data-book-id');
                deleteBook(bookId);
            });
        });
    } else {
        const borrowButtons = document.querySelectorAll('.borrow-btn');
        borrowButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const bookId = e.target.getAttribute('data-book-id');
                borrowBook(bookId);
            });
        });
    }

    await updateBorrowedButtons();

}

// deleting book function
async function deleteBook(bookId){
    console.log(bookId);
    try {
        const token = localStorage.getItem('token');
        const res = await fetch (`http://localhost:3000/book/${bookId}`, {
            method: "DELETE",
            headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        });
        const data = await res.json();
        console.log("status: ", res.status);
         if (res.ok) {
            alert("Book deleted successfully!");
            // Refresh the books list
            const books = await fetchAllBooks();
            displayBooks(books);
        } else {
            alert("Failed to delete book");
        }
    }
    catch (error) {
        console.log("Error", error);
        alert("Something went wrong");
    }
}

// function to borrow book
async function borrowBook(bookId) {
    console.log("Borrowing book ID:", bookId);
    
    // Get the specific button that was clicked
    const borrowButton = document.querySelector(`[data-book-id="${bookId}"]`);
    
    // Disable button and show loading state
    borrowButton.disabled = true;
    borrowButton.textContent = "Borrowing...";
    
    try {
        const token = localStorage.getItem('token');
        
        const res = await fetch(`http://localhost:3000/borrow/${bookId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        });
        
        const data = await res.json();
        console.log("Borrow response:", data);
        
        if (res.ok) {
            // Success - change button to "Borrowed"
            borrowButton.textContent = "Borrowed";
            borrowButton.style.backgroundColor = "#22c55e";
            borrowButton.style.cursor = "not-allowed";
            
            alert("Book borrowed successfully!");
            // Just refresh the entire books list - much simpler!
            const books = await fetchAllBooks();
            displayBooks(books);
            
        } else {
            // Error - reset button
            borrowButton.disabled = false;
            borrowButton.textContent = "Borrow";
            alert(data.message || "Failed to borrow book");
        }
        
    } catch (error) {
        console.log("Error borrowing book:", error);
        
        // Reset button on error
        borrowButton.disabled = false;
        borrowButton.textContent = "Borrow";
        alert("Something went wrong while borrowing the book");
    }
}

// fetching api to check if we have alreadyt borrowed a book

async function fetchUserBorrows() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:3000/myborrows', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
        return [];
    }
}

// change text to borrowed if the user has already borrowed books

async function updateBorrowedButtons() {
   console.log("updateBorrowedButtons called, admin:", admin);
    if (!admin) {
        const borrowedData = await fetchUserBorrows();
        const borrowedBooks = borrowedData.record; // ✅ Get the array from record property
        
        borrowedBooks.forEach(borrowedBook => {
          console.log("foreach");
            const bookId = borrowedBook.book._id; // ✅ The book ID is in the 'book' field
            console.log( "bookid is his",bookId)

            const borrowButton = document.querySelector(`[data-book-id="${bookId}"]`);
            
            if (borrowButton) {
                borrowButton.textContent = "Borrowed";
                borrowButton.disabled = true;
                borrowButton.style.backgroundColor = "#22c55e";
                
            }
        });

        
    }
}