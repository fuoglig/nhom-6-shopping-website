document.addEventListener('DOMContentLoaded', function () {
    // Social login handlers (nếu có)
    document.querySelectorAll('[data-social]').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const provider = this.dataset.social;
            alert(`Đăng nhập với ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
        });
    });

    // --- SLIDER: hiển thị 10 sản phẩm nổi bật đầu tiên ---
    const sliderWrapper = document.getElementById("highlight-slider-wrapper");
    if (sliderWrapper) {
        fetch("https://dummyjson.com/products?limit=10")
            .then((res) => res.json())
            .then((data) => {
                sliderWrapper.innerHTML = "";
                data.products.forEach(product => {
                    const item = document.createElement("div");
                    item.className = "highlight-slider__item";
                    item.innerHTML = `
                        <a href="product-detail.html?id=${product.id}" class="home-product-item">
                            <div class="home-product-item__img" style="background-image: url('${product.thumbnail}')"></div>
                            <h4 class="home-product-item__name">${product.title}</h4>
                            <div class="home-product-item__price">
                                <span class="home-product-item__price-current">$${product.price}</span>
                            </div>
                        </a>
                    `;
                    sliderWrapper.appendChild(item);
                });
                // Nhân đôi để slider liền mạch
                sliderWrapper.innerHTML += sliderWrapper.innerHTML;
            });
    }

  // --- DANH SÁCH SẢN PHẨM DƯỚI SLIDER, SẮP XẾP VÀ PHÂN TRANG ---
let allProducts = [];
let currentProducts = [];
let currentPage = 1;
const productsPerPage = 20;
let totalPages = 1;
const productContainer = document.querySelector(".home-product .row");

// Hàm render sản phẩm cho trang hiện tại
function renderProducts(products, page = 1) {
    productContainer.innerHTML = "";
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = products.slice(start, end);

    pageProducts.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col l-2-4 m-4 c-6";
        col.innerHTML = `
            <a href="product-detail.html?id=${product.id}" class="home-product-item">
                <div class="home-product-item__img" style="background-image: url('${product.thumbnail}');"></div>
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
        productContainer.appendChild(col);
    });
    renderPagination(products);
    updateTopPagination(products);
}

// Hàm render phân trang dưới
function renderPagination(products) {
    const pagination = document.querySelector('.home-product__pagination');
    if (!pagination) return;

    const total = Math.ceil(products.length / productsPerPage);
    totalPages = total;
    pagination.innerHTML = '';

    // Nút prev
    const prevLi = document.createElement('li');
    prevLi.className = 'pagination-item' + (currentPage === 1 ? ' pagination-item--disabled' : '');
    prevLi.innerHTML = `
        <a href="#" class="pagination-item__link">
            <i class="pagination-item__icon fa-solid fa-angle-left"></i>
        </a>
    `;
    prevLi.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderProducts(products, currentPage);
        }
    });
    pagination.appendChild(prevLi);

    // Số trang (hiển thị tối đa 5 số, có ... nếu nhiều trang)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(total, currentPage + 2);
    if (currentPage <= 3) endPage = Math.min(5, total);
    if (currentPage >= total - 2) startPage = Math.max(1, total - 4);

    if (startPage > 1) {
        pagination.appendChild(createPageLi(1, products));
        if (startPage > 2) {
            const dotLi = document.createElement('li');
            dotLi.className = 'pagination-item';
            dotLi.innerHTML = `<span class="pagination-item__link">...</span>`;
            pagination.appendChild(dotLi);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagination.appendChild(createPageLi(i, products));
    }

    if (endPage < total) {
        if (endPage < total - 1) {
            const dotLi = document.createElement('li');
            dotLi.className = 'pagination-item';
            dotLi.innerHTML = `<span class="pagination-item__link">...</span>`;
            pagination.appendChild(dotLi);
        }
        pagination.appendChild(createPageLi(total, products));
    }

    // Nút next
    const nextLi = document.createElement('li');
    nextLi.className = 'pagination-item' + (currentPage === total ? ' pagination-item--disabled' : '');
    nextLi.innerHTML = `
        <a href="#" class="pagination-item__link">
            <i class="pagination-item__icon fa-solid fa-angle-right"></i>
        </a>
    `;
    nextLi.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < total) {
            currentPage++;
            renderProducts(products, currentPage);
        }
    });
    pagination.appendChild(nextLi);

    // Helper tạo nút số trang
    function createPageLi(page, products) {
        const li = document.createElement('li');
        li.className = 'pagination-item' + (page === currentPage ? ' pagination-item--active' : '');
        li.innerHTML = `<a href="#" class="pagination-item__link">${page}</a>`;
        li.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage !== page) {
                currentPage = page;
                renderProducts(products, currentPage);
            }
        });
        return li;
    }
}

