<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">查看所有管理员账号.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号</span>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户分类" width="180">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.userGroup }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:30px 0 20px 0">
        <el-pagination
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAccounts, removeAccount } from "@/api/apis";
export default {
  data() {
    return {
      formInline: {
        user: ""
      },
      tableData: [],
      value1: "",
      value2: "",
      curpage: 1, //当前选中的页数
      total: 0, //最大条数
      pageSize: 3 //每页显示多少条
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // delAccount() {
    //   removeAccount().then(res => {});
    // },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      //index 数据索引 row当前点击行的数据对象
      // console.log(row.id);

      //先调用自己的确认框
      this.$confirm("此操作将永久删除该账户, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeAccount(row.id).then(res => {
            if (res.data == "ok") {
              this.$message({
                message: "删除成功!",
                type: "success"
              });
                //重新调用一次求请 跟新数据
                this.commonGetAccount(this.curpage);
              // if (!res.data.data.length) {
              //   this.curpage -= 1;
              //   this.tableData = res.data.data;
              //    this.commonGetAccount(this.curpage);
              //   if (this.curpage < 1) {
              //     this.curpage = 1;
              //   }
              // }
            } else {
              this.$message({
                message: "删除失败!",
                type: "warning"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //公用获取用户数据
    commonGetAccount(curpage) {
      getAccounts(curpage, this.pageSize).then(res => {
        // console.log(res.data)
        for (let item of res.data.data) {
          // console.log(item)
          if (item.userGroup == "0") {
            item.userGroup = "超级管理员";
          } else if (item.userGroup == "1") {
            item.userGroup = "管理员";
          } else if (item.userGroup == "2") {
            item.userGroup = "臭弟弟";
          }
        }
        console.log(res.data.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    pageChange(curpage) {
      // console.log(curpage)
      this.curpage = curpage;
      //请求当前页数的数据
      this.commonGetAccount(this.curpage);
    }
  },
  created() {
    this.commonGetAccount(this.curpage);
  }
};
</script>

<style lang="less" scoped>
.nullDiv {
  height: 1px;
  border: 1px solid #ccc;
}
</style>