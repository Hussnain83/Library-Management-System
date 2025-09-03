document.addEventListener("DOMContentLoaded", () => {
  const inputForm = document.getElementById("returnBookForm");
  const userInput = document.getElementById("userId");
  const bookInput = document.getElementById("bookId");
  const messageBox = document.getElementById("message");

  inputForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = userInput.value.trim();
    const bookId = bookInput.value.trim();

    if (!userId || !bookId) {
      messageBox.textContent = "User ID and Book ID are required!";
      messageBox.className = "message error";
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://library-management-system-production-95ee.up.railway.app/return/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json(); // backend response

      if (res.ok) {
        messageBox.textContent = data.message || "Book returned successfully!";
        messageBox.className = "message success";
      } else {
        messageBox.textContent = data.message || "Failed to return book!";
        messageBox.className = "message error";
      }
    } catch (error) {
      console.error("Error:", error);
      messageBox.textContent = "Something went wrong. Please try again.";
      messageBox.className = "message error";
    }
  });
});
