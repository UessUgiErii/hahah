<template>
  <div style="width:100% ; height:700px;">
    <p style="marginTop:10px;marginBottom:30px;">
      1.你可以在这里添加新的商品或者编辑已有的商品.2.新添加商品的时候可以同时进行入库(入库必需有数量和进价)!3.带
      <span style="color:red">*</span>的项目必填
    </p>

    <div
      style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);background:#fff;width:100%;height:600px;overflow: auto;"
    >
      <h4 style="paddingLeft:26px">添加商品</h4>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="所属分类" prop="category">
          <el-select
            v-model="ruleForm.category"
            placeholder="---------选择分类---------"
            style="width:186px"
          >
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="name" style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="商品售价" prop="salePrice" style="width:300px;">
          <div class="priceStyle">
            <el-input v-model="ruleForm.salePrice"></el-input>
            <div>元</div>
          </div>
        </el-form-item>

        <el-form-item label="市场价" prop style="width:300px;">
          <div class="priceStyle">
            <el-input v-model="ruleForm.marketPrice"></el-input>
            <div>元</div>
          </div>
          <span style="color:#666;fontSize:12px">默认市场价为售价的1.2倍</span>
        </el-form-item>

        <el-form-item label="市场进价" prop style="width:300px;">
          <div class="priceStyle">
            <el-input v-model="ruleForm.stockPrice"></el-input>
            <div>元</div>
          </div>
        </el-form-item>

        <el-form-item label="入库数量" prop style="width:286px">
          <el-input v-model="ruleForm.stockCount"></el-input>
          <span style="color:#666;fontSize:12px">计重商品单位为千克</span>
        </el-form-item>

        <el-form-item label="商品重量" prop style="width:286px">
          <el-input v-model="ruleForm.commodityWeight"></el-input>
        </el-form-item>

        <el-form-item label="商品单位" prop style="width:286px">
          <el-input v-model="ruleForm.commodityUnit"></el-input>
        </el-form-item>

        <el-form-item label="会员优惠">
          <el-radio-group v-model="ruleForm.vipDiscount">
            <el-radio label="1">享受</el-radio>
            <el-radio label="0">不享受</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否促销">
          <el-radio-group v-model="ruleForm.promotion">
            <el-radio label="1">促销</el-radio>
            <el-radio label="0">不促销</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
          <span style="color:#666;fontSize:12px">不超过200汉字</span>
        </el-form-item>

        <el-form-item label="商品条形码" prop style="width:286px">
          <el-input v-model="ruleForm.barCode"></el-input>
          <el-button type="success" @click="clickRandomCode">生成条形码</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import category from "@/json/category.json";
import { addCommodity } from "../../../api/apis";
export default {
  data() {
    return {
      ruleForm: {
        category: 1,
        barCode: "", //条形码
        name: "", //商品名
        salePrice: "", //商品售价
        marketPrice: "", //市场价
        stockPrice: "", //进价
        stockCount: "", //入库数量
        commodityWeight: "", //商品重量
        commodityUnit: "", //商品单位
        vipDiscount: "0", //是否优惠
        promotion: "0", //是否促销
        goodsDesc: "" //产品介绍
      },
      options: [], //分类
      rules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        salePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 位数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      // var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCommodity(
            this.ruleForm.category,
            this.ruleForm.barCode,
            this.ruleForm.name,
            this.ruleForm.salePrice,
            this.ruleForm.marketPrice,
            this.ruleForm.stockPrice,
            this.ruleForm.stockCount,
            this.ruleForm.commodityWeight,
            this.ruleForm.commodityUnit,
            this.ruleForm.vipDiscount,
            this.ruleForm.promotion,
            this.ruleForm.goodsDesc
            // this.ruleForm
          ).then(res => {
            // console.log(res.data);
            if (res.data == "ok") {
              this.$message({
                message: "商品添加成功!",
                type: "success"
              });
            }
            // this.$refs[formName].resetFields();
            //清空当前屏幕数据
            this.ruleForm.category = 1;
            this.ruleForm.barCode = ""; //条形码
            this.ruleForm.name = ""; //商品名
            this.ruleForm.salePrice = ''; //商品售价
            this.ruleForm.marketPrice = ''; //市场价
            this.ruleForm.stockPrice = ''; //进价
            this.ruleForm.stockCount = ''; //入库数量
            this.ruleForm.commodityWeight = ''; //商品重量
            this.ruleForm.commodityUnit = ""; //商品单位
            this.ruleForm.vipDiscount = '0'; //是否优惠
            this.ruleForm.promotion = '0'; //是否促销
            this.ruleForm.goodsDesc = ""; //产品介绍
          });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "商品添加失败!",
            type: "success"
          });
          return false;
        }
      });
    },
    clickRandomCode() {
      let str = ``;
      for (let i = 0; i < 18; i++) {
        str += Math.floor(Math.random() * 10);
      }
      this.ruleForm.barCode = str;
    }
  },
  created() {
    this.options = category;
  }
};
</script>

<style lang="less" scoped>
.priceStyle {
  display: flex;
}
</style>