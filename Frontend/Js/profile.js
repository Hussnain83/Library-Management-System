document.addEventListener("DOMContentLoaded", async ()=> {
    backButtonf();
   const fetchis = await fetchUserInfo();
   displayUserInfo(fetchis);
   fetchingForUpdate();
  
});

// fetching userinfo
async function fetchUserInfo(){
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://library-management-system-production-95ee.up.railway.app/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.status);
    const data = await response.json();
    return data;

    }
    catch(error){
        console.error("Error fetching books:", error);
    throw error;
    }
}
// displaying user info
function displayUserInfo(data){
    const profileDetails= document.getElementById("profile-details");
    const profileName= document.getElementById("profile-name");
    const profileEmail= document.getElementById("profile-email");
    const profileRole= document.getElementById("profile-role");    
    
    profileName.textContent = data.name;
    profileEmail.textContent = data.email;
    profileRole.textContent= data.role;
}

// fetching for updation

async function fetchingForUpdate() {
  const token = localStorage.getItem("token");
  const formInput = document.getElementById("update-profile-form");
  const message = document.getElementById("message-container");

  formInput.addEventListener("submit", async (e) => {
    e.preventDefault();

    // grab values from correct input IDs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    try {
      // Build update data dynamically
      const updateData = { name, email };
      if (newPassword !== "") {
        updateData.currentPassword = currentPassword;
        updateData.password = newPassword;
      }

      const response = await fetch("https://library-management-system-production-95ee.up.railway.app/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      // clear old styles
      message.className = "message-container";

      if (!response.ok) {
        message.textContent = data.message || data.error || "Failed to update profile.";
        message.classList.add("error");
        return;
      }

      // success
      message.textContent = data.message || "Profile updated successfully!";
      message.classList.add("success");

      // optionally update displayed profile info immediately
      if (data.response) {
        displayUserInfo(data.response);
      }

    } catch (error) {
      console.error("Error updating user:", error);
      message.className = "message-container error";
      message.textContent = "Something went wrong. Please try again.";
    }
     const fetchis = await fetchUserInfo();
      displayUserInfo(fetchis);
  });
};

function backButtonf() {
  const backButton = document.getElementById("back-btn");
  backButton.addEventListener("click", async (e) => {
    window.location.href = "./Dashboard.html";
  });
}