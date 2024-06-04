
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




