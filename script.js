// ====== Toggle Between Forms ======
const showLoginBtn = document.getElementById('showLogin');
const showRegisterBtn = document.getElementById('showRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

showLoginBtn.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  showLoginBtn.classList.add('active');
  showRegisterBtn.classList.remove('active');
});

showRegisterBtn.addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  showRegisterBtn.classList.add('active');
  showLoginBtn.classList.remove('active');
});

// ====== Handle Registration ======
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const full_name = document.getElementById('reg-fullname').value;
  const email = document.getElementById('reg-email').value;
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const confirm_password = document.getElementById('reg-confirm').value;
  const message = document.getElementById('registerMessage');

  if (password !== confirm_password) {
    message.textContent = "❌ Passwords don't match";
    message.style.color = 'red';
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, username, password, confirm_password }),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Registration successful! Please login.";
      message.style.color = 'lightgreen';
      document.getElementById('registerForm').reset();
    } else {
      message.textContent = data.message || "Registration failed";
      message.style.color = 'red';
    }
  } catch (err) {
    message.textContent = "Server error";
    message.style.color = 'red';
  }
});

// ====== Handle Login ======
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const login = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const message = document.getElementById('loginMessage');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Login successful!";
      message.style.color = 'lightgreen';
      // redirect to dashboard
      window.location.href = "/dashboard.html";
    } else {
      message.textContent = data.message || "Invalid login details";
      message.style.color = 'red';
    }
  } catch (err) {
    message.textContent = "Server error";
    message.style.color = 'red';
  }
});
