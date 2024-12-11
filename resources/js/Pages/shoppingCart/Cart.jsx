import Navbar from '@/Components/Navbar'
import React from 'react'
import { Head } from '@inertiajs/react';
function Cart() {
    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="Shopping Cart" />
            <main id='cart'>
                <div id="e1">
                    {/* <!-- 追蹤條 --> */}
                    <div className="cart_nav">
                        <ol className="breadcrumb">
                            <li className="btn1">戰利品儲存庫</li>
                            <span>&nbsp;&gt;&nbsp;</span>
                            <li className="btn1 active">戰利品購物車</li>
                            <span>&nbsp;&gt;&nbsp;</span>
                            <li className="btn1">寄送與結帳</li>
                            <span>&nbsp;&gt;&nbsp;</span>
                            <li className="btn1">確認訂單</li>
                            <span>&nbsp;&gt;&nbsp;</span>
                            <li className="btn1">訂單完成</li>
                        </ol>
                    </div>

                    {/* <!-- 戰利品儲存庫 --> */}
                    <div className="left2">
                        <div className="title">戰利品儲藏庫</div>
                        <div className="cardsContainer">
                            <div className="cardContainer">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="1.2vw" height="1.2vw" fill="currentColor"
                                        className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                    </svg>&nbsp;加入出貨</button>
                            </div>
                            <div className="cardContainer">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="1.2vw" height="1.2vw" fill="currentColor"
                                        className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                    </svg>&nbsp;加入出貨</button>
                            </div>
                        </div>
                    </div>
                    {/* <!-- 待出貨區 --> */}
                    <div className="left3">
                        <div className="title">待出貨區</div>
                        <div className="checkoutContainer">
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                            <div className="checkoutItem">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" alt=""/>
                                    <div className="checkoutItemDetail">
                                        <div>系列名稱</div>
                                        <div>角色名稱</div>
                                        <div>數量: 1</div>
                                        <button>下次再出貨</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- 重要提醒 --> */}
                    <div className="left4">
                        <div className="title">重要提醒</div>
                        <ol className="reminder">
                            <li>單筆記送依 7-11 積材規定，運費**。</li>
                            <li>商品體積較大或多於**項，可能不適用『7-11取貨』，或將以拆單處理。</li>
                            <li>結帳選項若無出現『7-11取貨』，可能是購買商品不適用此服務。(說明)。</li>
                            <li>選擇『宅配到府』，訂購品項皆有『快速到貨』標籤且商品皆有庫存，於當日00:00~09:00確認訂單完成(週六、週日及國定假日不適用此方案)，配送地點為【台北市/新北市/基隆市】地區即符合快速到貨服務(說明))。
                            </li>
                        </ol>
                    </div>
                    {/* <!-- 商品明細 --> */}
                    <div className="right">
                        <div className="listContainer">
                            <div className="title">待結帳商品明細</div>
                            <div className="detail">
                                <div className="itemContainer">
                                    <span className="character">海賊王</span>
                                    <span className="amount">數量: 1</span>
                                    <div className="cut"></div>
                                </div>
                                <div className="itemContainer">
                                    <span className="character">海賊王</span>
                                    <span className="amount">數量: 1</span>
                                    <div className="cut"></div>
                                </div>
                                <div className="itemContainer">
                                    <span className="character">海賊王</span>
                                    <span className="amount">數量: 1</span>
                                    <div className="cut"></div>
                                </div>
                            </div>
                            <div className="totalLine"></div>
                            <div className="total">
                                <span>商品總數</span>
                                <span>1項</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Cart