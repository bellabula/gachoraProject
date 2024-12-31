import React, { useEffect, useState } from 'react'
import MyWalletRecord from './MyWalletRecord';
import { usePage } from '@inertiajs/react';

function MyWallet({ id, className = "" }) {
    // 取得今天的日期，並格式化為 YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    useEffect(() => {
        $("#memberWallet .orderStartDate").prop("max", formattedDate)
        $("#memberWallet .orderEndDate").prop("max", formattedDate)

        $("#memberWallet .orderStartDate").on("input", () => {
            $("#memberWallet .orderStartText").val($("#memberWallet .orderStartDate").val())
            $("#memberWallet .orderEndDate").prop("min", $("#memberWallet .orderStartDate").val())
        })
        $("#memberWallet .orderEndDate").on("input", () => {
            $("#memberWallet .orderEndText").val($("#memberWallet .orderEndDate").val())
            $("#memberWallet .orderStartDate").prop("max", $("#memberWallet .orderEndDate").val())
        })
    })

    const gashLogSearch = () => {
        const searchSdate = $("#memberWallet .orderStartText").val()
        const searchEdate = $("#memberWallet .orderEndText").val()
        const searchLog = walletLogRaw.filter((ele)=>{
            return new Date(ele.date).getTime() > new Date(searchSdate).getTime() && new Date(ele.date).getTime()<new Date(searchEdate).getTime()
        })
        // console.log(searchLog)
        setWalletLog(searchLog)
    }
    const user = usePage().props.auth.user;
    let user_id = user.id

    const [walletLog, setWalletLog] = useState([]);
    const [walletLogRaw, setWalletLogRaw] = useState([]);
    useEffect(() => {
        let basePath = '../app/Models'
        const url = basePath + '/Post/UserWallet.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            // console.log('交易紀錄：')
            // console.log(response)
            response = response.filter((ele)=>(new Date(ele.date).getTime()<today.getTime()))
            // console.log(response)
            response[0]["gashRemain"] = response[0].price * response[0].amount
            for (let i = 1; i<response.length; i++) {
                response[i]["gashRemain"] = response[i-1].gashRemain + response[i].price * response[i].amount
            }
            setWalletLog(response)
            setWalletLogRaw(response.reverse())
        })
    }, [user_id])



    return (
        <>
            {/* <!-- 4. 我的錢包 --> */}
            <div id={id} className={"tab-pane " + className}>
                <p className="h1 d-inline-block me-3">G幣交易紀錄</p>
                {/* <form className="d-inline-block"> */}
                    <input className="date-input orderStartText" type="text" placeholder="起始日" readOnly />
                    <span className="datepicker-toggle">
                        <span className="datepicker-toggle-button"></span>
                        <input type="date" className="datepicker-input orderStartDate" />
                    </span>
                    <span> ~ </span>
                    <input className="date-input orderEndText" type="text" placeholder="結束日" readOnly />
                    <span className="datepicker-toggle">
                        <span className="datepicker-toggle-button"></span>
                        <input type="date" className="datepicker-input orderEndDate" />
                    </span>
                    <button className="rounded-1" onClick={gashLogSearch}>查詢</button>
                {/* </form> */}
                <hr />
                <div>
                    <table className="w-100 text-center">
                        <thead>
                            <tr className="text-center border-0">
                                <th className="text-start">交易日期</th>
                                <th>物品</th>
                                <th className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center">
                                        類型 &ensp;
                                        {/* <button className="itemFilterBtn">⋯</button> */}
                                    </div>
                                    {/* <div className="position-absolute itemFilter"
                                        style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-darkblue)", color: "white", right: "-50px", bottom: "-110px" }}>
                                        <form action="">
                                            <input type="checkbox" defaultChecked /> 扭蛋 <br />
                                            <input type="checkbox" defaultChecked /> 一番賞 <br />
                                            <input type="checkbox" defaultChecked /> 訂單 <br />
                                            <input type="checkbox" defaultChecked /> 生日禮 <br />
                                        </form>
                                    </div> */}
                                </th>
                                <th>數量</th>
                                <th>總計</th>
                                <th className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center">
                                        付款方式 &ensp;
                                        {/* <button className="itemFilterBtn">⋯</button> */}
                                    </div>
                                    {/* <div className="position-absolute itemFilter"
                                        style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-darkblue)", color: "white", right: "-50px", bottom: "-110px" }}>
                                        <form action="">
                                            <input type="checkbox" defaultChecked /> G 幣 <br />
                                            <input type="checkbox" defaultChecked /> 信用卡 <br />
                                            <input type="checkbox" defaultChecked /> 轉帳 <br />
                                            <input type="checkbox" defaultChecked /> 超商付款 <br />
                                        </form>
                                    </div> */}
                                </th>
                                <th>G 幣變更</th>
                                <th className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center">
                                        G 幣餘額
                                        {/* <button className="position-absolute classFilterBtn"
                                            style={{ borderRadius: "5px", right: "-15px" }}>+</button> */}
                                    </div>
                                    {/* <div className="position-absolute classFilter"
                                        style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-darkblue)", color: "white", right: "-130px", bottom: "-190px" }}>
                                        <form action="">
                                            <input type="checkbox" defaultChecked /> 交易日期 <br />
                                            <input type="checkbox" defaultChecked /> 物品 <br />
                                            <input type="checkbox" defaultChecked /> 類型 <br />
                                            <input type="checkbox" defaultChecked /> 數量 <br />
                                            <input type="checkbox" defaultChecked /> 總計 <br />
                                            <input type="checkbox" defaultChecked /> 付款方式 <br />
                                            <input type="checkbox" defaultChecked /> G幣變更 <br />
                                            <input type="checkbox" defaultChecked /> G幣餘額 <br />
                                        </form>
                                    </div> */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {walletLog.map((v, index) => (
                                <MyWalletRecord key={index} rDate={v.date} rItem={v.item} rCate={v.category} rPrice={v.price} rAmount={v.amount} rTotal={v.gashRemain}/>
                            ))}
                        </tbody>
                    </table>
                    {walletLog.length == 0 ? <h4 className='text-center mt-5 pt-5 pb-5'>沒有任何交易紀錄...</h4>:""}
                </div>
            </div>
        </>
    )
}

export default MyWallet