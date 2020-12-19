---
fileName: storybook-import-markdown-and-process-static-files
title: Storybook 引入 markdown 與靜態檔案之處理
date: 2020-12-08
tags:
  - Storybook
---
[**Storybook**](https://storybook.js.org/) 是個非常好用的前端工具，可用來當作文檔的建立與使用。會有本篇主因是開發專案時，希望可將 **README.md** 直接引入到 Storybook 中做使用，但卻遭遇到一些困難，包含無法直接使用 markdown 格式以及靜態檔案路徑的處理方式，於是在本篇將記錄下如何解決這些問題，而使用的則是目前的最新版本 6。

- [如何引入 markdown](#如何引入-markdown)
- [如何引入相對路徑之檔案](#如何引入相對路徑之檔案)
- [結論](#結論)

## 如何引入 markdown
由於在 Storybook 中，不能直接使用 **.md** 格式的檔案，因此若要寫像是文件格式的內容，需要使用 **.mdx** 才可。那如果還是希望直接使用 .md 檔案該怎辦? 接下來將用例子來作為說明。

以下為所假設的資料夾路徑:
```doc
|--.storybook
|----main.js
|--public
|----image.gif
|--src
|----stories
|------README.mdx
|--README.md
```

要讓 README.md 可在 README.mdx 被引入，首先是要將其檔案當作元件引入，接著再透過引入 Storybook addon-docs/block 的 **Description** 元件，將其包覆起來即可。

**stories/README.mdx**
```jsx
import { Description } from "@storybook/addon-docs/blocks"

import Readme from "../../README.md"

<Description>{Readme}</Description>
```

**README.md**
```markdown
# Markdown Example

[image](./public/image.gif)
```

看似很美好，但如果所引入的 .md 有一些靜態檔案的路徑，在 storybook 的 devlop 或是 build mode下，可能會找不到路徑而失效，於是接下來將要講該如何處理此情形。

## 如何處理靜態資源檔案
根據[官方文件](https://storybook.js.org/docs/react/configure/images-and-assets#serving-static-files-via-storybook)，執行指令時可指定置放靜態檔案的資料夾位於哪路徑，只要加上 **-s** 後面接資料夾名稱即可。

```bash
$ start-storybook -s ./public -p 6006
```

```bash
$ build-storybook -s ./public -o docs
```

但這樣做有個缺陷，Storybook 實際上是會將所指定的靜態資料夾路徑都對應到執行中的 **./** 底下。以本篇範例來說，會導致 markdown 引入的靜態檔案，經過 Storybook 的執行，是找不到檔案的 (因 markdown 引入靜態資源的路徑還是為 **./public**)。

於是查找到有人遇到相同[問題](https://github.com/storybookjs/storybook/issues/714)，也有熱心的開發者也提供相關的 pr 並被接受了。雖然官方似乎沒把新的用法寫在文件上(問題討論中有人在詢問也沒得到回覆)，但從 [diff](https://github.com/storybookjs/storybook/pull/12222/files)可看出，只要變成 **folder:floder** 的對應方式，就可指定執行時要將靜態資源路徑更改為何。

```bash
$ start-storybook -s ./public:./public -p 6006
```

本以為可以很順利解決，卻又發生一個問題!!此方法的確在 devlop mode 中可生效，奇怪的是 build mode 並未生效。於是後來決定使用上面問題討論串中，有人使用 Webpack 的 **CopyWebpackPlugin** 來對路徑做更動。

基本上就是安裝好套件後，將要複寫 Storybook 的 webpack config 寫在 **webpackFinal** 中，如以下範例所示，即可將靜態資料路徑對應到所想的。

**storybook/main.js**
```javascript
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    {
      name: '@storybook/addon-essentials'
    }
  ],
  webpackFinal: config => {
    config.plugins.push(new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), to: './public'
        }
      ]
    }))

    return config
  }
}
```
## 結論

剛好這次使用的是最新的 Storybook 6版，網路上大多的文章都還是停留在 5。因此找尋答案的過程中也不是太容易，一堆都是舊版本的文章，花不少時間在做嘗試性的處理，所幸最後也都有解法可解決了。

而針對於較新的版本套件，往往都會有較多的問題，需要大量使用者去使用(當 QA 的概念)與回饋才能讓套件越來越好，而這時直接去該套件的 Github Issues 找尋問題，是很有機會找到和你有同樣困擾的開發者，並得到解決與回覆的!