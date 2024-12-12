import React from 'react'

function ConfirmOrder({id, display="block"}) {
    function complete() {
        $("#e3").css("display", "none")
        $("#e4").css("display", "block")
    }
    return (
        <>
            <div id={id} style={{display:display}}>
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
                            <div className="detail">放明細</div>
                        </div>
                        <div className="e2_group">
                            <div className="title">付款方式與寄送資訊</div>
                            <div className="text">
                            </div>
                            <div className="detail">放明細</div>
                            <div className="go">
                                <button>◀︎上一步&nbsp;</button>
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