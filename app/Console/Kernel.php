<?php

namespace App\Console\Kernel;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\BirthdayController;

class Kernel extends ConsoleKernel
{
    // 註冊命令
    // protected $commands = [
    //     SendMonthlyBirthdayGifts::class, // 註冊你的命令
    // ];

    protected function schedule(Schedule $schedule)
    {
        
    // $schedule->command('log:sonething')->everyMinute();

    // $schedule->call(function () {
    //     \Log::info('Hello World');
    // })->dailyAt('16:15');
    
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }


}
