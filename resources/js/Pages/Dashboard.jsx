import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import React from 'react';
import MyWall from './member/MyWall';
import MyWallet from './member/MyWallet';
import MyStorage from './member/MyStorage';
import MyFavor from './member/MyFavor';
import MyOrder from './member/MyOrder';
import MyProfile from './member/MyProfile';
import NavLink from './member/NavLink';
import Deposit from './member/Deposit';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("");
    const tab_KEY = "activeTab"

    useEffect(() => {
        const savedTab = localStorage.getItem(tab_KEY);
        // console.log("savedTab" + savedTab)
        if (savedTab) {
            setActiveTab(savedTab);
        } else {
            setActiveTab("memberWall")
        }
    }, []);

    const handleTabClick = (tabId) => {
        // console.log("tabId : " + tabId)
        setActiveTab(tabId);
        localStorage.setItem(tab_KEY, tabId);
    };


    const highlight = usePage().props.highlight;

    const user = usePage().props.auth.user;
    let user_id = user.id

    const [cartNumber, setCartNumber] = useState()
    const [dCount, setDCount] = useState("none")
    const [bagNumber, setBagNumber] = useState()
    const [dBagCount, setDBagCount] = useState("none")
    useEffect(() => {
        $.post('../app/Models/Post/UserCart.php', {
            user_id: user_id
        }, (response) => {
            setCartNumber(response.length)
        })
        $.post('../app/Models/Post/UserBag.php', {
            user_id: user_id
        }, (response) => {
            setBagNumber(response.length)
        })
    },[])

    const [myGash, setmyGash] = useState(0)
    const [expireGash, setexpireGash] = useState(0)
    const [expireDate, setexpireDate] = useState(0)

    useEffect(() => {
        let basePath = '../app/Models'
        const url = basePath + '/Post/MainUser.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            // console.log(response)
            setmyGash(response.gash)
            response.gift.map((v, i) => {
                setexpireGash(v.amount)
                setexpireDate(v.expire_at)
            })
        })
    }, [user_id])

    // 控制顯示模態框的狀態
    const [isCoinOpen, setIsCoinOpen] = useState(false);

    // 開啟模態框
    const openCoin = () => {
        setIsCoinOpen(true);
    };

    // 關閉模態框
    const closeCoin = () => {
        setIsCoinOpen(false);
    };


    return (
        <>
            {isCoinOpen && (
                <>
                    {/* 遮罩層 */}
                    <div className="overlay" onClick={closeCoin}></div>

                    {/* 中間的模態框 */}
                    <div className="modal">
                        <Deposit gash={myGash} />
                        <button className='d-block m-auto' onClick={closeCoin}>取消</button>
                    </div>
                </>
            )}
            <AuthenticatedLayout header="Member" cartNumber={cartNumber} dCount={dCount} bagNumber={bagNumber} dBagCount={dBagCount}>
                <main className="container container-xxl" id='member'>
                    <div className="row pt-5 pb-5 align-items-center">
                        <div className="col-8"><img src="http://localhost/gachoraProject/public/images/diamond.svg" alt="" width="50px" className="me-4" />
                            <span className="h4"><b>{user.name}</b> 您好!</span></div>
                        <div className="col-4">
                            <p className="h2 d-inline-block">G幣餘額</p>
                            <div className="h2 mb-0 d-inline-block float-end">{myGash ? myGash : 0}</div>
                            <div className="text-end w-100" style={{ color: "gray" }}>{expireGash} G幣將在{expireDate}到期</div>
                            <button className="rounded-5 float-end mt-2" onClick={openCoin}>儲值G幣</button>
                        </div>
                    </div>
                    {/* <!-- Tabs --> */}
                    <div className="custom-section">
                        <ul className="nav nav-pills justify-content-center" role="tablist">
                            <NavLink id={"memberWall-tab"} target={"#memberWall"} onClick={() => { handleTabClick("memberWall") }} className={highlight === 'profile' | activeTab != "memberWall" ? '' : 'active'}>戰利牆</NavLink>
                            <NavLink id={"memberFavor-tab"} target={"#memberFavor"} onClick={() => { handleTabClick("memberFavor") }} className={activeTab === "memberFavor" ? "active" : ""}>收藏清單</NavLink>
                            <NavLink id={"memberStore-tab"} target={"#memberStore"} onClick={() => { handleTabClick("memberStore") }} className={activeTab === "memberStore" ? "active" : ""}>戰利儲藏庫</NavLink>
                            <NavLink id={"memberWallet-tab"} target={"#memberWallet"} onClick={() => { handleTabClick("memberWallet") }} className={activeTab === "memberWallet" ? 'active' : ''}>我的錢包</NavLink>
                            <NavLink id={"memberOrder-tab"} target={"#memberOrder"} onClick={() => { handleTabClick("memberOrder") }} className={activeTab === "memberOrder" ? "active" : ""}>我的訂單</NavLink>
                            <NavLink id={"memberProfile-tab"} target={"#memberProfile"} onClick={() => { handleTabClick("memberProfile") }} className={highlight === 'profile' | activeTab === "memberProfile" ? 'active' : ''}>基本資料</NavLink>
                        </ul>
                    </div>
                    <div className="tab-content pt-5">
                        {/* <!-- 1. 戰利牆 --> */}
                        <MyWall id="memberWall" ariaLabel="memberWall-tab" className={highlight === 'profile' | activeTab != "memberWall" ? '' : 'active'} />
                        {/* <!-- 2. 收藏清單 --> */}
                        <MyFavor id="memberFavor" ariaLabel="memberFavor-tab" className={activeTab === "memberFavor" ? "active" : ""} />
                        {/* <!-- 3. 戰利儲藏庫 --> */}
                        <MyStorage id="memberStore" ariaLabel="memberStore-tab" className={activeTab === "memberStore" ? "active" : ""} setCartNumber={setCartNumber} setBagNumber={setBagNumber} setmyGash={setmyGash} setDCount={setDCount} setDBagCount={setDBagCount}/>
                        {/* <!-- 4. 我的錢包 --> */}
                        <MyWallet id="memberWallet" ariaLabel="memberWallet-tab" myGash={myGash} className={activeTab === "memberWallet" ? 'active' : ''} />
                        {/* <!-- 5. 我的訂單 --> */}
                        <MyOrder id="memberOrder" ariaLabel="memberOrder-tab" className={activeTab === "memberOrder" ? "active" : ""} />
                        {/* <!-- 6. 基本資料 --> */}
                        <MyProfile id="memberProfile" ariaLabel="memberProfile-tab" className={highlight === 'profile' | activeTab === "memberProfile" ? 'active' : ''} />
                    </div>
                </main>

            </AuthenticatedLayout>
        </>
    );
}
