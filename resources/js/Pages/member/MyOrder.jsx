import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import MyOrderLog from './MyOrderLog';

function MyOrder({ id, className="" }) {

    useEffect(() => {
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

    const user = usePage().props.auth.user;
    let user_id = user.id

    const [orderLog, setOrderLog] = useState([]);

    useEffect(() => {
        let basePath = '../app/Models'
        const url = basePath + '/Post/UserLogistics.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            console.log('訂單：', response)
            setOrderLog(response)
        })
    }, [user_id])

    return (
        <>
            {/* <!-- 5. 我的訂單 --> */}
            <div id={id} className={"tab-pane " + className}>
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
                        <label htmlFor="orderNumber">訂單查詢</label> &nbsp;
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
                            {/* <MyOrderLog oId="GC16977356881" oDate="2024/11/22" oStatus="待出貨" dPath="宅配" /> */}
                            {orderLog.reverse().map((v, index)=>(
                                <MyOrderLog list_id={v.id} oId={v.no} oDate={v.time} oStatus={v.status} dPath={v.method} key={index}/>
                            ))}
                        </tbody>
                    </table>
                    {orderLog.length == 0 ? <h4 className='text-center mt-5 pt-5 pb-5'>目前沒有任何訂單紀錄...</h4>:""}
                </div>
            </div>
        </>
    )
}

export default MyOrder