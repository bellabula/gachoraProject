import React, { useEffect, useState } from 'react'
import MyWallGacha from './MyWallGacha'
import { usePage } from '@inertiajs/react';
import Carousel from '@/Components/Carousel'


function MyWall({ id, className = "" }) {
    const [carouselItem, setCarouseItem] = useState([]);
    const user = usePage().props.auth.user;
    let user_id = user.id;
    const memberItem = [
        { img: "http://localhost/gachoraProject/public/images/memberItem/snake.png", title: "2025/3/30號前註冊即送年節小蛇成就頭像",name: "2025年節小蛇" },
        { img: "http://localhost/gachoraProject/public/images/memberItem/dim1.png", title: "儲值滿額500元即贈地球男爵成就頭像" ,name: "地球男爵"},
        { img: "http://localhost/gachoraProject/public/images/memberItem/dim2.png", title: "儲值滿額3000元即贈月球伯爵成就頭像" ,name: "月球伯爵"},
        { img: "http://localhost/gachoraProject/public/images/memberItem/dim3.png", title: "儲值滿額10000元即贈太陽侯爵成就頭像" ,name: "太陽侯爵"},
        { img: "http://localhost/gachoraProject/public/images/memberItem/dim4.png", title: "儲值滿額50000元即贈土星公爵成就頭像" ,name: "土星公爵"},
        { img: "http://localhost/gachoraProject/public/images/memberItem/dim5.png", title: "儲值滿額100000元即贈宇宙霸主成就頭像" ,name: "宇宙霸主"}
    ];


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
        $.post('../app/Models/Post/MainUser.php', {
            user_id: user_id
        }, (response) => {
            // console.log(response);
            const achieveImg = response.achievement.map((ele)=>(ele.img));
            // console.log(achieveImg);
            setCarouseItem(achieveImg);
            if (response && typeof response === 'object') {
                const items = achieveImg || [];
                setCarouseItem(Array.isArray(items) ? items : []);
            } else {
                setCarouseItem([]);
            }
        })
    }, [user_id])

    const convertPathsToIndices = (paths) => {
        return paths.map(path => memberItem.findIndex(item => item.img === path));
    };

    const achievementIndices = convertPathsToIndices(carouselItem);
    console.log(achievementIndices);

    return (
        <>
            {/* <!-- 1. 戰利牆 --> */}
            <div id={id} className={"tab-pane " + className}>
                <div className="container">
                    {/* <!-- 成就 --> */}
                    <div>
                        <h2 className="text-center fw-bolder my-5">成就</h2>
                        <Carousel cols={5} gap={0}>
                            {memberItem.map((item, index) => (
                                <Carousel.Item key={index}>
                                    <img src={item.img} 
                                    className={`circle-container ${achievementIndices.includes(index) ? 'active' : ''}`} 
                                    alt={`商品-${index}`} 
                                    title={item.title}/>
                                    <p style={{ textAlign: "center",width:"200px",padding:"10px",fontSize:"18px"}}> {item.name}</p>
                                </Carousel.Item>
                            ))}

                        </Carousel>
                    </div>

                    {/* <!-- 抽獎獲利牆 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">扭蛋戰利品</h2>
                        {gachaItem.length != 0 ?
                            <div className="d-flex justify-content-between px-5 rounded-5" style={{ backgroundColor: "var(--main-darkblue)" }}>
                                {/* <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button> */}
                                <div id='gachoWall' className="d-flex gap-3 flex-wrap">
                                    {gachaItem.map((v, index) => (
                                        <MyWallGacha key={index} src={v.img} />
                                    ))}                                </div>
                                {/* <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button> */}
                            </div> : <h4 className='text-center' style={{ color: "var(--main-darkblue)" }}>目前沒有任何扭蛋戰利品... <a href={route('gachaHome')} className='no-link-style'><button style={{ borderRadius: "10px" }}>&gt;&gt; 前往扭蛋</button></a></h4>}
                    </div>

                    {/* <!-- 一番賞獲利牆 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">一番賞戰利品</h2>
                        {ichibanItem.length != 0 ?
                            <div className="d-flex justify-content-between ps-5 pe-5">
                                {/* <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" /></button> */}
                                <div className="d-flex gap-3 flex-wrap">
                                    {ichibanItem.map((v, index) => (
                                        <img key={index} src={v.img} />
                                    ))}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                    {/* <img src="http://localhost/gachoraProject/public/images/ichiban1.png" /> */}
                                </div>
                                {/* <button className="btn"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" /></button> */}
                            </div> : <h4 className='text-center' style={{ color: "var(--main-darkblue)" }}>目前沒有任何一番賞戰利品... <a href={route('lottryHome')} className='no-link-style'><button style={{ borderRadius: "10px" }}>&gt;&gt; 前往一番賞</button></a></h4>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWall
