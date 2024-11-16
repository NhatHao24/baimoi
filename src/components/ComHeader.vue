<template>
    <div>
      <header>
        <div class="container">
          <div class="logo">
            <img src="/Images/logo.png" alt="Restaurant Logo" />
          </div>
          <nav>
            <ul>
              <li><router-link to="/">Trang Chủ</router-link></li>
              <li><router-link to="/sanpham">Sản Phẩm</router-link></li>
              <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
              <li><router-link to="/lienhe">Liên Hệ</router-link></li>
              <li><router-link to="/tintuc">Tin Tức</router-link></li>
              <li><router-link to="/dangky">Đăng Ký</router-link></li>
              <li><router-link to="/dangnhap">Đăng Nhập</router-link></li>
            </ul>
          </nav>
          <div v-if="user">
            <p>Xin chào, {{ user.username }}</p>
            <button @click="logout">Đăng Xuất</button>
          </div>
          <div class="cta">
            <router-link to="/cart">Giỏ Hàng</router-link>
          </div>
        </div>
      </header>
  
      <!-- Product List Section -->
      <main class="product-section">
        <ul class="product-list">
          <!-- Danh sách sản phẩm sẽ được hiển thị ở đây từ dữ liệu động -->
        </ul>
      </main>
  
      <router-view />
    </div>
  </template>
  
  <script>
  import eventBus from '@/router/eventBus';
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('currentUser ')) || null,
      };
    },
    created() {
      eventBus.on('loginSuccess', (user) => {
        this.user = user;
      });
    },
    beforeUnmount() {
      eventBus.off('loginSuccess'); // Remove listener when component is destroyed
    },
    methods: {
      logout() {
        localStorage.removeItem('currentUser ');
        this.user = null;
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logo img {
    height: 50px;
    transition: transform 0.3s ease;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin: 0 15px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  nav ul li a:hover {
    color: #fcb034;
  }
  
  /* CTA and User Greeting Styling */
  .cta,
  .user-greeting {
    font-size: 1rem;
  }
  
  .cta a {
    color: #fcb034;
    font-weight: bold;
  }
  
  .cta a:hover {
    color: #e67e22;
  }
  
  /* Product Section Styling */
  .product-section {
    padding: 40px 20px;
    background-color: #f9f9f9;
  }
  
  .product-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-list li {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    overflow: hidden;
    text-align: center;
  }
  
  .product-list li:hover {
    transform: scale(1.05);
  }
  
  .product-list img {
    width: 100%;
    height: auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .product-list h2 {
    font-size: 1.5rem;
   margin: 10px;
  }
  
  .product-list .price {
    font-size: 1.25rem;
    font-weight: bold;
    color: #e74c3c;
    margin: 10px;
  }
  </style>