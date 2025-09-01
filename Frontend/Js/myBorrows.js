document.addEventListener("DOMContentLoaded", async ()=> {
    const fetchi = await fetchmyBorrows();
    displayMyBorrows(fetchi);
    backButtonf();



})

async function fetchmyBorrows(){
    try{
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/myborrows",{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;

    }
    catch(error){
        console.error('Error fetching borrowed books:', error);
    }
}

function displayMyBorrows(data){
    // console.log(data.record[0].book.title);
    // console.log(data.record[0].status);

     const borrowsGrid = document.getElementById("borrows-grid");
     const emptyState = document.getElementById("empty-state");

     borrowsGrid.innerHTML = "";

     if (!data || !data.record || data.record.length === 0) {
     emptyState.classList.remove("hidden");
     return;
  }
  data.record.forEach(record => {
    const statusClass =
  record.status === "borrowed" ? "status-borrowed" : "status-returned";
  const borrowCard = `
      <div class="borrow-card">
        <div class="status-badge ${statusClass}">${record.status}</div>
        <div class="book-details">
          <h4 class="book-title">${record.book.title}</h4>
          <p class="book-author">Author: ${record.book.author}</p>
          <p class="book-category">Category: ${record.book.category}</p>
        </div>
        <div class="borrow-dates">
          <div class="date-item">
            <span class="date-label">Borrowed:</span>
            <span class="date-value borrow-date">${new Date(
              record.borrowDate
            ).toLocaleDateString()}</span>
          </div>
          <div class="date-item">
            <span class="date-label">Return By:</span>
            <span class="date-value return-date">${new Date(
              record.returnDate
            ).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `;
     borrowsGrid.innerHTML += borrowCard;
  });
}

function backButtonf() {
  const backButton = document.getElementById("back-btn");
  backButton.addEventListener("click", async (e) => {
    window.location.href = "./Dashboard.html";
  });
}