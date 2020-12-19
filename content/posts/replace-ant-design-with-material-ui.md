---
fileName: replace-ant-design-with-material-ui
title: 從 Ant Design 轉移到 Material-UI
date: 2020-06-07
tags:
  - 心得
  - Ant Design
  - Material-UI
---
[Ant Design](https://ant.design/) 提供許多常見於後台系統的元件，是款適用於開發後台相關產品的 React CSS Framework，對要**快速開發後台系統 UI，且不需做太多功能或風格的修改**相當合適。但隨著產品設計上的需求增多，決定改用易於客製化的 [Material-UI](https://material-ui.com/)。

- [和 Ant Design 說再見](#和-ant-design-說再見)
- [投入 Material-UI 懷抱](#投入-material-ui-懷抱)
- [讓 Ant Design 與 Material-UI 共存的過渡期](#讓-ant-design-與-material-ui-共存的過渡期)

# 和 Ant Design 說再見
根據產品設計部門 design guideline 的制定與規範，要將已套用 Ant Design 的元件修改成和 guideline 風格一致或是滿足設計所預期的功能行為開始遭遇各種困難。明明產品設計師有時提出的想法並不複雜，卻因套件關係需花更多時間研究如何修改，進而萌生轉移 framework 的念頭，可綜歸以下原因:

- **覆寫 style 需花較多時間**: 當元件沒提供可傳入的 style props，且通常不知元件的 class 命名，皆須觀察渲染後的 DOM 元素階層來做後續處理。
- **元件無法符合需求**: 需求千奇百種，雖然 Ant Design 提供的元件功能和其他 Framework 相比已很完善，但也因太過完善反倒變成限制，當要做修正時，會不容易根據需求做修正。
- **問題不易尋得解答**: 常搜尋到有人詢問相同問題，卻沒任何回覆解答，issue 就被 close了。

因此經考量，雖使用 Ant Design 可快速完成某些功能 (EX: 選單同時可 search 選項)，但後續的修改與問題解決會花上更多時間，最終決定說掰掰。

# 投入 Material-UI 懷抱
決定改用 Material-UI 取代 Ant Design ，主要是看上它的:

- 客製化[主題](https://v3.material-ui.com/customization/themes/)與[元件](https://material-ui.com/customization/components/)富有彈性，更容易開發出滿足符合設計需求的元件。
- 提供 [styled-components API](https://material-ui.com/styles/basics/) 可方便使用 [CSS in JS](https://v3.material-ui.com/customization/css-in-js/) 方案。
- 官方文件對於各元件會列出能修改的 CSS class 及 source code 連結 (ex: [Button API CSS](https://material-ui.com/api/button/#css))，當要覆寫 style 可做對照與從程式碼中看出可被覆寫的地方有哪些。

以上特性對有較多客製化需求的UI開發來說，真是相對方便與省時。開發上幾乎沒遇到什麼問題，只有一個地方可稍微注意，就是強烈建議官方文件看英文版就好，中文版的翻譯用詞不好理解。

# 讓 Ant Design 與 Material-UI 共存的過渡期
凡事不可能一蹴可幾，要完整轉移是條漫長且漸進的路。因此在過渡期間，常會遇到一個頁面同時存有這兩種程式碼的情況，也容易遇到以下問題:

- **各自對於元件的 z-index 設定不同**: 因元件 z-index 高於另個元件，導致被覆蓋掉 (EX: Material-UI 的 modal 上有 Ant Design 的 select，因 modal z-index 高於 select，導致 select 展開後選單會被蓋在 modal 底下)，可透過調整 z-index 來解決。
- **Ant Design 元件的錨點會失效**: 需對該元件所提供的 props (EX: getPopupContainer、getCalendarContainer) 做設定來定義 trigger node。

除此之外，基本上都還是能好好共處的，但若能越快把 Ant Design 完全拔掉會更好，畢竟 bundle 後的檔案很肥大 (特別是 import icon後會把整個 icon 都打包的 issue，2018 年已知問題到現在似乎沒完全解決)。

最後總結: 現階段上得了檯面的 CSS Framework 都具有一定成熟度與實用性，但我們必須根據開發專案性質與演變過程來做調整。而在這次轉移過程中也藉此學到兩套 CSS Framework，真是收穫滿滿呢!