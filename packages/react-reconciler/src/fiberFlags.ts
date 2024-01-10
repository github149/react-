export type Flags = number;
// fiber的标记，位运算
export const NoFlags = 0b0000000; //初始的状态值
export const Placement = 0b0000001; //插入
export const Update = 0b0000010; //组件需要更新时
export const childDeletetion = 0b0000100; //当字节点被删除时

export const MutationMask = Placement | Update | childDeletetion;
