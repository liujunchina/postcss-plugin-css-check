
> `不再使用`
> * postcss-plugin-css-check 提供css 颜色和字号是否使用变量检测

## 安装
使用npm：

```
npm install --save-dev @lljj/postcss-plugin-css-check
```

使用 yarn

```
yarn add @lljj/postcss-plugin-css-check
```

postcss 配置 postcss.config.js，当然你也可以继续添加你的配置
```
{
    "plugins": [
        require('@lljj/postcss-plugin-css-check')({
            checkColor: false,
            checkFontSize: true
        }),
    ]
}
```

## 包含以下参数

参数 | 类型 | 描述 | 默认值 
--- | --- | --- | -----
checkColor | `Bool` | 是否检测颜色变量 | true
checkFontSize | `Bool` | 是否检测字号变量 | true

## 文件内禁用校验规则 
>* disable-colorCheck       // 禁用前一条 css颜色检测
>* disable-fontSizeCheck    // 禁用前一条 css字号检测

使用方法如下
```css
.icon-loading{
  color: var(--assistBgC);
  background: #CCC; /* disable-colorCheck */
  .xxx {
      background: #dddddd;
      font-size: 11px; /* disable-fontSizeCheck */
  }
}
```
