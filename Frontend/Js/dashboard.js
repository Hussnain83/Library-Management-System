// Simple variables to store user info
let currentUser = null;
let isUserAdmin = false;

// When page loads, start everything
document.addEventListener('DOMContentLoaded', function() {
    startDashboard();
});

// Main function to start dashboard
async function startDashboard() {
    try {
        // Get user info from backend
        const userInfo = await getUserInfo();
        
        if (userInfo) {
            // Store user info
            currentUser = userInfo;
            
            // Check if user is admin
            if (userInfo.role === 'admin') {
                isUserAdmin = true;
            } else {
                isUserAdmin = false;
            }
            
            // Show user name
            showWelcomeMessage(userInfo.name);
            
            // Create the grid boxes
            createDashboardBoxes();
            
            // Hide loading and show dashboard
            hideLoadingShowDashboard();
            // user ifnormation
            checkUserInfo()
            
        } else {
            // Something wrong, go back to login
            logout();
        }
        
    } catch (error) {
        console.log('Error:', error);
        alert('Something went wrong. Please login again.');
         logout();
    }
}

// Get user info from backend
async function getUserInfo() {
    const token = localStorage.getItem('token');
    const backendURL = 'http://localhost:3000'; // Change this to your backend URL
    
    try {
        const response = await fetch(backendURL + '/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data.user || data; // Return user info
        } else {
            console.log('Failed to get user info');
            return null;
        }
        
    } catch (error) {
        console.log('Network error:', error);
        return null;
    }
}

// Show welcome message
function showWelcomeMessage(userName) {
    const welcomeElement = document.getElementById('welcome-user');
    if(isUserAdmin){
        welcomeElement.textContent = 'Welcome Admin, ' + userName;
    }
    else {
        welcomeElement.textContent = 'Welcome, ' + userName;
    }
    
}

// Create dashboard boxes based on user role
function createDashboardBoxes() {
    const gridContainer = document.getElementById('dashboard-grid');
    
    if (isUserAdmin) {
        // Admin sees 4 boxes
        gridContainer.innerHTML = `
            <div class="grid-box" onclick="goToBooks()">
                <div class="box-icon">📚</div>
                <h3>Books</h3>
                <p>Manage all books</p>
            </div>
            <div class="grid-box" onclick="goToUsers()">
                <div class="box-icon">👥</div>
                <h3>Users</h3>
                <p>View all users</p>
            </div>
            <div class="grid-box" onclick="goToRecords()">
                <div class="box-icon">📋</div>
                <h3>Records</h3>
                <p>All borrow records</p>
            </div>
            <div class="grid-box" onclick="goToReturns()">
                <div class="box-icon">🔄</div>
                <h3>Returns</h3>
                <p>Overdue books</p>
            </div>
        `;
    } else {
        // Regular user sees 3 boxes
        gridContainer.innerHTML = `
            <div class="grid-box" onclick="goToBooks()">
                <div class="box-icon">📚</div>
                <h3>Books</h3>
                <p>Browse available books</p>
            </div>
            <div class="grid-box" onclick="goToProfile()">
                <div class="box-icon">👤</div>
                <h3>Profile</h3>
                <p>View my profile</p>
            </div>
            <div class="grid-box" onclick="goToMyBorrows()">
                <div class="box-icon">📖</div>
                <h3>My Borrows</h3>
                <p>My borrowed books</p>
            </div>
        `;
    }
}

// Functions when boxes are clicked
function goToBooks() {
    if (isUserAdmin) {
         window.location.href = './book.html';
    } else {
        window.location.href = './book.html';
    }
}

function goToUsers() {
    if (isUserAdmin) {
        alert('Going to Users Management (Not built yet)');
        // Later: window.location.href = 'admin-users.html';
    } else {
        alert('You cannot access this');
    }
}

function goToRecords() {
    if (isUserAdmin) {
        alert('Going to All Records (Not built yet)');
        // Later: window.location.href = 'admin-records.html';
    } else {
        alert('You cannot access this');
    }
}

function goToReturns() {
    if (isUserAdmin) {
        alert('Going to Overdue/Returns (Not built yet)');
        // Later: window.location.href = 'admin-returns.html';
    } else {
        alert('You cannot access this');
    }
}

function goToProfile() {
    alert('Going to Profile Page (Not built yet)');
    // Later: window.location.href = 'profile.html';
}

function goToMyBorrows() {
    alert('Going to My Borrows (Not built yet)');
    // Later: window.location.href = 'my-borrows.html';
}

// Hide loading and show dashboard
function hideLoadingShowDashboard() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('dashboard-grid').classList.remove('hidden');
}

// For testing - check what user info we have
function checkUserInfo() {
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isUserAdmin);
}