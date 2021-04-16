---
title: Location 地理位置
description:
type: 0
group: null
menuName: Location
icon:
order: 30
---

用于选择地理位置

## 基本用法

```schema: scope="body"
{
  "type": "form",
  "api": "https://mock.jeata.com/api/form/saveForm",
  "debug": true,
  "controls": [
    {
      "type": "location",
      "name": "location",
      "label": "地址"
    }
  ]
}
```

## 属性表

| 属性名      | 类型      | 默认值       | 说明                           |
| ----------- | --------- | ------------ | ------------------------------ |
| vendor      | 'baidu'   | 'baidu'      | 地图厂商，目前只实现了百度地图 |
| clearable   | `boolean` | false        | 输入框是否可清空               |
| placeholder | `string`  | '请选择位置' | 默认提示                       |
| coordinatesType | `string`  | 'bd09'  | 默为百度坐标，可设置为'gcj02'   |
