<?php

namespace App\Console\Kernel;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('birthday:send-gifts')->everyMinute();
    }
    
    // 每天半夜12:00送G幣(格林威治時間?)

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }

    protected $commands = [
        \App\Console\Commands\SendBirthdayGifts::class,
    ];
}
