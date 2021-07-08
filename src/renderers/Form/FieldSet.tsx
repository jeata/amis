import React from 'react';
import {Renderer, RendererProps} from '../../factory';
import {SchemaCollection, SchemaTpl} from '../../Schema';
import Collapse, {CollapseSchema} from '../Collapse';
import {FormBaseControl} from './Item';

/**
 * FieldSet 表单项集合
 * 文档：https://doc.jeata.com/amis/components/form/fieldset
 */
export interface FieldSetControlSchema
  extends Omit<FormBaseControl, 'size'>,
    Omit<CollapseSchema, 'type' | 'body'> {
  /**
   * 指定为表单项集合
   */
  type: 'fieldset' | 'fieldSet';

  /**
   * 标题展示位置
   */
  titlePosition: 'top' | 'bottom';

  /**
   * 是否可折叠
   */
  collapsable?: boolean;

  /**
   * 默认是否折叠
   */
  collapsed?: boolean;

  /**
   * 内容区域
   */
  body?: SchemaCollection;

  /**
   * 标题
   */
  title?: SchemaTpl;

  /**
   * 收起的标题
   */
  collapseTitle?: SchemaTpl;

  /**
   * 点开时才加载内容
   */
  mountOnEnter?: boolean;

  /**
   * 卡片隐藏就销毁内容。
   */
  unmountOnExit?: boolean;
}

export interface FieldSetProps
  extends RendererProps,
    Omit<
      FieldSetControlSchema,
      'type' | 'className' | 'descriptionClassName' | 'inputClassName'
    > {}

export default class FieldSetControl extends React.Component<
  FieldSetProps,
  any
> {
  constructor(props: FieldSetProps) {
    super(props);
    this.renderBody = this.renderBody.bind(this);
  }

  static defaultProps = {
    titlePosition: 'top',
    headingClassName: '',
    collapsable: false
  };

  renderBody(): JSX.Element {
    const {
      body,
      collapsable,
      horizontal,
      render,
      mode,
      formMode,
      classnames: cx,
      store,
      formClassName,
      disabled
    } = this.props;

    let props: any = {
      store,
      data: store!.data,
      render,
      disabled
    };
    mode && (props.mode = mode);
    typeof collapsable !== 'undefined' && (props.collapsable = collapsable);
    horizontal && (props.horizontal = horizontal);

    return (
      <div
        className={cx(
          `Form--${props.mode || formMode || 'normal'}`,
          formClassName
        )}
      >
        {body ? render('body', body, props) : null}
      </div>
    );
  }

  render() {
    const {controls, className, mode, body, ...rest} = this.props;

    return (
      <Collapse
        {...rest}
        body={body!}
        className={className}
        children={this.renderBody}
        wrapperComponent="fieldset"
        headingComponent={rest.titlePosition === 'bottom' ? 'div' : 'legend'}
      />
    );
  }
}

@Renderer({
  type: 'fieldset',
  weight: -100,
  name: 'fieldset'
})
export class FieldSetRenderer extends FieldSetControl {}
