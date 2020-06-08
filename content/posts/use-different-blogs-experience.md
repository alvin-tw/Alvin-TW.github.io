---
fileName: use-different-blogs-experience
title: 部落格遷移心得(Wordpress -> Hexo + GitHub Page -> GatsbyJS + Netlify + Netlify CMS)
date: 2020-06-03
tags:
  - 心得
---
歷經多次部落格遷移，這次下定決心再重建一個部落格用來記錄開發上的心得與筆記。最終使用目前相當熱門的**GatsbyJS + Netlify + Netlify CMS**建立。現在就來聊聊不同時期使用部落格的心路歷程吧!

- [線上免費部落格百家爭鳴](#線上免費部落格百家爭鳴)
- [靜態網站產生器興起](#靜態網站產生器興起)
- [GatsbyJS正夯](#gatsbyjs正夯)

# 線上免費部落格百家爭鳴
早期線上充斥著各種免費部落格服務，工作後第一個用來做技術部落格的是[Wordpress](https://zh-tw.wordpress.com/)。會選擇此的原因是:
- 社群成熟，有許多使用者與套件/主題開發者
- 後台系統完善好操作
- 提供的主題有當時尚未盛行的RWD(Responsive web design)主題可選

因使用免費版，很多部分的**主控權無法掌控**:
- 部落格上被嵌入廣告
- 擁有豐富的套件生態系，卻不能任意安裝套件
- 有免費主題可套用，但能修改的範圍非常少

於是，便開始找尋其他建立部落格方式，此時發現到**靜態網站產生器**的存在。

# 靜態網站產生器興起
剛接觸最熱門的兩套是[Jekyll](https://jekyllrb.com/)與[Hexo](https://hexo.io/)，兩者相比，前者使用Ruby、後者使用Node.js進行安裝編譯，由於較熟js加上懶得多裝一個語言，最終選擇後者。

而對於開發部落格來說，決定用靜態網站產生器取代線上動態網站服務主因是:
- 文章在產生時一併完成，不須存於資料庫，少了頁面請求，整體速度更加快速。
- 由於沒資料庫，不必擔心一些安全性問題。

透過靜態網站產生器來開發部落格，掌控權回到自己手上，包含畫面調整、套件安裝等。至於佈署，則是發佈到[GitHub Page](https://pages.github.com/)。也因從網站的建立到佈署過程都是親自參與，在上線成功那刻會有滿滿的成就感!

不過這時期的產生器都是撰寫templating language(EX: Pug, Handlebars...)的語法，修改樣式時感到不習慣，不久便棄坑，暫時轉回Wordpress。

# GatsbyJS正夯
直到[GastbyJS](https://www.gatsbyjs.org/)竄紅，又燃起想動手建部落格的熱情，從[staticgen](https://www.staticgen.com/)可看出，GatsbyJS整體表現都很不錯，且有很多官方網站都採用GastbyJS製作而成的([React官網](https://reactjs.org/)也是)。

但最吸引的莫過於它使用**React + GraphQL**開發，目前工作上也都用這兩者，所以在開發頁面時更加順暢。此外搭配[Netlify](https://www.netlify.com/)完成網站自動佈署、[NetlifyCMS](https://www.netlifycms.org/)建立後台系統，更可完整打造出一個部落格開發鍊。

**Netlify**用法十分簡單，只要在[GitHub](https://github.com/)創個專案存放靜態網站檔案，註冊Netlify會員後和其專案做連結，並照著官網文件做設定即可。之後當有檔案push上GitHub，都會自動重新佈署到Netlify上，真是超方便!

**NetlifyCMS**照著官網文件設定便可為專案建立一個簡易後台系統。設定完成後，當網站上線，後台系統也會跟著上線，往後就可在任何有網路的地方連上後台系統撰寫文章並發佈，不用侷限在本機端撰寫文章後push上Github才可發佈。

因此，有了**GatsbyJS + Netlify + Netlify CMS**的搭配，對想動手建立部落格的人來說變得非常便利呢!而若是個想學習React跟GraphQL的新手，透過GatsbyJS也是蠻適合的。