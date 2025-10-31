// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "Hỗn dịch uống men vi sinh Enterogermina Gut Defense Sanofi",
        price: 174000,
        oldPrice: 184000,
        category: "digestive",
        image: "enterogermina.png",
        ingredients: "Bacillus clausii",
        uses: "Hỗ trợ tiêu hóa, cân bằng hệ vi sinh đường ruột",
        dosage: "Uống 1 lọ/ngày",
    },
    {
        id: 2,
        name: "Viên uống Medsulin Plus Vkenko (60 viên)",
        price: 720000,
        oldPrice: 960000,
        category: "vitamin",
        image: "medsulin.png",
        ingredients: "Chiết xuất thảo dược, vitamin tổng hợp",
        uses: "Hỗ trợ điều hòa đường huyết",
        dosage: "Uống 2 viên/ngày",
    },
    {
        id: 3,
        name: "Chai xịt Aloclair Plus Spray (15ml)",
        price: 183200,
        oldPrice: 229000,
        category: "cold-flu",
        image: "aloclair.png",
        ingredients: "Aluminium hydroxide, Magnesium hydroxide",
        uses: "Giảm đau, làm lành vết loét miệng",
        dosage: "Xịt 2-3 lần/ngày",
    },
    {
        id: 4,
        name: "Paracetamol 500mg (Hộp 100 viên)",
        price: 25000,
        oldPrice: 30000,
        category: "pain-relief",
        image: "paracetamol.png",
        ingredients: "Paracetamol 500mg",
        uses: "Giảm đau, hạ sốt",
        dosage: "1-2 viên/lần, 3-4 lần/ngày",
    },
    {
        id: 5,
        name: "Amoxicillin 500mg (Hộp 30 viên)",
        price: 45000,
        oldPrice: 55000,
        category: "antibiotic",
        image: "amoxicillin.png",
        ingredients: "Amoxicillin 500mg",
        uses: "Điều trị nhiễm khuẩn",
        dosage: "Theo chỉ định bác sĩ",
    },
    {
        id: 6,
        name: "Vitamin C 1000mg (Hộp 60 viên)",
        price: 120000,
        oldPrice: 150000,
        category: "vitamin",
        image: "vitamin-c.png",
        ingredients: "Vitamin C 1000mg",
        uses: "Tăng cường sức đề kháng",
        dosage: "1 viên/ngày",
    },
];

// Danh sách voucher
const vouchers = [
    {
        code: "GIAM10",
        type: "percent",
        value: 10,
        minOrder: 100000,
        description: "Giảm 10% cho đơn hàng từ 100.000₫"
    },
    {
        code: "GIAM50K",
        type: "fixed",
        value: 50000,
        minOrder: 200000,
        description: "Giảm 50.000₫ cho đơn hàng từ 200.000₫"
    },
    {
        code: "GIAM20",
        type: "percent",
        value: 20,
        minOrder: 500000,
        description: "Giảm 20% cho đơn hàng từ 500.000₫"
    },
    {
        code: "FREESHIP",
        type: "fixed",
        value: 30000,
        minOrder: 0,
        description: "Miễn phí vận chuyển (30.000₫)"
    },
    {
        code: "VIP100K",
        type: "fixed",
        value: 100000,
        minOrder: 1000000,
        description: "Giảm 100.000₫ cho đơn hàng từ 1.000.000₫"
    }
];

let cart = [];
let appliedVoucher = null;

// Lấy các phần tử DOM
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const discountRow = document.getElementById('discountRow');

const voucherInput = document.getElementById('voucherInput');
const applyVoucherBtn = document.getElementById('applyVoucherBtn');
const voucherMessage = document.getElementById('voucherMessage');
const voucherApplied = document.getElementById('voucherApplied');
const appliedVoucherCode = document.getElementById('appliedVoucherCode');
const appliedVoucherDiscount = document.getElementById('appliedVoucherDiscount');
const removeVoucherBtn = document.getElementById('removeVoucherBtn');

const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalIngredients = document.getElementById('modalIngredients');
const modalUses = document.getElementById('modalUses');
const modalDosage = document.getElementById('modalDosage');
const modalCategory = document.getElementById('modalCategory');
const qtyDisplay = document.getElementById('qtyDisplay');
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const addToCartModalBtn = document.getElementById('addToCartModal');
const closeModalBtn = document.getElementById('closeModal');

let currentProduct = null;
let currentQty = 1;

