import React, { useState } from 'react';
import { Link } from '@inertiajs/react';


// import React from 'react'


function PdCard({ seriesId, pdTitle, pdName, pdQuantity, pdTotal, pdPrice, pdAvailable, aPrizeName, bPrizeName, cPrizeName, img = '', aRemain, aTotal, bRemain, bTotal, cRemain, cTotal }) {

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
                    <Link href={route('lottrydetail', { seriesId: seriesId })}>
                        <img src={img} alt="Product" className="product-card" />
                    </Link>
                    <div className="heart-icon" >
                        <img className={"heart " + newclass} onClick={toogleHeart} src='http://localhost/gachoraProject\public\images\heart.svg'></img>
                    </div>
                </div>
                {/* <!-- 價格與獎品資訊 --> */}
                <div className="price-info">
                    <div className="details">
                        <ul>
                            <li>A賞：{aPrizeName}&nbsp;&nbsp;{aRemain}/{aTotal}</li>
                            <li>B賞：{bPrizeName}&nbsp;&nbsp;{bRemain}/{bTotal}</li>
                            <li>C賞：{cPrizeName}&nbsp;&nbsp;{cRemain}/{cTotal}</li>
                        </ul>
                    </div>
                    <div className="price-row">
                        <h4>NT${pdPrice}/抽</h4>
                        <p>{pdQuantity}/{pdTotal}<br />{pdAvailable}</p>
                    </div>
                </div>
                {/* <!-- 商品名稱 --> */}
                <h5 className="product-name">{pdTitle}</h5>
                <h3 className="product-name">{pdName}</h3>
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
