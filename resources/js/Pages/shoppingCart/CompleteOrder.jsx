import React from 'react'
import { Link} from '@inertiajs/react';
// import CityProvider from "./CityContext";

function CompleteOrder({ id, display = "block" }) {
    // const updateDatabase  = () => {
    //     if (aa){
    //     fetch("http://localhost/gachoraProject/app/Models/Post/Checkout.php"),
        
    //     }
    // }
    // <CityProvider></CityProvider>

    return (
        <>
            <div id={id} style={{ display: display }}>
                {/* <!-- 追蹤條 --> */}
                <div className="cart_nav">
                    <ol className="breadcrumb">
                        <li className="btn1">戰利品儲存庫</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">戰利品購物車</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">寄送與結帳</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">確認訂單</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1 active">訂單完成</li>
                    </ol>
                </div>
                <div className="e2_content">
                    {/* <!-- 選擇匡 --> */}
                    <div className="e2_center">
                        <div className="e2_group">
                            <div className="detail" style={{ textAlign: "center", fontSize: "3vw", border: "0", margin: "10vw" }}>訂單已提交</div>
                            <div className="go" style={{ justifyContent: "center" }}>
                                <button className="bgmain" style={{ margin: "2vw" }}>
                                    <Link href={route("dashboard")} onClick={()=>{localStorage.setItem("activeTab", "memberOrder")}} style={{ textDecoration: "none", color: "white" }}>
                                    查看訂單
                                    </Link>
                                </button>
                                <button className="bgmain" style={{ margin: "2vw" }}>
                                    <Link href={route("dashboard")} style={{ textDecoration: "none", color: "white" }}>
                                        回會員專區
                                    </Link>
                                </button>
                                <button className="bgmain" style={{ margin: "2vw" }}>
                                    <Link href={route("home")} style={{ textDecoration: "none", color: "white" }}>
                                        回首頁
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CompleteOrder