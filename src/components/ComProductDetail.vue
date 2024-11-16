<template>
    <main>
         <div class="menu">
             <h2 class="menu-title">Taste Our Foods & Enjoy</h2>
             <div class="menu-carousel">
                 <div class="menu-item">
                     <img :src="product.image" alt="Product Image">
                     <div class="menu-item-info">
                         <h3>{{ product.name }}</h3>
                         <p>{{ product.description }}</p>
                         <p>Giá: {{ product.price }} VND</p>
                         <p>Số lượng còn lại: {{ product.quantity }}</p>
 
                         <!-- Nút điều chỉnh số lượng -->
                         <div v-if="isBuying" class="quantity-controls">
                             <button @click="decreaseQuantity">-</button>
                             <span>{{ selectedQuantity }}</span>
                             <button @click="increaseQuantity">+</button>
                         </div>
 
                         <!-- Hiển thị tổng số tiền -->
                         <div v-if="isBuying">
                             <p>Tổng tiền: {{ totalPrice }} VND</p>
                         </div>
 
                         <!-- Nút Mua -->
                         <button v-if="!isBuying" @click="startBuying" class="buy-button">Mua ngay</button>
                         <button v-else @click="confirmPurchase" class="buy-button">Xác nhận mua</button>
                         
                         <!-- Nút Thêm vào giỏ hàng -->
                         <button v-if="!isBuying" @click="addToCart" class="add-to-cart-button">Thêm vào giỏ hàng</button>
                     </div>
                 </div>
             </div>
         </div>  
     </main>
 </template>
 
 
 <script>
import items from '@/data/items';

export default {
    data() {
        return {
            product: {}, // Sản phẩm hiện tại
            isBuying: false, // Trạng thái mua hàng
            selectedQuantity: 1, // Số lượng khách muốn mua
            cart: [] // Giỏ hàng
        };
    },
    mounted() {
        // Lấy ID sản phẩm từ URL
        let id = this.$route.params.id;
        // Gán số lượng mặc định là 10 nếu sản phẩm chưa có trường quantity
        this.product = items.find((item) => item.id == id);
        if (!this.product.quantity) {
            this.product.quantity = 100; // Gán số lượng mặc định
        }
    },
    computed: {
        // Tính toán tổng tiền dựa trên số lượng và giá sản phẩm
        totalPrice() {
            return this.product.price * this.selectedQuantity;
        },
    },
    methods: {
        startBuying() {
            // Khi nhấn nút "Mua ngay"
            this.isBuying = true;
        },
        increaseQuantity() {
            // Tăng số lượng sản phẩm
            if (this.selectedQuantity < this.product.quantity) {
                this.selectedQuantity++;
            } else {
                alert('Không thể mua vượt quá số lượng còn lại!');
            }
        },
        decreaseQuantity() {
            // Giảm số lượng sản phẩm
            if (this.selectedQuantity > 1) {
                this.selectedQuantity--;
            }
        },
        confirmPurchase() {
            // Xác nhận mua hàng
            if (this.product.quantity >= this.selectedQuantity) {
                this.product.quantity -= this.selectedQuantity;
                alert(`Bạn đã mua thành công ${this.selectedQuantity} sản phẩm: ${this.product.name}`);
                this.isBuying = false; // Reset trạng thái mua
                this.selectedQuantity = 1; // Reset số lượng mua
            } else {
                alert('Sản phẩm đã hết hàng!');
                this.isBuying = false; // Đóng trạng thái mua
            }
        },
        addToCart() {
            // Thêm sản phẩm vào giỏ hàng
            const cartItem = {
                product: this.product,
                quantity: this.selectedQuantity,
                totalPrice: this.totalPrice
            };

            // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, cộng thêm số lượng
            const existingItem = this.cart.find(item => item.product.id === this.product.id);
            if (existingItem) {
                existingItem.quantity += this.selectedQuantity;
                existingItem.totalPrice = existingItem.quantity * this.product.price; // Cập nhật giá trị tổng
            } else {
                this.cart.push(cartItem);
            }

            alert(`Đã thêm ${this.selectedQuantity} sản phẩm vào giỏ hàng!`);
            this.$router.push({ name: 'cart' });
            this.isBuying = false; // Đóng trạng thái mua
            this.selectedQuantity = 1; // Reset số lượng
        }
    },
};
</script>


<style>
.menu {
    text-align: center;
    padding: 40px 20px;
    background-color: #fff;
}

.menu-title {
    font-size: 32px;
    margin-bottom: 20px;
}

.menu-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    max-width: 100%;
    animation: slideIn 1s ease-in-out;
}

.menu-item {
    position: relative;
    flex: 0 0 25%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 0 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.menu-item img {
    width: 100%;
    transition: transform 0.3s ease;
}

.menu-item-info {
    position: relative;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    text-align: left;
    border-radius: 8px;
}

.buy-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.buy-button:hover {
    background-color: #45a049;
}

.menu-item-info h3 {
    font-size: 18px;
    margin: 0 0 10px;
}

.menu-item-info p {
    margin: 10px 0;
    color: #ccc;
}


.menu-navigation {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.menu-navigation i {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.menu-navigation i:hover {
    background-color: #eaa12b;
}
.quantity-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 10px 0;
}

.quantity-controls button {
    padding: 5px 10px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.quantity-controls button:hover {
    background-color: #ddd;
}

.quantity-controls span {
    font-size: 18px;
    font-weight: bold;
}

.buy-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.buy-button:hover {
    background-color: #45a049;
}

.menu-item-info p {
    margin: 0;
    color: #ccc;
}

.menu-item-info p:nth-child(4) {
    font-size: 18px;
    font-weight: bold;
    color: #ff5733; /* Màu sắc cho tổng tiền */
}

.add-to-cart-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff5733;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.add-to-cart-button:hover {
    background-color: #e04d2b;
}

</style>