// Hàm cập nhật phân trang trên (home-filter__page)
function updateTopPagination(products) {
    const pageCurrent = document.querySelector('.home-filter__page-current');
    const pageTotal = document.querySelector('.home-filter__page-num');
    const prevBtn = document.querySelector('.home-filter__page-btn:first-child');
    const nextBtn = document.querySelector('.home-filter__page-btn:last-child');
    const total = Math.ceil(products.length / productsPerPage);

    // Cập nhật số trang hiện tại và tổng số trang
    if (pageCurrent) pageCurrent.textContent = currentPage;
    if (pageTotal) pageTotal.innerHTML = `<span class="home-filter__page-current">${currentPage}</span>/${total}`;

    // Xử lý trạng thái nút prev/next
    if (prevBtn) {
        if (currentPage === 1) {
            prevBtn.classList.add('home-filter__page-btn--disabled');
        } else {
            prevBtn.classList.remove('home-filter__page-btn--disabled');
        }
    }
    if (nextBtn) {
        if (currentPage === total) {
            nextBtn.classList.add('home-filter__page-btn--disabled');
        } else {
            nextBtn.classList.remove('home-filter__page-btn--disabled');
        }
    }
}

// Hàm bắt sự kiện chuyển trang ở thanh trên
function setupTopPaginationEvents() {
    const prevBtn = document.querySelector('.home-filter__page-btn:first-child');
    const nextBtn = document.querySelector('.home-filter__page-btn:last-child');

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderProducts(currentProducts, currentPage);
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const total = Math.ceil(currentProducts.length / productsPerPage);
            if (currentPage < total) {
                currentPage++;
                renderProducts(currentProducts, currentPage);
            }
        });
    }
}

// Fetch sản phẩm và render lần đầu
if (productContainer) {
    fetch("https://dummyjson.com/products?limit=200") // Lấy 200 sản phẩm
        .then((res) => res.json())
        .then((data) => {
            allProducts = data.products;
            currentProducts = allProducts;
            currentPage = 1;
            renderProducts(currentProducts, currentPage);
            setupSortEvents();
            setupSearchEvents();
            setupTopPaginationEvents();
        })
        .catch((error) => {
            console.error("Lỗi khi tải sản phẩm:", error);
        });
}

// Hàm gắn sự kiện sắp xếp
function setupSortEvents() {
    const sortBtns = document.querySelectorAll('.home-filter__btn');
    const priceAscBtn = document.querySelector('.select-input__item:nth-child(1) .select-input__link');
    const priceDescBtn = document.querySelector('.select-input__item:nth-child(2) .select-input__link');

    // Phổ biến
    sortBtns[0]?.addEventListener('click', function () {
        currentProducts = allProducts;
        currentPage = 1;
        renderProducts(currentProducts, currentPage);
        setActiveSortBtn(this);
    });
    // Mới nhất
    sortBtns[1]?.addEventListener('click', function () {
        currentProducts = [...allProducts].sort((a, b) => b.id - a.id);
        currentPage = 1;
        renderProducts(currentProducts, currentPage);
        setActiveSortBtn(this);
    });
    // Bán chạy
    sortBtns[2]?.addEventListener('click', function () {
        currentProducts = [...allProducts].sort(() => Math.random() - 0.5);
        currentPage = 1;
        renderProducts(currentProducts, currentPage);
        setActiveSortBtn(this);
    });
    // Giá tăng dần
    priceAscBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        currentProducts = [...allProducts].sort((a, b) => a.price - b.price);
        currentPage = 1;
        renderProducts(currentProducts, currentPage);
        setActiveSortBtn(null);
    });
    // Giá giảm dần
    priceDescBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        currentProducts = [...allProducts].sort((a, b) => b.price - a.price);
        currentPage = 1;
        renderProducts(currentProducts, currentPage);
        setActiveSortBtn(null);
    });

    function setActiveSortBtn(btn) {
        sortBtns.forEach(b => b.classList.remove('btn--primary'));
        if (btn) btn.classList.add('btn--primary');
    }
}

// Hàm tìm kiếm sản phẩm (giữ phân trang)
function setupSearchEvents() {
    const searchInput = document.querySelector('.header__search-input');
    const searchBtn = document.querySelector('.header__search-btn');
    if (searchInput) {
        function filterProducts() {
            const keyword = searchInput.value.trim().toLowerCase();
            currentProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(keyword)
            );
            currentPage = 1;
            renderProducts(currentProducts, currentPage);
        }
        searchInput.addEventListener("input", filterProducts);
        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                filterProducts();
            });
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    filterProducts();
                }
            });
        }
    }
}

    // --- GIỎ HÀNG ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const cartNotice = document.querySelector('.header__cart-notice');
        const noCartMsg = document.querySelector('.header__cart-list--no-cart');
        if (!cartItemsContainer || !cartTotalElement || !cartNotice || !noCartMsg) return;

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            noCartMsg.style.display = 'block';
            cartTotalElement.textContent = '0';
            cartNotice.textContent = '0';
            return;
        }
        noCartMsg.style.display = 'none';
        let total = 0;
