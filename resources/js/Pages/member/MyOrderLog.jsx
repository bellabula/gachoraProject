import React, { useState, useEffect } from 'react';

function MyOrderLog({list_id, oId, oDate, oStatus, dPath }) {
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
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>交易明細</h3>
                        <p><strong>訂單編號:</strong> {details.no}</p>
                        <p><strong>訂單時間:</strong> {details.time}</p>
                        <p><strong>處理狀態:</strong> {details.status}</p>
                        <p><strong>訂購人姓名:</strong>{details.name}</p>
                        <p><strong>送貨方式(付款方式):</strong>{details.method}</p>

                        <p><strong>收件門市代號:</strong></p>
                        <p><strong>收件門市名稱:</strong></p>

                        {details.address && (<p><strong>收件地址:</strong>{details.address}</p>)}
                        {details.deliver_time && (<p><strong>配送時間:</strong>{details.deliver_time}</p>)}

                        <button onClick={handleCloseModal}>關閉</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOrderLog;

