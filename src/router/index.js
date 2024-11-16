import { createWebHistory,createRouter } from "vue-router";
import Home from '@/components/ComHome.vue';
import SanPham from '@/components/ComSanPham.vue';
import GioiThieu from '@/components/ComGioiTh.vue';
import LienHe from '@/components/ComLienHe.vue';
import TinTuc from '@/components/ComTinTuc.vue';
import ProductDetail from'@/components/ComProductDetail.vue'
import Cart from '@/components/ComCart.vue';
import Register from "@/components/ComRegister.vue";
import ComLog from "@/components/ComLog.vue";
// tạo mảng chứa những đường link
const routes=[
    { path: '/', component: Home },
  { path: '/sanpham', component: SanPham },
  { path: '/cart', component: Cart }, // Đường dẫn đến giỏ hàng

    // đối tượng trang chủ
    {
        path:"/",
        name:"Home",
        component:Home
    },
    // đường link ko phải là trang chủ path:"/ten"
    {
        path:"/sanpham",
        name:"SanPham",
        component:SanPham
    },
    {
        path:"/gioithieu",
        name:"GioiThieu",
        component:GioiThieu
    },
    {
        path:"/lienhe",
        name:"LienHe",
        component:LienHe
    },
    {
        path:"/tintuc",
        name:"TinTuc",
        component:TinTuc
    },
    {
        path:"/product/:id",
        name:"ProductDetail",
        component:ProductDetail,
        props: true,
    },
    {
        path:"/cart",
        name:"cart",
        component:Cart
    },
    {
        path:"/register",
        name:"Register",
        component:Register
    },
    {
        path:"/comLog",
        name:"ComLog",
        component:ComLog
    }
]
// tạo đối tượng router
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router