cart.forEach((item, index) => {
    cartItemsContainer.innerHTML += `
        <li class="header__cart-item" data-id="${item.id}" style="cursor:pointer;">
            <img src="${item.image}" class="header__cart-img" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="header__cart-item-info">
                <div class="header__cart-item-head">
                    <h5 class="header__cart-item-name">${item.title}</h5>
                    <div class="header__cart-item-price-wrap">
                        <span class="header__cart-item-price">$${item.price.toFixed(2)}</span>
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
    // Cộng dồn tổng tiền
    total += item.price * item.quantity;
});
        
        // Sự kiện click chuyển trang chi tiết
        document.getElementById('cart-items')?.addEventListener('click', function(e) {
            if (e.target.classList.contains('header__cart-item-remove')) return; // Không chuyển trang khi bấm Xóa
            const item = e.target.closest('.header__cart-item');
            if (item && item.dataset.id) {
                window.location.href = `product-detail.html?id=${item.dataset.id}`;
            }
        });
        cartTotalElement.textContent = total.toFixed(2);
        cartNotice.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Thêm vào giỏ hàng
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const productId = e.target.dataset.id;
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                const product = await response.json();
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.thumbnail,
                        quantity: 1
                    });
                }
                updateCart();
                alert(`Đã thêm sản phẩm ${product.title} vào giỏ hàng!`);
            } catch (error) {
                console.error('Lỗi khi thêm vào giỏ hàng:', error);
            }
        }
        // Xóa sản phẩm khỏi giỏ
        if (e.target.classList.contains('header__cart-item-remove')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Khởi tạo giỏ hàng khi tải trang
    updateCart();

    // --- THÔNG BÁO ---
    const notifyContainer = document.getElementById("notify-items");
    if (notifyContainer) {
        fetch("https://dummyjson.com/products?limit=3")
            .then((res) => res.json())
            .then((data) => {
                notifyContainer.innerHTML = "";
                data.products.forEach(product => {
                    const notifyItem = document.createElement("li");
                    notifyItem.className = "header__notify-item header__notify-item--viewed";
                    notifyItem.innerHTML = `
                        <a href="product-detail.html?id=${product.id}" class="header__notify-link">
                            <img src="${product.thumbnail}" alt="${product.title}" class="header__notify-img">
                            <div class="header__notify-info">
                                <span class="header__notify-name">${product.title}</span>
                                <span class="header__notify-description">Mô tả: ${product.description.slice(0, 30)}...</span>
                            </div>
                        </a>
                    `;
                    notifyContainer.appendChild(notifyItem);
                });
            })
            .catch((error) => {
                console.error("Lỗi khi tải thông báo:", error);
            });
    }
    // --- XỬ LÝ DANH MỤC ---
    function setupCategoryEvents() {
        document.querySelectorAll('.category-item__link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const categories = this.dataset.category.split(',');
                
                // Xóa active state cũ
                document.querySelectorAll('.category-item').forEach(item => {
                    item.classList.remove('category-item--active');
                });
                
                // Thêm active state
                this.closest('.category-item').classList.add('category-item--active');
                
                // Lọc sản phẩm theo nhiều category
                if (categories.includes('all')) {
                    currentProducts = allProducts;
                } else {
                    currentProducts = allProducts.filter(product => 
                        categories.includes(product.category.toLowerCase())
                    );
                }
                
                currentPage = 1;
                renderProducts(currentProducts, currentPage);
            });
        });
    }

// Gọi hàm setup trong phần fetch sản phẩm
if (productContainer) {
    fetch("https://dummyjson.com/products?limit=200")
        .then((res) => res.json())
        .then((data) => {
            allProducts = data.products;
            currentProducts = allProducts;
            currentPage = 1;
            renderProducts(currentProducts, currentPage);
            setupSortEvents();
            setupSearchEvents();
            setupTopPaginationEvents();
            setupCategoryEvents(); // Thêm dòng này
        })
        .catch((error) => {
            console.error("Lỗi khi tải sản phẩm:", error);
        });
}

    // --- TÌM KIẾM SẢN PHẨM ---
    const searchInput = document.querySelector('.header__search-input');
    const searchBtn = document.querySelector('.header__search-btn');
    if (searchInput) {
        function filterProducts() {
            const keyword = searchInput.value.trim().toLowerCase();
            const allCols = document.querySelectorAll(".home-product .col");
            let found = false;
            allCols.forEach(col => {
                const nameElem = col.querySelector(".home-product-item__name");
                if (!nameElem) return;
                const name = nameElem.textContent.toLowerCase();
                if (name.includes(keyword)) {
                    col.style.display = "";
                    found = true;
                } else {
                    col.style.display = "none";
                }
            });
            // Nếu không tìm thấy sản phẩm nào, có thể hiện thông báo ở đây nếu muốn
        }
    
        // Tìm kiếm realtime khi gõ
        searchInput.addEventListener("input", filterProducts);
    
        // Tìm kiếm khi nhấn nút hoặc Enter
        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                filterProducts();
            });
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    filterProducts();
                }
            });
        }
    }
});

