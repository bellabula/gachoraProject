import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react';
import MyStorageItem from './MyStorageItem';

function MyStorage({ id, className="" }) {

    // function Storage({ stock }) {
    //     let [count, setNumb] = React.useState(0)
    //     function handleClickDec() { setNumb(count > 0 ? count - 1 : count) }
    //     function handleClickInc() { setNumb(count < { stock } ? count + 1 : count) }
    // }

    const user = usePage().props.auth.user;
    let user_id = user.id;

    const [storageItem, setStorageItem] = useState([]);
    const [rerender, setRerender] = useState(0);

    useEffect(() => {
        const urlStorage = '../app/Models/Post/UserBag.php'
        $.post(urlStorage, {
            user_id: user_id
        }, (response) => {
            // console.log("戰利儲藏庫 : " + response)
            setStorageItem(response)
        })
    }, [rerender])


    useEffect(() => {
        // 增加按鈕點擊事件
        // $('#member .btn-increase').on('click', function () {
        //     let input = $(this).siblings('input');
        //     let currentValue = parseInt(input.val());
        //     if (currentValue < $(this).parent().parent().parent().children().eq(4).text()) {
        //         input.val(currentValue + 1);
        //     }
        // });

        // 減少按鈕點擊事件
        // $('#member .btn-decrease').on('click', function () {
        //     let input = $(this).siblings('input');
        //     let currentValue = parseInt(input.val());
        //     if (currentValue > 0) {
        //         input.val(currentValue - 1);
        //     }
        // });

        // 篩選器
        // 點擊篩選按鈕後出現篩選區塊
        $("#memberStore .classFilterBtn").click(() => {
            event.stopPropagation();
            $("#memberStore .classFilter").css("visibility", "visible")
        })
        // 點擊篩選區塊外任意區域，篩選區塊消失
        $(document).on('click', function (event) {
            const storeFilter = $('#memberStore .classFilter')
            // 檢查點擊是否發生在目標元素外部
            if (!storeFilter.is(event.target) && storeFilter.has(event.target).length === 0) {
                storeFilter.css('visibility', 'hidden');
            }
        });
    });

    function handleToCart(recordId) {
        const url = '../app/Models/Post/ChangeToCart.php'
        $.post(url, {
            record_id: recordId
        }, (response) => {
            // console.log('ToCart：', response)
        })
        setRerender((prev) => prev + 1)
        // console.log("ToCart:" + rerender)
    }
    function handleToG(recordId) {
        const url = '../app/Models/Post/ChangeToG.php'
        $.post(url, {
            record_id: recordId
        }, (response) => {
            // console.log('ToG：', response)
        })
        setRerender((prev) => prev + 1)
        // console.log("ToG:" + rerender)
    }

    return (
        <>
            {/* <!-- 3. 戰利儲藏庫 --> */}
            <div id={id} className={"tab-pane " + className}>
                <h1>戰利儲藏庫</h1>
                <div>
                    {/* {response.map((v, index) => {
                        <p>v</p>
                    })} */}
                </div>
                <div className="container my-5">
                    <div className="inventory-container">
                        <table className="w-100 text-center">
                            <thead>
                                <tr className="border-0">
                                    <th className="text-start">商品圖片</th>
                                    <th className="text-start">商品名稱</th>
                                    <th>賞別</th>
                                    <th>系列</th>
                                    <th>擁有數量</th>
                                    <th>抽扭日期</th>
                                    {/* <th>選取數量</th> */}
                                    <th>兌換G幣</th>
                                    <th className="position-relative">
                                        <div className="d-flex align-items-center justify-content-center">
                                            幫我出貨
                                            <button className="position-absolute classFilterBtn"
                                                style={{ borderRadius: "5px", right: "-15px" }}>+</button>
                                            <div className="position-absolute classFilter"
                                                style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-bg-gray)", color: "black", right: "-130px", bottom: "-150px" }}>
                                                <form action="">
                                                    <input type="checkbox" defaultChecked /> 商品圖片 <br />
                                                    <input type="checkbox" defaultChecked /> 商品名稱 <br />
                                                    <input type="checkbox" defaultChecked /> 賞別 <br />
                                                    <input type="checkbox" defaultChecked /> 系列 <br />
                                                    <input type="checkbox" defaultChecked /> 抽/扭日期 <br />
                                                    <input type="checkbox" defaultChecked /> 用有數量 <br />
                                                </form>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            {/* 儲藏資料 */}
                            <tbody>
                                {storageItem.map((v, index) => (
                                    <MyStorageItem recordId={v.id} itemName={v.name} amount="1" series={v.series} gift={v.gift} prize={v.prize} src={v.img} getDate={v.time} clickToCart={handleToCart} clickToG={handleToG} index={index} key={index} />
                                ))}
                            </tbody>
                        </table>
                        {storageItem.length == 0 ? <h4 className='text-center mt-5 pt-5 pb-5'>目前儲藏庫沒有商品...</h4> : ""}
                    </div>
                    <p className="note mt-4">商品取貨規則：</p>
                    <ul>
                        <li>單筆寄送僅接受一次選擇。</li>
                        <li>以超商寄取，單筆記錄依 7-11 寄付規定。</li>
                        <li>若商品在聯絡時間3個月後仍未處理，則會「自動兌換成對應G幣」。</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MyStorage