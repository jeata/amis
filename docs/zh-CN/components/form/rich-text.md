---
title: Rich-Text 富文本编辑器
description:
type: 0
group: null
menuName: Rich-Text
icon:
order: 47
---

目前富文本编辑器基于 [tinymce](https://github.com/tinymce/tinymce)。

## 基本用法

```schema: scope="body"
{
    "type": "form",
    "api": "https://mock.jeata.com/api/form/saveForm",
    "controls": [
        {
            "type": "rich-text",
            "name": "rich",
            "label": "Rich Text"
        }
    ]
}
```

### tinymce 自定义配置

可以设置 options 属性来自定义编辑器的展现，详细配置项请参考[官方文档](https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/)。

注意在下面的编辑器里修改 JSON 配置后不会实时生效。

```schema: scope="body"
{
    "type": "form",
    "api": "https://mock.jeata.com/api/form/saveForm",
    "controls": [
        {
            "type": "rich-text",
            "name": "rich",
            "options": {
                "menubar": false,
                "height": 200,
                "plugins": [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount"
                ],
                "toolbar ": "undo redo | formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
            }
        }
    ]
}
```

## 属性表

当做选择器表单项使用时，除了支持 [普通表单项属性表](./formitem#%E5%B1%9E%E6%80%A7%E8%A1%A8) 中的配置以外，还支持下面一些配置

| 属性名        | 类型                           | 默认值 | 说明                                                                                                                                                    |
| ------------- | ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| saveAsUbb     | `boolean`                      |        | 是否保存为 ubb 格式                                                                                                                                     |
| receiver      | [API](../../../docs/types/api) |        | 默认的图片保存 API                                                                                                                                      |
| videoReceiver | [API](../../../docs/types/api) |        | 默认的视频保存 API                                                                                                                                      |
| size          | `string`                       |        | 框的大小，可设置为 `md` 或者 `lg`                                                                                                                       |
| options       | `object`                       |        | 需要参考 [tinymce](https://www.tiny.cloud/docs/configure/integration-and-setup/)  |
