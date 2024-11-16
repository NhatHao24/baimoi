<template>
  <div>
    <!-- Giỏ hàng -->
    <div v-if="cart.length === 0">
      <p>Giỏ hàng trống!</p>
    </div>
    <div v-else>
      <h2>Giỏ Hàng</h2>
      <table class="table">
        <tr>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Tổng tiền</th>
        </tr>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }} VND</td>
          <td>{{ item.price * item.quantity }} VND</td>
        </tr>
      </table>
      <div>
        <p>Tổng số sản phẩm: {{ totalQuantity }}</p>
        <p>Tổng tiền: {{ totalPrice }} VND</p>
        <button @click="clearCart">Xóa hết</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Lấy giỏ hàng từ localStorage khi trang giỏ hàng được tải
      cart: JSON.parse(localStorage.getItem('cart')) || [], 
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
  methods: {
    clearCart() {
      this.cart = [];
      // Cập nhật giỏ hàng trống vào localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  },
  watch: {
    cart(newCart) {
      // Đồng bộ giỏ hàng vào localStorage mỗi khi có thay đổi
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
  background-color: #fff;
}

.all-products {
  list-style: none;
  padding: 0;
}

.all-products li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.all-products img {
  margin-right: 10px;
}

.all-products button {
  margin-left: auto;
}
</style>
