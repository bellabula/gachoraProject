import React from 'react';
import { useEffect } from 'react';

function MyOrder({id}) {

    useEffect(()=>{
        // 取得今天的日期，並格式化為 YYYY-MM-DD
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
    
        // #memberOrder
        $("#memberOrder .orderStartDate").prop("max", formattedDate)
        $("#memberOrder .orderEndDate").prop("max", formattedDate)
    
        $("#memberOrder .orderStartDate").on("input", () => {
            $("#memberOrder .orderStartText").val($("#memberOrder .orderStartDate").val())
            $("#memberOrder .orderEndDate").prop("min", $("#memberOrder .orderStartDate").val())
        })
        $("#memberOrder .orderEndDate").on("input", () => {
            $("#memberOrder .orderEndText").val($("#memberOrder .orderEndDate").val())
            $("#memberOrder .orderStartDate").prop("max", $("#memberOrder .orderEndDate").val())
        })
    
        $(document).on('click', function (event) {
            const classFilterList = [$('#memberWallet .classFilter'), $($('#memberWallet .itemFilter')[0]), $($('#memberWallet .itemFilter')[1])]
            // 檢查點擊是否發生在目標元素外部
            classFilterList.forEach(element => {
                if (!element.is(event.target) && element.has(event.target).length === 0) {
                    element.css('visibility', 'hidden');
                }
            })
        });
    
        const filerBtnList = [
            [$("#memberWallet .classFilterBtn"), $("#memberWallet .classFilter")],
            [$($('#memberWallet .itemFilterBtn')[0]), $($('#memberWallet .itemFilter')[0])],
            [$($('#memberWallet .itemFilterBtn')[1]), $($('#memberWallet .itemFilter')[1])]
        ]
        filerBtnList.forEach(element => {
            element[0].click(() => {
                event.stopPropagation();
                element[1].css("visibility", "visible")
            })
        });
    })

    return (
        <>
            {/* <!-- 5. 我的訂單 --> */}
            <div id={id} className="tab-pane">
                <p className="h1 d-inline-block me-3">我的訂單</p>
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
                    <form className="mb-3">
                        <label htmlFor="orderNumber">訂單查詢</label>
                        <input id="orderNumber" type="text" className="rounded-1" placeholder="請輸入訂單編號" />&ensp;<input
                            type="submit" className="rounded-1" />
                    </form>
                    <table className="w-100 text-center">
                        <thead>
                            <tr className="border-0">
                                <th className="text-start">訂單編號</th>
                                <th>訂單時間</th>
                                <th>處理狀態</th>
                                <th>物流</th>
                                <th>訂單詳情</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-start">2024112200348</td>
                                <td>2024/11/22</td>
                                <td>待出貨</td>
                                <td>宅配</td>
                                <td><a href="">明細</a></td>
                            </tr>
                            <tr>
                                <td className="text-start">2024101000331</td>
                                <td>2024/10/10</td>
                                <td>已出貨</td>
                                <td>7-11</td>
                                <td><a href="">明細</a></td>
                            </tr>
                            <tr>
                                <td className="text-start">2024071800241</td>
                                <td>2024/07/18</td>
                                <td>已取貨</td>
                                <td>宅配</td>
                                <td><a href="">明細</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MyOrder