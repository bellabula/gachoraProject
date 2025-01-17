import React, { useState } from 'react'
import DepositOption from './DepositOption';
import { usePage } from '@inertiajs/react';

let togreen1 = ''
let togreen2 = ''
function Deposit({ gash }) {

    const user = usePage().props.auth.user;
    const user_id = user.id;
    togreen1 = user_id
    let gash_id = null;

    // 設定選擇的狀態，初始值為 null，表示沒有選擇
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOption, setIsOption] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    // 處理選項變更
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    const handleSubmit = () => {
        if (!selectedOption) {
            setIsOption(false)
            event.preventDefault()
        } else {
            switch (selectedOption) {
                case 300:
                    gash_id = 1;
                    break;
                case 500:
                    gash_id = 2;
                    break;
                case 1000:
                    gash_id = 3;
                    break;
                case 3000:
                    gash_id = 4;
                    break;
                case 5000:
                    gash_id = 5;
                    break;
                case 10000:
                    gash_id = 6;
                    break;
                case 20000:
                    gash_id = 7;
                    break;
                case 30000:
                    gash_id = 8;
                    break;
                case 50000:
                    gash_id = 9;
                    break;
            }
            // alert(`確定要儲值: NT ${selectedOption} 嗎?`);
            const url = 'http://localhost/gachoraProject/app/Models/Post/TopUpGash.php'
            $.post(url, {
                user_id: user_id,
                gash_id: gash_id
            }, function (response) {
                console.log(response)
                togreen2 = selectedOption
                if (response[0].error == 'done') {
                    localStorage.setItem("tmpurl", window.location.href)
                    toGreen(togreen1, togreen2)
                }
            })
        }
    };

    function closeAlert() {
        setIsOption(true)
    }

    // 提交綠界表單
    // 4311-9522-2222-2222
    function toGreen(green1, green2) {
        let form = document.createElement('form')
        form.action = 'http://localhost/gachoraProject/app/Models/Ecpay/ecpay-payment.php'
        form.method = 'POST'

        let gashInput = document.createElement('input')
        gashInput.type = 'number'
        gashInput.value = green2
        gashInput.name = 'money'
        gashInput.required = true

        let uidInput = document.createElement('input')
        uidInput.type = 'number'
        uidInput.value = green1
        uidInput.name = 'user_id'
        uidInput.required = true

        // let urlInput = document.createElement('input')
        // urlInput.type = 'text'
        // urlInput.value = 'http://localhost/gachoraProject/public/gachadetail?seriesId=1'
        // urlInput.name = 'backToURL'
        // urlInput.required = true

        let submitButton = document.createElement('button')
        submitButton.type = 'submit'

        form.appendChild(gashInput)
        form.appendChild(uidInput)
        // form.appendChild(urlInput)
        form.appendChild(submitButton)

        document.body.appendChild(form)

        form.submit()

    }
    return (
        <>
            {!isOption && (
                <>
                    <div style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: "1100"
                    }}></div>
                    <div style={{ position: "fixed", zIndex: "1200", top: "70%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", backgroundColor: "var(--main-bg-gray)", textAlign: "center", borderRadius: "50px", boxShadow: "10px 10px #B3B3B3" }}>
                        <img style={{ width: "50%", paddingTop: "30px" }} src="http://localhost/gachoraProject/public/images/logo2.png" />
                        <h3 style={{ margin: "30px 0px", color: "#ED1C24" }}>請選擇儲值金額</h3>
                        <h5 style={{ color: "var(--main-darkblue)" }}>
                            較大金額僅開放部分儲值方式<br />
                            務必詳閱讀詳細規章。
                        </h5>
                        <button onClick={closeAlert} style={{ width: "100px", height: "35px", margin: "20px 10px", borderRadius: "50px", backgroundColor: "var(--main-darkblue)", color: "var(--main-bg-gray)", border: "none" }}>關閉</button>
                    </div>
                </>
            )}
            <form action="" onSubmit={handleSubmit}>
                <div id="e5">
                    <div className="e5center">
                        <div className="e5up">
                            <div>G幣餘額</div>
                            <div>{gash}</div>
                        </div>
                        <div className="e5mid">
                            <DepositOption cost="300" gash="300" className={`${selectedOption === 300 ? 'selected' : ''}`} onClick={() => handleOptionClick(300)} />
                            <DepositOption cost="500" gash="500" className={`${selectedOption === 500 ? 'selected' : ''}`} onClick={() => handleOptionClick(500)} />
                            <DepositOption cost="1000" gash="1000" className={`${selectedOption === 1000 ? 'selected' : ''}`} onClick={() => handleOptionClick(1000)} />
                            <DepositOption cost="3000" gash="3030" className={`${selectedOption === 3000 ? 'selected' : ''}`} onClick={() => handleOptionClick(3000)} />
                            <DepositOption cost="5000" gash="5100" className={`${selectedOption === 5000 ? 'selected' : ''}`} onClick={() => handleOptionClick(5000)} />
                            <DepositOption cost="10000" gash="10250" className={`${selectedOption === 10000 ? 'selected' : ''}`} onClick={() => handleOptionClick(10000)} />
                            <DepositOption cost="20000" gash="20600" className={`${selectedOption === 20000 ? 'selected' : ''}`} onClick={() => handleOptionClick(20000)} />
                            <DepositOption cost="30000" gash="31000" className={`${selectedOption === 30000 ? 'selected' : ''}`} onClick={() => handleOptionClick(30000)} />
                            <DepositOption cost="50000" gash="52000" className={`${selectedOption === 50000 ? 'selected' : ''}`} onClick={() => handleOptionClick(50000)} />
                        </div>
                        <div className="e5down">
                            <div>G幣使用須知：
                            </div>
                            <ul>
                                <li>僅限扭蛋、抽賞使用</li>
                                <li>可用於網站內活動</li>
                            </ul>
                            <div>付款方式須知：</div>
                            <ul>
                                <li>依入款核實速度更新G幣</li>
                                <li>入款速度以金流供應商處理時間為主，Gachora不保證款項入款速度</li>
                                <li>若您對於入款速度有一定要求，請以信用卡為主</li>
                            </ul>
                        </div>
                        <div className="e5bottom">
                            <div>
                                <span><input name="policy" type="checkbox" id="c1" required /><label htmlFor="c1">&nbsp; 我已詳細閱讀並同意<span style={{ color: "rgba(var(--bs-link-color-rgb)", textDecoration: "underline", cursor: "pointer" }}>付款條款</span></label></span>
                                <span><input name="news" type="checkbox" id="c2" defaultChecked /><label htmlFor="c2">&nbsp; 訂閱Gachora收到最新資訊</label></span>
                            </div>
                            <br />
                            <button>儲值</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Deposit