<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <img class="logo" :src="img" alt />
        <span>沃尔玛超市管理系统</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名:" prop="acc" clearable>
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.acc"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd">
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.pwd" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "../api/apis";
export default {
  created() {
    // console.log(this.$refs.ruleForm);
  },
  data() {
    var validatePass = (rule, value, callback) => {
      //字母 数字下划线8-16位
      var reg = /^\w{5,10}$/;
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
      // xxxx@xxx.xxx
      // var reg = /^\w{2,}@\w{2,}\.\w{2,3}$/;
      var reg = /^\w{5,16}$/;
      // console.log(reg.test(value));
      if (value === "") {
        callback(new Error("请输入用密码"));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的密码"));
        }
      }
    };
    return {
      error: false,
      ruleForm: {
        acc: "",
        pwd: ""
      },
      rules: {
        acc: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义匹配规则
          { validator: validatePass, trigger: "blur" }
        ],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      },
      img: require("../assets/images/超市.png"),
      flag:true //登录防抖的标杆
    };
  },
  methods: {
    submitForm() {
      //验证函数
      const _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //如果验证通过 发送请求给服务器
          if(this.flag){

            login(this.ruleForm.acc, this.ruleForm.pwd).then(res => {
              console.log(res)
              if (res.data.msg == "ok") {
                localStorage.setItem("id", res.data.id);
                localStorage.token = res.data.token
                localStorage.acc = this.ruleForm.acc
                localStorage.userGroup = res.data.userGroup
                localStorage.avatarUrl = res.data.avatarUrl;  //保存用户头像
                this.$router.replace("/main/commodity");
              } else {
                // alert("登录失败,请检查用户名或密码!");
                this.$message({
                  message: "登录失败,请检查用户名或密码!",
                  type: "warning"
                });
                // this.error = true
                this.flag = false 
                setTimeout(()=>{
                  this.flag = true
                },3000)
              }
            });
          }
        } else {
          // alert("用户名或密码错误!");
          this.$message({
            message: "用户名或密码错误!",
            type: "warning"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;
  .box-card {
    width: 400px;
    color: #fff;
    background-color: #141c23;
    .title {
      display: flex;
      justify-content: center;
      .logo {
        width: 18px;
        height: 18px;
      }
    }
    .colorF {
      color: #fff;
    }
  }
}
</style>