// Sample medicine data
const medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 15000,
        category: "pain-relief",
        icon: "💊",
        ingredients: "Paracetamol 500mg",
        uses: "Giảm đau, hạ sốt. Được sử dụng để điều trị đau nhẹ đến vừa như đau đầu, đau răng, đau cơ và sốt.",
        dosage: "Người lớn: 1-2 viên mỗi lần, 3-4 lần/ngày. Không quá 8 viên/ngày. Uống sau ăn.",
        image: "💊"
    },
    {
        id: 2,
        name: "Amoxicillin 500mg",
        price: 25000,
        category: "antibiotic",
        icon: "🔬",
        ingredients: "Amoxicillin trihydrate tương đương Amoxicillin 500mg",
        uses: "Kháng sinh điều trị nhiễm khuẩn do vi khuẩn nhạy cảm gây ra như viêm họng, viêm phế quản, viêm phổi.",
        dosage: "Người lớn: 500mg x 3 lần/ngày. Trẻ em: 25-50mg/kg/ngày chia 3 lần. Uống trước ăn 30 phút.",
        image: "🔬"
    },
    {
        id: 3,
        name: "Vitamin C 1000mg",
        price: 120000,
        category: "vitamin",
        icon: "🍊",
        ingredients: "Acid ascorbic (Vitamin C) 1000mg, chất phụ hình vừa đủ",
        uses: "Bổ sung vitamin C, tăng cường sức đề kháng, hỗ trợ hệ miễn dịch, làm đẹp da.",
        dosage: "Người lớn: 1 viên/ngày sau ăn sáng. Uống cùng với nhiều nước.",
        image: "🍊"
    },
    {
        id: 4,
        name: "Thuốc ho Prospan",
        price: 85000,
        category: "cold-flu",
        icon: "🌿",
        ingredients: "Cao khô lá thường xuân (Hedera helix) 35mg",
        uses: "Điều trị ho có đờm, long đờm, giảm co thắt phế quản trong các bệnh lý về đường hô hấp.",
        dosage: "Người lớn: 5-7.5ml x 3 lần/ngày. Trẻ em 6-12 tuổi: 2.5-5ml x 3 lần/ngày.",
        image: "🌿"
    },
    {
        id: 5,
        name: "Ibuprofen 400mg",
        price: 18000,
        category: "pain-relief",
        icon: "💊",
        ingredients: "Ibuprofen 400mg",
        uses: "Giảm đau, chống viêm, hạ sốt. Điều trị đau khớp, viêm khớp, đau cơ, đau kinh nguyệt.",
        dosage: "Người lớn: 1 viên x 2-3 lần/ngày sau ăn. Không quá 1200mg/ngày.",
        image: "💊"
    },
    {
        id: 6,
        name: "Lactobacillus",
        price: 95000,
        category: "digestive",
        icon: "🦠",
        ingredients: "Lactobacillus acidophilus, Bifidobacterium bifidum, Streptococcus thermophilus",
        uses: "Cân bằng hệ vi sinh đường ruột, hỗ trợ tiêu hóa, tăng cường hấp thu chất dinh dưỡng.",
        dosage: "Người lớn: 1-2 viên/ngày sau ăn. Trẻ em: 1 viên/ngày.",
        image: "🦠"
    },
    {
        id: 7,
        name: "Cetirizine 10mg",
        price: 22000,
        category: "cold-flu",
        icon: "🤧",
        ingredients: "Cetirizine dihydrochloride 10mg",
        uses: "Chống dị ứng, điều trị viêm mũi dị ứng, mày đay, ngứa do dị ứng.",
        dosage: "Người lớn: 1 viên/ngày vào buổi tối. Trẻ em 6-12 tuổi: 1/2 viên/ngày.",
        image: "🤧"
    },
    {
        id: 8,
        name: "Vitamin D3 2000IU",
        price: 150000,
        category: "vitamin",
        icon: "☀️",
        ingredients: "Cholecalciferol (Vitamin D3) 2000IU",
        uses: "Bổ sung vitamin D3, hỗ trợ hấp thu canxi, phốt pho, tăng cường sức khỏe xương khớp.",
        dosage: "Người lớn: 1 viên/ngày sau ăn. Nên uống cùng với thức ăn có chất béo.",
        image: "☀️"
    },
    {
        id: 9,
        name: "Omeprazole 20mg",
        price: 35000,
        category: "digestive",
        icon: "🫀",
        ingredients: "Omeprazole 20mg",
        uses: "Điều trị loét dạ dày, tá tràng, viêm thực quản do trào ngược, hội chứng Zollinger-Ellison.",
        dosage: "Người lớn: 1 viên/ngày vào buổi sáng trước ăn 30-60 phút. Nuốt nguyên viên.",
        image: "🫀"
    },
    {
        id: 10,
        name: "Cefixime 200mg",
        price: 45000,
        category: "antibiotic",
        icon: "🔬",
        ingredients: "Cefixime trihydrate tương đương Cefixime 200mg",
        uses: "Kháng sinh điều trị nhiễm khuẩn đường hô hấp, tiết niệu, tai mũi họng.",
        dosage: "Người lớn: 200mg x 2 lần/ngày hoặc 400mg x 1 lần/ngày. Uống sau ăn.",
        image: "🔬"
    }
];

