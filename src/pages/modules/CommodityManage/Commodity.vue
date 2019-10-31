<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">查看和管理所有已有的商品.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>

      <div class="item">
        <el-select v-model="searchCategory" placeholder="--------选择分类--------">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.index"
          ></el-option>
        </el-select>

        <div style="display:flex;width:400px; align-items: center;margin-left:20px">
          <el-input style="flex:1" v-model="keywords"></el-input>
          <div style="width:148px;">(商品名称 , 条形码)</div>
        </div>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>

      <div class="nullDiv"></div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="分类">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品售价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="市场价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.marketPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入库数量">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.stockCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否优惠">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vipDiscount == '1' ? '开启' : '关闭' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否促销">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.promotion == '1' ? '开启' : '关闭' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin:30px 0 20px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <h4>商品条形码</h4>
      <el-input disabled v-model="formData.barCode" placeholder="商品条形码"></el-input>
      <p>
        所属分类：
        <el-select v-model="formData.category" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.index"
          ></el-option>
        </el-select>
      </p>
      <p>
        商品名称：&nbsp;
        <el-input style="width:220px" placeholder="请输入商品名称" v-model="formData.name"></el-input>
      </p>
      <p>
        商品售价：&nbsp;
        <el-input style="width:220px" placeholder="请输入商品售价" v-model="formData.salePrice"></el-input>&nbsp;元
      </p>
      <p>
        市&nbsp;场&nbsp;价&nbsp;：&nbsp;&nbsp;
        <el-input style="width:220px" placeholder="请输入商品卖价" v-model="formData.marketPrice"></el-input>&nbsp;元
      </p>
      <p>
        商品进价：&nbsp;
        <el-input style="width:220px" placeholder="请输入商品进价" v-model="formData.stockPrice"></el-input>&nbsp;元
      </p>
      <div>
        <el-button @click="quxiaoUpdata">取消</el-button>
        <el-button @click="clickItemUpdate" type="primary">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import category from "@/json/category.json";
import { commoditySearch, commodityRemove, commodityUpdate } from "@/api/apis";
export default {
  data() {
    return {
      dialogTableVisible: false,
      options: [],
      tableData: [],
      searchCategory: "全部商品",
      keywords: "",
      curPage: 1,
      pageSize: 6,
      total: 0,
      formData: {
        category: 1,
        name: "", //商品名
        barCode: "", //条形码
        salePrice: 0, //商品售价
        marketPrice: 0, //市场价
        stockPrice: 0, //进价
        stockCount: 0, //入库数量
        commodityWeight: 0, //商品重量
        commodityUnit: "", //商品单位
        vipDiscount: 0, //是否优惠
        promotion: 0, //是否促销
        goodsDesc: "" //产品介绍
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      this.getTableDateList(1, this.keywords, this.searchCategory);
    },
    getTableDateList(page, keywords = "", searchCategory = "") {
      commoditySearch(page, this.pageSize, keywords, searchCategory).then(
        res => {
          console.log(res.data.data);
          let arr = res.data.data;
          // this.tableData = res.data.data; //设置表格数据
          this.total = res.data.total;

          function getGateGoryName(index) {
            for (let c of category) {
              if (c.index == index) return c.name;
            }
          }

          for (let obj of arr) {
            obj.category = getGateGoryName(obj.category);
          }

          this.tableData = arr;
        }
      );
    },
    changePage(page) {
      // console.log(page);
      this.curPage = page;
      this.getTableDateList(page, this.keywords, this.searchCategory);
    },
    //删除
    handleDelete(val) {
      console.log(val.id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          commodityRemove(val.id).then(res => {
            if (res.data == "ok") {
              //数据删除成功
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //再次请求本页数据
              this.getTableDateList(this.curPage);
            }
          });
        })
        .catch(() => {
          //点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    handleEdit(val) {
      console.log(val);
      this.formData = { ...val };
      this.dialogTableVisible = true;
    },
    //点击确认修改
    clickItemUpdate() {
      // 如果要删除某些字段，那么必须先拷贝一个新对象，防止引用重复，造成数据错误！！！
      // let obj = {...this.formData}
      // delete this.formData.barCode

      // category: "饮料"
      // promotion: "无促销"0 "促销中": 1
      // vipDiscount: "关闭"0 "开启"：1

      let obj = {};
      for (let key in this.formData) {
        //特殊属性特殊转换！！！！
        if (key == "promotion") {
          obj.promotion = this.formData.promotion == "无促销" ? 0 : 1;
        } else if (key == "vipDiscount") {
          obj.vipDiscount = this.formData.vipDiscount == "关闭" ? 0 : 1;
        } else {
          // else if(key == 'category'){
          //   // //再次书写循环进行反转换
          // for(let iobj of category){
          //   console.log(iobj.name , this.formData.category)
          //   if(iobj.name == this.formData.category){
          //     // console.log(iobj)
          //     obj.category = iobj.index
          //     break
          //   }
          // }
          // }
          obj[key] = this.formData[key];
        }
      }

      if (typeof obj.category == "string") {
        for (let iobj of category) {
          if (iobj.name == this.formData.category) {
            obj.category = iobj.index;
            break;
          }
        }
      }

      commodityUpdate(obj).then(res => {
        if (res.data == "ok") {
          this.getTableDateList(this.curPage);
          this.dialogTableVisible = false;
          this.$message({
            type: "success",
            message: "数据修改成功!"
          });
        }
      });
    },
    //点击取消修改
    quxiaoUpdata() {
      this.dialogTableVisible = false;
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    }
  },
  created() {
    this.options = [{ name: "全部商品", index: -1 }, ...category];

    this.getTableDateList(1); //初始化调用数据
  }
};
</script>

<style lang="less" scoped>
.nullDiv {
  height: 1px;
  border: 1px solid #ccc;
}
.item {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
</style>