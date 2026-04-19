// @ts-check

import { Calendar35 } from "./js/logic/Calendar35.1.js";
import { Data } from "./js/logic/Data.js";
import {closeDialog} from "./js/dialog/closeDialog.js";
import { populateExpenseTypes } from "./js/calendar/populateExpenseTypes.js";
import { DialogOverLay } from "./js/dialog/DialogOverLay.js";
import { BudgetDialog } from "./js/summarize/budgetDialog.js";
import { CalendarCell } from "./js/calendar/CalendarCell.js";
import { renderTable } from "./js/summarize/renderTable.2.js";
import { loadComponent } from "./js/common/loadComponent.js";

let log="start log";
await main();

async function main() {
  //--before service worker registration--
  // @ts-ignore
  document.getElementById("showLogButton").addEventListener("click", () => {
    alert(log);
  });
  // @ts-ignore
  document.getElementById("clearCacheButton").addEventListener("click", () => {clearAppCache();});
  //--

  navigator.serviceWorker.register('./service-worker.js');

  document.addEventListener("DOMContentLoaded", () => {
    populateExpenseTypes();
  });

  try{
    await loadComponent("calendarWrapper","./js/calendar/calendar.html");
  }catch(e){
    throw new Error("カレンダーの読み込みに失敗: "+e);
  }

  // iOS判定してメッセージを表示
  if (window.matchMedia("(display-mode: standalone)").matches === false) {
    // @ts-ignore
    document.getElementById('iosPrompt').style.display = 'block';
  }

  // @ts-ignore
  document.getElementById("paymentDetailButton").addEventListener("click", (e) => {
    e.preventDefault();
    alert("この機能はまだ使えません。");
  });

  // @ts-ignore
  document.getElementById("fixedCostButton").addEventListener("click", (e) => {
    e.preventDefault();
    alert("この機能はまだ使えません。");
  });

  // @ts-ignore
  document.getElementById("cancelBtn").addEventListener("click", closeDialog);

  // @ts-ignore
  document.getElementById("updateButton").addEventListener("click", forceUpdateApp);



  //note: before setting next/prev
  const today = new Date();
  const calendar35 = new Calendar35(today.getFullYear(), today.getMonth() + 1);

  let data = new Data();
  let string = localStorage.getItem("data");
  if (string != null) {
    const data2 = JSON.parse(string);
    if (data2 == null) {
      alert("データの読み込みに失敗しました。");
      return;
    }

    data = Data.fromJSON(data2);
  }

  let dialog=new DialogOverLay(data);
  dialog.InitializeSaveButton(refresh);
  const budgetDialog=new BudgetDialog();
  
  const calendarCell = new CalendarCell(dialog, data);

  document.getElementById('prev')?.addEventListener('click', () => {
     calendar35.DecreaseMonth(); refresh(); });
  document.getElementById('next')?.addEventListener('click', () => { 
    calendar35.IncreaseMonth(); refresh(); });

  refresh();

  function refresh(){
    const summaryVM=data.CreateSummaryVM(calendar35,()=>save(),()=>refresh(),budgetDialog);
    renderTable(summaryVM);
    calendar35.RenderCalendarTable(calendarCell);
    calendar35.UpdateYearMonthText();
  }

  function save(){
    localStorage.setItem("data", JSON.stringify(data));
  }
}

//REFACTOR: これらはSW更新のためのコード。別ファイルに切り出すべきかも

function forceUpdateApp() {
  myLog("強制更新開始");

  // ① SW削除
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => {
      reg.unregister();
      myLog("SW削除");
    });
  });

  // ② キャッシュ削除
  caches.keys().then(keys => {
    keys.forEach(key => {
      caches.delete(key);
      myLog("cache削除: " + key);
    });
  });

  // ③ 少し待ってリロード
  setTimeout(() => {
    myLog("リロード");
    window.location.reload();
  }, 500);
}
function updateApp() {
  navigator.serviceWorker.getRegistration().then(reg => {
    myLog("start update app");

    if (!reg) {
      myLog("SWなし");
      return;
    }

    reg.update().then(() => {
      myLog("update()実行");

      // すでにwaitingがある場合
      if (reg.waiting) {
        myLog("waitingあり");
        reloadAfterControllerChange();
        reg.waiting.postMessage('SKIP_WAITING');
        return;
      }

      myLog("installing監視判定前");

      // installing中を監視
      if (reg.installing) {
        myLog("installing監視");

        reg.installing.addEventListener('statechange', () => {
          // @ts-ignore
          if (reg.installing.state === 'installed') {
            myLog("installedになった");

            if (reg.waiting) {
              reg.waiting.postMessage('SKIP_WAITING');
            }
          }
        });
      }

      myLog("リロード前");
      myLog("waiting: " + !!reg.waiting);
      myLog("installing: " + !!reg.installing);
      myLog("active: " + !!reg.active);

      reloadAfterControllerChange();
    });
  });
}

function reloadAfterControllerChange() {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    myLog("controller変更 → reload");
    window.location.reload();
  });
}

/**
 * @param {string} msg
 */
function myLog(msg){
  // @ts-ignore
  log+="\n"+msg;
  console.log(msg);
}

function clearAppCache() {
  myLog("キャッシュ削除開始");
  
  if(navigator==null || !navigator.serviceWorker) {
    myLog("Service Workerが利用できない");
    return;
  }

  // ① Service Worker削除
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => {
      reg.unregister();
      myLog("SW削除");
    });
  });

  myLog("caches削除開始");

  // ② Cache Storage削除
  caches.keys().then(keys => {
    keys.forEach(key => {
      caches.delete(key);
    });
  });

  // ③ 少し待ってリロード
  setTimeout(() => {
    window.location.reload();
  }, 500);
}