// Global variables
let cart = [];
let currentCategory = 'all';
let currentQuantity = 1;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    
    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter products
            currentCategory = this.dataset.category;
            renderProducts();
        });
    });
    
    // Cart sidebar toggle
    document.getElementById('cartToggle').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    
    // Modal functionality
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Modal quantity controls
    document.getElementById('decreaseQty').addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('qtyDisplay').textContent = currentQuantity;
        }
    });
    
    document.getElementById('increaseQty').addEventListener('click', () => {
        currentQuantity++;
        document.getElementById('qtyDisplay').textContent = currentQuantity;
    });
    
    // Add to cart from modal
    document.getElementById('addToCartModal').addEventListener('click', function() {
        const productId = parseInt(this.dataset.productId);
        addToCart(productId, currentQuantity);
        closeModal();
    });
}

// Render products based on current filters
function renderProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = medicines.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.uses.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: #ddd;"></i>
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p>Vui lòng thử từ khóa khác hoặc chọn danh mục khác</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, 1)">
                        <i class="fas fa-cart-plus"></i>
                        Thêm vào giỏ
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-info-circle"></i>
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch() {
    renderProducts();
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'pain-relief': 'Giảm đau',
        'antibiotic': 'Kháng sinh',
        'vitamin': 'Vitamin',
        'cold-flu': 'Cảm cúm',
        'digestive': 'Tiêu hóa'
    };
    return categories[category] || category;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Show product detail modal
function showProductDetail(productId) {
    const product = medicines.find(p => p.id === productId);
    if (!product) return;
    
    // Reset quantity
    currentQuantity = 1;
    
    // Populate modal
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    document.getElementById('modalIngredients').textContent = product.ingredients;
    document.getElementById('modalUses').textContent = product.uses;
    document.getElementById('modalDosage').textContent = product.dosage;
    document.getElementById('modalCategory').textContent = getCategoryName(product.category);
    document.getElementById('qtyDisplay').textContent = currentQuantity;
    
    // Set product image
    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<div style="width: 250px; height: 250px; background: linear-gradient(45deg, #f0f2f5, #e9ecef); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 4rem; color: #667eea;">${product.image}</div>`;
    
    // Set product ID for add to cart button
    document.getElementById('addToCartModal').dataset.productId = productId;
    
    // Show modal
    modalOverlay.classList.add('active');
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = medicines.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartUI();
    showNotification(`Đã thêm ${product.name} vào giỏ hàng`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity in cart
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng trống</p>
                <small>Thêm sản phẩm để bắt đầu mua sắm</small>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-control">
                        <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modal or cart
    if (e.key === 'Escape') {
        if (modalOverlay.classList.contains('active')) {
            closeModal();
        } else if (cartSidebar.classList.contains('open')) {
            closeCart();
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});