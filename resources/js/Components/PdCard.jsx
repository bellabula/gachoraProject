import React, { useState } from 'react';


// import React from 'react'


function PdCard({ pdName, pdQuantity, pdTotal, pdPrice, pdDraw, pdAvailable, aPrizeName, bPrizeName, cPrizeName, img = '' }) {

    const [isActive, setIsActive] = useState(false);
    const [newclass, setNewclass] = useState("")

    function toogleHeart() {
        if (!isActive) {
            setNewclass("active")
        } else {
            setNewclass("")
        }
        setIsActive(!isActive)
    }



    return (
        <div id='pdcard'>
            <div className="cards">
                <div className="product-card">
                    <div className="heart-icon" >
                        <img className={"heart " + newclass} onClick={toogleHeart} src='http://localhost/gachoraProject/public/images/heart.svg'></img>
                    </div>
                </div>
                <div className="product-image">
                    <img src={img} alt="商品圖片" />
                </div>
                {/* <!-- 價格與獎品資訊 --> */}
                <div className="price-info">
                    <div className="details">
                        <ul>
                            <li>A賞：{aPrizeName}</li>
                            <li>B賞：{bPrizeName}</li>
                            <li>C賞：{cPrizeName}</li>
                        </ul>
                    </div>
                    <div className="price-row">
                        <h4>NT${pdPrice}/{pdDraw}</h4>
                        <p>{pdQuantity}/{pdTotal}<br />{pdAvailable}</p>
                    </div>
                </div>
                {/* <!-- 商品名稱 --> */}
                <div>
                    <h3 className="product-name">商品名稱</h3>
                </div>
            </div>
        </div >

    );
}


// const PdCard = ({ imageSrc, productName, price, totalCount, remainingPrize, awards }) => {
//     const [isHeartActive, setHeartActive] = useState(false);

//     const toggleHeart = () => {
//         setHeartActive(!isHeartActive);
//     };

// };

export default PdCard;