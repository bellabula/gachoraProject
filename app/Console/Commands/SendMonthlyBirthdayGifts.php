<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BirthdayController;

class SendMonthlyBirthdayGifts extends Command
{
    protected $signature = 'birthday:send-monthly';
    protected $description = '每月發送生日禮金和祝福郵件';

    public function handle()
    {
        // 創建 BirthdayController 的實例
        $controller = new BirthdayController();

        // 呼叫 sendMonthlyBirthdayGifts 方法
        $controller->sendMonthlyBirthdayGifts();

        $this->info('已成功發送本月生日會員的禮金與郵件');

        Log::info('開始執行發送生日禮金任務');
    
        // 你的業務邏輯
        
        Log::info('任務執行完成');
    }
}
