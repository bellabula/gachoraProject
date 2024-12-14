import MyFavorCard from './MyFavorCard'
import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react';


function MyFavor({ id }) {

    const user = usePage().props.auth.user;
    let user_id = user.id

    let basePath = '../app/Models'

    const [gachoFavor, setgachoFavor] = useState([]);
    const [ichibanFavor, setIchibanFavor] = useState([]);

    useEffect(() => {
        const gachaUrl = basePath + '/Post/UserCollectionEgg.php'
        $.post(gachaUrl, {
            user_id: user_id
        }, ({ has }) => {
            // console.log('蛋收藏：', has)
            setgachoFavor(has)
        })
        const ichibanUrl = basePath + '/Post/UserCollectionIchiban.php'
        $.post(ichibanUrl, {
            user_id: user_id
        }, ({has}) => {
            // console.log('一番賞收藏：', has)
            setIchibanFavor(has)
        })
    }, [])

    return (
        <>
            {/* <!-- 2. 收藏清單 --> */}
            <div id={id} className="tab-pane">
                <div className="favor-section">
                    <ul className="nav nav-pills justify-content-center nav-justified">
                        <li className="nav-item">
                            <a className="nav-link active" href="#gachofavor" data-bs-toggle="pill">扭蛋收藏</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#ichibanfavor" data-bs-toggle="pill">一番賞收藏</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content pt-5">
                    {/* 扭蛋收藏 */}
                    <div id="gachofavor" className="tab-pane active">
                        <div className="row  row-gap-2">
                            {gachoFavor.map((v, index) => (
                                <MyFavorCard key={index} src={v.img} href='' />
                            ))}
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" href='https://google.com' />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            {/* <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraProject/public/images/gachoMachineA.png" alt="" /></a>
                            </div> */}
                        </div>
                    </div>
                    {/* 一番賞收藏 */}
                    <div id="ichibanfavor" className="tab-pane">
                        <div className="row  row-gap-2">
                            {ichibanFavor.map((v, index) => (
                                <MyFavorCard key={index} src={v.img} href='' />
                            ))}
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" href='https://google.com' />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            <MyFavorCard src="http://localhost/gachoraProject/public/images/dodolong.png" />
                            {/* <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraProject/public/images/gachoMachineA.png" alt="" /></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavor