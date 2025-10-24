// medicine_shopping.js

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
  // Thêm sản phẩm khác nếu cần
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
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

// Render products based on category filter
function renderProducts(filterCategory = 'all') {
  productsGrid.innerHTML = '';
  const filteredProducts = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price"><span class="old">${product.oldPrice.toLocaleString('vi-VN')}đ</span> ${product.price.toLocaleString('vi-VN')}đ/Hộp</p>
      <button class="btn-detail" data-id="${product.id}">Xem chi tiết</button>
    `;
    productsGrid.appendChild(productCard);
  });

  // Add event listeners for detail buttons
  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      openModal(id);
    });
  });
}

// Open product detail modal
function openModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  modalTitle.textContent = 'Chi tiết thuốc';
  modalImage.src = currentProduct.image;
  modalImage.alt = currentProduct.name;
  modalName.textContent = currentProduct.name;
  modalPrice.textContent = `${currentProduct.price.toLocaleString('vi-VN')}đ`;
  modalIngredients.textContent = currentProduct.ingredients;
  modalUses.textContent = currentProduct.uses;
  modalDosage.textContent = currentProduct.dosage;
  modalCategory.textContent = currentProduct.category;
  currentQty = 1;
  qtyDisplay.textContent = currentQty;

  modalOverlay.style.display = 'flex';
}

// Close modal
closeModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

// Quantity controls
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

// Add to cart from modal
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

// Update cart UI
function updateCartUI() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Giỏ hàng trống.</p>';
    cartTotal.textContent = '0₫';
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString('vi-VN')}đ x ${item.quantity}</p>
      </div>
      <div class="cart-item-actions">
        <button class="btn-decrease" data-id="${item.id}">-</button>
        <button class="btn-increase" data-id="${item.id}">+</button>
        <button class="btn-remove" data-id="${item.id}">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners for cart item buttons
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toLocaleString('vi-VN') + '₫';
}

// Change quantity of cart item
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

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

// Toggle cart sidebar
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

// Category filter buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    renderProducts(category);
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) {
    renderProducts('all');
    return;
  }
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  productsGrid.innerHTML = '';
  filtered.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price"><span class="old">${product.oldPrice.toLocaleString('vi-VN')}đ</span> ${product.price.toLocaleString('vi-VN')}đ/Hộp</p>
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
});
