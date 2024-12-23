<?php
require_once('ECPay.Payment.Integration.php'); // 確保你有這個檔案

$money = $_POST['money'];
$user_id = $_POST['user_id'];
$backToURL = 'http://localhost/gachoraProject/app/Models/Ecpay/redirect.php';
$gash = '';
if(isset($_POST['money'])){
    switch ($money) {
        case 300:
            $gash = 300;
            break;
        case 500:
            $gash = 500;
            break;
        case 1000:
            $gash = 1000;
            break;
        case 3000:
            $gash = 3030;
            break;
        case 5000:
            $gash = 5100;
            break;
        case 10000:
            $gash = 10250;
            break;
        case 20000:
            $gash = 20600;
            break;
        case 30000:
            $gash = 31000;
            break;
        case 50000:
            $gash = 52000;
            break;
    }
}

try {
    // 建立金流物件
    $ecpay = new ECPay_AllInOne();

    // 基本設定
    $ecpay->ServiceURL = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"; // 測試環境
    $ecpay->HashKey = 'spPjZn66i0OhqJsQ'; // 測試用 HashKey
    $ecpay->HashIV = 'hT5OJckN45isQTTs';  // 測試用 HashIV
    $ecpay->MerchantID = '3002599';       // 測試用 MerchantID

    // 訂單基本參數
    $ecpay->Send['ReturnURL'] = "http://localhost/your_project/ecpay-callback.php"; // 回傳付款結果通知
    $ecpay->Send['MerchantTradeNo'] = "GC" . time() . $user_id . "R"; // 唯一訂單編號
    $ecpay->Send['MerchantTradeDate'] = date('Y/m/d H:i:s'); // 交易時間
    $ecpay->Send['TotalAmount'] = $money; // 交易金額
    $ecpay->Send['TradeDesc'] = "儲值明細"; // 交易描述
    $ecpay->Send['ChoosePayment'] = ECPay_PaymentMethod::ALL; // 付款方式: 全部
    $ecpay->Send['OrderResultURL'] = $backToURL;

    // 商品資料
    array_push($ecpay->Send['Items'], [
        'Name' => "儲值" . $gash . "G幣",
        'Price' => (int)$money,
        'Currency' => "元",
        'Quantity' => (int) "1",
    ]);

    // 產生並送出表單
    echo "正在跳轉到綠界付款頁面...";
    $ecpay->CheckOut();
} catch (Exception $e) {
    echo "錯誤：" . $e->getMessage();
}
// 4311-9522-2222-2222