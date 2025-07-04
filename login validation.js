document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="Password"]');
    const loginButton = document.querySelector('button');

    // Check for successful signup redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'success') {
        alert('Registration successful! Please log in.');
    }

    // Handle login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateLogin()) {
            authenticateUser();
        }
    });

    function validateLogin() {
        let isValid = true;
        clearErrors();

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        }

        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        }

        return isValid;
    }

    function authenticateUser() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === emailInput.value.trim());
        
        if (!user) {
            showError(emailInput, 'Email not registered');
            return;
        }

        if (user.password !== passwordInput.value.trim()) {
            showError(passwordInput, 'Incorrect password');
            return;
        }

        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to dashboard
        window.location.href = 'Homepage.html';
    }

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        input.parentNode.appendChild(error);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.remove());
    }
});