<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">查看和管理所有已有的商品.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="--------选择分类--------">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字:" style>
          <div style="display:flex;width:300px;">
            <el-input v-model="formInline.user"></el-input>
            <div style="width:200px;">(商品名称 , 条形码)</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="nullDiv"></div>

      <el-table :data="tableData" stripe style="width: 100%:textAlign:center;" show-header>
        <el-table-column prop="tiaoxingma" label="商品条形码" width="128"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="80"></el-table-column>
        <el-table-column prop="feilei" label="所属分类" width="80"></el-table-column>
        <el-table-column prop="xiaoshou" label="售价(元)" width="80"></el-table-column>
        <el-table-column prop="cuxiao" label="促销价(元)" width="100"></el-table-column>
        <el-table-column prop="shichang" label="市场价(元)" width="100"></el-table-column>
        <el-table-column prop="kucun" label="库存" width="80"></el-table-column>
        <el-table-column prop="kucunMoney" label="库存总额(元)" width="120"></el-table-column>
        <el-table-column prop="xiaoshouTotal" label="销售总额(元)" width="120"></el-table-column>
        <el-table-column prop="guanli" label="管理" width="140">
          <el-button-group size="mini">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
        <div style="margin:30px 0 20px 0">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>   

        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          tiaoxingma: 1111111111111,
          name: "王小虎",
          feilei: "优乐美",
          xiaoshou: "2.00",
          cuxiao: "未促销",
          shichang: "2.40",
          kucun: "0(缺)",
          kucunMoney: "0.00",
          xiaoshouTotal: "0.00"
        },
        {
          tiaoxingma: 1111111111111,
          name: "王小虎",
          feilei: "优乐美",
          xiaoshou: "2.00",
          cuxiao: "未促销",
          shichang: "2.40",
          kucun: "0(缺)",
          kucunMoney: "0.00",
          xiaoshouTotal: "0.00"
        },
        {
          tiaoxingma: 1111111111111,
          name: "王小虎",
          feilei: "优乐美",
          xiaoshou: "2.00",
          cuxiao: "未促销",
          shichang: "2.40",
          kucun: "0(缺)",
          kucunMoney: "0.00",
          xiaoshouTotal: "0.00"
        },
        {
          tiaoxingma: 1111111111111,
          name: "王小虎",
          feilei: "优乐美",
          xiaoshou: "2.00",
          cuxiao: "未促销",
          shichang: "2.40",
          kucun: "0(缺)",
          kucunMoney: "0.00",
          xiaoshouTotal: "0.00"
        }
      ]
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
.nullDiv {
  height: 1px;
  border: 1px solid #ccc;
}
</style>