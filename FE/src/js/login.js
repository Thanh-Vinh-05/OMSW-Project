let users = [
            {
                email: "jonas.kahnwald@gmail.com",
                password: "123456",
                fullName: "Jonas Kahnwald"
            },
            {
                email: "admin@msw.com",
                password: "admin123",
                fullName: "Admin MSW"
            }
        ];

        // Toggle hiển thị mật khẩu
        function togglePassword() {
            const passwordField = document.getElementById('password');
            const toggleIcon = document.querySelector('.password-toggle');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleIcon.textContent = '👁️';
            }
        }

        function toggleRegisterPassword() {
            const passwordField = document.getElementById('registerPassword');
            const toggleIcon = passwordField.nextElementSibling;
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleIcon.textContent = '👁️';
            }
        }

        function toggleConfirmPassword() {
            const passwordField = document.getElementById('confirmPassword');
            const toggleIcon = passwordField.nextElementSibling;
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleIcon.textContent = '👁️';
            }
        }

        // Hiển thị thông báo lỗi
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }

        // Hiển thị thông báo thành công
        function showSuccess(elementId, message) {
            const successElement = document.getElementById(elementId);
            successElement.textContent = message;
            successElement.style.display = 'block';
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }

        // Xử lý đăng nhập
        document.getElementById('loginFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Kiểm tra email và password
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                showSuccess('successMessage', `Đăng nhập thành công! Chào mừng ${user.fullName}`);
                // Trong thực tế, sẽ chuyển hướng đến trang chủ
                setTimeout(() => {
                    alert('Chuyển hướng đến trang chủ...');
                }, 2000);
            } else {
                // Kiểm tra email có tồn tại không
                const emailExists = users.find(u => u.email === email);
                if (emailExists) {
                    showError('errorMessage', 'Mật khẩu không chính xác. Vui lòng thử lại.');
                } else {
                    showError('errorMessage', 'Email không tồn tại trong hệ thống. Vui lòng đăng ký tài khoản mới.');
                }
            }
        });

        // Xử lý đăng ký
        document.getElementById('registerFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Kiểm tra email đã tồn tại
            const emailExists = users.find(u => u.email === email);
            if (emailExists) {
                showError('registerErrorMessage', 'Email đã tồn tại trong hệ thống. Vui lòng sử dụng email khác.');
                return;
            }
            
            // Kiểm tra mật khẩu
            if (password.length < 6) {
                showError('registerErrorMessage', 'Mật khẩu phải có ít nhất 6 ký tự.');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('registerErrorMessage', 'Mật khẩu xác nhận không khớp.');
                return;
            }
            
            // Thêm user mới
            users.push({
                email: email,
                password: password,
                fullName: fullName
            });
            
            showSuccess('registerSuccessMessage', 'Đăng ký thành công! Chuyển về form đăng nhập...');
            
            // Reset form và chuyển về form đăng nhập
            setTimeout(() => {
                document.getElementById('registerFormElement').reset();
                showLoginForm();
                // Tự động điền email vào form đăng nhập
                document.getElementById('email').value = email;
                showSuccess('successMessage', 'Tài khoản đã được tạo thành công. Vui lòng đăng nhập.');
            }, 2000);
        });

        // Chuyển đổi giữa form đăng nhập và đăng ký
        function showRegisterForm() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        }

        function showLoginForm() {
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        }

        // Đăng nhập với Google (demo)
        function loginWithGoogle() {
            alert('Tính năng đăng nhập với Google sẽ được triển khai sau. Hiện tại vui lòng sử dụng email và mật khẩu.');
        }

        function registerWithGoogle() {
            alert('Tính năng đăng ký với Google sẽ được triển khai sau. Hiện tại vui lòng điền thông tin thủ công.');
        }

        // Thêm hiệu ứng loading khi submit form
        function addLoadingEffect(formElement, buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Đang xử lý...';
            buttonElement.disabled = true;
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
            }, 1000);
        }

        // Animation khi chuyển form
        function animateFormTransition() {
            const container = document.querySelector('.form-container');
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.3s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }

        // Khởi tạo
        document.addEventListener('DOMContentLoaded', function() {
            // Focus vào email field khi trang load
            document.getElementById('email').focus();
            
            // Thêm enter key support
            document.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                    const form = e.target.closest('form');
                    if (form) {
                        form.dispatchEvent(new Event('submit'));
                    }
                }
            });
        });

        // Demo data - có thể xóa trong production
        console.log('Demo accounts:');
        console.log('Email: jonas.kahnwald@gmail.com | Password: 123456');
        console.log('Email: admin@msw.com | Password: admin123');