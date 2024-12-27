<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BirthdayController;

class SendBirthdayGifts extends Command
{
    /**
     * 命令名稱
     *
     * @var string
     */
    // 給 Artisan 命令的標識，用於執行這個任務。
    protected $signature = 'birthday:send-gifts';

    /**
     * 命令描述
     *
     * @var string
     */
    // 如果我打php artisan list，會出現的文字描述 (讓開發者知道這個命令的用途)
    protected $description = '發送生日禮金和祝福郵件';

    /**
     * 執行命令
     *
     * @return int
     */
    // 命令的執行入口點
    public function handle()
    {
        // 調用某控制器的某個function
        app(BirthdayController::class)->sendBirthdayGifts();
        return Command::SUCCESS;
    }
}
