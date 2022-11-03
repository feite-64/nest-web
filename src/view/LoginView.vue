<template>

  <el-card class="box-card">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">

      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm.user" autocomplete="off" placeholder="请输出账号" />
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
      </el-form-item>
      <div class="code">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" type="" autocomplete="off" placeholder="请输入验证码" />
          <img @click="codeClick" :src="codeUrl" alt="">
        </el-form-item>
      </div>

      <div>
        <el-button type="default" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </div>
    </el-form>
  </el-card>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import 'element-plus/dist/index.css'
import { useRouter } from 'vue-router';
import { LoginRequest, CodeRequest } from '@/utils/LoginRequest';
const router = useRouter()
const codeUrl = ref<string>('/nestjs/user/code')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  user: '',
  pass: '',
  code: ''
})
const result = reactive<{ data: any }>({ data: {} })
// 点击刷新验证码
const codeClick = () => {
  // 时间戳
  const date = new Date().getTime()
  // 每次不一样
  codeUrl.value = codeUrl.value + "?" + date
}

const submitForm = async (formEl: FormInstance | undefined) => {
  // 判断是否为表单提交
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      // 发送请求数据库验证
      await LoginRequest(ruleForm).then(res => {
        result.data = res.data
      })
      // 验证码判断 错误进入
      if (result.data.code === 400) {
        // 刷新验证码
        codeClick()
        return ElMessage.error(result.data.message)
      }
      // 用户密码判断
      if (result.data.code === 200) {
        // 跳转页面并存储token令牌
        router.push('/')
        localStorage.setItem('token', JSON.stringify(result.data.message.user))
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const rules = reactive<FormRules>({
  user: [
    { required: true, message: '用户名不能为空', trigger: 'blur', type: 'string' },
    { min: 5, max: 12, message: '用户名长度在5-12', trigger: 'blur', type: 'string' },
  ],
  pass: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 6, max: 16, message: '密码长度在6-12-12', trigger: 'blur' }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur',
    },
    { len: 4, message: '长度为4', trigger: 'blur' }
  ],
})
</script>

<style scoped lang='scss'>
.box-card {
  margin-top: 20px;
}

.code {
  img {
    padding-top: 10px;
  }
}

div {
  text-align: center;
}
</style>