# Shopping Website – Trang Web Thương Mại Điện Tử

---

##  Giới Thiệu

Shopping Website là dự án mô phỏng một nền tảng thương mại điện tử hoàn chỉnh, được xây dựng bằng HTML5, CSS3 và JavaScript(ES6). Dự án này được thiết kế với mục đích:

- Minh họa quy trình phát triển giao diện người dùng (UI) và trải nghiệm người dùng (UX) trong một ứng dụng web hiện đại.
- Tích hợp dữ liệu động từ FakeStoreAPI để hiển thị sản phẩm thực, tạo nên một trải nghiệm sống động cho người dùng.
- Cung cấp kiến thức về responsive design, DOM manipulation và quản lý trạng thái đơn giản, giúp bạn làm quen với các khái niệm căn bản trong phát triển front-end.

Giao diện của dự án được lấy cảm hứng từ các trang thương mại điện tử hàng đầu như Shopee, Tiki và Lazada, với thiết kế hiện đại, màu sắc hài hòa và khả năng tương thích cao trên mọi thiết bị (Desktop, Tablet, Mobile).

---

##  Tính Năng Chi Tiết

### 1. Trang Chủ (index.html)
- **Hiển Thị Sản Phẩm:**  
  Danh sách sản phẩm được hiển thị theo dạng grid linh hoạt. Số cột hiển thị được điều chỉnh tự động: 5 cột trên desktop, 3 cột trên tablet và 2 cột trên mobile. Dữ liệu sản phẩm được lấy từ FakeStoreAPI, đảm bảo cập nhật và phong phú.
- **Tìm Kiếm & Lịch Sử Tìm Kiếm:**  
  Thanh tìm kiếm lưu lịch sử từ khóa mẫu.
- **Điều Hướng Phân Loại:**  
  Cung cấp các tab phân loại sản phẩm như "Liên quan", "Mới nhất", "Bán chạy" và "Giá", giúp lọc ra các sản phẩm phù hợp theo nhu cầu của người dùng.
- **Giỏ Hàng:**  
  Hiển thị số lượng sản phẩm hiện có trong giỏ với popup chi tiết sản phẩm đã thêm. Khi người dùng thêm sản phẩm, giỏ hàng sẽ được cập nhật theo thời gian thực.
- **Thông Báo & Social:**  
  Icon thông báo hiển thị các thông tin mới nhất và có dropdown cho danh sách thông báo mẫu. Ngoài ra, có các liên kết mạng xã hội và QR code giúp người dùng tải ứng dụng một cách nhanh chóng.

### 2. Modal Đăng Nhập/Đăng Ký (dangnhap.html)
- **Form Đăng Nhập & Đăng Ký:**  
  Modal chứa hai form đăng nhập và đăng ký, cho phép người dùng chuyển đổi dễ dàng giữa hai chế độ.
- **Xác Thực & Validate:**  
  Kiểm tra đầu vào bao gồm email, mật khẩu (với độ dài tối thiểu) và xác nhận mật khẩu. Nếu thông tin không hợp lệ, người dùng sẽ được thông báo lỗi thông qua các alert.
- **Chuyển Đổi & Đóng Modal:**  
  Modal được thiết kế tự động đóng khi người dùng click ra ngoài hoặc nhấn nút đóng, tạo trải nghiệm mượt mà.
- **Mô Phỏng Social Login:**  
  Giao diện hiển thị nút đăng nhập qua các tài khoản mạng xã hội như Google và Facebook, giúp người dùng dễ dàng bắt đầu sử dụng website.

### 3. Chi Tiết Sản Phẩm (product-detail.html)
- **Load Dữ Liệu Sản Phẩm:**  
  Dựa vào tham số `id` trong URL (ví dụ: `?id=1`), hệ thống sẽ fetch thông tin chi tiết của sản phẩm từ FakeStoreAPI bao gồm: title, image, price, description, category.
- **Hiển Thị Thông Tin:**  
  Sản phẩm được hiển thị rõ ràng với hình ảnh sản phẩm, tiêu đề, giá cả, mô tả chi tiết và các thông tin thêm như danh mục, số lượng mua vào.
- **Hành Động Người Dùng:**  
  Cung cấp nút “Thêm vào giỏ” và “Mua ngay”, khi click sẽ hiển thị thông báo mô phỏng hành vi mua hàng. 

### 4. JavaScript – (main.js)
- **Modal Management:**  
  Logic để mở, đóng modal đăng nhập/đăng ký, chuyển đổi giữa hai form một cách linh hoạt. Xử lý khi người dùng click ngoài modal để đóng cửa sổ.
