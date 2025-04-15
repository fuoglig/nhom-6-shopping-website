document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal__overlay');
    const registerForm = document.querySelector('.auth-form[data-type="register"]');
    const loginForm = document.querySelector('.auth-form[data-type="login"]');
    const switchButtons = document.querySelectorAll('[data-action="switch-form"]');
    const closeButtons = document.querySelectorAll('[data-action="close-modal"]');

    // hàm modals
    function showModal(formType) {
        modal.classList.add('active');
        if (formType === 'register') {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        } else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    }

    // hàm ẩn modal
    function hideModal() {
        modal.classList.remove('active');
    }

    // nghe sự kiện click vào nút đăng nhập và đăng ký
    document.querySelectorAll('.header__navbar-item--bold').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const formType = button.textContent.trim() === 'Đăng ký' ? 'register' : 'login';
            showModal(formType);
        });
    });

    // Bắt sự kiện cho các nút chuyển đổi giữa các form
    switchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetForm = button.dataset.target;
            showModal(targetForm);
        });
    });


    // đóng modal khi click ra ngoài hoặc nhấn nút đóng
    modalOverlay.addEventListener('click', hideModal);
    closeButtons.forEach(button => {
        button.addEventListener('click', hideModal);
    });

    // Xử lý sự kiện submit cho các form đăng nhập và đăng ký
    form.addEventListener('submit', function (e) {
        const isRegister = this.dataset.type === 'register';

        // Nếu là form đăng ký, thực hiện kiểm tra dữ liệu
        if (isRegister) {
            e.preventDefault(); // Chỉ chặn hành động mặc định cho form đăng ký

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            if (!data.email || !data.password) {
                alert('Vui lòng điền đầy đủ email và mật khẩu!');
                return;
            }

            if (data.password !== data.confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }

            console.log('Đăng ký với:', data);
            hideModal();
        }
        // Nếu là form đăng nhập, không chặn hành động mặc định
    });

    // Social login handlers
    document.querySelectorAll('[data-social]').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const provider = this.dataset.social;
            alert(`Đăng nhập với ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
        });
    });
});

// Lắng nghe sự kiện click vào liên kết "Đăng xuất"
document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.querySelector('.header__navbar-user-item-separate a');

    logoutLink.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định
        alert('Bạn đã đăng xuất thành công!');
        window.location.href = 'dangnhap.html'; // Chuyển hướng đến trang đăng nhập
    });
});
// Lắng nghe sự kiện click vào liên kết "Quên mật khẩu"
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.forgot-password').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Quên thì thôi');
    });
});
// Lắng nghe sự kiện click vào liên kết "Cần trợ giúp"
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.need-help').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Ai giúp');
    });
});


// Hàm lấy dữ liệu từ API và hiển thị sản phẩm lên trang chủ
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
            const container = document.querySelector(".home-product .row");
            container.innerHTML = ""; // Clear any static content

            products.forEach((product) => {
                const col = document.createElement("div");
                col.className = "col l-2-4 m-4 c-6";

                col.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="home-product-item">
                        <div class="home-product-item__img" style="background-image: url('${product.image}');"></div>
                        <h4 class="home-product-item__name">${product.title}</h4>
                        <div class="home-product-item__price">
                            <span class="home-product-item__price-current">$${product.price}</span>
                        </div>
                        <div class="home-product-item__action">
                            <div class="home-product-item__rating">
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <span class="home-product-item__sold">${Math.floor(Math.random()*1000)} đã bán</span>
                        </div>
                        <div class="home-product-item__origin">
                            <span class="home-product-item__brand">${product.category}</span>
                            <span class="home-product-item__origin-name">Online</span>
                        </div>
                        <div class="home-product-item__favourite">
                            <i class="fa-solid fa-check"></i>
                            <span>Yêu thích</span>
                        </div>
                        <div class="home-product-item__sale-off">
                            <span class="home-product-item__sale-off-percent">-${Math.floor(Math.random()*30)}%</span>
                            <span class="home-product-item__sale-off-label">GIẢM</span>
                        </div>
                    </a>

                    <div class="home-product-item__actions">
                            <button class="btn-add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch((error) => {
            console.error("Lỗi khi tải sản phẩm từ Fake Store API:", error);
        });
});

//Phần thêm/xóa giỏ hàng

// Thêm các biến toàn cục
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm cập nhật giỏ hàng
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartNotice = document.querySelector('.header__cart-notice');
    const noCartMsg = document.querySelector('.header__cart-list-no-cart-msg');

    // Xóa nội dung cũ
    cartItemsContainer.innerHTML = '';

    // Hiển thị khi giỏ trống
    if (cart.length === 0) {
        noCartMsg.style.display = 'block';
        cartTotalElement.textContent = '0';
        cartNotice.textContent = '0';
        return;
    }

    noCartMsg.style.display = 'none';

    // Render sản phẩm
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <li class="header__cart-item">
                <img src="${item.image}" class="header__cart-img">
                <div class="header__cart-item-info">
                    <div class="header__cart-item-head">
                        <h5 class="header__cart-item-name">${item.title}</h5>
                        <div class="header__cart-item-price-wrap">
                            <span class="header__cart-item-price">$${item.price}</span>
                            <span class="header__cart-item-multiply">x</span>
                            <span class="header__cart-item-qnt">${item.quantity}</span>
                        </div>
                    </div>
                    <div class="header__cart-item-body">
                        <span class="header__cart-item-remove" data-index="${index}">Xóa</span>
                    </div>
                </div>
            </li>
        `;
    });

    // Cập nhật tổng tiền
    cartTotalElement.textContent = total.toFixed(2);
    cartNotice.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Xử lý thêm vào giỏ hàng
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-add-to-cart')) {
        const productId = e.target.dataset.id;

        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = await response.json();

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            updateCart();
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    }
});

// Xử lý xóa sản phẩm
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__cart-item-remove')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

// Khởi tạo giỏ hàng khi tải trang
document.addEventListener('DOMContentLoaded', updateCart);