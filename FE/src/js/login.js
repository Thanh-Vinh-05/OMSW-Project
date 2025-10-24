// login.js

// Mảng giả lập user với role
const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'customer@example.com', password: 'customer123', role: 'customer' }
];

// Toggle password visibility for login form
function togglePassword() {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

// Toggle password visibility for register form
function toggleRegisterPassword() {
  const passwordInput = document.getElementById('registerPassword');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

function toggleConfirmPassword() {
  const passwordInput = document.getElementById('confirmPassword');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

// Show register form and hide login form
function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  clearMessages();
}

// Show login form and hide register form
function showLoginForm() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  clearMessages();
}

function clearMessages() {
  document.getElementById('errorMessage').textContent = '';
  document.getElementById('successMessage').textContent = '';
  document.getElementById('registerErrorMessage').textContent = '';
  document.getElementById('registerSuccessMessage').textContent = '';
}

// Xử lý đăng nhập với phân biệt role
document.getElementById('loginFormElement').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');

  errorMessage.textContent = '';
  successMessage.textContent = '';

  if (!email || !password) {
    errorMessage.textContent = 'Vui lòng nhập đầy đủ thông tin.';
    return;
  }

  // Tìm user trong mảng giả lập
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorMessage.textContent = 'Email hoặc mật khẩu không đúng.';
    return;
  }

  successMessage.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';

  setTimeout(() => {
    if (user.role === 'admin') {
      window.location.href = '/FE/src/pages/dashboard.html'; // Đường dẫn trang admin dashboard
    } else if (user.role === 'customer') {
      window.location.href = '/FE/src/pages/medicine_shopping.html'; // Đường dẫn trang khách hàng
    } else {
      errorMessage.textContent = 'Role người dùng không hợp lệ.';
    }
  }, 1500);
});

// Simulate register process
document.getElementById('registerFormElement').addEventListener('submit', function (e) {
  e.preventDefault();
  const fullName = this.fullName.value.trim();
  const dob = this.dob.value;
  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const confirmPassword = this.confirmPassword.value.trim();

  const errorMessage = document.getElementById('registerErrorMessage');
  const successMessage = document.getElementById('registerSuccessMessage');

  errorMessage.textContent = '';
  successMessage.textContent = '';

  if (!fullName || !dob || !email || !password || !confirmPassword) {
    errorMessage.textContent = 'Vui lòng nhập đầy đủ thông tin.';
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Mật khẩu xác nhận không khớp.';
    return;
  }

  // TODO: Gửi dữ liệu đăng ký lên backend
  successMessage.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.';
  setTimeout(() => {
    showLoginForm();
  }, 2000);
});

// Google login/register placeholders
function loginWithGoogle() {
  alert('Chức năng đăng nhập với Google đang được phát triển.');
}

function registerWithGoogle() {
  alert('Chức năng đăng ký với Google đang được phát triển.');
}

// Expose functions to global scope for inline onclick handlers
window.togglePassword = togglePassword;
window.toggleRegisterPassword = toggleRegisterPassword;
window.toggleConfirmPassword = toggleConfirmPassword;
window.showRegisterForm = showRegisterForm;
window.showLoginForm = showLoginForm;
window.loginWithGoogle = loginWithGoogle;
window.registerWithGoogle = registerWithGoogle;

// Initialize forms visibility
document.addEventListener('DOMContentLoaded', () => {
  showLoginForm();
});
