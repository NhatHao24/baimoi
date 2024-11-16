<template>
  <div>
    <!-- Danh sách sản phẩm -->
    <div v-for="product in products" :key="product.id" class="product">
      <img :src="product.image" alt="Product Image" />
      <div class="info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} VNĐ</p>
        <p>Số lượng còn lại: {{ product.quantity }}</p>
      </div>

      <!-- Điều khiển nút và số lượng -->
      <div class="controls">
        <button @click="decreaseQuantity(product)">-</button>
        <span class="quantity">{{ product.selectedQuantity }}</span>
        <button @click="increaseQuantity(product)">+</button>
        <button @click="showNotification">Thêm vào giỏ hàng</button>
      </div>
    </div>

    <!-- Hiển thị thông báo -->
    <p v-if="cartNotification" class="notification">Sản phẩm đã được thêm vào giỏ hàng!</p>
  </div>
</template>


<script>
import products from '@/data/items'; // Danh sách sản phẩm

export default {
  data() {
    return {
      products: products.map(product => ({
        ...product,
        selectedQuantity: 1, // Mỗi sản phẩm sẽ có số lượng mặc định là 1
      })),
      cartNotification: false, // Biến để hiển thị thông báo
    };
  },
  methods: {
    // Tăng số lượng sản phẩm
    increaseQuantity(product) {
      if (product.selectedQuantity < product.quantity) {
        product.selectedQuantity++;
      } else {
        alert('Số lượng muốn thêm không thể lớn hơn số lượng còn lại!');
      }
    },

    // Giảm số lượng sản phẩm
    decreaseQuantity(product) {
      if (product.selectedQuantity > 1) {
        product.selectedQuantity--;
      }
    },

    // Hiển thị thông báo khi nhấn nút "Thêm vào giỏ hàng"
    showNotification() {
      this.cartNotification = true;
      setTimeout(() => {
        this.cartNotification = false; // Tự động ẩn thông báo sau 2 giây
      }, 2000);
    },
  },
};
</script>


<style scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.product img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}

.product .info {
  flex-grow: 1;
  text-align: left;
}

.product h3 {
  margin: 0;
  font-size: 18px;
}

.product p {
  color: #555;
  margin: 5px 0;
}

.product .controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product .controls button {
  background-color: #e56e3f;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product .controls button:hover {
  background-color: #687b69;
}

.product .quantity {
  font-size: 16px;
  margin: 0 10px;
}

.notification {
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>


