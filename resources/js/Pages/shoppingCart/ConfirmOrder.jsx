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

    // console.log("商品" + item)
    // function handleCheckout(){
    //     console.log('123')
    // }
    // let county_id = localStorage.getItem("county_id")
    // console.log(county_id)
    // let user_id = localStorage.getItem("user_id")
    // console.log(user_id)
    // let road = localStorage.getItem("road")
    // console.log(road)
    // let phone = localStorage.getItem("phone")
    // console.log(phone)
    // let email = localStorage.getItem("email")
    // console.log(email)
    // let name = localStorage.getItem("name")
    // console.log(name)

    let itemIds = '';  // 儲存所有 item.id

    // 透過 map 提取 item.id 並存入變數
    if (items && items.length > 0) {
      items.forEach(item => {
        // itemIds.push(item.id);  // 存入 itemIds
        itemIds += item.id + ','
        return itemIds
        console.log(items)

      });  // 將每個 item 的 id 推入 itemIds 陣列
      itemIds = itemIds.slice(0,-1)
    }
    console.log('商品id' + itemIds)

    const handleCheckout = () => {
        // 從 localStorage 獲取數據
        const county_id = localStorage.getItem("county_id");
        const user_id = localStorage.getItem("user_id");
        const road = localStorage.getItem("road");
        const phone = localStorage.getItem("phone");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
    
        console.log("County ID:", county_id);
        console.log("User ID:", user_id);
        console.log("Road:", road);
        console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Name:", name);
    
        // 發送 POST 請求到 API
        const url = 'http://localhost/gachoraProject/app/Models/Post/Checkout.php';
        $.post(
          url,
          {
            user_id: user_id,
            county_id: county_id,
            road: road,
            title: " ", // 不一定要寫
            status_id: 12, // 常用的代碼
            phone: phone,
            email: email,
            method_id: 1, // 超商出貨
            record_ids: itemIds, // 從上面抓的
            name: name
          },
          (response) => {
            // CONSOLE.LOG(itemIds)
            console.log("API Response:", response);
          }
        ).fail((error) => {
          console.error("API Error:", error);
        });
      };

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
                                            <p>商品id{item.id}</p>
                                        </li>
                                        )
                                    )
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
                            {/* 之後去address那邊抓資料 */}
                            <div className="go">
                                <button onClick={previous}>◀︎上一步&nbsp;</button>
                                <button className="bgyellow" onClick={() => { complete(); handleCheckout(); }}>確認訂單✔︎</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ConfirmOrder