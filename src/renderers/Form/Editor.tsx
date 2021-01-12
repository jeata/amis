import React from 'react';
import {FormItem, FormControlProps, FormBaseControl} from './Item';
import LazyComponent from '../../components/LazyComponent';
import debouce from 'lodash/debounce';
import Editor from '../../components/Editor';
import {autobind} from '../../utils/helper';

/**
 * Editor 代码编辑器
 * 文档：https://doc.jeata.com/amis/docs/components/form/editor
 */
export interface EditorControlSchema extends Omit<FormBaseControl, 'size'> {
  type:
    | 'editor'
    | 'bat-editor'
    | 'c-editor'
    | 'coffeescript-editor'
    | 'cpp-editor'
    | 'csharp-editor'
    | 'css-editor'
    | 'dockerfile-editor'
    | 'fsharp-editor'
    | 'go-editor'
    | 'handlebars-editor'
    | 'html-editor'
    | 'ini-editor'
    | 'java-editor'
    | 'javascript-editor'
    | 'json-editor'
    | 'less-editor'
    | 'lua-editor'
    | 'markdown-editor'
    | 'msdax-editor'
    | 'objective-c-editor'
    | 'php-editor'
    | 'plaintext-editor'
    | 'postiats-editor'
    | 'powershell-editor'
    | 'pug-editor'
    | 'python-editor'
    | 'r-editor'
    | 'razor-editor'
    | 'ruby-editor'
    | 'sb-editor'
    | 'scss-editor'
    | 'sol-editor'
    | 'sql-editor'
    | 'swift-editor'
    | 'typescript-editor'
    | 'vb-editor'
    | 'xml-editor'
    | 'yaml-editor';

  /**
   * 语言类型
   */
  language?:
    | 'bat'
    | 'c'
    | 'coffeescript'
    | 'cpp'
    | 'csharp'
    | 'css'
    | 'dockerfile'
    | 'fsharp'
    | 'go'
    | 'handlebars'
    | 'html'
    | 'ini'
    | 'java'
    | 'javascript'
    | 'json'
    | 'less'
    | 'lua'
    | 'markdown'
    | 'msdax'
    | 'objective-c'
    | 'php'
    | 'plaintext'
    | 'postiats'
    | 'powershell'
    | 'pug'
    | 'python'
    | 'r'
    | 'razor'
    | 'ruby'
    | 'sb'
    | 'scss'
    | 'sol'
    | 'sql'
    | 'swift'
    | 'typescript'
    | 'vb'
    | 'xml'
    | 'yaml';

