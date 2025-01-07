import MyFavorCard from './MyFavorCard'
import MyIchibanFavorCard from './MyIchibanFavorCard'
import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react';


function MyFavor({ id, className="" }) {

    const user = usePage().props.auth.user;
    let user_id = user.id

    const basePath = '../app/Models'

    const [gachoFavor, setgachoFavor] = useState([]);
    const [ichibanFavor, setIchibanFavor] = useState([]);
    const gachaUrl = basePath + '/Post/UserCollectionEgg.php';
    const ichibanUrl = basePath + '/Post/UserCollectionIchiban.php';
    const collectionUrl = basePath + '/Post/ToCollection.php';
    const [rerender, setRerender] = useState(0);
    let collectEgg = []
    useEffect(() => {
        collectEgg = []
        $.post(gachaUrl, {
            user_id: user_id
        }, (response) => {
            // console.log('Egg')
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
        $.post(ichibanUrl, {
            user_id: user_id
        }, ({ has }) => {
            // console.log('Ichiban')
            // console.log('一番賞收藏：', has)
            setIchibanFavor(has)
        })
    }, [rerender])
    function removeFavor(user_id, seriesId) {
        $.post(collectionUrl, {
            user_id: user_id,
            series_id: seriesId
        })
        setTimeout(() => {
            setRerender((prev) => prev + 1)
        }, 100)
    }

    return (
        <>
            {/* <!-- 2. 收藏清單 --> */}
            <div id={id} className={"tab-pane " + className}>
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
                        {gachoFavor.length != 0 ?
                            <div className="row  row-gap-2">
                                {gachoFavor.map((v, index) => (
                                    <MyFavorCard key={index} seriesId={v.id} name={v.name} src={v.img[0]} href={'gachadetail?seriesId=' + v.id} removeFavor={removeFavor} user_id={user_id}/>
                                ))}
                            </div> : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前沒有任何扭蛋收藏... <a href={route('gachaHome')} className='no-link-style'><button style={{ borderRadius: "10px" }}>&gt;&gt; 前往扭蛋</button></a></h4>}
                    </div>
                    {/* 一番賞收藏 */}
                    <div id="ichibanfavor" className="tab-pane">
                        {ichibanFavor.length != 0 ?
                            <div className="row  row-gap-2">
                                {ichibanFavor.map((v, index) => (
                                    <MyIchibanFavorCard key={index} seriesId={v.id} name={v.name} src={v.img[0]} href={'lottrydetail?seriesId=' + v.id} removeFavor={removeFavor} user_id={user_id} />
                                ))}
                            </div> : <h4 className='text-center mt-5' style={{ color: "var(--main-darkblue)" }}>目前沒有任何一番賞收藏... <a href={route('lottryHome')} className='no-link-style'><button style={{ borderRadius: "10px" }}>&gt;&gt; 前往一番賞</button></a></h4>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavor