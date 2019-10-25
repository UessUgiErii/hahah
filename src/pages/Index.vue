<template>
  <div class="container">
    <div class="top">
      <div class="top-left">
        <h2>
          <i class="el-icon-menu"></i>
          沃尔玛超市管理系统
        </h2>
      </div>
      <div class="top-right">
        <img src="../assets/images/头像2.jpg" alt />
        <span>臭弟弟</span>&nbsp;/&nbsp;
        <span class="span-two">退出</span>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <el-menu
          :default-active="activePage"
          class="mymenu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#314158"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu v-for="item in treeList" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.class"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(smallItem , index) in item.childs"
                :index="smallItem.index"
                :key="index"
              >{{ smallItem.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right" style="padding:28px 40px 0 40px">
        <div>
          <h1>
            欢迎您,
            <span>admin</span>
          </h1>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <div class="bottom">
      <div>©COPYRIGHT 2016-2020 WalMart Inc.</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      //选项卡展开是触发的函数
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //选项卡收起时触发的函数
      console.log(key, keyPath);
    }
  },
  data() {
    return {
      activePage: "/main/commodity",
      treeList: [
        { index: "1", class: "el-icon-s-grid", title: "分类管理" },
        {
          index: "2",
          class: "el-icon-s-goods",
          title: "商品管理",
          childs: [
            { index: "/main/commodity", name: "商品管理" },
            { index: "/main/addCommodity", name: "添加商品" }
          ]
        },
        {
          index: "3",
          class: "el-icon-circle-plus",
          title: "进货管理",
          childs: [
            { index: "/main/inventory", name: "库存管理" },
            { index: "/main/addInventory", name: "添加库存" }
          ]
        },
        {
          index: "4",
          class: "el-icon-remove",
          title: "出货管理",
          childs: [
            { index: "/main/MarketList", name: "销售列表" },
            { index: "/main/OutCommodity", name: "商品出库" },
            { index: "/main/SalesReturn", name: "商品退货" }
          ]
        },
        {
          index: "5",
          class: "el-icon-s-data",
          title: "统计管理",
          childs: [
            { index: "/main/SalesStatistics", name: "销售统计" },
            { index: "/main/StockStatistics", name: "进货统计" }
          ]
        },
        {
          index: "6",
          class: "el-icon-s-custom",
          title: "账号管理",
          childs: [
            { index: "/main/accountManage", name: "账号管理" },
            { index: "/main/addAccount", name: "添加账号" },
            { index: "/main/editPassword", name: "密码修改" }
          ]
        },
        {
          index: "7",
          class: "el-icon-s-check",
          title: "会员管理",
          childs: [
            { index: "/main/AccManage", name: "账号管理" },
            { index: "/main/VipAddAcc", name: "添加账号" }
          ]
        },
        { index: "8", class: "el-icon-s-tools", title: "系统管理" }
      ]
    };
  },
  created() {
    //根据hash值 默认选中
    var hash = location.hash.replace("#", "");
    // console.log(hash)
    this.activePage = hash;
  }
};
</script> 

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  .top {
    height: 8%;
    background: #242f41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 24px;
    .top-right {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .span-two {
        font-size: 12px;
      }
    }
  }
  .center {
    height: 88%;
    width: 100%;
    display: flex;
    .left {
      width: 300px;
      height: 100%;
      background: #314158;
      .mymenu {
        height: 100%;
      }
    }
    .right {
      flex: 1;
      background: #eee;
    }
  }
  .bottom {
    height: 4%;
    background: #242f41;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>