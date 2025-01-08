import React, { useState, useEffect } from 'react';

function MyOrderLog({ list_id, oId, oDate, oStatus, dPath }) {
    const [showModal, setShowModal] = useState(false); // 彈跳視窗
    const [details, setDetails] = useState(null); // 交易明細項目




    const handleDetailClick = () => {

        let basePath = '../app/Models'
        const url = basePath + '/Post/LogisticsDetail.php'
        // console.log(list_id)
        $.post(url, {
            list_id: list_id
        }, (response) => {
            // console.log(response)
            setDetails(response)
        })
        setShowModal(true); // 彈跳視窗
    };

    const handleCloseModal = () => {
        setShowModal(false); // 關閉彈跳視窗
        setDetails(null); // 清除交易明細
    };

    return (
        <>
            <tr>
                <td className="text-start">{oId}</td>
                <td>{oDate}</td>
                <td>{oStatus}</td>
                <td>{dPath}</td>
                <td>
                    {/* preventDefault() 讓他不會跳到別的網頁 */}
                    <a href="#" onClick={(e) => { e.preventDefault(); handleDetailClick(); }}>
                        明細
                    </a>
                </td>
            </tr>
            {showModal && details && (
                <div className="modal-overlay" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div className="modal-content" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white'
                    }}>
                        <h3>交易明細</h3>
                        <div style={{ backgroundColor: 'white', color: 'black', padding: '2vw', borderRadius: '2vw', textAlign: 'left' }}>
                            <p><strong>訂單編號:</strong> {details.no}</p>
                            <p><strong>訂單時間:</strong> {details.time}</p>
                            <span><strong>商品內容:</strong></span><br />
                            {details.products.map((ele, index) => (
                                // .map() 方法的返回值需要有一個單一的父節點，能夠包裹住所有的子內容。
                                <React.Fragment key={index}>
                                    <span>{ele.name} x {ele.amount} &nbsp;</span>
                                    {(index + 1) % 3 === 0 && <br />} 
                                    {/* 超過三個就換行 */}
                                </React.Fragment>
                            ))}
                            <br /><br />
                            <p><strong>處理狀態:</strong> {details.status}</p>
                            <p><strong>訂購人姓名:</strong>{details.name}</p>
                            <p><strong>送貨方式(付款方式):</strong>{details.method}</p>
                            <p><strong>運費:</strong>$39</p>

                            <p><strong>收件門市代號:</strong>273813</p>
                            {/* <p><strong>收件門市名稱:</strong>昌進門市</p> */}

                            {details.address && (<p><strong>收件地址:</strong>{details.address + '(昌進門市)'}</p>)}
                            {/* {details.deliver_time && (<p><strong>配送時間:</strong>{details.deliver_time}</p>)} */}

                        </div>
                        <button onClick={handleCloseModal} style={{ backgroundColor: "var(--main-yellow)", color: "black", borderRadius: '35px', width: '9vw', marginTop: '1vw' }}>關閉</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOrderLog;

