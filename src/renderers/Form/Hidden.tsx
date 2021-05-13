import React from 'react';
import {FormItem, FormControlProps, FormBaseControl} from './Item';
import { IScopedContext } from "../../Scoped";

/**
 * Hidden 隐藏域。功能性组件
 * 文档：https://doc.jeata.com/amis/components/form/hidden
 */
export interface HiddenControlSchema extends FormBaseControl {
  type: 'hidden';
}

export default class HiddenControl extends React.Component<
  FormControlProps,
  any
> {
  render() {
    return null;
  }

  // 接受target by xubin
  receive(values: object) {
    this.props.onChange(values);
  }
}

@FormItem({
  type: 'hidden',
  wrap: false,
  sizeMutable: false
})
export class HiddenControlRenderer extends HiddenControl {}
