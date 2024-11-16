<template>
  <div>
    <h2>Đăng ký tài khoản</h2>
    <input v-model="username" placeholder="Tên đăng nhập" />
    <input v-model="password" type="password" placeholder="Mật khẩu" />
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Xác nhận mật khẩu"
    />
    <button @click="register">Đăng ký</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    };
  },
  methods: {
    register() {
      // Kiểm tra mật khẩu và xác nhận mật khẩu có giống nhau không
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu không trùng khớp";
        return;
      }

      // Kiểm tra user này có tồn tại trong localStorage hay không
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Kiểm tra username có tồn tại trong danh sách người dùng hay chưa
      const existingUser  = users.find((user) => user.username === this.username);
      if (existingUser ) {
        this.error = "Tên đăng nhập đã tồn tại";
        return;
      }

      // Nếu không tồn tại, thêm người dùng mới
      const newUser  = {
        id: users.length + 1,
        username: this.username,
        password: this.password,
      };

      // Thêm người dùng mới vào danh sách
      users.push(newUser );

      // Lưu danh sách xuống localStorage
      localStorage.setItem("users", JSON.stringify(users));

      this.success = "Đăng ký thành công";
      this.error = "";
      this.username = "";
      this.password = "";
      this.confirmPassword = "";

      // Điều hướng đến trang đăng nhập
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.error {
  color: red;
}
.success {
  color: green;
}
</style>