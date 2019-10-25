<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">
      商品入库.带
      <span style="color:red">*</span>的项目必填
    </p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加库存</span>
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
        <el-input v-model="ruleForm.num"></el-input>
        <span style="color:#666;fontSize:12px">计重商品单位为千克</span>
      </el-form-item>

      <el-form-item label="进价" prop="price" style="width:300px;">
        <div class="priceStyle">
          <el-input v-model="ruleForm.price"></el-input>
          <div>元</div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
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
        num: "",
        price: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品条形码", trigger: "blur" },
          { min: 1, max: 13, message: "长度13位数字", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 位数字", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品进价", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 位数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less" scoped>
.priceStyle {
  display: flex;
}
</style>