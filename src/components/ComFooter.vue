<template>
    <footer>
         <div class="footer-container">
             <div class="footer-column">
                 <h3>Liên lạc với chúng tôi qua email</h3>
                 <p>support@shopquanao.com</p>
             </div>
             <div class="footer-column">
                 <h3>Danh mục sản phẩm</h3>
                 <ul>
                     <li><a href="#">Áo</a></li>
                     <li><a href="#">Quần</a></li>
                     <li><a href="#">Giày dép</a></li>
                     <li><a href="#">Phụ kiện</a></li>
                 </ul>
             </div>
             <div class="footer-column">
                 <h3>Liên hệ</h3>
                 <p>Địa chỉ: 456 Đường Mường Thanh, Thành phố HCM</p>
                 <p>Điện thoại: 0847-654-872</p>
             </div>
         </div>
     </footer>
 </template>
 
 <script>
 export default {
 
 }
 </script>

<style>
footer {
    background-color: #d2cece;
    color: #393737;
    padding: 20px;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-column {
    flex: 1;
    padding: 10px;
    min-width: 200px;
    box-sizing: border-box;
}

.footer-column h3 {
    margin-top: 0;
}

/* Định dạng các liên kết trong footer */
.footer-column a {
    color: #2e2311;
    text-decoration: none;
}

.footer-column a:hover {
    text-decoration: underline;
}
</style>