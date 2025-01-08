import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';


// import React from 'react'


function PdCard({ seriesId, userFavor, series, prize, setIsLoginAlertOpen, img = '' }) {
    const user = usePage().props.auth.user;

    const basePath = '../app/Models'
    const url = basePath + '/Post/ToCollection.php'

    const [isActive, setIsActive] = useState(false);
    const [newclass, setNewclass] = useState("");

    let user_id = null
    if (user) {
        user_id = user.id
        // setUserId(user.id)
        useEffect(() => {
            if (userFavor.includes(seriesId)) {
                setIsActive(true)
                setNewclass("active")
            }
        }, [user_id])
    }
    function toogleHeart() {
        if (user_id) {
            $.post(url, {
                user_id: user_id,
                series_id: seriesId
            })
            if (!isActive) {
                setNewclass("active")
            } else {
                setNewclass("")
            }
            setIsActive(!isActive)
        } else {
            setIsLoginAlertOpen(true)
            // alert("請先登入")
        }
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
                            <li>A賞：{prize?.[0]?.name || ""}&nbsp;&nbsp;{prize?.[0]?.remain || 0}/{prize?.[0]?.total || 0}</li>
                            <li>B賞：{prize?.[1]?.name || ""}&nbsp;&nbsp;{prize?.[1]?.remain || 0}/{prize?.[1]?.total || 0}</li>
                            <li>C賞：{prize?.[2]?.name || ""}&nbsp;&nbsp;{prize?.[2]?.remain || 0}/{prize?.[2]?.total || 0}</li>
                        </ul>
                    </div>
                    <div className="price-row">
                        <h4>NT${series.price}/抽</h4>
                        <p>{series.remain}/{series.total}<br />{prize[0].remain+prize[1].remain+prize[2].remain >= 0 ? "尚有大賞" : "大賞已釋出"}</p>
                    </div>
                </div>
                {/* <!-- 商品名稱 --> */}
                <h5 className="product-name">{series.title}</h5>
                <h3 className="product-name">{series.name}</h3>
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
