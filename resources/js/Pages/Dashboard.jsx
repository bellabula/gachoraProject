import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
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

    $(document).ready(function () {
        let basePath = '../app/Models'
        let user_id = user.id

        const url = basePath + '/Post/MainUser.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            console.log(response)
            document.querySelector("#member > div.row.pt-5.pb-5.align-items-center > div.col-4 > div.h2.text-end.mb-0").innerText = response.gash

            // $('#info').text(`${response.name}您好, 有${response.gash}G幣`)
            response.gift.map((v, i) => {
                document.querySelector("#member > div.row.pt-5.pb-5.align-items-center > div.col-4 > div.text-end.w-100").innerText = `${v.amount}G幣將在${v.expire_at}過期`
                // return $('#info').append(`<br>${v.amount}G幣將在${v.expire_at}過期`)
            })
        })

        const urlWall = basePath + '/Post/UserWall.php'
        $.post(urlWall, {
            user_id: user_id
        }, ({
            egg,
            ichiban
        }) => {
            console.log('扭蛋戰力牆：', egg)
            // $('#result').text('')
            // egg.map((v) => {
            //     console.log(v.img)
            //     // return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
            // })
            // $('#result').append('<br>')
            console.log('一番賞戰力牆：', ichiban)
            // ichiban.map((v) => {
            //     console.log(v.img)
            //     // return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
            // })
        })

    })

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
                        <NavLink href="#memberWall" className={highlight === 'wallet'| highlight === 'profile' ? '' : 'active'}>戰利牆</NavLink>
                        <NavLink href="#memberFavor">收藏清單</NavLink>
                        <NavLink href="#memberStore">戰利儲藏庫</NavLink>
                        <NavLink href="#memberWallet" className={highlight === 'wallet' ? 'active' : ''}>我的錢包</NavLink>
                        <NavLink href="#memberOrder">我的訂單</NavLink>
                        <NavLink href="#memberProfile" className={highlight === 'profile' ? 'active' : ''}>基本資料</NavLink>
                    </ul>
                </div>
                <div className="tab-content pt-5">
                    {/* <!-- 1. 戰利牆 --> */}
                    <MyWall id="memberWall" className={highlight === 'wallet'| highlight === 'profile' ? '' : 'active'}/>
                    {/* <!-- 2. 收藏清單 --> */}
                    <MyFavor id="memberFavor" />
                    {/* <!-- 3. 戰利儲藏庫 --> */}
                    <MyStorage id="memberStore" />
                    {/* <!-- 4. 我的錢包 --> */}
                    <MyWallet id="memberWallet" className={highlight === 'wallet' ? 'active' : ''} />
                    {/* <!-- 5. 我的訂單 --> */}
                    <MyOrder id="memberOrder" />
                    {/* <!-- 6. 基本資料 --> */}
                    <MyProfile id="memberProfile" className={highlight === 'profile' ? 'active' : ''}/>
                </div>
            </main>

        </AuthenticatedLayout>
    );
}
