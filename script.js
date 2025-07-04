document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form');
    const fullNameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelector('input[type="Phone number"]');
    const passwordInput = document.querySelector('input[type="Password"]');
    const registerButton = document.querySelector('button');

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            registerUser();
        }
    });

    // Validate all form fields
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Full Name validation
        if (fullNameInput.value.trim() === '') {
            showError(fullNameInput, 'Full name is required');
            isValid = false;
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }

        // Phone validation
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }

        // Password validation
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    // Register new user
    function registerUser() {
        const user = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            password: passwordInput.value.trim()
        };

        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(u => u.email === user.email)) {
            showError(emailInput, 'Email already registered');
            return;
        }

        // Add new user
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to login page with success message
        window.location.href = 'login.html?signup=success';
    }

    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
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