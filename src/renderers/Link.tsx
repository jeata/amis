import React from "react";
import { Renderer, RendererProps } from "../factory";
import { BaseSchema, SchemaTooltip, SchemaTpl } from "../Schema";
import { filter } from "../utils/tpl";
import { Links } from "./Nav";
import { Action } from "../types";
import TooltipWrapper from "../components/TooltipWrapper";

/**
 * Link 链接展示控件。
 * 文档：https://doc.jeata.com/amis/docs/components/link
 */
export interface LinkSchema extends BaseSchema {
  /**
   * 指定为 link 链接展示控件
   */
  type: "link";

  /**
   * 是否新窗口打开。
   */
  blank?: boolean;

  /**
   * 链接内容，如果不配置将显示链接地址。
   */
  body?: SchemaTpl;

  /**
   * 单页链接
   */
  link?: string;

  /**
   * 单页链接替换
   */
  replaced?: boolean;

  tooltip?: SchemaTooltip;
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
}

export interface LinkProps extends RendererProps, LinkSchema {
}

export class LinkField extends React.Component<LinkProps, object> {
  static defaultProps = {
    className: "",
    blank: false,
    replaced: false,
    tooltipPlacement: "bottom",
  };

  handleClick() {
    const { env, data, link, href, replaced, blank } = this.props;

    if(!link && !href) return;

    let action = {
      actionType: link ? "link" : "url",
      link: link ? filter(link.toString(), data) : undefined,
      url: href ? filter(href.toString(), data) : undefined,
      blank,
      replaced
    };

    // @ts-ignore
    env && env.jumpTo(action.link ? action.link : action.url, action as any);
  }

  render() {
    const {
      className,
      body,
      href,
      classnames: cx,
      blank,
      htmlTarget,
      data,
      render,
      link,
      tooltip,
      tooltipPlacement,
      env,
      translate: __
    } = this.props;

    let value = this.props.value;
    const finnalHref = href ? filter(href, data) : "";

    if (tooltip) {
      return (
        <TooltipWrapper
          placement={tooltipPlacement}
          tooltip={tooltip}
          container={env.getModalContainer ? env.getModalContainer : undefined}
          trigger={["hover", "focus"]}
          rootClose={false}
        >
          <a onClick={this.handleClick.bind(this)}
             className={cx("Link", className)}
          >
            {body ? render("body", body) : filter(value.toString(), data) || __("链接")}
          </a>
        </TooltipWrapper>
      );
    }

    // 单页跳转
    if (link) {
      return (
        <a onClick={this.handleClick.bind(this)}
           className={cx("Link", className)}
        >
          {body ? render("body", body) : filter(value.toString(), data) || finnalHref || __("链接")}
        </a>
      );
    }

    return (
      <a
        href={finnalHref || value}
        target={htmlTarget || (blank ? "_blank" : "_self")}
        className={cx("Link", className)}
      >
        {body ? render("body", body) : finnalHref || value || __("链接")}
      </a>
    );
  }
}

@Renderer({
  test: /(^|\/)link$/,
  name: "link"
})
export class LinkFieldRenderer extends LinkField {
}
