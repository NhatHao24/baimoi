<template>
    <div class="product">
      <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price }} VND</p>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComProduct',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .product {
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
    width: 200px; /* Đặt chiều rộng cố định cho sản phẩm */
    margin: 20px auto; /* Đảm bảo có khoảng cách giữa các sản phẩm */
    padding: 1px; /* Giảm padding để có thể vừa sát vào các cạnh */
  }
  
  .product:hover {
    transform: scale(1.05);
  }
  
  .product-image {
    width: 100%;
    height: 150px; /* Đặt chiều cao cố định cho hình ảnh */
    object-fit: cover; /* Giữ cho hình ảnh không bị méo */
    margin-bottom: 0px; /* Tạo khoảng cách giữa hình ảnh và thông tin */
  }
  
  .product-info {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 0.5px; /* Giảm padding để thông tin sản phẩm gọn gàng hơn */
    text-align: left;
  }
  
  .product-name {
    font-size: 1em;
    margin: 0px 0; /* Điều chỉnh margin để giảm khoảng cách */
  }
  
  .product-description {
    color: #ccc3c3;
    font-size: 0.9em; /* Giảm kích thước chữ để phù hợp hơn */
    margin-bottom: 10px; /* Thêm margin cho khoảng cách giữa description và giá */
  }
  
  .product-price {
    font-weight: bold;
    margin-top: 5px;
  }
  </style>
  