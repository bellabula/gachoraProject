import React from 'react'


function ConfirmOrder({ id, display = "block", items }) {

    function complete() {
        $("#e3").css("display", "none")
        $("#e4").css("display", "block")
    }
    function previous() {
        $("#e3").css("display", "none")
        $("#e21").css("display", "block")
    }
    // console.log("會員id:" + user_id)


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
                        <li className="btn1 active">確認訂單</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">訂單完成</li>
                    </ol>
                </div>
                <div className="e2_content">
                    {/* <!-- 選擇匡 --> */}
                    <div className="e2_center">
                        <div>請確認下列資訊：</div>
                        <div className="e2_group">
                            <div className="title">商品明細</div>
                            <div className="text">
                            </div>
                            <div className="detail">
                                {/* 帶入items，接著把陣列分成item， */}
                                {items && items.length > 0 ? (
                                    items.map((item, index) => (
                                        <li key={index} style={{ display: "flex", alignItems: "center" }}>
                                            <img src={item.img} style={{ width: "10vw" }}></img>&nbsp;&nbsp;
                                            <p>{item.series || ""}/{item.name || ""}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>目前沒有商品</li>
                                )}
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">付款方式與寄送資訊</div>
                            <div className="text">
                            </div>
                            <div className="detail">
                                <p>付款方式：貨到付款</p>
                                <p>收件門市代號：273813</p>
                                <p>收件門市：昌進門市</p>
                                <p>收件地址：台中市南屯區大進街387號1樓</p>
                            </div>
                            <div className="go">
                                <button onClick={previous}>◀︎上一步&nbsp;</button>
                                <button className="bgyellow" onClick={complete}>確認訂單✔︎</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ConfirmOrder