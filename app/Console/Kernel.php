<?php

namespace App\Console\Kernel;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            // sendBirthdayGifts 方法
            (new \App\Http\Controllers\BirthdayController())->sendBirthdayGifts();
        })->dailyAt('4:52'); // 每天半夜12:00送G幣(格林威治時間?)
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
