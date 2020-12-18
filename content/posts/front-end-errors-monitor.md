---
fileName: front-end-errors-monitor
title: 前端異常處理、回報與監控
date: 2020-11-12
tags:
  - front-end-monitor
---
現實生活中，程式執行總有機率發生錯誤，每個工程師都無法保證所開發的程式可一直完美運作。而前端往往是和使用者做第一線接觸，若有問題卻無法迅速得知並處理，容易造成不好的使用者體驗。因此如何針對錯誤進行處理、回報與監控是件重要且值得去了解的事情。

- [常見的前端異常處理方式](#常見的異常處理方式)
- [分析異常處理的範圍](#分析異常處理的範圍)
- [回報與監控](#回報與監控)


## 常見的前端異常處理方式
在這只介紹簡單的三個方式：

1. **try catch**

在許多程式語言中都常會看到的寫法，但在js中對於**非同步事件**像是**setTimeout**、**setInterval**，若置於外層無法捕捉到錯誤，須將try catch寫在setTimeout、setInterval內部才可。

EX:
```javascript
try {
  setTimeout(() => {
    throw 'error'
  }, 10)
} catch(e) {
  console.log(e) // 不會執行到這
}

setTimeout(() => {
  try {
    throw 'error'
  } catch(e) {
    console.log(e) // error
  }
}, 10)
```

此外，對於包在try catch中的的程式語法錯誤也無法檢查到。

```javascript
try {
  error
} catch(e) {
  console.log(e) // 不會執行到這
}
```

2. **window.onerror**

當js執行時錯誤或語法錯誤發生時，**window.onerror**會被執行。但若是外部靜態資源載入錯誤的話則無法透過此方式捕捉到。

```javascript
window.onerror = (message, source, lineno, colno, error) => { ... }
```

3. **window.addEventListener**

當某些資源載入失敗(EX: img、script tag)，可透過window.addEventListener來捕捉到，而window.onerror拿到的錯誤也可透過此方式取得，但無法像拿到較詳細的錯誤資訊。

EX:
```javascript
window.addEventListener('error', e => {
  consttarget = e.target,
      isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement,
  if (!isElementTarget) return false
}, true);
```

透過上面的範例，可只處理資源載入錯誤的部分。

## 分析異常處理的範圍
針對不同專案的應用範圍決定程式碼中哪些部分是重要且發生錯誤必須知道的，對這些範圍加上有關的異常處理、訂定不同的錯誤等級或訊息。

以目前開發的專案為例，所渲染的畫面經分析後有兩點是重要的:
1. 大量曝光給使用者: 程式有任何問題都會導致畫面無法正常呈現，使曝光沒達到效果造成成本消耗。
2. 引用外部套件: 外部資源錯誤也會影響到整個程式運作。

因此快速分析後，便針對此兩點當作異常處理須被涵括的範圍中。而透過上面提到異常處理方式的2、3即可取得我所想要的錯誤訊息。

接著訂定要傳送到後端的錯誤訊息結構，根據能夠取得的訊息，撰寫一個函式用來處理。由於並不想要每次有錯都要打到後端，所以還會訂個sample ratio也可避免若真的發生錯誤量級過大把後端打爆。

EX:
```javascript
const errorReporter = (...data) => {
  const serverUrl = 'https://server.com
  const reportInfo = {
    errorType: data.errorType,
    message: data.message
  }
  fetch.get(`${serverUrl}?data=${JSON.stringify(reportInfo)}`)
}
```

## 回報與監控
加上錯誤處理後，必須將所捕獲錯誤log回報到後端儲存並要能及時得知錯誤來做後續處理。現在作法是透過API將log儲存至**Elasticsearch**，搭配**Kibana**與**Grafana**做為資料的查詢與顯示。
- Kibana: 用來查看整筆log資訊。
- Grafana: 選擇log中特定欄位訂定metrics，拉出想監控的圖。

通知部分則透過Grafana設定監控的threshold，當訂定的metrics其值超過threshold則打alert到slack通知。

在上述所提到的工具是目前相當熱門的搭配方式，若開發有log相關分析或監控需使用，可當作參考。
