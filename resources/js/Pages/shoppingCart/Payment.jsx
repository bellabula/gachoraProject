import React, { useEffect, useState } from 'react'
// import StoreSelector from './StoreSelector ';
import { usePage } from '@inertiajs/react';
// import CityDropdown from './CityDropdown ';
// import CountryDropdown from './CountryDropdown';


function Checkout({ id, display = "block" }) {

    function checkBill() {
        $("#e21").css("display", "none")
        $("#e3").css("display", "block")
    }

    function previous() {
        $("#e21").css("display", "none")
        $("#e1").css("display", "grid")
    }

    const [userInfo, setUserInfo] = useState({});

    const user = usePage().props.auth.user;
    let user_id = user.id
    // let basePath = '../../../app/Models'
    useEffect(() => {
        const url = 'http://localhost/gachoraProject/app/Models/Post/Userinfo.php'
        $.post(url, {
            user_id
        }, (response) => {
            // console.log('會員資料：', response)
            setUserInfo(response)
        })
    }, [user_id]
    )
    // console.log('userinfo:',(userInfo[0] != undefined)? userInfo[0].name : userInfo.name)
    localStorage.setItem("user_id", user_id)

    // 抓縣市&鄉鎮區
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState();
    const [selectedCountyId, setSelectedCountyId] = useState();
    const [error, setError] = useState("");


    const selectStyle = {
        borderColor: 'var(--main-darkblue)',
        borderRadius: '10px',
        height: '3vw',
        marginTop: '1vw'
    };

    const inputStyle = {
        borderColor: 'var(--main-darkblue)',
        borderRadius: '10px',
        height: '3vw',
        marginTop: '1vw',
        padding: '1vw'
    };

    useEffect(() => {
        fetch("http://localhost/gachoraProject/app/Models/Fetch/AllCity.php")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                if (data.error) {
                    setError(data.error);
                    console.error("API Error:", data.error);
                } else {
                    setCities(data); // 設定縣市數據
                }
            })
    }, []);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        console.log(cityId)
        setSelectedCityId(cityId); // 設定選擇的城市 ID
    };

    useEffect(() => {
        if (selectedCityId) {
            fetch("http://localhost/gachoraProject/app/Models/Fetch/AllCounty.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `city_id=${selectedCityId}`, // 使用 URL 編碼的請求
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    if (data.error) {
                        setError(data.error);
                        console.error("API Error:", data.error);
                    } else {
                        setCounties(data); // 設定鄉鎮數據
                    }
                })
                .catch((error) => console.error("Fetch error:", error));
        }
    }, [selectedCityId]); // selectedCityId 應作為依賴陣列

    const handleCountryChange = (event) => {
        const countyId = event.target.value;
        console.log(countyId)
        setSelectedCountyId(countyId)
        localStorage.setItem("county_id", countyId)
    }
    // 抓縣市&鄉鎮區 結束

    // 選擇門市 開始
    const [storeInfo, setStoreInfo] = useState(''); // 用來儲存選擇的門市資訊

    const handleStreetChange = (event) => {
        const selectedStreet = event.target.value;
        if (selectedStreet === '昌進門市') {
            setStoreInfo(
                '昌進門市\n台中市南屯區大進街387號1樓'
            );
            localStorage.setItem("ppp", '387號1樓')
        } else {
            setStoreInfo('');
        }
    };
    // 選擇門市 結束

    // 取街道的值
    const handleRoadChange = (event) => {
        const roadValue = event.target.value; // 獲取輸入框的值
        localStorage.setItem("road", roadValue); // 將值存入 localStorage
        console.log("roadValue:", roadValue);
    };

    // 取名字的值
    const [name, setName] = useState("");

    useEffect(() => {
        // 從 userInfo 或 localStorage 取得初始值
        const initialName = userInfo[0]?.name || localStorage.getItem("name") || "";
        setName(initialName); // 設定初始值到 state
        if (userInfo[0]?.name) {
            localStorage.setItem("name", userInfo[0].name); // 儲存到 localStorage
        }
    }, [userInfo]);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName); // 更新狀態
        localStorage.setItem("name", newName); // 更新 localStorage
    };

    // 取電話的值
    const [phone, setPhone] = useState("");

    useEffect(() => {
        // 檢查userInfo[0]?.phone，否則從 localStorage 加載
        const initialPhone = userInfo[0]?.phone || localStorage.getItem("phone") || "";
        setPhone(initialPhone); // 設置初始值
    }, [userInfo]); // 當 userInfo 變更時重新執行

    const handlePhoneChange = (event) => {
        const newPhone = event.target.value;
        setPhone(newPhone); // 更新狀態
        localStorage.setItem("phone", newPhone); // 存入 localStorage
    };

    // 取信箱的值
    const [email, setEmail] = useState("");

    useEffect(() => {
        // 從 userInfo 或 localStorage 取得初始值
        const initialEmail = userInfo[0]?.email || localStorage.getItem("email") || "";
        setEmail(initialEmail); // 設定初始值到 state
        if (userInfo[0]?.email) {
            localStorage.setItem("email", userInfo[0].email); // 儲存到 localStorage
        }
    }, [userInfo]);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail); // 更新狀態
        localStorage.setItem("email", newEmail); // 更新 localStorage
    };

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
                                <input name="delivery" type="radio" value="0" id="d1" checked={true}
                                    readOnly /><label htmlFor="d1" >7-11取貨</label>
                                <hr />
                                {/* <input name="delivery" type="radio" value="1" id="d2" /><label htmlFor="d2" >全家取貨</label>
                                <hr />
                                <input name="delivery" type="radio" value="2" id="d3" /><label htmlFor="d3">宅配取貨</label> */}
                            </div>
                            <div className="detail">取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。</div>
                        </div>
                        <div className="e2_group">
                            <div className="title">選擇付款方式</div>
                            <div className="text">
                                <input name="pay" type="radio" value="0" id="p1" checked={true}
                                    readOnly /><label htmlFor="p1">貨到付款</label>
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

                                {/*開始 抓縣市&鄉鎮區*/}
                                <div>
                                    {/* 城市下拉選單 */}
                                    <span>請選擇縣市：</span>
                                    <select id="cityDropdown" onChange={handleCityChange} value={selectedCityId} style={selectStyle}>
                                        <option value="">請選擇</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                    <br />
                                    {/* 顯示鄉鎮下拉選單 */}
                                    <span>請選擇鄉、鎮、市、區：</span>
                                    <select id="countyDropdown" onChange={handleCountryChange} value={selectedCountyId} style={selectStyle}>
                                        <option value="">
                                            請選擇
                                        </option>
                                        {counties.map((county) => (
                                            <option key={county.id} value={county.id}>
                                                {county.county}
                                            </option>
                                        ))}
                                    </select>

                                    <br />
                                    <span>請選擇街道：
                                        <select name="" id="" onClick={handleRoadChange} style={selectStyle}>
                                            <option value="">請選擇</option>
                                            <option value="大進街">大進街</option>
                                            <option value="大業路">大業路</option>
                                            <option value="大墩10街">大墩10街</option>
                                            <option value="大墩6街">大墩6街</option>
                                            <option value="大墩十一街">大墩十一街</option>
                                            <option value="大墩十七街">大墩十七街</option>
                                            <option value="大墩南路">大墩南路</option>
                                            <option value="大墩路">大墩路</option>
                                            <option value="工業區十八路">工業區十八路</option>
                                            <option value="中台路">中台路</option>
                                            <option value="五權西路二段">五權西路二段</option>
                                            <option value="五權西路三段">五權西路三段</option>
                                            <option value="公益路二段">公益路二段</option>
                                            <option value="文山路">文山路</option>
                                            <option value="文心南三路">文心南三路</option>
                                            <option value="文心南路">文心南路</option>
                                            <option value="永春北路">永春北路</option>
                                            <option value="永春東七路">永春東七路</option>
                                            <option value="永春東路">永春東路</option>
                                            <option value="永春南路">永春南路</option>
                                            <option value="向上南路一段">向上南路一段</option>
                                            <option value="向上路二段">向上路二段</option>
                                            <option value="向心南路">向心南路</option>
                                            <option value="忠勇路">忠勇路</option>
                                            <option value="東興路二段">東興路二段</option>
                                            <option value="河南路四段">河南路四段</option>
                                            <option value="保安十街">保安十街</option>
                                            <option value="南屯路二段">南屯路二段</option>
                                            <option value="楓和路">楓和路</option>
                                            <option value="萬和路一段">萬和路一段</option>
                                            <option value="精科路">精科路</option>
                                            <option value="精誠路">精誠路</option>
                                            <option value="黎明東街">黎明東街</option>
                                            <option value="黎明路一段">黎明路一段</option>
                                            <option value="黎明路二段">黎明路二段</option>
                                            <option value="嶺東南路">嶺東南路</option>
                                            <option value="嶺東路">嶺東路</option>
                                            <option value="環中路四段">環中路四段</option>
                                        </select>
                                    </span>
                                    {/* 錯誤訊息 */}
                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                </div>
                                {/*結束 抓縣市&鄉鎮區*/}

                                {/* <CityDropdown /> */}

                                {/*開始 門市選擇 */}
                                <div>
                                    請選擇門市：
                                    <select onChange={handleStreetChange} style={selectStyle}>
                                        <option value="">請選擇</option>
                                        <option sdf="387號1樓" value="昌進門市">昌進門市</option>
                                    </select>
                                    <div style={{ marginTop: '20px', whiteSpace: 'pre-line', }}>
                                        {storeInfo && (
                                            <>
                                                <strong>門市資訊：</strong>
                                                <p>{storeInfo}</p>
                                            </>
                                        )}
                                        {/* <p className="grey">取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。</p> */}
                                    </div>
                                </div>
                                {/*結束 門市選擇 */}

                                {/* <StoreSelector /> */}
                                {/* <button className="yellow">★選擇常用門市</button><br /> */}
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">會員資訊</div>
                            <div className="text nobg">
                                <br />
                                <p>姓名：{(userInfo[0] != undefined) ? userInfo[0].name : userInfo.name}</p>
                                <p>電話：{(userInfo[0] != undefined) ? userInfo[0].phone : userInfo.phone}</p>
                                <p>信箱：{(userInfo[0] != undefined) ? userInfo[0].email : userInfo.email}</p>
                            </div>
                        </div>
                        <div className="e2_group">
                            <div className="title">收件人資訊</div>
                            <div className="text nobg">
                                {/* <button>★常用收件人資訊</button><br /> */}
                                姓名：<input type="text" value={name} style={inputStyle} name="name" onChange={handleNameChange}/><br />
                                電話：<input type="text" value={phone} style={inputStyle} name="phone" onChange={handlePhoneChange} /><br />
                                信箱：<input type="text" value={email} style={inputStyle} name="email" onChange={handleEmailChange} /><br />
                                {/* 地址：<input type="text" defaultValue={(userInfo[0] != undefined) ? userInfo[0].address : ''} style={inputStyle} /><br /> */}
                                {/* 時間：<select name="" id="" style={selectStyle}>
                                    <option value="">任意</option>
                                    <option value="">早上(09:00~12:00)</option>
                                    <option value="">中午(12:00~17:00)</option>
                                    <option value="">晚上(17:00~21:00)</option>
                                </select> */}
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
                            <button onClick={previous}>◀︎上一步</button>
                            <button className="bg" onClick={checkBill}>下一步▶︎</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout