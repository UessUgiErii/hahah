<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">查看所有管理员账号.</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号</span>
      </div>

      

      <el-table :data="tableData" stripe style="width: 100%:textAlign:center;" show-header>
        
        <el-table-column prop="name" label="用户名称" ></el-table-column>
        <el-table-column prop="nameZu" label="用户组" ></el-table-column>
        <el-table-column prop="guanli" label="管理" >
          <el-button-group size="mini">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
      <div style="margin:30px 0 20px 0">
        <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
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
          name: 'anrui',
          nameZu: "超级管理员",
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