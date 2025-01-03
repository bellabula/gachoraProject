import React, { useState, useRef, useEffect } from 'react'


function MyStorageItem({ recordId, itemName, amount, series, gift, getDate, index, clickToCart, clickToG, prize = "", src = "" }) {
    const [showModal, setShowModal] = useState(false); // 彈跳視窗

    const handleBigImg = () => {
        setShowModal(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showModal) {
                const modalContent = document.querySelector('.big-img');
                // 如果.big-name存在，且在 非 .bigName的地方點擊，放大的照片就消失 
                if (modalContent && !modalContent.contains(event.target)) {
                    setShowModal(false);
                }
            }
        };

        // 一個監聽事件，如果有click，handleClickOutside就啟動
        document.addEventListener('click', handleClickOutside, true);

        // 這個 return 是定義了一個清理函數，它會在組件卸載或依賴變數變化時執行。
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [showModal]);
    // 當 showModal 的值改變時，useEffect 會重新執行。
    return (
        <>
            <tr>
                <td className="text-start">
                    <span>{index + 1}. &emsp;</span>
                    <img src={src} alt="商品圖片" onClick={handleBigImg} />
                </td>
                <td className="text-start">{itemName}</td>
                <td>{prize}獎</td>
                <td>{series}</td>
                <td>{amount}</td>
                <td>{getDate}</td>
                {/* <td>

function MyStorageItem({recordId, itemName, amount, series, gift, getDate, index, clickToCart, clickToG, prize = "", src = "" }) {
    let uniDate = new Date(getDate).getTime()
    const expireDate = new Date(uniDate+2678400000).toISOString().split('T')[0] // .toISOString().slice(0, 10)
    return (
        <tr>
            <td className="text-start">
                <span>{index + 1}. &emsp;</span>
                <img src={src} alt="商品圖片" />
            </td>
            <td className="text-start">{itemName}</td>
            <td>{prize}獎</td>
            <td>{series}</td>
            <td>{amount}</td>
            <td>{getDate}</td>
            <td>{expireDate.replaceAll("-", "/")}</td>
            {/* <td>

                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-secondary btn-circle btn-decrease">-</button>
                    <input type="text" value="0" className="form-control mx-2 text-center"
                        style={{ width: "50px" }} readOnly />
                    <button className="btn btn-secondary btn-circle btn-increase">+</button>
                </div>
            </td> */}
                <td width="130px">
                    <button className="btn btn-exchange" onClick={() => clickToG(recordId)}>兌換{gift}G幣</button>
                </td>
                <td width="110px">
                    <button className="btn btn-deli" onClick={() => clickToCart(recordId)}>加入購物車</button>
                </td>
            </tr>
            {showModal && (
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
                }}>
                    <img src={src} className="big-img" style={{ width: '50%', height: '50%' }} />
                </div>
            )
            }
        </>
    )
}

export default MyStorageItem