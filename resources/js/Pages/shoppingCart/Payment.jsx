import React, { useEffect, useState }  from 'react'
import StoreSelector  from './StoreSelector ';
import { usePage } from '@inertiajs/react';


function Checkout({ id, display = "block"}) {
    function checkBill() {
        $("#e21").css("display", "none")
        $("#e3").css("display", "block")
    }

        const [userInfo, setUserInfo] = useState({});

        const user = usePage().props.auth.user;
        let user_id = user.id
        // let basePath = '../../../app/Models'
        useEffect(()=>{
            const url = 'http://localhost/gachoraProject/app/Models/Post/Userinfo.php'
            $.post(url, {
                user_id
            }, (response) => {
                // console.log('會員資料：', response)
                setUserInfo(response)
            })
        },[user_id]
        )
        // console.log('userinfo:',(userInfo[0] != undefined)? userInfo[0].name : userInfo.name)
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
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">會員資訊</div>
                            <div className="text nobg">
                                <br />
                                <p>姓名：{(userInfo[0] != undefined)? userInfo[0].name : userInfo.name}</p>
                                <p>電話：{(userInfo[0] != undefined)? userInfo[0].phone : userInfo.phone}</p>
                                <p>信箱：{(userInfo[0] != undefined)? userInfo[0].email : userInfo.email}</p>
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">收件人資訊</div>
                            <div className="text nobg">
                                {/* <button>★常用收件人資訊</button><br /> */}
                                姓名：<input type="text" defaultValue={(userInfo[0] != undefined)? userInfo[0].name : ''}/><br/>
                                信箱：<input type="text" defaultValue={(userInfo[0] != undefined)? userInfo[0].email : ''}/><br/>
                                地址：<input type="text" defaultValue={(userInfo[0] != undefined)? userInfo[0].address : ''}/><br/>
                                時間：<select name="" id="">
                                    <option value="">任意</option>
                                    <option value="">早上(09:00~12:00)</option>
                                    <option value="">中午(12:00~17:00)</option>
                                    <option value="">晚上(17:00~21:00)</option>
                                </select>
                                {/* 電話：<input type="text" value={defaultValue[0].name}/>
                                信箱：<input type="text" value={defaultValue[0].name}/>
                                地址：<input type="text" value={defaultValue[0].name}/>
                                時間：<input type="text" value={defaultValue[0].name}/> */}
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