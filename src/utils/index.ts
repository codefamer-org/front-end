
/**
 * 延时函数
 * @param {*} time 延时时间
 * @returns
 */
export function delay(time = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}

/**
 * 过滤为空的结果
 * @param obj 对象键值对
 * @returns
 */
export function filterEmptyString(obj: { [prop: string]: string | boolean | number | undefined }) {
  const temp: { [prop: string]: string | boolean | number | undefined } = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (element !== null && element !== undefined && element !== '') {
        temp[key] = element
      }
    }
  }
  return temp
}


