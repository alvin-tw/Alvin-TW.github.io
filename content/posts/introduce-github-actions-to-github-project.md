---
fileName: introduce-github-actions-to-github-project
title: 將 Github 專案導入 Github Actions
date: 2020-06-27
tags:
  - Github
---
開發專案往往都會導入 CI / CD 達到持續自動化測試與佈署，以往在 Github 上都得搭配第三方服務 (EX: Travis CI) 來串聯 CI / CD。但最近發現 Github 去年底推出 [Github Actions](https://help.github.com/en/actions)，對一般開發者而言使用上是綽綽有餘。今天就來介紹如何使用 GitHub Actions 來做 CI / CD 吧!

- [為何選用 Github Actions 作為 CI / CD](#為何選用-github-actions-作為-ci-cd)
- [快速的寫好設定檔](#快速的寫好設定檔)

## 為何選用 Github Actions 作為 CI / CD
選擇 GitHub Actions 的理由很簡單:
1. 專案若放於 Github，直接使用所提供的服務是很直覺的，更可省去需註冊第三方服務並做專案連結的步驟。
2. private 專案也可有限度的免費使用 (一個月 2000 分鐘)，大多數第三方服務對 private 專案需額外付費。

## 快速的寫好設定檔
透過 Github Action 做基本的 CI / CD 並不難，只需在專案目錄下創建 **.github/workflows** 資料夾，並把寫好的 workflow 設定檔 (使用 yml 格式) 放於內即可完成。

用個自動執行 unit tests 的範例介紹:

```yml
name: Unit Tests

on: [push]

jobs:
  lint-and-tests:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    - name: Install dependencies
      run: yarn
    - name: Lint
      run: |
        yarn eslint
        yarn stylelint
    - name: Unit tests
      run: yarn test
```

光看字面上大概可看出設定檔預期要執行哪些步驟，可口語化的描述成:

建一個 **Unit Tests** 的 workflow，在 (任意 branch) **push** 時觸發 jobs，
其中有個執行在 **ubuntu-lastest** 環境的 **lint-and-tests job**，執行以下步驟:
1. 使用 **actions/checkout@v2** 來 checkout 在 $GITHUB_WORKSPACE 的專案，讓 workflow 可存取。
2. 使用 **actions/setup-node@v1** 設定 node js 版本。
3. 安裝依賴。
4. Lint。
5. Unit Tests。

參數介紹:
- **name**: workflow 名稱 (可不用設定)。
- **on**: 要 (在某 branch) 觸發某動作時執行此 workflow 底下的 jobs。
- **jobs**: 可列出多個要執行的 job，每個 job 需有個名稱。
- **run-on**: 執行的環境 ([Supported runners and hardware resources](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources) 有列出可用的環境)。
- **steps**: 執行的步驟。
  - **name**: 步驟名稱。
  - **uses**: 使用的 actions (可到[Github Actions markplace](https://github.com/marketplace)查找可用的 actions，也可[Creating actions](https://help.github.com/en/actions/creating-actions))。
  - **with**: 定義要傳入 action 的參數作為環境變數。
  - **run**: 執行的 command line，若有加上 **|**，代表 command line pipeline，可執行多個指令。

這樣設定即可達到 push code 到 Github 自動進行 test 的流程。而要 CD 也是撰寫相關設定即可，這裡不再多做介紹。

但 Github Actions 有的情境不一定能夠輕易達到。舉例來說，很常會遇到的一個情境: **同 workflow 有多個 job，且想針對不同 job設定在不同 branch 觸發**，目前無法直接設定，但可透過其他方法來達到：

1. 拆分檔案: 每個 workflow 一開始都能指定要執行的 branch，將想單獨在某 branch 執行的 job 當成 workflow 來用，但缺點是會拆成較多個檔案。

EX:

```yml
on:
  push:
    branches:
      - develop
```

```yml
on:
  push:
    branches:
      - master
```

2. 寫在同個 workflow: 使用 **if: github.ref ==** 指定某 job 只在某 branch 才執行。

EX:

```yml
lint-and-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'
    steps:
    ...
```

加上 **if: github.ref == 'refs/heads/master'**，該 job 就會只在 master 才會執行。

透過本篇簡短的介紹，可試著將自己在 Github 的專案加上 Github Actions，當然還有很多進階功能，有興趣的話官方文件都有更多的描述說明。