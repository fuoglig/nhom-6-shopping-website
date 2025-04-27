# Shopping Website – Trang Web Thương Mại Điện Tử

---

##  Giới Thiệu

Shopping Website là dự án mô phỏng một nền tảng thương mại điện tử hoàn chỉnh, được xây dựng bằng HTML, CSS và JavaScript. 

Giao diện của dự án được lấy cảm hứng từ trang thương mại điện tử hàng đầu Shopee, với thiết kế hiện đại, màu sắc hài hòa và khả năng tương thích cao trên mọi thiết bị.

---

##  Tính Năng sản phẩm

### 1. Trang Chủ (index.html)
- **Hiển Thị Sản Phẩm:**  
 Sản phẩm được trình bày theo dạng lưới (grid) linh hoạt, tương thích với các kích thước màn hình khác nhau (desktop, tablet, mobile).
- **Tìm Kiếm & Lịch Sử Tìm Kiếm:**  
  Thanh tìm kiếm hiển thị lịch sử từ khóa mẫu và có thể tìm kiếm sản phẩm theo từ khóa.
- **Điều Hướng Phân Loại:**  
  Các tab phân loại sản phẩm như: Liên quan, Mới nhất, Bán chạy, Giá.
- **Giỏ Hàng:**  
  Hiển thị số lượng sản phẩm hiện có trong giỏ với popup chi tiết sản phẩm đã thêm. Khi người dùng thêm sản phẩm, giỏ hàng sẽ được cập nhật theo thời gian thực.
- **Thông Báo & liên kết mạng xã hội:**  
  Icon thông báo với danh sách thông báo mẫu, liên kết mạng xã hội và QR code tải ứng dụng.

### 2. Modal Đăng Nhập/Đăng Ký (dangnhap.html và dangki.html)
- **Form Đăng Nhập & Đăng Ký:**  
  Hai form trong cùng một modal, cho phép chuyển đổi qua lại. 
  Tài khoản mẫu:
  + Tên đăng nhập: user
  + Mật khẩu: 123456
- **Xử lý sự kiện & Validate:**  
  Kiểm tra email, mật khẩu (độ dài tối thiểu) và khớp mật khẩu xác nhận. Modal tự động đóng khi click ra ngoài.
- **Mô phỏng đăng nhập qua mạng xã hội:**  
  Giả lập đăng nhập thông qua Google và Facebook.

### 3. Chi Tiết Sản Phẩm (product-detail.html)
- **Load Dữ Liệu Sản Phẩm:**  
  Lấy tham số id từ URL query (?id=) và fetch thông tin sản phẩm từ API.
- **Hiển Thị Thông Tin:**  
  Bao gồm ảnh, tên, giá, số lượng, mô tả, danh mục.
- **Hành Động Người Dùng:**  
  Cung cấp nút “Thêm vào giỏ” và “Mua ngay”, khi click sẽ hiển thị thông báo mô phỏng hành vi mua hàng. 

### 4. Quản lý giỏ hàng – (main.js)
- **Thêm sản phẩm vào giỏ hàng:** 
  Lấy thông tin sản phẩm từ API và thêm vào giỏ hàng. Nếu sản phẩm đã tồn tại, tăng số lượng.
- **Xóa sản phẩm khỏi giỏ hàng:**
  Xóa sản phẩm dựa trên chỉ số và cập nhật giao diện.
- **Cập nhật giỏ hàng:** 
  Hiển thị danh sách sản phẩm, tính tổng tiền và lưu trạng thái giỏ hàng vào localStorage.

### 5. Thanh trượt tự động hiển thị sản phẩm nổi bật
- **Hiển thị sản phẩm nổi bật:** 
  Thanh trượt tự động hiển thị các sản phẩm nổi bật với hiệu ứng chuyển đổi mượt mà.

### 6. Trợ giúp (trogiup.html)
- **Câu hỏi thường gặp:** 
  Hiển thị danh sách các câu hỏi thường gặp và liên kết đến các trang trợ giúp chi tiết.
- **Điều khoản dịch vụ:** 
  Hiển thị điều khoản dịch vụ và chính sách bảo mật.

### 7. Thông báo
- **Danh sách thông báo:** 
  Hiển thị danh sách thông báo mới nhất.
- **Chuyển hướng:** 
  Khi nhấn vào thông báo, người dùng được chuyển đến trang chi tiết sản phẩm hoặc trang liên quan.

### 8. Giỏ hàng (cart.html)
- **Danh sách sản phẩm trong giỏ:** 
  Hiển thị toàn bộ sản phẩm trong giỏ hàng.
- **Chỉnh sửa giỏ hàng:** 
  Người dùng có thể sửa số lượng, xóa sản phẩm hoặc thêm sản phẩm mới.
- **Thanh toán:** 
  Mô phỏng thao tác thanh toán giỏ hàng.

### 9. Tìm kiếm và lọc sản phẩm
- **Tìm kiếm sản phẩm:** 
  Thanh tìm kiếm hoạt động, hiển thị kết quả theo từ khóa.
- **Lọc sản phẩm:** 
  Lọc sản phẩm theo danh mục.

### 10. Chuyển trang
- **Phân trang sản phẩm:** 
  Hiển thị sản phẩm theo từng trang, với các nút chuyển trang hoạt động.

---

## Assets
- **fonts/:**  
  Chứa FontAwesome (phiên bản 6.7.2) và Google Fonts Roboto cho giao diện hiện đại.
- **img/:**  
  Bao gồm các hình ảnh như QR code, ảnh sản phẩm mẫu, biểu tượng “no-cart” và các icon được sử dụng trong toàn bộ website.
- **favicon_io/:**  
  Chứa favicon chuẩn với nhiều kích thước, giúp trang web nhận diện dễ dàng trên trình duyệt.

---

## Cấu Trúc Thư Mục

nhom-6-shopping-website
│
├── assets
│   ├── css
│   │   ├── base.css
│   │   ├── grid.css
│   │   ├── main.css
│   │   └── responsive.css
│   ├── favicon_io
│   │   ├── favicon-1-32x32.png
│   │   └── site.webmanifest
│   ├── fonts
│   │   └── fontawesome-free-...
│   │       ├── css
│   │       ├── js
│   │       ├── less
│   │       ├── metadata
│   │       ├── scss
│   │       ├── sprites
│   │       ├── svgs
│   │       ├── webfonts
│   │       └── LICENSE.txt
│   └── img
│       ├── appstore-img.png
│       ├── googleplay-img.png
│       ├── no-cart.png
│       ├── qr-img.png
│       └── shopping-logo-1.png
│
├── cart.html
├── dangki.html
├── dangnhap.html
├── Dieukhoandichvu.html
├── index.html
├── main.js
├── product-detail.html
├── README.md
├── Trangchu.html
└── trogiup.html

---

## Thành viên nhóm 6

- **Ngô Minh Tuấn**
- **Đỗ Quốc An**
- **Phùng Phương Linh**
- **Cao Nguyệt Ánh**
- **Trịnh Bảo Thịnh**

