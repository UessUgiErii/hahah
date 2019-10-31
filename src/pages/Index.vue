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
        <img @click="centerDialogVisible = true" :src="headsrc" alt />
        <span>{{ userName }}</span>&nbsp;/&nbsp;
        <span class="span-two" @click="toLogin">退出</span>
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
      <div class="right" style="padding:28px 40px 0 40px;">
        <div>
          <h1>
            欢迎您,
            <span>{{ userName }}</span>
          </h1>
        </div>
        <div style="height:700px;;width:100%">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>©COPYRIGHT 2016-2020 WalMart Inc.</div>
    </div>

    <div class="tanchukuang">
      <el-dialog title="上传头像" :visible.sync="centerDialogVisible" width="30%" center>
        <el-upload
          class="avatar-uploader"
          :action="ip"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getToken, IP } from "../api/apis";
import tree from "../json/tree.json";
// import { IP } from "@/api/apis";
export default {
  methods: {
    handleOpen(key, keyPath) {
      //选项卡展开是触发的函数
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //选项卡收起时触发的函数
      console.log(key, keyPath);
    },
    toLogin() {
      this.$router.replace("/");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = IP + "/" + res;
      //用vuex去改变右上角的头像
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  data() {
    return {
      userName: "请登录",
      activePage: "/main/commodity",
      treeList: [
        // { index: "1", class: "el-icon-s-grid", title: "分类管理" },
        // {
        //   index: "2",
        //   class: "el-icon-s-goods",
        //   title: "商品管理",
        //   childs: [
        //     { index: "/main/commodity", name: "商品管理" },
        //     { index: "/main/addCommodity", name: "添加商品" }
        //   ]
        // },
        // {
        //   index: "3",
        //   class: "el-icon-circle-plus",
        //   title: "进货管理",
        //   childs: [
        //     { index: "/main/inventory", name: "库存管理" },
        //     { index: "/main/addInventory", name: "添加库存" }
        //   ]
        // },
        // {
        //   index: "4",
        //   class: "el-icon-remove",
        //   title: "出货管理",
        //   childs: [
        //     { index: "/main/MarketList", name: "销售列表" },
        //     { index: "/main/OutCommodity", name: "商品出库" },
        //     { index: "/main/SalesReturn", name: "商品退货" }
        //   ]
        // },
        // {
        //   index: "5",
        //   class: "el-icon-s-data",
        //   title: "统计管理",
        //   childs: [
        //     { index: "/main/SalesStatistics", name: "销售统计" },
        //     { index: "/main/StockStatistics", name: "进货统计" }
        //   ]
        // },
        // {
        //   index: "6",
        //   class: "el-icon-s-custom",
        //   title: "账号管理",
        //   childs: [
        //     { index: "/main/accountManage", name: "账号管理" },
        //     { index: "/main/addAccount", name: "添加账号" },
        //     { index: "/main/editPassword", name: "密码修改" }
        //   ]
        // },
        // {
        //   index: "7",
        //   class: "el-icon-s-check",
        //   title: "会员管理",
        //   childs: [
        //     { index: "/main/AccManage", name: "账号管理" },
        //     { index: "/main/VipAddAcc", name: "添加账号" }
        //   ]
        // },
        // { index: "8", class: "el-icon-s-tools", title: "系统管理" }
      ],
      centerDialogVisible: false,
      imageUrl: "",
      uploadData: {}, //上传时携带的参数
      
    };
  },
  created() {
    //根据hash值 默认选中
    var hash = location.hash.replace("#", "");
    // console.log(hash)
    this.activePage = hash;
    // this.userName = localStorage.acc
    // console.log(localStorage.token)
    this.treeList = tree;

    getToken(localStorage.token).then(res => {
      if (res.data == "timeout") {
        this.userName = "请登录";
      } else {
        this.userName = localStorage.acc;

        this.treeList = tree.filter(item => {
          return item.userGroup.includes(localStorage.userGroup);
        });
      }
      console.log(res.data);
    });

    this.uploadData = {
      id: "xxx",
      name: "xxx",
      a: "xxx"
    };
  },
  computed: {
    ip() {
      //怎么在post上传文件时携带额外的参数
      return IP + "/upload?acc=" + localStorage.acc;
    },
    headsrc() {
     return localStorage.avatarUrl != "null"
        ? IP + "/" + localStorage.avatarUrl
        : "https://b-ssl.duitang.com/uploads/item/201707/19/20170719211350_4PnBt.jpeg";
    }
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
  .tanchukuang {
    .avatar-uploader {
      display: flex;
      justify-content: center;
      .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px !important;
      }
      .avatar-uploader-icon:hover {
        border-color: #409eff !important;
      }
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>