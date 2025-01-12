import React, { useEffect, useState } from 'react'
import { usePage, Link } from '@inertiajs/react';
// import { useFloatingPanel } from '@headlessui/react/dist/internal/floating';

function GachaPdCard({ seriesId, seriesName, productName, productPrice, userFavor, setIsLoginAlertOpen, className = '', img = '' }) {

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
        }, [userFavor, user_id])
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
        }
    }

    return (
        <>
            <div className={"gachaPDCard " + className} id='gachaPDCard'>
                <div className="product-card" style={{ backgroundImage: `url(${img})` }}>
                    <div className="heart-icon">
                        <img className={"heart " + newclass} onClick={toogleHeart} src='http://localhost/gachoraProject\public\images\heart.svg'></img>
                    </div>
                    <Link href={route('gachadetail', { seriesId: seriesId })}>
                        <img src={img} style={{ width: "100%", height: "100%", borderRadius: "50px", position: "relative", objectFit: "cover" }} />
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
