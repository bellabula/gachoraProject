<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class BirthdayController extends Controller
{
    /**
     * 發送生日禮金
     *
     * @return \Illuminate\Http\Response
     */
    public function sendBirthdayGifts()
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


            // 發送生日祝福郵件

            // key => value
            // 寫這行是因為 birthdayGift.blade 要用
            $data = [
                'name' => $member->name,
            ];

            // birthday_Gift在 views 裡面
            Mail::send('birthdayGift', $data, function ($message) use ($member) {
                $message->to($member->email)
                    ->subject('生日快樂！');
            });

            // 更新會員的「最後一次收到生日禮金的年份」

            // => 用於將一個鍵 key 配對給一個值 value 形成陣列元素 (如果要改的東西很多的話)
            DB::table('users')->update(['last_birthday_gift' => now()->year]);

            echo "已為會員 {$member->name} 發送生日禮金並寄出祝福郵件！<br>";
        }
    }
}