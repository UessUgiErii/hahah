<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">
      商品销售. 带
      <span style="color:red">*</span>为必填项. 先把商品加入订单. 所有商品都加入点单后点
      <span style="color:red">确认提交</span>完成 !
    </p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="商品条形码" prop="name" style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="num" style="width:286px">
          <div class="priceStyle">
            <el-input v-model="ruleForm.num"></el-input>
            <span style="color:#666;fontSize:12px;width:270px;">计重商品单位为千克</span>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">加入订单</el-button>
          <span>重新出库</span>
        </el-form-item>
     

      <div class="nullDiv"></div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="num" label="数量" width="180"></el-table-column>
        <el-table-column prop="price" label="单价(元)"></el-table-column>
        <el-table-column prop="total" label="总价(元)"></el-table-column>
        <el-table-column prop="totalvip" label="优惠总价(元)"></el-table-column>
      </el-table>
      <div style="borderBottom:1px solid #ccc;height:40px;lineHeight:40px;marginBottom:20px;">
        总价: <span>0</span>元 , 优惠: <span>0</span>元 , <span style="color:red">小计: <span>0</span>元</span>

      </div>

         <el-form-item label="会员卡号" prop="" style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
          <span style="fontSize:12px;color:#666">填写会员卡卡号</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认提交</el-button>
        </el-form-item>

        </el-form>


    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        num: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品条形码", trigger: "blur" },
          { min: 1, max: 13, message: "长度13位数字", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 位数字", trigger: "blur" }
        ]
      },
      tableData: [
        {
          name: "",
          num: "",
          price: "",
          total: "",
          totalvip: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  created () {
    console.log(this.$store.state.name)
  }
};
</script>

<style lang="less" scoped>
.priceStyle {
  display: flex;
}
.nullDiv {
  height: 1px;
  border: 1px solid #ccc;
}
</style>