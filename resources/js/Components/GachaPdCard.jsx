import React, { useEffect, useState } from 'react'

function GachaPdCard({ seriesName, productName, productPrice, className = '', img = '' }) {

    const [isActive, setIsActive] = useState(false);
    const [newcalss, setNewclass] = useState("")

    function toogleHeart() {
        if (!isActive) {
            setNewclass("active")
        } else {
            setNewclass("")
        }
        setIsActive(!isActive)
    }


    return (
        <>
                <div className={"gachaPDCard " + className}>
                    <div className="product-card" style={{ backgroundImage: `url(${img})` }}>
                        <div className="heart-icon" >
                            <img className={"heart " + newcalss} onClick={toogleHeart} src='http://localhost/gachoraProject\public\images\heart.svg'></img>
                        </div>
                    </div>
                    {/* <!-- 商品名稱 --> */}
                    <h5 className="product-name">{seriesName}</h5>
                    <h5 className="product-name">{productName}</h5>
                    <h2 className="product-name">{productPrice}</h2>
                </div>
        </>
    )
}

export default GachaPdCard