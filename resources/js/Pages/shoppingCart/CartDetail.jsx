import React from 'react'

function CartDetail({itemName}) {
    return (
        <div className="itemContainer">
            <span className="character">{itemName}</span>
            <span className="amount float-end pe-2">數量: 1</span>
            <div className="cut"></div>
        </div>
    )
}

export default CartDetail