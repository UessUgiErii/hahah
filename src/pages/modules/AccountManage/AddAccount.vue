<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">添加管理员账号</p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>添加管理员账号</h4>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="myForm">
        <el-form-item label="用户名:" prop="username" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.pwd" show-password></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" prop="pwdex" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.pwdex" show-password></el-input>
        </el-form-item>

        <el-form-item label="选择用户组">
          <el-select v-model="ruleForm.region" placeholder="请选择用户组">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="臭弟弟" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addAccount } from "../../../api/apis";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      //字母 数字下划线8-16位
      var reg = /^\w{5,16}$/;
      // console.log(reg.test(value));
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的用户名"));
        }
      }
    };
    var validatePwd = (rule, value, callback) => {
      //字母 数字下划线8-16位
      var reg = /^\w{5,16}$/;
      // console.log(reg.test(value));
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("密码是5-16位数字字母下划线"));
        }
      }
    };
    //确认密码验证规则
    var validatePwdex = (rule, value, callback) => {
      // value ;当前框的值
      //   console.log(this.ruleForm.newpwd)
      //   console.log(value)
      if (value == this.ruleForm.pwd) {
        callback();
      } else {
        callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      ruleForm: {
        username: "", //新密码
        pwd: "", //原密码
        pwdex: "", //确认密码 两次输入的密码不一致
        region: "0" //下拉框
      },
      rules: {
        pwd: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义匹配规则
          { validator: validatePwd, trigger: "blur" }
        ],
        username: [{ validator: validatePass, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        pwdex: [{ validator: validatePwdex, trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(val) {
      // console.log(val)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addAccount(
            this.ruleForm.username,
            this.ruleForm.pwd,
            this.ruleForm.region
          ).then(res => {
            if (res.data.code == 1) {
              // alert("添加失败,用户名已存在!");
              this.$message({
                message: "添加失败,用户名已存在!",
                type: "warning"
              });
            } else {
              this.$message({
                type: "success",
                message: "添加用户成功!"
              });
              // alert("添加用户成功!");
            }
          });
        } else {
          // alert("添加失败!");
          this.$message({
            message: "添加失败!",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>