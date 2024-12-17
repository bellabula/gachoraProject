import React, { useEffect, useState } from 'react'
import { usePage, Link } from '@inertiajs/react';

function GachaPdCard({ seriesId, seriesName, productName, productPrice, userFavor, className = '', img = '' }) {

    const user = usePage().props.auth.user;
    const user_id = user.id

    const basePath = '../app/Models'
    const url = basePath + '/Post/ToCollection.php'

    const [isActive, setIsActive] = useState(false);
    const [newclass, setNewclass] = useState("");

    useEffect(() => {
        if (userFavor.includes(seriesId)) {
            setIsActive(true)
            setNewclass("active")
        }
    }, [user_id])

    function toogleHeart() {
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
    }

    return (
        <>
            <div className={"gachaPDCard " + className} id='gachaPDCard'>
                <div className="product-card" style={{ backgroundImage: `url(${img})` }}>
                    <div className="heart-icon">
                        <img className={"heart " + newclass} onClick={toogleHeart} src='http://localhost/gachoraProject\public\images\heart.svg'></img>
                    </div>
                    <Link href={route('gachadetail', { seriesId: seriesId })}>
                        <img src={img} style={{ width: "100%", height: "100%", borderRadius: "50px", position: "relative" }} />
                    </Link>
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
