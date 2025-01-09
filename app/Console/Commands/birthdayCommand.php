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
        // 查詢今天生日的會員且今年尚未收到禮金

        // :: 是 PHP 中的作用域解析運算子
        // WhereRaw() 是 Laravel 查詢產生器的一個函數，它將您的輸入原樣放入 SQL 查詢的 where 子句中。
        $members = User::whereRaw('DATE_FORMAT(birth, "%m-%d") = DATE_FORMAT(NOW(), "%m-%d")')
            ->where(function ($query) {
                $query->whereNull('last_birthday_gift')
                    ->orWhere('last_birthday_gift', '<', now()->year);
            })
            // where、orderBy 等方法只是在構建查詢，所以要用get()
            ->get();
    
        foreach ($members as $member) {
            // ('user_id', $member->id) 將 user_id 變成 $member 的 id

            // 檢查gift表中是否存在指定的user_id

            // 添加新欄位
            try {
                // 發送生日禮金
                DB::table('gift')->insert([
                    'user_id' => $member->id,
                    'category_id' => 4,
                    'amount' => 200,
                    'update_at' => time(),
                    'expire_at' => time() + (30 * 24 * 60 * 60),
                ]);
    
                // 把records的table加進來
                DB::table('records')->insert([
                    'time' => time(),
                    'user_id' => $member->id,
                    'character_id' => 14,
                    'label' => null,
                    'status_id' => 2,
                ]);
    
                // 發送郵件
                // key => value
                // 寫這行是因為 birthdayGift.blade 要用
                $data = [
                    'name' => $member->name,
                ];

                // birthdayGift在 views 裡面
                Mail::send('birthdayGift', $data, function ($message) use ($member) {
                    $message->to($member->email)
                        ->subject('生日快樂！');
                });
    
                // 更新會員的「最後一次收到生日禮金的年份」

                // => 用於將一個鍵 key 配對給一個值 value 形成陣列元素 (如果要改的東西很多的話)
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
