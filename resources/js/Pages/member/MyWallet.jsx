import React from 'react'
import { useEffect } from 'react';

function MyWallet({id}) {
    // 取得今天的日期，並格式化為 YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    useEffect(()=>{
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


    return (
        <>
            {/* <!-- 4. 我的錢包 --> */}
            <div id={id} className="tab-pane">
                <p className="h1 d-inline-block me-3">G幣交易紀錄</p>
                <form className="d-inline-block">
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
                    <button className="rounded-1">查詢</button>
                </form>
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
                                        <button className="itemFilterBtn">⋯</button>
                                    </div>
                                    <div className="position-absolute itemFilter"
                                        style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-darkblue)", color: "white", right: "-50px", bottom: "-110px" }}>
                                        <form action="">
                                            <input type="checkbox" defaultChecked /> 扭蛋 <br />
                                            <input type="checkbox" defaultChecked /> 一番賞 <br />
                                            <input type="checkbox" defaultChecked /> 訂單 <br />
                                            <input type="checkbox" defaultChecked /> 生日禮 <br />
                                        </form>
                                    </div>
                                </th>
                                <th>數量</th>
                                <th>總計</th>
                                <th className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center">
                                        付款方式 &ensp;
                                        <button className="itemFilterBtn">⋯</button>
                                    </div>
                                    <div className="position-absolute itemFilter"
                                        style={{ visibility: "hidden", padding: "5px", textAlign: "left", border: "1px solid var(--main-darkblue)", borderRadius: "5px", backgroundColor: "var(--main-darkblue)", color: "white", right: "-50px", bottom: "-110px" }}>
                                        <form action="">
                                            <input type="checkbox" defaultChecked /> G 幣 <br />
                                            <input type="checkbox" defaultChecked /> 信用卡 <br />
                                            <input type="checkbox" defaultChecked /> 轉帳 <br />
                                            <input type="checkbox" defaultChecked /> 超商付款 <br />
                                        </form>
                                    </div>
                                </th>
                                <th>G 幣變更</th>
                                <th className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center">
                                        G 幣餘額
                                        <button className="position-absolute classFilterBtn"
                                            style={{ borderRadius: "5px", right: "-15px" }}>+</button>
                                    </div>
                                    <div className="position-absolute classFilter"
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
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-start">2024/11/20</td>
                                <td>XXX扭蛋</td>
                                <td>扭蛋</td>
                                <td>10</td>
                                <td>G 1,200</td>
                                <td>G 幣</td>
                                <td>-G 1200</td>
                                <td>G 1,650</td>
                            </tr>
                            <tr>
                                <td className="text-start">2024/11/20</td>
                                <td>XXX扭蛋</td>
                                <td>扭蛋</td>
                                <td>10</td>
                                <td>G 1,200</td>
                                <td>G 幣</td>
                                <td>-G 1200</td>
                                <td>G 1,650</td>
                            </tr>
                            <tr>
                                <td className="text-start">2024/11/20</td>
                                <td>XXX扭蛋</td>
                                <td>扭蛋</td>
                                <td>10</td>
                                <td>G 1,200</td>
                                <td>G 幣</td>
                                <td>-G 1200</td>
                                <td>G 1,650</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MyWallet