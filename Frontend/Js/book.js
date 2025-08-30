// In book.js
let admin = false;

document.addEventListener('DOMContentLoaded', async function() {
   await checkAdmin(); // check if its admin or not 
     // back to dashboard
   
   const addButton = document.getElementById("add-btn");

   if (addButton) { // ✅ prevent null error
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
    backButtonf();

});

// admin function called here

async function checkAdmin(){
    const isAdmin = await checkIfUserIsAdmin();
    
    if (isAdmin) {
        console.log("User is admin - show admin features");
        admin = true;
        console.log(admin);
        // Admin can see the button → do nothing
    } else {
        console.log("User is regular user - hide admin features");
        admin = false;       
        console.log("button")  // Hide only the Add button
    }
}



 function backButtonf()  {
    const backButton = document.getElementById("back-btn");
    backButton.addEventListener("click", async (e)=> {
    window.location.href = "./Dashboard.html";
    
    })
}