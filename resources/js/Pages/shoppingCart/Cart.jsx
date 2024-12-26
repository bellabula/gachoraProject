import Navbar from '@/Components/Navbar'
import React, { useEffect, useState } from 'react'
import { Head, usePage } from '@inertiajs/react';
import Payment from './Payment';
import ConfirmOrder from './ConfirmOrder';
import CompleteOrder from './CompleteOrder';
import CartItem from './CartItem';
import CartDetail from './CartDetail';
import CartStorage from './CartStorage';

function Cart() {

    const user = usePage().props.auth.user;
    let user_id = user.id;

    const [cartNumber, setCartNumber] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [storageItem, setStorageItem] = useState([])
    const [dCount, setDCount] = useState("none")
    const url = '../app/Models/Post/UserCart.php'
    const storageUrl = '../app/Models/Post/UserBag.php'
    let [rerender, setRerender] = useState(0)
    useEffect(() => {
        setCartItems([])
        setCartNumber(0)
        setDCount("none")
        $.post(url, {
            user_id: user_id
        }, (response) => {
            // console.log('購物車：', response)
            setCartItems(response)
            setCartNumber(response.length)
            setDCount("flex")
        })
        setStorageItem([])
        $.post(storageUrl, {
            user_id: user_id
        }, (response) => {
            // console.log("戰利儲藏庫 : " + response)
            setStorageItem(response)
        })
    }, [rerender])

    function handleToCart(itemId) {
        const url = '../app/Models/Post/ChangeToCart.php'
        $.post(url, {
            record_id: itemId
        }, (response) => {
            // console.log('ToCart：', response)
        })
        setTimeout(() => {
            setRerender((prev) => prev + 1)
            setDCount("flex")
        }, 100)
        // console.log("ToCart+1:"+rerender)
    }

    function handleBackStorage(itemId) {
        const url = '../app/Models/Post/ChangeToBag.php'
        $.post(url, {
            record_id: itemId
        }, (response) => {
            // console.log('ToBag：', response)
        })
        setTimeout(() => {
            setRerender((prev) => prev + 1)
        }, 100)
        // console.log("BackStorage+1:"+rerender)
    }

    function checkout() {
        $("#e1").css("display", "none")
        $("#e21").css("display", "block")
    }

    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" logout='list-item' cartNumber={cartNumber} dCount={dCount} />
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
                        <div className="cardsContainer" style={{overflowY: "hidden", paddingBottom: "210px"}}>
                            {typeof (storageItem) != "undefined" ?
                                storageItem.map((v, index) => (
                                    <CartStorage itemId={v.id} imgsrc={v.img} clickToCart={handleToCart} key={index} />
                                ))
                                : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前儲藏庫沒有任何商品... </h4>}
                        </div>
                    </div>
                    {/* <!-- 待出貨區 --> */}
                    <div className="left3">
                        <div className="title">待出貨區</div>
                        <div className="checkoutContainer">
                            {typeof (cartItems) != "undefined" ?
                                cartItems.map((v, index) => (
                                    <CartItem itemId={v.id} seriesName={v.series} itemName={v.name} imgsrc={v.img} clickToStorage={handleBackStorage} key={index} />
                                ))
                                : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前購物車沒有任何商品... </h4>}
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
                                {typeof (cartItems) != "undefined" ?
                                    cartItems.map((v, index) => (
                                        <CartDetail itemName={v.name} key={index} />
                                    ))
                                    : <p className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前購物車沒有任何商品... </p>}
                            </div>
                            <div className="totalLine"></div>
                            <div className="total">
                                <span>商品總數</span>
                                <span>{cartItems.length}項</span>
                            </div>
                            <div className="btt">
                                <button className="btn-icon d-inline-block">繼續扭蛋/抽賞</button>
                                <button className="btn-icon d-inline-block" onClick={checkout}>前往結帳</button>
                            </div>
                            <div>
                                <img src="http://localhost/gachoraProject/public/images/warning.svg" />
                                {/* 商品數量或體積超出超商單筆出貨規定，選擇超商出貨訂單將會拆單出貨，運費將以出貨單數計算 */}
                            </div>
                        </div>
                    </div>
                </div>
                <div id='e2'>
                    <Payment id="e21" display="none" />
                    <ConfirmOrder id="e3" display="none" items={cartItems} />
                    <CompleteOrder id="e4" display="none" />
                </div>
            </main>
        </>
    )
}

export default Cart