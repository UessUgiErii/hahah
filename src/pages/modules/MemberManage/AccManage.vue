<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">会员卡用户管理.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索:">
          <div style="display:flex;">
            <el-input v-model="formInline.user" style="width:200px"></el-input>
            <div style="flex:1">会员卡 , 会员名 , 电话 , 手机</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="nullDiv"></div>

      <el-table :data="tableData" stripe style="width: 100%:textAlign:center;" show-header>
        <el-table-column prop="vipCard" label="会员卡卡号" width="160"></el-table-column>
        <el-table-column prop="name" label="会员姓名" width="120"></el-table-column>
        <el-table-column prop="lv" label="会员等级" width="100"></el-table-column>
        <el-table-column prop="jifen" label="会员积分" width="100"></el-table-column>
        <el-table-column prop="zhekou" label="折扣" width="80"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="mobalPhone" label="座机号" width="120"></el-table-column>
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
      },
      tableData: [
        {
          vipCard: 1111111111111,
          name: "王小虎",
          num: 3,
          lv: '金牌会员',
          jifen: 500,
          zhekou: "50%",
          phone: 15182399748,
          mobalPhone:12345678

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