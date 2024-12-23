<?php
require_once('ECPay.Payment.Integration.php'); // 確保你有這個檔案

try {
    $ecpay = new ECPay_AllInOne();
    $ecpay->HashKey = 'spPjZn66i0OhqJsQ';
    $ecpay->HashIV = 'hT5OJckN45isQTTs';

    // 接收並檢查付款結果
    $result = $ecpay->CheckOutFeedback();

    if (count($result) > 0) {
        // 處理回傳資料
        foreach ($result as $key => $value) {
            echo $key . " => " . $value . "<br>";
        }

        // 依照 API 規範回應 1|OK 表示接收成功
        echo "1|OK";
    } else {
        echo "無回傳資料";
    }
} catch (Exception $e) {
    echo "錯誤：" . $e->getMessage();
}
