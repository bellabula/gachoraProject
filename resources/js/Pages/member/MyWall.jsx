import React, { useEffect, useState } from 'react'
import MyWallGacha from './MyWallGacha'
import { usePage } from '@inertiajs/react';

function MyWall({ id, className = "" }) {
    const user = usePage().props.auth.user;
    let user_id = user.id;

    const [gachaItem, setgachaItem] = useState([]);
    const [ichibanItem, setichibanItem] = useState([]);
    useEffect(() => {
        const urlWall = '../app/Models/Post/UserWall.php'
        $.post(urlWall, {
            user_id: user_id
        }, ({
            egg,
            ichiban
        }) => {
            setgachaItem(egg)
            setichibanItem(ichiban)
        })
    })
    return (
        <>
            {/* <!-- 1. 戰利牆 --> */}
            <div id={id} className={"tab-pane " + className}>
                <div className="container">
                    {/* <!-- 成就 --> */}
                    <div>
                        <h2 className="text-center fw-bolder my-5">成就</h2>
                        <div className="d-flex justify-content-between">
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button>
                            <div className="d-flex gap-3 flex-wrap">
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraProject/public/images/dodolong.png" className="circle-container" />
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>

                    {/* <!-- 抽獎獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">扭蛋戰利品</h2>
                        <div className="d-flex justify-content-between" style={{ backgroundColor: "var(--main-darkblue)" }}>
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button>
                            <div id='gachoWall' className="d-flex gap-3 flex-wrap">
                                {typeof(gachaItem) != "undefined" ? gachaItem.map((v, index) => (
                                    <MyWallGacha key={index} src={v.img} />
                                )):""}
                                <MyWallGacha src="http://localhost/gachoraProject/public/images/dodolong.png" />
                                <MyWallGacha src="http://localhost/gachoraProject/public/images/dodolong.png" />
                                <MyWallGacha src="http://localhost/gachoraProject/public/images/dodolong.png" />
                                {/* <MyWallGacha src="http://localhost/gachoraProject/public/images/dodolong.png" /> */}
                                {/* <MyWallGacha src="http://localhost/gachoraProject/public/images/dodolong.png" /> */}
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>

                    {/* <!-- 一番賞獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">一番賞戰利品</h2>
                        <div className="d-flex justify-content-between">
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button>
                            <div className="d-flex gap-3 flex-wrap">
                                {typeof(ichibanItem) != "undefined" ? ichibanItem.map((v, index) => (
                                    <img key={index} src={v.img} />
                                )):""}
                                <img src="http://localhost/gachoraProject/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraProject/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraProject/public/images/ichiban1.png" />
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWall