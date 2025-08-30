async function checkIfUserIsAdmin() {
    const token = localStorage.getItem("token");
    const backendURL = "http://localhost:3000";
    
    try {
        const response = await fetch(backendURL + "/user/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Check if user role is admin
            if (data.role === "admin") {
                return true;  // User is admin
            } else {
                return false; // User is not admin
            }
        } else {
            return false; // API call failed, assume not admin
        }
        
    } catch (error) {
        console.log('Error checking admin status:', error);
        return false; // Error occurred, assume not admin
    }
}