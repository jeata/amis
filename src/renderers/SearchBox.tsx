import Spinner from '../components/Spinner';
import {Renderer, RendererProps} from '../factory';
import React from 'react';
import {BaseSchema, SchemaClassName} from '../Schema';
import SearchBox from '../components/SearchBox';
import {
  autobind,
  getPropValue,
  getVariable,
  setVariable
} from '../utils/helper';

/**
 * 搜索框渲染器
 */
export interface SearchBoxSchema extends BaseSchema {
  /**
   * 指定为搜索框。
   *
   * 文档：https://doc.jeata.com/amis/components/search-box
   */
  type: 'search-box';

  /**
   * 外层 css 类名
   */
  className?: SchemaClassName;

  /**
   * 关键字名字。
   *
   * @default keywords
   */
  name?: string;

  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 是否为 Mini 样式。
   */
  mini?: boolean;

  /**
   * 是否立马搜索。
   */
  searchImediately?: boolean;
}

interface SearchBoxProps
  extends RendererProps,
    Omit<SearchBoxSchema, 'type' | 'className'> {
  name: string;
  onQuery?: (query: {[propName: string]: string}) => void;
}

@Renderer({
  type: 'search-box'
})
export class SearchBoxRenderer extends React.Component<SearchBoxProps> {
  static defaultProps = {
    name: 'keywords',
    mini: false,
    searchImediately: false
  };

  static propsList: Array<string> = ['mini', 'searchImediately'];

  @autobind
  handleCancel() {
    const name = this.props.name;
    const onQuery = this.props.onQuery;
    const value = getPropValue(this.props);
    if (value !== '') {
      const data: any = {};
      setVariable(data, name, '');
      onQuery?.(data);
    }
  }

  @autobind
  handleSearch(text: string) {
    const {name, onQuery: onQuery} = this.props;
    const data: any = {};
    setVariable(data, name, text);
    onQuery?.(data);
  }

  render() {
    const {
      data,
      name,
      onQuery: onQuery,
      mini,
      searchImediately,
      placeholder,
      onChange,
      className
    } = this.props;

    const value = getPropValue(this.props);

    return (
      <SearchBox
        className={className}
        name={name}
        disabled={!onQuery}
        defaultActive={!!value}
        defaultValue={onChange ? undefined : value}
        value={onChange ? value : undefined}
        mini={mini}
        searchImediately={searchImediately}
        onSearch={this.handleSearch}
        onCancel={this.handleCancel}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
}
