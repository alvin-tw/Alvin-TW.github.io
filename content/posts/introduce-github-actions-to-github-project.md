---
fileName: introduce-github-actions-to-github-project
title: 將Github專案導入Github Actions
date: 2020-06-27
tags:
  - Github
---
開發專案往往都會導入CI/CD達到持續自動化測試與佈署，以往在Github上都得搭配外部服務(EX: Travis CI)來串聯CI/CD。但最近發現Github去年底推出[Github Actions](https://help.github.com/en/actions)，對一般開發者而言使用上是綽綽有餘。今天就來介紹如何使用GitHub Actions來做CI/CD吧!

- [為何選用Github Actions作為CI/CD](#為何選用github-actions作為cicd)
- [快速的寫好設定檔](#快速的寫好設定檔)

## 為何選用Github Actions作為CI/CD
選擇GitHub Actions的理由很簡單:
1. 專案若放於Github，直接使用所提供的服務是很直覺的，更可省去需註冊第三方服務並做專案連結的步驟。
2. private專案也可有限度的免費使用(一個月2000分鐘)，大多數第三方服務對private專案需額外付費。

## 快速的寫好設定檔
透過Github Action做基本的CI/CD並不難，只需在專案目錄下創建**.github/workflows**資料夾，並把寫好的workflow設定檔(使用yml格式)放於內即可完成。

用個自動執行unit tests的workflow範例作為介紹:

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

建一個**Unit Tests**的workflow，在(任意branch)**push**時觸發jobs，
其中有個執行在**ubuntu-lastest**環境的**lint-and-tests job**，執行以下步驟:
1. 使用**actions/checkout@v2**來checkout在$GITHUB_WORKSPACE的專案，讓workflow可存取。
2. 使用**actions/setup-node@v1**設定node js版本。
3. 安裝依賴。
4. Lint。
5. Unit Tests。

參數介紹:
- **name**: workflow名稱(可不用設定)。
- **on**: 要(在某branch)觸發某動作時執行此workflow底下的jobs。
- **jobs**: 可列出多個要執行的job，每個job需有個名稱。
- **run-on**: 執行的環境([Supported runners and hardware resources](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources)有列出可用的環境)。
- **steps**: 執行的步驟。
  - **name**: 步驟名稱。
  - **uses**: 使用的actions(可到[Github Actions markplace](https://github.com/marketplace)查找可用的actions，也可[Creating actions](https://help.github.com/en/actions/creating-actions))。
  - **with**: 定義要傳入action的參數作為環境變數。
  - **run**: 執行的command line，若有加上**|**，代表command line pipeline，可執行多個指令。

這樣設定即可達到push code到Github自動進行test的流程。而要CD也是撰寫相關設定即可，這裡不再多做介紹。

但Github Actions有的情境不一定能夠輕易達到。舉例來說，很常會遇到的一個情境: **同workflow有多個job，且想針對不同job設定在不同branch觸發**，目前無法直接設定，但可透過其他方法來達到：

1. 拆分檔案: 每個workflow一開始都能指定要執行的branch，將想單獨在某branch執行的job當成workflow來用，但缺點是會拆成較多個檔案。

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

2. 寫在同個workflow: 使用**if: github.ref ==**指定某job只在某branch才執行。

EX:

```yml
lint-and-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'
    steps:
    ...
```

加上**if: github.ref == 'refs/heads/master'**，該job就會只在master才會執行。

透過本篇簡短的介紹，可試著將自己在Github的專案加上Github Actions，當然還有很多進階功能，有興趣的話官方文件都有更多的描述說明。