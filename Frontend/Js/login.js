document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let loginButton = document.getElementsByClassName("btn");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    // console.log(email); console.log(password);
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Status:", res.status);
      const data = await res.json();
      if (res.ok) {
        
        alert("Login successful ✅");
        console.log("Token:", data.response);

        // save token in localStorage
        localStorage.setItem("token", data.response);

        window.location.href = "./Dashboard.html";
      } else {
        alert("Login failed " + data.error);
      }
    } catch (error) {
      console.log("Error", error);
      alert("Something went wrong");
    }
  });
});
