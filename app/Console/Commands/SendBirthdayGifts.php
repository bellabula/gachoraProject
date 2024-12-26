<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BirthdayController;

class SendBirthdayGifts extends Command
{
    /**
     * 命令的名稱及簽名。
     */
    protected $signature = 'birthday:send-gifts';

    /**
     * 命令的描述。
     */
    protected $description = 'Send birthday gifts to users';

    /**
     * 執行命令。
     */
    public function handle()
    {
        // 呼叫控制器方法
        (new BirthdayController())->sendBirthdayGifts();
        
        $this->info('Birthday gifts sent successfully!');
    }
}
