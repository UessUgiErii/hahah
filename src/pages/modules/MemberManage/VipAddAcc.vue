<template>
  <div>
    <p style="marginTop:10px;marginBottom:30px;">
      添加和编辑会员账号. 带
      <span style="color:red">*</span>为必填
    </p>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加会员账号</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="真实姓名" prop="name" style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="会员卡卡号" prop="crad" style="width:286px">
          <el-input v-model="ruleForm.crad"></el-input>
        </el-form-item>

        <el-form-item label="用户组" prop="region">
          <el-select
            v-model="ruleForm.region"
            placeholder="---------选择分类---------"
            style="width:186px"
          >
            <el-option label="普通会员60%" value="shanghai"></el-option>
            <el-option label="普通会员80%" value="beijing"></el-option>
            <el-option label="普通会员90%" value="beijing"></el-option>
            <el-option label="普通会员99%" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号码" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="用户状态">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="手机号码" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="座机号码" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="邮箱地址" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="地区选择" prop style="width:286px">
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="邮政编码" prop style="width:286px">
          <el-input v-model="ruleForm.name"></el-input>
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
        region: "",
        crad: "",
        resource: ""
      },
      rules: {
        region: [{ required: true, message: "请选择分类", trigger: "change" }],
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        crad: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" },
          { min: 12, max: 12, message: "长度12位数字", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions: []
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
      onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>