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
        <el-form-item label="用户名:" prop="name" clearable>
          <!-- 字母 数字下划线8-16位 -->
          <el-input v-model="ruleForm.name"></el-input>
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
export default {
  created() {
    console.log(this.$refs.ruleForm);
  },
  data() {
    var validatePass = (rule, value, callback) => {
      //字母 数字下划线8-16位
      var reg = /^\w{8,16}$/;
      console.log(reg.test(value));
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
      var reg = /^\w{8,16}$/;
      console.log(reg.test(value));
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
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义匹配规则
          { validator: validatePass, trigger: "blur" }
        ],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      },
      img: require("../assets/images/超市.png")
    };
  },
  methods: {
    submitForm() {
      //验证函数
      this.$refs.ruleForm.validate(valid => {
        // if (valid) {
        //   alert("submit!");
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
        // console.log(valid);
        if (valid) {
          //如果验证通过 发送请求给服务器
          setTimeout(() => {
            alert('登录成功!')
            this.$router.push("/main/commodity");
          }, 2000);
        } else {
          alert("用户名或密码错误");
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