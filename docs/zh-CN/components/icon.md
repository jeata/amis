---
title: Icon 图标
description:
type: 0
group: ⚙ 组件
menuName: Icon
icon:
order: 50
---

## 基本使用

```schema
{
    "type": "page",
    "body": {
        "type": "icon",
        "icon": "cloud"
    }
}
```

## 颜色及大小调整

icon 基于字体实现，所以可以通过[样式](../../docs/concepts/style)来控制它。

```schema
{
    "type": "page",
    "body": {
        "type": "icon",
        "icon": "cloud",
        "className": "text-info text-xl"
    }
}
```

## 使用图标链接

icon 还可以使用 URL 地址，可以从 [iconfont](https://www.iconfont.cn/) 等网站下载图表的 svg 文件上传到服务器，然后使用对应的地址，比如

```schema
{
    "type": "page",
    "body": {
        "type": "icon",
        "icon": "https://suda.cdn.bcebos.com/images%2F2021-01%2Fdiamond.svg"
    }
}
```

## 属性表

| 属性名    | 类型     | 默认值 | 说明                                    |
| --------- | -------- | ------ | --------------------------------------- |
| type      | `string` | `icon` | 指定组件类型                            |
| className | `string` |        | 外层 CSS 类名                           |
| icon      | `string` |        | icon 名，支持 fontawesome v4 或使用 url |
