import React from 'react'

function CartStorage({itemId, clickToCart, imgsrc = "" }) {
    return (
        <div className="cardContainer">
            <img src={imgsrc} />
            <button onClick={()=> clickToCart(itemId)}><svg xmlns="http://www.w3.org/2000/svg" width="1.2vw" height="1.2vw" fill="currentColor"
                className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>&nbsp;加入出貨</button>
        </div>
    )
}

export default CartStorage