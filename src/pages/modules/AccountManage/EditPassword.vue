<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">修改账号密码</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>修改密码</h4>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="myForm">
        <el-form-item label="原密码:" prop="pwd" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newpwd" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.newpwd" show-password></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" prop="pwdex" style="width:400px">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.pwdex" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { EditPassword } from "../../../api/apis";
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      //字母 数字下划线8-16位
      var reg = /^\w{5,16}$/;
      console.log(reg.test(value));
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
      if (value == this.ruleForm.newpwd) {
        callback();
      } else {
        callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      ruleForm: {
        pwd: "", //原密码
        newpwd: "", //新密码
        pwdex: "" //确认密码 两次输入的密码不一致
      },
      rules: {
        pwd: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义匹配规则
          { validator: validatePwd, trigger: "blur" }
        ],
        newpwd: [{ validator: validatePwd, trigger: "blur" }],
        pwdex: [{ validator: validatePwdex, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {
      console.log(localStorage.getItem("id"));

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          EditPassword(
            localStorage.getItem("id"),
            this.ruleForm.newpwd,
            this.ruleForm.pwd
          ).then(res => {
            console.log(res.data)
            if (res.data.code == 0) {
              this.$notify({
                title: "系统提示",
                message: "修改成功!即将跳转登录...",
                type: "success"
              });
              // alert('修改成功!')
              setTimeout(()=>{
                this.$router.replace('/')
              },2000)
            } else if (res.data == "passwordError") {
              this.$notify.error({
                title: "系统提示",
                message: "原密码错误!"
                // type: "success"
              });
            } else {
              // alert("修改失败!");
              this.$notify.error({
                title: "系统提示",
                message: "修改失败!"
                // type: "success"
              });
            }
          });
        } else {
          this.$notify.error({
            title: "系统提示",
            message: "修改失败!"
            // type: "success"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>