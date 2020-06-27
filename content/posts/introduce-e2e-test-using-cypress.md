---
fileName: introduce-e2e-test-using-cypress
title: 導入端對端測試(end-to-end/E2E test)，使用Cypress
date: 2020-06-12
tags:
  - 心得
  - Cypress
---
隨系統逐漸成長，手動測試前端介面操作上變得繁雜，而每當程式做修正，也希望現有介面不會受到影響，於是決定導入端對端測試(end-to-end/E2E test)來對畫面操作做測試，用的是近年崛起的[Cypress](https://www.cypress.io/)。為何選擇它?有什麼優點?現在就來聊聊從決定到使用的心得吧!

- [就決定是你了!Cypress](#就決定是你了cypress)
- [開始撰寫E2E test](#開始撰寫e2e-test)
- [該全交給E2E test嗎?](#該全交給e2e-test嗎)

# 就決定是你了!Cypress
一開始從網路上挑選出五個常見套件: selenium-webdriver、cypress、testcafe、puppeteer、 nighwatch來作選擇，並根據以下兩點評估:
- **使用人數多**: 以[npm trends](https://www.npmtrends.com/nightwatch-vs-selenium-webdriver-vs-testcafe-vs-cypress-vs-puppeteer)所呈現套件被下載次數趨勢作為套件的熱門度評比，下載越多熱門度也越高，最後留下selenium-webdriver、cypress、puppeteer。
- **易於安裝與上手**: 因團隊有機會發生後端人員協助開發前端項目，為達到**縮短安裝與上手時間、快速開始撰寫測試**，又把selenium-webdriver和puppeteer去掉。

最終選擇Cypress，不僅符合上述條件，也被其[特色](https://www.cypress.io/features)所吸引，而它把測試常用套件都包好。與Selenium相比，可更快安裝完並開始撰寫測試(就像寫unit test安裝Jest，assertion、 mocking、stubbing套件也都包一起，若使用Mocha還得各別安裝Chai、Sinon)。從官方描述也可明顯看出Cypress主打就是和Selenium做區隔:
- Cypress makes setting up, writing, running and debugging test easy than most Selenium-based end-to-end test tools.
- All-in-one test framework, assertion library, with mocking and stubbing, all without Selenium.

此外，官方文件要詳讀，內容豐富齊全提供各種範例(test cases、CI)、docker image，完全是要讓使用者可專注在寫測試上。

# 開始使用Cypress
安裝完後，可依照下面幾點做了解:

1. **相關套件**: 可從[Cypress Plugin](https://docs.cypress.io/plugins/index.html)搜尋，分享安裝過的供參考:
    - **eslint-plugin-cypress**: 用來檢查語法的部分(別忘記eslint的設定檔要修正)。
    - **cypress-plugin-retries**: 當Cypress執行測試的某個步驟失敗，可設定retry次數。
    - **cypress-file upload**: 提供上傳檔案的command，方便做上傳檔案的相關測試。

2. **資料夾結構**:
    - **config**: 放各種不同執行環境的config.
    - **fixtures**: 放一些測試用資料給測試檔案用。
    - **integration**: 放測試檔案。
    - **plugins**: 擴充或修改Cypress內部行為(EX: 根據環境讀不同config)。
    - **support**: 放客製化或覆寫Cypress內建的commands，讓全部測試檔案使用。
    - **screenshots**: 放執行測試時截圖的圖檔。
    - **videos**: 放執行測試時錄製的影片檔。

3. **環境變數設定**: 內建已提供一些環境變數可設定，分成**全域設定**與**根據執行環境的設定**，此外也可**自訂環境變數**。

    - **全域設定**: 在**cypress.json**，可對[configuration](https://docs.cypress.io/guides/references/configuration.html)列出的參數做全域的設定，其中**baseUrl**很常使用，它用來設定專案的url，之後在測試檔內只需填寫要測試頁的相對路徑即可連到。

        EX:

        ```json
        {
          "baseUrl": "http://localhost:3000/",
          "integrationFolder": "cypress/integration",
          "testFiles": "**/*.test.js",
          "viewportWidth": 1280,
          "viewportHeight": 960,
          "defaultCommandTimeout": 10000
        }
        ```

    - **依執行環境設定**: 需先修改**plugins/index.js**，讓Cypress可透過command line讀不同設定檔，參考[Switch between multiple configuration files](https://docs.cypress.io/api/plugins/configuration-api.html#Switch-between-multiple-configuration-files)修正。接著將各環境的設定檔放於**config**資料夾內，參數會遵照以下規則:
      - 參數同時存在全域設定檔及特定環境設定檔，會以當下執行環境的設定檔參數為主。
      - 參數只出現在特定環境設定檔，則該參數會在執行該特定環境時加入Cypress執行內。

    - **自訂環境變數**: 透過官方提供的多種環境變數設定方式([Environment Variables Setting](https://docs.cypress.io/guides/guides/environment-variables.html#Setting)
    )，以下介紹我們較常用的兩種方式:

      1. 在設定檔內加入**env**屬性

            EX:

            ```json
            {
              "env": {
                "envKey1": "val1",
                "envKey2": "val2"
              }
            }
            ```

      2. command line加上 **--env**

            EX:

            ```shell
            $ cypress run --env envKey1="val1"
            ```

        若要取得環境變數則使用**Cypress.env()**取得。

        EX:

        ```javascript
        Cypress.env("envKey1")
        ```

4. **Commands**: 可將所寫的function包成command，這樣只要是Cypress的測試檔都可直接使用。

    - **加入command**: 使用**Cypress.Commands.add(commandName, function)**來創建客製的command並放於**support**資料夾下。

        EX:

        ```javascript
        Cypress.Commands.add('commandName', () => console.log('command'))
        ```

    - **呼叫command**: 使用**cy.**來呼叫command。

        EX:

        ```javascript
        cy.commnadName()
        ```

以上瞭解後就可開始正式寫test，當然若在撰寫前把官方的[Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)與[Best practices](https://docs.cypress.io/guides/references/best-practices.html)都讀過再動手會更好。

最後串上CI也是必要的，[Continuous Integration](https://docs.cypress.io/guides/guides/continuous-integration.html#Examples)提供各種CI服務的設定範例可直接拿來使用。由於測試較為耗時，建議可上master再進行測試或透過排程固定在某時段讓測試自動運行(EX: Gitlab可搭配schedule來設置固定執行時間)。

# 該全交給E2E test嗎?
透過Cypress執行E2E test，有好用的操作介面可看到整個測試過程與debug，比寫unit test還來得順手。曾有念頭想把一些測試放到此階段，但這並不是好選擇，當test case變多，執行時間明顯感受變長，而Cypress需付費才有提供同時執行多測試的parallelization服務。

目前所開發的專案有很多欄位需填寫，主要目的是確保實際畫面能預期呈現並透過操作達到前後端溝通(EX: 當使用者填寫頁面表單欄位後按送出，後端能接收到請求並建立一筆資料)。測試情境以[happy path](https://en.wikipedia.org/wiki/Happy_path)為主，畫面上的細微交互行為(EX: 勾選A，B按鈕會disable)會在unit test就先測試完畢。

想清楚要達到怎樣目的很重要，測試金字塔中UI test(或E2E test)位於最頂端，表示在撰寫各種測試時，其占比會是最少。畢竟執行耗時，且維護成本高，但它的價值很大，因測試操作範圍就是使用者實際操作的畫面，所以若團隊有足夠時間還是很值得投資。