// Hiển thị sản phẩm theo danh mục
function renderProducts(filterCategory = 'all') {
    productsGrid.innerHTML = '';
    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">
                <span class="old">${product.oldPrice.toLocaleString('vi-VN')}₫</span> 
                ${product.price.toLocaleString('vi-VN')}₫
            </p>
            <button class="btn-detail" data-id="${product.id}">Xem chi tiết</button>
        `;
        productsGrid.appendChild(productCard);
    });

    // Thêm sự kiện cho nút xem chi tiết
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            openModal(id);
        });
    });
}

// Mở modal chi tiết sản phẩm
function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;
    modalName.textContent = currentProduct.name;
    modalPrice.textContent = `${currentProduct.price.toLocaleString('vi-VN')}₫`;
    modalIngredients.textContent = currentProduct.ingredients;
    modalUses.textContent = currentProduct.uses;
    modalDosage.textContent = currentProduct.dosage;
    modalCategory.textContent = getCategoryName(currentProduct.category);
    currentQty = 1;
    qtyDisplay.textContent = currentQty;

    modalOverlay.style.display = 'flex';
}

// Lấy tên danh mục
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

// Đóng modal
closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Điều khiển số lượng trong modal
decreaseQtyBtn.addEventListener('click', () => {
    if (currentQty > 1) {
        currentQty--;
        qtyDisplay.textContent = currentQty;
    }
});

increaseQtyBtn.addEventListener('click', () => {
    currentQty++;
    qtyDisplay.textContent = currentQty;
});

// Thêm vào giỏ hàng từ modal
addToCartModalBtn.addEventListener('click', () => {
    if (!currentProduct) return;

    const existingItem = cart.find(item => item.id === currentProduct.id);
    if (existingItem) {
        existingItem.quantity += currentQty;
    } else {
        cart.push({ ...currentProduct, quantity: currentQty });
    }
    updateCartUI();
    modalOverlay.style.display = 'none';
});

// Tính toán tổng tiền
function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;

    if (appliedVoucher) {
        if (appliedVoucher.type === 'percent') {
            discount = subtotal * (appliedVoucher.value / 100);
        } else {
            discount = appliedVoucher.value;
        }
    }

    const total = subtotal - discount;

    return {
        subtotal: subtotal,
        discount: discount,
        total: total > 0 ? total : 0
    };
}

// Cập nhật giao diện giỏ hàng
function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Giỏ hàng trống.</p>';
        cartSubtotal.textContent = '0₫';
        cartDiscount.textContent = '-0₫';
        cartTotal.textContent = '0₫';
        discountRow.style.display = 'none';
        
        // Xóa voucher nếu giỏ hàng trống
        if (appliedVoucher) {
            removeVoucher();
        }
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString('vi-VN')}₫ x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn-decrease" data-id="${item.id}">-</button>
                <button class="btn-increase" data-id="${item.id}">+</button>
                <button class="btn-remove" data-id="${item.id}">Xóa</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Thêm sự kiện cho các nút trong giỏ hàng
    cartItemsContainer.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            changeQuantity(id, -1);
        });
    });

    cartItemsContainer.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            changeQuantity(id, 1);
        });
    });

    cartItemsContainer.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        });
    });

    // Cập nhật tổng tiền
    const totals = calculateTotal();
    cartSubtotal.textContent = totals.subtotal.toLocaleString('vi-VN') + '₫';
    cartDiscount.textContent = '-' + totals.discount.toLocaleString('vi-VN') + '₫';
    cartTotal.textContent = totals.total.toLocaleString('vi-VN') + '₫';

    // Hiển thị dòng giảm giá nếu có voucher
    if (appliedVoucher && totals.discount > 0) {
        discountRow.style.display = 'flex';
    } else {
        discountRow.style.display = 'none';
    }
}

// Thay đổi số lượng sản phẩm trong giỏ
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

// Áp dụng voucher
function applyVoucher() {
    const code = voucherInput.value.trim().toUpperCase();
    
    if (!code) {
        showVoucherMessage('Vui lòng nhập mã giảm giá', 'error');
        return;
    }

    if (cart.length === 0) {
        showVoucherMessage('Giỏ hàng trống. Vui lòng thêm sản phẩm trước', 'error');
        return;
    }

    const voucher = vouchers.find(v => v.code === code);
    
    if (!voucher) {
        showVoucherMessage('Mã giảm giá không hợp lệ', 'error');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (subtotal < voucher.minOrder) {
        showVoucherMessage(
            `Đơn hàng tối thiểu ${voucher.minOrder.toLocaleString('vi-VN')}₫ để áp dụng mã này`,
            'error'
        );
        return;
    }

    appliedVoucher = voucher;
    voucherInput.value = '';
    
    // Hiển thị voucher đã áp dụng
    appliedVoucherCode.textContent = voucher.code;
    if (voucher.type === 'percent') {
        appliedVoucherDiscount.textContent = `-${voucher.value}%`;
    } else {
        appliedVoucherDiscount.textContent = `-${voucher.value.toLocaleString('vi-VN')}₫`;
    }
    
    voucherApplied.style.display = 'flex';
    showVoucherMessage('Áp dụng mã giảm giá thành công!', 'success');
    
    updateCartUI();
}

// Xóa voucher
function removeVoucher() {
    appliedVoucher = null;
    voucherApplied.style.display = 'none';
    voucherMessage.style.display = 'none';
    voucherInput.value = '';
    updateCartUI();
}

// Hiển thị thông báo voucher
function showVoucherMessage(message, type) {
    voucherMessage.textContent = message;
    voucherMessage.className = 'voucher-message ' + type;
    
    setTimeout(() => {
        voucherMessage.style.display = 'none';
    }, 3000);
}

// Sự kiện áp dụng voucher
applyVoucherBtn.addEventListener('click', applyVoucher);

voucherInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        applyVoucher();
    }
});

// Sự kiện xóa voucher
removeVoucherBtn.addEventListener('click', removeVoucher);

// Mở/đóng giỏ hàng
const cartToggle = document.getElementById('cartToggle');
const closeCartBtn = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');

cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.style.display = 'block';
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.style.display = 'none';
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.style.display = 'none';
});

// Lọc theo danh mục
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        renderProducts(category);
    });
});

// Chức năng tìm kiếm
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchProducts() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        renderProducts('all');
        return;
    }
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(keyword)
    );
    
    productsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#666; padding:40px;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }
    
    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">
                <span class="old">${product.oldPrice.toLocaleString('vi-VN')}₫</span> 
                ${product.price.toLocaleString('vi-VN')}₫
            </p>
            <button class="btn-detail" data-id="${product.id}">Xem chi tiết</button>
        `;
        productsGrid.appendChild(productCard);
    });

    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            openModal(id);
        });
    });
}

searchBtn.addEventListener('click', searchProducts);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    
    // Log danh sách voucher có sẵn (để test)
    console.log('=== MÃ GIẢM GIÁ CÓ SẴN ===');
    vouchers.forEach(v => {
        console.log(`${v.code}: ${v.description}`);
    });
});