// Check if user is logged in (for protected pages)
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first!');
    window.location.href = './login.html';
    return false;
  }
  return true;
}

// Check if already logged in (for login/register pages)
function redirectIfLoggedIn() {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = './dashboard.html';
  }
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  alert('Logged out successfully!');
  window.location.href = './login.html';
}