  /**
   * 编辑器大小
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export interface EditorProps extends FormControlProps {
  options?: object;
  height?: number | string;
  bleedHeight?:number;
}

export default class EditorControl extends React.Component<EditorProps, any> {
  static defaultProps: Partial<EditorProps> = {
    language: 'javascript',
    editorTheme: 'vs',
    options: {
      automaticLayout: true,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      minimap: {
        enabled: false
      }
    }
  };

  state = {
    focused: false
  };
  editor: any;
  toDispose: Array<Function> = [];
  divRef = React.createRef<HTMLDivElement>();
  constructor(props: EditorProps) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEditorMounted = this.handleEditorMounted.bind(this);
  }

  componentWillUnmount() {
    this.toDispose.forEach(fn => fn());
  }

  handleFocus() {
    this.setState({
      focused: true
    });
  }

  handleBlur() {
    this.setState({
      focused: false
    });
  }

  handleEditorMounted(editor: any, monaco: any) {
    this.editor = editor;
    this.toDispose.push(
      editor.onDidChangeModelDecorations(() => {
        this.updateContainerSize(editor, monaco); // typing
        requestAnimationFrame(
          this.updateContainerSize.bind(this, editor, monaco)
        ); // folding
      }).dispose
    );
    this.props.editorDidMount && this.props.editorDidMount(editor, monaco);
  }

  prevHeight = 0;
  @autobind
  updateContainerSize(editor: any, monaco: any) {
    if (!this.divRef.current) {
      return;
    }

    // 这个逻辑似乎错误，导致滚动条可能无法滚动 修改方案 by xubin
    // const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
    // const lineCount = editor.getModel()?.getLineCount() || 1;
    // const height = editor.getTopForLineNumber(lineCount + 1) + lineHeight;

    // if (this.prevHeight !== height) {
    //   this.prevHeight = height;
    //   this.divRef.current.style.height = `${height}px`;
    //   editor.layout();
    // }

    // 组件位置
    const rect = this.divRef.current.getBoundingClientRect();
    const propsHeight = this.props.height;
    let newHeight: number;

    // 指定了
    if(propsHeight && typeof propsHeight == "number") {
      newHeight = propsHeight;
    } else if(propsHeight && typeof propsHeight == "string" && (propsHeight == 'auto' || propsHeight == '100%' || propsHeight == 'full-height')) {
      // 设置了自动处理
      const bleedHeight = this.props.bleedHeight?this.props.bleedHeight:0; // 出血位
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = propsHeight != 'full-height'?document.documentElement.scrollTop:0;
      // 计算高度 可视高度-组件top位置-出血位
      newHeight = clientHeight - (scrollTop + rect.top) - bleedHeight;
    } else {
      return;
    }

    if (this.prevHeight !== newHeight) {
      this.prevHeight = newHeight;
      this.divRef.current.style.height = `${newHeight}px`;
      this.divRef.current.style.minHeight = `none`;
      this.divRef.current.style.maxHeight = `none`;

      editor.layout({width:rect.width, height: newHeight});
    }
  }

  render() {
    const {
      className,
      classPrefix: ns,
      classnames: cx,
      value,
      onChange,
      disabled,
      options,
      language,
      editorTheme,
      size,
      editorSchemaUrl,
      height,
    } = this.props;

    let finnalValue = value;

    if (finnalValue && typeof finnalValue !== 'string') {
      finnalValue = JSON.stringify(finnalValue, null, 2);
    }

    return (
      <div
        ref={this.divRef}
        className={cx(
          `EditorControl`,
          {
            'is-focused': this.state.focused,
            [`EditorControl--${size}`]: size
          },
          className
        )}
      >
        <LazyComponent
          classPrefix={ns}
          component={Editor}
          value={finnalValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          language={language}
          editorTheme={editorTheme}
          editorDidMount={this.handleEditorMounted}
          editorSchemaUrl={editorSchemaUrl}
          options={{
            ...options,
            readOnly: disabled
          }}
        />
      </div>
    );
  }
}

export const availableLanguages = [
  'bat',
  'c',
  'coffeescript',
  'cpp',
  'csharp',
  'css',
  'dockerfile',
  'fsharp',
  'go',
  'handlebars',
  'html',
  'ini',
  'java',
  'javascript',
  'json',
  'less',
  'lua',
  'markdown',
  'msdax',
  'objective-c',
  'php',
  'plaintext',
  'postiats',
  'powershell',
  'pug',
  'python',
  'r',
  'razor',
  'ruby',
  'sb',
  'scss',
  'sol',
  'sql',
  'swift',
  'typescript',
  'vb',
  'xml',
  'yaml'
];

export const EditorControls: Array<typeof EditorControl> = availableLanguages.map(
  (lang: string) => {
    @FormItem({
      type: `${lang}-editor`,
      sizeMutable: false
    })
    class EditorControlRenderer extends EditorControl {
      static lang = lang;
      static displayName = `${lang[0].toUpperCase()}${lang.substring(
        1
      )}EditorControlRenderer`;
      static defaultProps = {
        ...EditorControl.defaultProps,
        language: lang
      };
    }

    return EditorControlRenderer;
  }
);

@FormItem({
  type: 'js-editor',
  sizeMutable: false
})
class JavascriptEditorControlRenderer extends EditorControl {
  static defaultProps = {
    ...EditorControl.defaultProps,
    language: 'javascript'
  };
}

@FormItem({
  type: 'ts-editor',
  sizeMutable: false
})
class TypescriptEditorControlRenderer extends EditorControl {
  static defaultProps = {
    ...EditorControl.defaultProps,
    language: 'typescript'
  };
}

@FormItem({
  type: `editor`,
  sizeMutable: false
})
export class EditorControlRenderer extends EditorControl {
  static defaultProps = {
    ...EditorControl.defaultProps,
    language: 'javascript'
  };
}
