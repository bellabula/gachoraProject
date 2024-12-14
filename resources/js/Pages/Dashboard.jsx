import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import React from 'react';
import MyWall from './member/MyWall';
import MyWallet from './member/MyWallet';
import MyStorage from './member/MyStorage';
import MyFavor from './member/MyFavor';
import MyOrder from './member/MyOrder';
import MyProfile from './member/MyProfile';
import NavLink from './member/NavLink';

export default function Dashboard() {

    const highlight = usePage().props.highlight;

    const user = usePage().props.auth.user;
    let user_id = user.id

    useEffect(() => {
        let basePath = '../app/Models'
        const url = basePath + '/Post/MainUser.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            // console.log(response)
            document.querySelector("#member > div.row.pt-5.pb-5.align-items-center > div.col-4 > div.h2.text-end.mb-0").innerText = response.gash
            response.gift.map((v, i) => {
                document.querySelector("#member > div.row.pt-5.pb-5.align-items-center > div.col-4 > div.text-end.w-100").innerText = `${v.amount}G幣將在${v.expire_at}過期`
            })
        })
    }, [user_id])

    // // 初始化時恢復到當前的 Tab
    // document.addEventListener("DOMContentLoaded", () => {
    //     // 從 URL 中獲取錨點部分，例如 #profile
    //     const hash = window.location.hash;
    //     console.log(hash)
    //     if (hash) {
    //         // 找到對應的 Tab 並顯示
    //         const tab = document.querySelector(`[href="${hash}"]`);
    //         if (tab) {
    //             const bootstrapTab = new bootstrap.Tab(tab);
    //             bootstrapTab.show();
    //         }
    //     }

    //     // 監聽 Tab 點擊事件，保存當前的 Tab
    //     document.querySelectorAll('a[data-bs-toggle="pill"]').forEach((tab) => {
    //         console.log(tab)
    //         tab.addEventListener("shown.bs.tab", (event) => {
    //             const hash = event.target.getAttribute("href");
    //             history.replaceState(null, null, hash); // 更新網址但不重新加載頁面
    //         });
    //     });
    // });


    return (
        <AuthenticatedLayout>
            <Head title="Member" />
            <main className="container container-xxl" id='member'>
                <div className="row pt-5 pb-5 align-items-center">
                    <div className="col-8"><img src="http://localhost/gachoraProject/public/images/diamond.svg" alt="" width="50px" className="me-4" />
                        <span className="h4"><b>{user.name}</b> 您好!</span></div>
                    <div className="col-4">
                        <p className="h2 d-inline-block">G幣餘額</p><button className="rounded-5 float-end">儲值G幣</button>
                        <div className="h2 text-end mb-0">XXXXXXXXX</div>
                        <div className="text-end w-100" style={{ color: "gray" }}>xxx G幣將在2025/12/31到期</div>
                    </div>
                </div>
                {/* <!-- Tabs --> */}
                <div className="custom-section">
                    <ul className="nav nav-pills justify-content-center">
                        <NavLink href="#memberWall" className={highlight === 'wallet' | highlight === 'profile' ? '' : 'active'}>戰利牆</NavLink>
                        <NavLink href="#memberFavor">收藏清單</NavLink>
                        <NavLink href="#memberStore">戰利儲藏庫</NavLink>
                        <NavLink href="#memberWallet" className={highlight === 'wallet' ? 'active' : ''}>我的錢包</NavLink>
                        <NavLink href="#memberOrder">我的訂單</NavLink>
                        <NavLink href="#memberProfile" className={highlight === 'profile' ? 'active' : ''}>基本資料</NavLink>
                    </ul>
                </div>
                <div className="tab-content pt-5">
                    {/* <!-- 1. 戰利牆 --> */}
                    <MyWall id="memberWall" className={highlight === 'wallet' | highlight === 'profile' ? '' : 'active'} />
                    {/* <!-- 2. 收藏清單 --> */}
                    <MyFavor id="memberFavor" />
                    {/* <!-- 3. 戰利儲藏庫 --> */}
                    <MyStorage id="memberStore" />
                    {/* <!-- 4. 我的錢包 --> */}
                    <MyWallet id="memberWallet" className={highlight === 'wallet' ? 'active' : ''} />
                    {/* <!-- 5. 我的訂單 --> */}
                    <MyOrder id="memberOrder" />
                    {/* <!-- 6. 基本資料 --> */}
                    <MyProfile id="memberProfile" className={highlight === 'profile' ? 'active' : ''} />
                </div>
            </main>

        </AuthenticatedLayout>
    );
}
