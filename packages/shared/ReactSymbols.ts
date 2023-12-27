/*
 * @Descripttion:
 * @Author: maple wang
 * @Date: 2023-12-27 10:17:21
 * @LastEditors: maple wang
 * @LastEditTime: 2023-12-27 10:31:56
 */
const supportSymbol = typeof Symbol === 'function' && Symbol.for;
export const REACT_ELEMENT_TYPE = supportSymbol
    ? Symbol.for('react.element')
    : 0xeac7;
