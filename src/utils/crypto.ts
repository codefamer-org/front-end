import CryptoJS from 'crypto-js';

const key = '01234567899876543210abcdefghijkl';
const mode = CryptoJS.mode.ECB;
const padding = CryptoJS.pad.Pkcs7;

/**
 * 密码加密
 * @param cryptoKey 需要加密的字符串
 * @returns
 */
export function encryption(cryptoKey: string) {
  const encrypt = CryptoJS.AES.encrypt(cryptoKey, CryptoJS.enc.Utf8.parse(key), { mode, padding });
  return encrypt.toString();
}

/**
 * 密码解密
 * @param encryptKey 需要解密密的字符串
 * @returns
 */
export function decryption(encryptKey: string) {
  const decrypt = CryptoJS.AES.decrypt(encryptKey, CryptoJS.enc.Utf8.parse(key), { mode, padding });
  return decrypt.toString(CryptoJS.enc.Utf8);
}
