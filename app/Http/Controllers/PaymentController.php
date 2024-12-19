<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ECPay_AllInOne;

class PaymentController extends Controller
{
    // 創建訂單並跳轉到金流頁面
    public function createOrder(Request $request)
    {
        try {
            $ecpay = new ECPay_AllInOne();

            $ecpay->ServiceURL = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";
            $ecpay->HashKey = 'spPjZn66i0OhqJsQ';
            $ecpay->HashIV = 'hT5OJckN45isQTTs';
            $ecpay->MerchantID = '3002599';

            $ecpay->Send['MerchantTradeNo'] = "Test" . time();
            $ecpay->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');
            $ecpay->Send['PaymentType'] = "aio";
            $ecpay->Send['TotalAmount'] = 1000;
            $ecpay->Send['TradeDesc'] = "測試商品";
            $ecpay->Send['ChoosePayment'] = ECPay::PaymentMethod_ALL;
            $ecpay->Send['Items'] = [
                ['Name' => '測試商品', 'Price' => 1000, 'Currency' => '元', 'Quantity' => 1]
            ];
            $ecpay->Send['ReturnURL'] = url('/ecpay-callback');
            $ecpay->Send['OrderResultURL'] = url('/order-result');

            // 返回付款表單，並直接跳轉
            return response()->json(['form' => $ecpay->CheckOutString()]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Payment creation failed: ' . $e->getMessage()], 500);
        }
    }

    // 處理回調
    public function paymentCallback(Request $request)
    {
        // 這裡處理支付結果回調邏輯
        $paymentData = $request->all();
        // 驗證並處理支付結果
        return response()->json(['status' => 'success']);
    }

    // 訂單結果頁面
    public function orderResult()
    {
        // 顯示訂單支付結果
        return view('order-result');
    }
}
