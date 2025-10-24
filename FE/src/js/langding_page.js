// langding_page.js

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.auth-buttons .login');
  const signupBtn = document.querySelector('.auth-buttons .signup');

  loginBtn?.addEventListener('click', () => {
    // Chuyển sang trang login
    window.location.href = '/FE/src/pages/login.html'; // điều chỉnh đường dẫn đúng với cấu trúc của bạn
  });

  signupBtn?.addEventListener('click', () => {
    // Chuyển sang trang login (với form đăng ký)
    window.location.href = '/FE/src/pages/login.html';
  });
});