- **Form Validation & Event Handling:**  
  Kiểm tra dữ liệu nhập vào của form đăng ký (email, mật khẩu, xác nhận mật khẩu) và xử lý Logout, Quên mật khẩu, Cần trợ giúp.
- **Fetch API & Render:**  
  Sử dụng Fetch API để lấy danh sách sản phẩm và thông tin chi tiết sản phẩm từ FakeStoreAPI, sau đó render các phần tử DOM động cho các sản phẩm, thông báo và cart items.
- **Cart Management:**  
  Xử lý việc thêm và xoá sản phẩm trong giỏ hàng, tính tổng số tiền mua sắm. Mặc dù chức năng lưu trữ tạm thời, nó có thể dễ dàng mở rộng sử dụng sessionStorage hoặc localStorage.

### 5. CSS & Responsive
- **base.css:**  
  Bao gồm phần reset CSS (Normalize), định nghĩa các biến CSS cho màu sắc, kích thước và typography. Chứa các animation cơ bản như `fadeIn` và `growth`, cũng như styling cho các button (`.btn`, `.btn--primary`, `.btn--disabled`) và modal overlay.
- **grid.css:**  
  Xây dựng hệ thống lưới 12 cột cơ sở cho việc bố trí nội dung dễ dàng, hỗ trợ các class dành cho desktop (.l-), tablet (.m-), mobile (.c-), cùng các lớp offset giúp căn vị trí các cột và gutters căn khoảng cách giữa các cột.
- **main.css:**  
  Quản lý toàn bộ giao diện website: header với background gradient, navbar, icon và hiệu ứng hover; thanh tìm kiếm có dropdown lịch sử; giỏ hàng với badge thông báo, dropdown list sản phẩm; form modal, các nút và style cho thông báo.
- **responsive.css:**  
  Định nghĩa media queries cho các thiết bị: mobile (<=739px), tablet (740-1023px) và desktop (>=1024px). Điều chỉnh hiển thị nội dung, ẩn/hiện các element không cần thiết trên thiết bị nhỏ và thay đổi kích thước font chữ, khoảng cách hợp lý.

### 6. Assets
- **fonts/:**  
  Chứa FontAwesome (phiên bản 6.7.2) và Google Fonts Roboto cho giao diện hiện đại.
- **img/:**  
  Bao gồm các hình ảnh như QR code, ảnh sản phẩm mẫu, biểu tượng “no-cart” và các icon được sử dụng trong toàn bộ website.
- **favicon_io/:**  
  Chứa favicon chuẩn với nhiều kích thước, giúp trang web nhận diện dễ dàng trên trình duyệt.

---

## Cấu Trúc Thư Mục

- shopping-website/
  - index.html
  - dangnhap.html
  - product-detail.html
  - main.js
  - assets/
    - css/
      - base.css
      - grid.css
      - main.css
      - responsive.css
    - fonts/
      - fontawesome-free-6.7.2-web/
      - GoogleFonts-Roboto/
    - img/
      - qr-img.png
      - appstore-img.png
      - googleplay-img.png
      - no-cart.png
      - ...
    - favicon_io/
      - favicon-32x32.png
      - ...
  - README.md

---

## Công Nghệ Sử Dụng

| Công nghệ          | Phiên bản | Vai trò                               |
|--------------------|-----------|---------------------------------------|
| **HTML5**          | N/A       | Cấu trúc trang                        |
| **CSS3**           | N/A       | Styling, responsive                   |
| **JavaScript**     | ES6       | Logic, DOM manipulation, Fetch API    |
| **FakeStoreAPI**   | v1        | Cung cấp dữ liệu sản phẩm mẫu         |
| **FontAwesome**    | 6.7.2     | Icons                                 |
| **Google Fonts**   | Roboto    | Typography                            |
| **Normalize.css**  | 8.0.1     | Reset CSS                             |

---

## Hướng Dẫn  Chạy

### Mở Local

- Sử dụng VSCode Live Server hoặc mở trực tiếp file `index.html` trong trình duyệt.

### Tương Tác

- Thử các chức năng như thêm/xoá sản phẩm trong giỏ hàng, tính tổng tiền, mở modal đăng nhập/đăng ký, xem chi tiết sản phẩm.

### Lưu Ý

- Cần kết nối Internet để gọi API từ FakeStoreAPI.

## Thành viên nhóm 6

- **Ngô Minh Tuấn**
- **Đỗ Quốc An**
- **Phùng Phương Linh**
- **Cao Nguyệt Ánh**
- **Trịnh Bảo Thịnh**

