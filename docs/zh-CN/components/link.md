---
title: Link 链接
description:
type: 0
group: ⚙ 组件
menuName: Link
icon:
order: 55
---

## 基本用法

```schema
{
    "type": "page",
    "body": {
        "type": "link",
        "href": "https://www.jeata.com",
        "body": "基塔云，专业后台"
    }
}
```

## 新标签页打开

```schema
{
    "type": "page",
    "body": {
        "type": "link",
        "href": "https://www.jeata.com",
        "body": "基塔云，专业后台",
        "blank": true
    }
}
```

## 属性表

| 属性名     | 类型      | 默认值 | 说明                                                                                 |
| ---------------- | --------- | -------- | ------------------------------------------------------------------------------------ |
| type             | `string`  |          | 如果在 Table、Card 和 List 中，为`"link"`；在 Form 中用作静态展示，为`"static-link"` |
| body             | `string`  |          | 标签内文本                                                                           |
| href             | `string`  |          | 外部链接地址。 `href` 与 `link` 只能填写其一。                                              |
| link             | `string`  |          | 平台内链接（相对地址）`href` 与 `link` 只能填写其一。                                     |
| blank            | `boolean` |          | 是否在新标签页打开                                                                   |
| tooltip          | `string`  |          | 鼠标停留时弹出该段文字，也可以配置对象类型：字段为`title`和`content`。可用 `${xxx}` 取值。       |
| tooltipPlacement | `string`  | `bottom` | 如果配置了`tooltip` 指定提示信息位置，可配置`top`、`bottom`、`left`、`right`。              |
| htmlTarget | `string`  |        | a标签的target                                                                        |
