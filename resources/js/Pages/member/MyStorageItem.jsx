import React from 'react'

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
                <button className="btn btn-exchange" onClick={()=>clickToG(recordId)}>兌換{gift}G幣</button>
            </td>
            <td width="110px">
                <button className="btn btn-deli" onClick={()=>clickToCart(recordId)}>加入購物車</button>
            </td>
        </tr>
    )
}

export default MyStorageItem