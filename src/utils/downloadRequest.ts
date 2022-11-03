import download from './download'
// 下载图片
export function imgDownLoad() {
  return download({
    url: `/nestjs/upload/download`,
    method: 'get'
  })
}
// 下载流
export function imgStream() {
  return download({
    url: `/nestjs/upload/stream`,
    method: 'get'
  })
}
