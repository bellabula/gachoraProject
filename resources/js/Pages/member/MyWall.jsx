import React, { useEffect, useState } from 'react'
import MyWallGacha from './MyWallGacha'
import { usePage } from '@inertiajs/react';
import Carousel from '@/Components/Carousel'


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
            // console.log("Egg: "+egg)
            // console.log("Ichiban: "+ichiban)
            setgachaItem(egg)
            setichibanItem(ichiban)
        })
    }, [user_id])
    return (
        <>
            {/* <!-- 1. 戰利牆 --> */}
            <div id={id} className={"tab-pane " + className}>
                <div className="container">
                    {/* <!-- 成就 --> */}
                    <div>
                        <h2 className="text-center fw-bolder my-5">成就</h2>
                        <Carousel cols={8} gap={0}>  
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/snake.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>           
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim1.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim2.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim3.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim4.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim1.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim2.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim3.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim4.pngg" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim1.png" className="circle-container" />
                            </Carousel.Item>
                            <Carousel.Item>
                                    <img src="http://localhost/gachoraProject/public/images/memberItem/dim2.png" className="circle-container" />
                            </Carousel.Item>
                        </Carousel>
                        {/* <div className="d-flex justify-content-between">
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
                        </div> */}
                    </div>

                    {/* <!-- 抽獎獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">扭蛋戰利品</h2>
                        {typeof (gachaItem) != "undefined" ?
                            <div className="d-flex justify-content-between" style={{ backgroundColor: "var(--main-darkblue)" }}>
                                <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button>
                                <div id='gachoWall' className="d-flex gap-3 flex-wrap">
                                    {gachaItem.map((v, index) => (
                                        <MyWallGacha key={index} src={v.img} />
                                    ))}                                </div>
                                <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button>
                            </div> : <h4 className='text-center' style={{ color: "var(--main-darkblue)" }}>目前沒有任何扭蛋戰利品... <button style={{ borderRadius: "10px" }}>&gt;&gt; 前往扭蛋</button></h4>}
                    </div>

                    {/* <!-- 一番賞獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">一番賞戰利品</h2>
                        {typeof (ichibanItem) != "undefined" ?
                            <div className="d-flex justify-content-between">
                                <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button>
                                <div className="d-flex gap-3 flex-wrap">
                                    {ichibanItem.map((v, index) => (
                                        <img key={index} src={v.img} />
                                    ))}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                </div>
                                <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button>
                            </div> : <h4 className='text-center' style={{ color: "var(--main-darkblue)" }}>目前沒有任何一番賞戰利品... <button style={{ borderRadius: "10px" }}>&gt;&gt; 前往一番賞</button></h4>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWall