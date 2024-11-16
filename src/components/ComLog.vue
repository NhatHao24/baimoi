<template>
    <div>
      <h2>Đăng nhập</h2>
      <input v-model="username" placeholder="Tên đăng nhập" />
      <input v-model="password" type="password" placeholder="Mật khẩu" />
      <button @click="login">Đăng nhập</button>
      <p v-if="error" >{{ error }}</p>
    </div>
  </template>
  
  <script>
  import users from '@/data/users'
  import eventBus from '@/router/eventBus'
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
        users:users
        
      };
    },
    methods:{
        login(){
            //Tìm người dùng phù hợp 
            const user= this.users.find(u =>u.username === this.username && users.password === this.password);
            if(user){
                // Lưu ng dung vào locaStorage nếu đăng nhập thành công 
                localStorage.setItem('currentUser' , JSON.stringify(user));
                eventBus.emit('loginSuccess', user)
                this.$route.push('/');

            }else{
                this.error=' Tên đăng nhập hoặc mất khẩu không đúng';
            }

        }
    }
    
  };
  </script>
  