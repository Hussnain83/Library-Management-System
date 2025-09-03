document.addEventListener("DOMContentLoaded", ()=> {
   const registerForm= document.getElementById("registerForm");
   const nameInput= document.getElementById("name");
   const emailInput= document.getElementById("email");
   const passwordInput= document.getElementById("password");
   const roleInput= document.getElementById("role");
   const submitButton= document.getElementById("btn");

   registerForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;
    
    try{
        const res = await fetch("https://library-management-system-production-95ee.up.railway.app/user/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role}),
      });
      console.log("Status:", res.status);
      const data = await res.json();
      if (res.ok) {
        
        alert("Signup successful ✅" );
        console.log("Token:", data.token);
         // save token in localStorage
        localStorage.setItem("token", data.token);
        
        window.location.href = "./Dashboard.html";
      }
      else{
        alert("Signup failed " + data.error);
      }

    }
    catch(error){
        console.log("Error", error);
        alert("Something went wrong");

    }
   })
})