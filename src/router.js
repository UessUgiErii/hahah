import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login.vue'

Vue.use(VueRouter);
var router =  new VueRouter({
    routes:[
        {   
            //登录
            path:'/', //匹配的url路劲
            name:'login',
            component: Login
        },
        {   
            //主页
            path:'/main',
            name:'main',
            component: () => import('./pages/Index.vue'),
            children:[
                { path:"/main/commodity" , name:"commodity",component:()=> import('./pages/modules/CommodityManage/Commodity.vue') }, //商品管理
                { path:"/main/addCommodity" , name:"addCommodity",component:()=> import('./pages/modules/CommodityManage/AddCommodity.vue') }, //添加商品
                
                
                { path:"/main/inventory" , name:"inventory",component:()=> import('./pages/modules/StockManage/Inventory.vue') }, //库存管理
                { path:"/main/addInventory" , name:"addInventory",component:()=> import('./pages/modules/StockManage/Addinventory.vue') }, //添加库存
                
                
                { path:"/main/MarketList" , name:"MarketList",component:()=> import('./pages/modules/ShipmentManage/MarketList.vue') }, //商品列表
                { path:"/main/OutCommodity" , name:"OutCommodity",component:()=> import('./pages/modules/ShipmentManage/OutCommodity.vue') }, //商品出货
                { path:"/main/SalesReturn" , name:"SalesReturn",component:()=> import('./pages/modules/ShipmentManage/SalesReturn.vue') }, //商品退货
                

                { path:"/main/SalesStatistics" , name:"SalesStatistics",component:()=> import('./pages/modules/StatisticsManage/SalesStatistics.vue') }, //销售统计
                { path:"/main/StockStatistics" , name:"StockStatistics",component:()=> import('./pages/modules/StatisticsManage/StockStatistics.vue') }, //进货统计


                
                { path:"/main/accountManage" , name:"accountManage",component:()=> import('./pages/modules/AccountManage/AccountManage.vue') }, //账号管理
                { path:"/main/addAccount" , name:"addAccount",component:()=> import('./pages/modules/AccountManage/AddAccount.vue') }, //添加账号
                { path:"/main/editPassword" , name:"editPassword",component:()=> import('./pages/modules/AccountManage/EditPassword.vue') },  //修改密码


                { path:"/main/AccManage" , name:"AccManage",component:()=> import('./pages/modules/MemberManage/AccManage.vue') }, //会员账号管理
                { path:"/main/VipAddAcc" , name:"VipAddAcc",component:()=> import('./pages/modules/MemberManage/VipAddAcc.vue') }, //会员添加账号
                
            ]
        }
    ]
})
export default  router