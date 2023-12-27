/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-12-27 10:05:30
 * @LastEditors: maple wang
 * @LastEditTime: 2023-12-27 11:33:20
 */
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ElementType, Key, Props, ReactElement, Ref, Type } from 'shared/ReactTypes';

const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElement {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        key,
        type,
        ref,
        props,
        _mark: 'wangf'
    };
    return element;
};
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
    let key: Key = null
    let props: Props = {}
    let ref: Ref = null
    for (const prop in config) {
        const val = config[prop]
        if (prop === 'key') {
            if (val !== undefined) {
                key = '' + val
            }
            continue
        }
        if (prop === 'ref') {
            if (val !== undefined) {
                ref = val
            }
            continue
        }
        if ({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val
        }
        const maybeChildrenLength = maybeChildren.length
        if (maybeChildrenLength) {
            if (maybeChildrenLength === 1) {
                props.chidren = maybeChildren[0]
            } else {
                props.chidren = maybeChildren
            }
        }
    }
    return ReactElement(type, key, ref, props)
}
export const jsxDev = jsx
