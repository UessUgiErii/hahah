<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">查看商品的销售明细.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>

      <div style="marginBottom:20px;">
        <span class="demonstration">开始时间: </span>
       <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>

        <span class="demonstration">&emsp;结束时间: </span>
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字:">
          <div style="display:flex;">
            <el-input v-model="formInline.user" style="width:200px"></el-input>
            <div style="flex:1">商品名称 , 客户名称 , 订单号 , 会员卡号</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="nullDiv"></div>

      <el-table :data="tableData" stripe style="width: 100%:textAlign:center;" show-header>
        <el-table-column prop="dingdanhao" label="订单号" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="num" label="数量" width="80"></el-table-column>
        <el-table-column prop="shijishoujia" label="实际售价" width="120"></el-table-column>
        <el-table-column prop="youhui" label="优惠(促销/会员)" width="180"></el-table-column>
        <el-table-column prop="tuikuan" label="退款" width="100"></el-table-column>
        <el-table-column prop="xiaoshouTime" label="销售时间" width="140"></el-table-column>
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
          dingdanhao: 1111111111111,
          name: "王小虎",
          num: 3,
          shijishoujia: 23,
          youhui: "2.00元/无",
          tuikuan: "无退款",
          xiaoshouTime: "2012-02-17"
        }
      ],
       pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
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