import React from 'react'
import StoreSelector  from './StoreSelector ';

function Checkout({ id, display = "block" }) {
    function checkBill() {
        $("#e21").css("display", "none")
        $("#e3").css("display", "block")
    }
    return (
        <>
            {/* <Head title="paymentInfo" /> */}
            <div id={id} style={{ display: display }}>
                {/* <!-- 追蹤條 --> */}
                <div className="cart_nav">
                    <ol className="breadcrumb">
                        <li className="btn1">戰利品儲存庫</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">戰利品購物車</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1 active">寄送與結帳</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">確認訂單</li>
                        <span>&nbsp;&gt;&nbsp;</span>
                        <li className="btn1">訂單完成</li>
                    </ol>
                </div>
                <div className="e2_content">
                    {/* <!-- 選擇匡 --> */}
                    <div className="e2_center">
                        <div className="e2_group">
                            <div className="title">選擇配送方式</div>
                            <div className="text">
                                <input name="delivery" type="radio" value="0" id="d1" /><label htmlFor="d1" >7-11取貨</label>
                                <hr />
                                {/* <input name="delivery" type="radio" value="1" id="d2" /><label htmlFor="d2" >全家取貨</label>
                                <hr />
                                <input name="delivery" type="radio" value="2" id="d3" /><label htmlFor="d3">宅配取貨</label> */}
                            </div>
                            <div className="detail">拆單資訊及運費</div>
                        </div>
                        <div className="e2_group">
                            <div className="title">選擇付款方式</div>
                            <div className="text">
                                <input name="pay" type="radio" value="0" id="p1" /><label htmlFor="p1">貨到付款</label>
                                <hr />
                                {/* <input name="pay" type="radio" value="1" id="p2" /><label htmlFor="p2">信用卡</label>
                                <hr />
                                <input name="pay" type="radio" value="2" id="p3" /><label htmlFor="p3">LINE PAY</label>
                                <hr />
                                <input name="pay" type="radio" value="3" id="p4" /><label htmlFor="p4">ATM轉帳</label> */}
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">選擇門市</div>
                            <div className="text nobg">
                            <StoreSelector />
                                {/* <button className="yellow">★選擇常用門市</button><br /> */}
                                <div>
                                    <div>門市名稱：(xx門市)</div>
                                    <div>地址：408台中市大進街387號大墩十二街151號1樓1樓</div>
                                    <div className="grey">取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。</div>
                                </div>
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">會員資訊</div>
                            <div className="text nobg">
                                姓名：套彩榕placeholder<br />
                                電話：<br />
                                信箱：<br />
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">收件人資訊</div>
                            <div className="text nobg">
                                <button>★常用收件人資訊</button><br />
                                姓名：套彩榕placeholder<br />
                                電話：<br />
                                信箱：<br />
                                地址：<br />
                                時間：<br />
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">發票資訊</div>
                            <div className="text nobg">
                                Gachora儲值金發售時已開立統一發票，故使用時不再開立統一發票。
                            </div>
                        </div>
                        <div className="go">
                            <button>◀︎上一步</button>
                            <button className="bg" onClick={checkBill}>下一步▶︎</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout