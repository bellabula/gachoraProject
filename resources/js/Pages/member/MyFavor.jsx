import MyFavorCard from './MyFavorCard'
import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react';


function MyFavor({ id }) {

    const user = usePage().props.auth.user;
    let user_id = user.id

    let basePath = '../app/Models'

    const [gachoFavor, setgachoFavor] = useState([]);
    const [ichibanFavor, setIchibanFavor] = useState([]);

    let collectEgg = []
    useEffect(() => {
        const gachaUrl = basePath + '/Post/UserCollectionEgg.php'
        $.post(gachaUrl, {
            user_id: user_id
        }, (response) => {
            if (typeof (response.has) != "undefined") {
                collectEgg = [...response.has]
            }
            if (typeof (response.no) != "undefined") {
                collectEgg = [...collectEgg, ...response.no]
            }
            // console.log('蛋收藏：', collectEgg)
            // console.log('蛋收藏：', has)
            setgachoFavor(collectEgg)
        })
        const ichibanUrl = basePath + '/Post/UserCollectionIchiban.php'
        $.post(ichibanUrl, {
            user_id: user_id
        }, ({ has }) => {
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
                        {typeof (gachoFavor) != "undefined" ?
                            <div className="row  row-gap-2">
                                {gachoFavor.map((v, index) => (
                                    <MyFavorCard key={index} src={v.img[0]} href={'gachadetail?seriesId=' + v.id} />
                                ))}
                            </div> : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前沒有任何扭蛋收藏... <button style={{ borderRadius: "10px" }}>&gt;&gt; 前往扭蛋</button></h4>}
                    </div>
                    {/* 一番賞收藏 */}
                    <div id="ichibanfavor" className="tab-pane">
                        {typeof (ichibanFavor) != "undefined" ?
                            <div className="row  row-gap-2">
                                {ichibanFavor.map((v, index) => (
                                    <MyFavorCard key={index} src={v.img} href='' />
                                ))}
                            </div> : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前沒有任何一番賞收藏... <button style={{ borderRadius: "10px" }}>&gt;&gt; 前往一番賞</button></h4>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavor