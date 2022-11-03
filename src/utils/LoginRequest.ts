import service from './index'

// 登录
export function LoginRequest(data: { user: string; pass: string }) {
  return service({
    url: `/nestjs/user/login`,
    method: 'post',
    data: JSON.stringify(data)
  })
}
// 验证码
export function CodeRequest() {
  return service({
    url: `/nestjs/user/code`,
    method: 'post'
  })
}
// 模拟数据
export function shopData(id: number) {
  return service({
    url: `/fastmock/api/shop/${id}/`,
    method: 'get'
  })
}

