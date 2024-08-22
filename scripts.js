// Registration Logic
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Username already exists!');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            window.location.href = 'login.html';
        }
    }
});

// Login Logic
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Display Username on Dashboard
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('username-display').textContent = loggedInUser;
    } else if (window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
});

// Logout Logic
document.getElementById('logout-button')?.addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});
