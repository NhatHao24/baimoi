<template>
  <div>
    <h1>TẤT CẢ SẢN PHẨM</h1>

    <!-- Danh sách sản phẩm dưới dạng lưới -->
    <div class="product-grid">
      <div 
        v-for="item in paginatedProducts" 
        :key="item.id" 
        class="product-item" 
        @click="showProductDetail(item)"
      >
        <!-- Pass the product data to the Product component -->
        <Product :product="item" />
      </div>
    </div>

    <!-- Modal chi tiết sản phẩm -->
    <div v-if="selectedProduct" class="product-modal">
      <div class="modal-content">
        <img :src="selectedProduct.image" alt="Product Image" class="modal-image" />
        <h3>{{ selectedProduct.name }}</h3>
        <p>{{ selectedProduct.description }}</p>
        <p>Giá: {{ selectedProduct.price }} VND</p>
        <div>
          <label for="quantity">Số lượng:</label>
          <input type="number" id="quantity" v-model="quantity" min="1" :max="selectedProduct.quality" />
        </div>
        <button @click="addToCart(selectedProduct)">Mua ngay</button>
        <button @click="closeModal">Đóng</button>
      </div>
    </div>

    <!-- Phân trang -->
    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        :class="{'active': currentPage === page}" 
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>


<script>
import Product from './ComProduct.vue';
import items from '../data/items';
import eventBus from '@/router/eventBus';

export default {
  name: 'ComHome',
  components: {
    Product,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('currentUser')) || null,
      products: items,
      productsPerRow: 4, // Số sản phẩm mỗi hàng
      selectedProduct: null, // Sản phẩm được chọn để hiển thị chi tiết
      quantity: 1, // Số lượng mua
      currentPage: 1, // Trang hiện tại
    };
  },
  computed: {
    // Tính toán số lượng sản phẩm trên một trang
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerRow);
    },
    // Lấy các sản phẩm hiển thị trên trang hiện tại
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerRow;
      const end = start + this.productsPerRow;
      return this.products.slice(start, end);
    },
  },
  created() {
    eventBus.on('loginSuccess', (user) => {
      this.user = user;
    });
  },
  beforeUnmount() {
    eventBus.off('loginSuccess');
  },
  methods: {
  showProductDetail(product) {
    this.selectedProduct = product;
    this.quantity = 1; // Reset số lượng khi mở modal
  },
  closeModal() {
    this.selectedProduct = null;
  },
  methods: {
  addToCart(product) {
    if (this.quantity > 0 && this.quantity <= product.quality) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += this.quantity;
      } else {
        cart.push({ ...product, quantity: this.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`Đã thêm ${this.quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
      this.closeModal();

      // Điều hướng đến trang giỏ hàng
      this.$router.push('/cart');
    } else {
      alert('Số lượng không hợp lệ!');
    }
  }
},

  logout() {
    localStorage.removeItem('currentUser');
    this.user = null;
    this.$router.push('/');
  },
  goToPage(page) {
    this.currentPage = page;
  },
},
};
</script>


<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 3), 1fr); /* Sử dụng biến CSS để điều chỉnh số cột */
  gap: 20px;
  justify-items: center;
}

.product-item {
  background: #ffffff;
  border: 1px solid #120101;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(17, 17, 17, 0.1);
  transition: transform 0.2s;
  text-align: center;
  padding: 10px;
  max-width: 250px;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.modal-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

button {
  margin: 10px 5px;
  padding: 10px 20px;
  background-color: #fcb034;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c67b3d;
}

input[type='number'] {
  width: 60px;
  padding: 5px;
  text-align: center;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #fcb034;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #c67b3d;
}

.pagination .active {
  background-color: #e4a623;
}
</style>
