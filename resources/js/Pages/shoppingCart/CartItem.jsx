import React from 'react'

function CartItem({ itemId, seriesName, itemName, clickToStorage, amount = 1, imgsrc = "" }) {
    return (
        <div className="checkoutItem">
            <img src={imgsrc} />
            <div className="checkoutItemDetail">
                <div>{seriesName}</div>
                <div>{itemName}</div>
                <div>數量: {amount}</div>
                <button onClick={()=>{clickToStorage(itemId)}}>下次再出貨</button>
            </div>
        </div>
    )
}

export default CartItem