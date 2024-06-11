
import { getQiNiuToken } from '@/api/common';
import * as qiniu from 'qiniu-js'

export function compressFile(file){
  const options = {
    quality: 0.92,
    noCompressIfLarger: true
    // maxWidth: 1000,
    // maxHeight: 618
  }
  return new Promise((rev, rej) => qiniu.compressImage(file, options).then(rev).catch(rej))
}

export async function originUpload(file, compress = true){
  const data = await getQiNiuToken({});
  const token = data.data;
  let source = file;
  if (compress) {
    const files = await compressFile(file);
    source = files?.dist;
  }
  return new Promise((rev, rej) => {
    if (token) {
      const observable = qiniu.upload(source, null, token)
      const subscription = observable.subscribe(proccess => {
        console.log('next', proccess);
      },
      (QiniuError, QiniuRequestError, QiniuNetworkError) => {
        console.log('error', QiniuError, QiniuRequestError, QiniuNetworkError);
        rej(QiniuError)
      },
      (results) => {
        console.log('complete', results);
        rev({ url: `${import.meta.env.VITE_QINIU_URL}/${results.key}`, alt: null, title: file.name })
      })
      console.log('subscription', subscription);
    } else {
      rej('缺少token')
    }
  });
}

// https://developer.qiniu.com/kodo/1283/javascript