<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">
      1.你可以在这里添加新的商品或者编辑已有的商品.2.新添加商品的时候可以同时进行入库(入库必需有数量和进价)!3.带
      <span style="color:red">*</span>的项目必填
    </p>

  
      <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);background:#fff;">
        <h4 style="height:60px;lineHeight:60px;paddingLeft:26px">
          添加商品
        </h4>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item label="所属分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="---------选择分类---------" style="width:186px">
          <el-option label="食品" value="shanghai"></el-option>
          <el-option label="服饰" value="beijing"></el-option>
          <el-option label="水果" value="beijing"></el-option>
          <el-option label="海鲜" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="name" style="width:286px">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="商品售价" prop="price" style="width:300px;">
        <div class="priceStyle">
          <el-input v-model="ruleForm.price"></el-input>
          <div>元</div>
        </div>
      </el-form-item>

      <el-form-item label="市场价" prop style="width:300px;">
        <div class="priceStyle">
          <el-input v-model="ruleForm.price2"></el-input>
          <div>元</div>
        </div>
        <span style="color:#666;fontSize:12px">默认市场价为售价的1.2倍</span>
      </el-form-item>

      <el-form-item label="市场进价" prop style="width:300px;">
        <div class="priceStyle">
          <el-input v-model="ruleForm.price2"></el-input>
          <div>元</div>
        </div>
      </el-form-item>

      <el-form-item label="入库数量" prop style="width:286px">
        <el-input v-model="ruleForm.price2"></el-input>
        <span style="color:#666;fontSize:12px">计重商品单位为千克</span>
      </el-form-item>

      <el-form-item label="商品重量" prop style="width:286px">
        <el-input v-model="ruleForm.price2"></el-input>
      </el-form-item>

      <el-form-item label="商品单位" prop style="width:286px">
        <el-input v-model="ruleForm.price2"></el-input>
      </el-form-item>

      <el-form-item label="会员优惠">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="享受"></el-radio>
          <el-radio label="不享受"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否促销">
        <el-radio-group v-model="ruleForm.resource2">
          <el-radio label="启用"></el-radio>
          <el-radio label="禁用"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="商品简介">
        <el-input  type="textarea" v-model="ruleForm.desc"></el-input>
        <span style="color:#666;fontSize:12px">不超过200汉字</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>

      </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        price: "",
        resource: "",
        resource2: "",
        desc: ""
      },
      rules: {
        region: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品售价", trigger: "blur" },
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