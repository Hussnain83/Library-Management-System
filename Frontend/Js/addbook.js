document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("add-book-form");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const categoryInput = document.getElementById("category");
  const copiesInput = document.getElementById("availableCopies");
  const message = document.getElementById("message-container");
  

  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const category = categoryInput.value;
    const availableCopies = +copiesInput.value;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://library-management-system-production-95ee.up.railway.app/book/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ title, author, category, availableCopies }),
      });

      const data = await res.json();

      // clear old styles
      message.className = "message-container";  

      if (res.ok) {
        message.textContent = data.message || "Book added successfully!";
        message.classList.add("success");
      } else {
        message.textContent = data.message || "Failed to add book.";
        message.classList.add("error");
      }
    } catch (error) {
      console.error("Error:", error);
      message.textContent = "Something went wrong. Please try again.";
      message.className = "message-container error";
    }
  });
  backButtonf();
});


function backButtonf() {
  const cancel = document.getElementById("cancel-btn");
  cancel.addEventListener("click", async (e) => {
    window.location.href = "./Dashboard.html";
  });
}