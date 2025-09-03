document.addEventListener("DOMContentLoaded", async ()=> {
   const fetchis= await fetchUsersRecordAPI();
   displayUsers(fetchis);
   backButton();
    
});

function backButton(){
     const backButton = document.getElementById("back-btn");
  backButton.addEventListener("click", async (e) => {
    window.location.href = "./Dashboard.html";
  });
}

async function fetchUsersRecordAPI() {
   try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://library-management-system-production-95ee.up.railway.app/records", {
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
    return data;                     
    
   } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
   }
}

function displayUsers(data){
    const records = data.users;
    console.log(records);
    const recordsBody = document.getElementById("records-body");
     records.forEach(record => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.user?.name || "Unknown User"} (${record.user?._id || "No ID"})</td>
      <td>${record.book?.title || "Unknown Book"} (${record.book?._id || "No ID"})</td>
      <td>${record.status}</td>
      <td>${record.borrowDate ? new Date(record.borrowDate).toLocaleDateString() : "N/A"}</td>
      <td>${record.returnDate ? new Date(record.returnDate).toLocaleDateString() : "Not Returned"}</td>
    `;

    recordsBody.appendChild(row);
  });
}
