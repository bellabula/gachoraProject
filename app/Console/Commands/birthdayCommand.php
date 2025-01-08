<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class birthdayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:birthday-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '發送生日禮金並寄送生日祝福郵件';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $members = User::whereRaw('DATE_FORMAT(birth, "%m-%d") = DATE_FORMAT(NOW(), "%m-%d")')
            ->where(function ($query) {
                $query->whereNull('last_birthday_gift')
                    ->orWhere('last_birthday_gift', '<', now()->year);
            })
            ->get();
    
        foreach ($members as $member) {
            try {
                // 發送生日禮金
                DB::table('gift')->insert([
                    'user_id' => $member->id,
                    'category_id' => 4,
                    'amount' => 200,
                    'update_at' => time(),
                    'expire_at' => time() + (30 * 24 * 60 * 60),
                ]);
                dd($insertGift); // 查看插入結果
    
                // 插入禮金紀錄
                DB::table('records')->insert([
                    'time' => time(),
                    'user_id' => $member->id,
                    'character_id' => 14,
                    'label' => null,
                    'status_id' => 2,
                ]);
    
                // 發送郵件
                $data = [
                    'name' => $member->name,
                ];
    
                Mail::send('birthdayGift', $data, function ($message) use ($member) {
                    $message->to($member->email)
                        ->subject('生日快樂！');
                });
    
                // 更新會員資料
                DB::table('users')->where('id', $member->id)->update([
                    'last_birthday_gift' => now()->year,
                ]);
    
                // 成功發送禮金與郵件
                $this->info("已為會員 {$member->name} 發送生日禮金並寄出祝福郵件！");
    
            } catch (\Exception $e) {
                // 捕獲錯誤並輸出錯誤訊息
                $this->error("發送生日禮金或郵件失敗，會員：{$member->name}，錯誤：{$e->getMessage()}");
            }
        }
    
        $this->info('指令執行完成！');
    }
    
}
