const BigNumber = require('bignumber.js');

/**
 * 콤마 & 소수점 이하 0 짜르기
 *
 * @param value
 * @param decimalPosition
 * @returns {string}
 * @constructor
 */
export function NumberWithCommas(value, decimalPosition) {
  value = new BigNumber(value);
  if (value.comparedTo(0) === 1) {
    let parts = value.toString().split('.');
    let intPart = addCommas(parts[0]);
    if (parts[1]) {
      let floatPart = trimDecimal(parts[1], decimalPosition);
      return intPart + (parts[1] * 1 !== 0 ? '.' + floatPart : '');
    }
    return intPart + '';
  } else {
    return value + '';
  }
}

/**
 * 콤마 찍기
 *
 * @param number
 * @returns {string}
 */
function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 소수점 0 짜르기
 * @param decimal
 * @param position
 * @returns {string}
 */
function trimDecimal(decimal, position) {
  if (position > 0) {
    decimal = decimal.substr(0, position);
  }
  let floatLength = decimal.length | 0;
  let lastPosition = 0;
  for (let i = floatLength - 1; i >= 0; i--) {
    let temp = decimal.substr(i, 1);
    if (temp * 1 > 0) {
      lastPosition = i;
      break;
    }
  }
  return decimal.substr(0, lastPosition + 1);
}

/**
 * 웨이 변환
 *
 * @param value
 * @returns {*}
 * @constructor
 */
export function WeiConverter(value) {
  if (value.length <= 18) {
    // 1 ~ 18 자리
    let zeroLength = 19 - value.length;
    let newValue = '';
    for (let i = 0; i < zeroLength; i++) {
      newValue += '0';
    }
    newValue = newValue + value;
    return insert(newValue, 1, '.');
  } else {
    // 19 자리 이상
    return insert(value, value.length - 18, '.');
  }
}

/**
 * 소수'점' 찍기
 *
 * @param str
 * @param index
 * @param value
 * @returns {string}
 */
function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
