import React from 'react'
import Navbar from '@/Components/Navbar';
import LottryDetailCard from '@/Pages/lottry/LottryDetailCard';
import PdCard from '@/Components/PdCard';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Footer from '@/Components/Footer';
import AlertLogin from '@/Components/AlertLogin';

function C_3_LottryDetail() {
    const basePath = '../app/Models'
    const seriesId = usePage().props.seriesId;
    const user = usePage().props.auth.user;
    let user_id = null;

    // 愛心收藏
    const [userFavor, setUerFavor] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);  //我的最愛切換
    const [myGash, setmyGash] = useState(null)
    const [yourNumber, setYourNumber] = useState(0)
    let intervalMyWaitTime = []
    let intervalMyPlayTime = []
    let intervalGeneralTime = []
    let user_number
    let series_id

    useEffect(() => {
        series_id = seriesId
        console.log('進入inLineOrNot');
        inLineOrNot((isInLine) => {

            if (isInLine) {
                // 查是否輪到他
                isMyTurnOrNot()
            } else {
                // console.log('沒排隊預估等候時間')
                GeneralTimer()
            }
        })
    }, [seriesId]);
    // 判斷是否排隊
    function inLineOrNot(callback) {
        MyTimer((response) => {
            console.log('unnLineOrNNot', response);

            if (Array.isArray(response) && response.length > 0) {
                let isInLine = response.some(item => item.series_id == seriesId)
                let item = response.find(item => item.series_id == seriesId)
                // ok
                setYourNumber(item.number)
                callback(isInLine)
            } else {
                callback(false)
            }
        })
    }
    // 我的所有排隊
    function MyTimer(callback) {
        $.post('http://localhost/gachoraProject/app/Models/Post/MyTimer.php', {
            user_id: user_id
        }, (response) => {
            callback(response)
        })
    }
    // 輪到他了嗎
    function isMyTurnOrNot() {
        MyTimer((response) => {
            const item = response.find(item => item.series_id == seriesId)
            if (item) {
                let wait
                wait = item.waiting
                user_number = item.number
                setYourNumber(item.number)
                // console.log('isMyTurnOrNotyournumber',item.number)
                // error number
                console.log('user_number:', yourNumber)
                if (wait <= 0) {
                    // 輪到了
                    // console.log('剩幾秒能抽')
                    PingMyPlayTime()
                    // 讓籤顯示
                    setIsOpen(true)
                } else {
                    // 還沒輪到看要等多久
                    PingMyWaitTime(wait)
                }
            }
        })
    }
    // 還沒輪到看要等多久
    function PingMyWaitTime(wait) {
        let intervalId = setInterval(() => {
            intervalMyWaitTime.push(intervalId)
            console.log('intervalMyWaitTime', intervalMyWaitTime)
            wait--
            console.log('render預估等待', wait, '秒')
            setTimer(wait)

            if (wait <= 0) {
                clearAllIntervals(intervalMyWaitTime)
                // console.log('看剩幾秒能抽')
                PingMyPlayTime()
                setIsOpen(true)

            } else if (wait % 10 == 0) {
                clearAllIntervals(intervalMyWaitTime)
                MyTimer((response) => {
                    const item = response.find(item => item.series_id == seriesId)
                    wait = item.waiting
                    console.log('render預估等待', wait, '秒')
                    setTimer(wait)
                    PingMyWaitTime(wait)
                })
            }
        }, 1000)
    }
    // fetch我的輪剩餘時間
    function MyPlayTime(callback) {
        $.post('http://localhost/gachoraProject/app/Models/Post/SeeWaitTime.php', {
            series_id: seriesId,
            number: user_number || yourNumber
        }, (response) => {
            callback(response)
        })
    }
    let user_number_PingMyPlayTime
    // 抽的剩餘時間
    function PingMyPlayTime() {
        let playTime
        // error yourNumber
        MyPlayTime((response) => {
            playTime = response.waiting
        })
        clearAllIntervals(intervalMyPlayTime)
        let intervalId = setInterval(() => {
            intervalMyPlayTime.push(intervalId)
            playTime--
            console.log('還有', 190 + playTime, '秒可以抽')
            setYourTimer(190 + playTime)
            localStorage.setItem(`ichibanPlay${seriesId}User${user_id}`, (190 + playTime))
            if (190 + playTime <= 0) {
                clearAllIntervals(intervalMyPlayTime)
                // 刪除排隊
                setIsOpen(false)
                console.log('playtimenumber', yourNumber)
                deleteWait(seriesId, yourNumber)
                // 時間到結束抽取 + 刷新
                console.log('結束抽取')
                location.reload()
            } else if ((190 + playTime) % 10 == 0) {
                clearAllIntervals(intervalMyPlayTime)
                PingMyPlayTime()
            } else if (190 + playTime > 180) {

            } else if (isNaN(playTime)) {
                localStorage.removeItem(`ichibanPlay${seriesId}User${user_id}`)
                location.reload()
            }
        }, 1000)
    }
    // fetch沒有排隊的等待時間
    function FetchGeneralTime(callback) {
        console.log('general', seriesId)
        $.post('http://localhost/gachoraProject/app/Models/Post/MaybeTime.php', {
            series_id: seriesId
        }, (response) => {
            callback(response)
        })
    }
    // 沒排隊時間
    function GeneralTimer() {
        let generalTime
        FetchGeneralTime((response) => {
            generalTime = response[0].wait
        })
        let intervalId = setInterval(() => {
            intervalGeneralTime.push(intervalId)
            console.log('intervalGeneralTime', intervalGeneralTime)
            generalTime--
            console.log('現在排隊最久只需等', generalTime, '秒')
            setGeneralTimer(generalTime)
            if (generalTime <= 0) {
                clearAllIntervals(intervalGeneralTime)
                console.log('不用排隊馬上抽')
                // error
                setTimer(0)
            } else if (generalTime % 10 == 0) {
                clearAllIntervals(intervalGeneralTime)
                GeneralTimer()
            } else {

            }
        }, 1000)
    }
    if (user) {
        user_id = user.id


        let collectIchiban = [];
        useEffect(() => {
            $.post(basePath + '/Post/MainUser.php', {
                user_id: user_id
            }, (response) => {
                // console.log(response)
                setmyGash(response.gash)
            })
        }, [myGash])
        useEffect(() => {
            $.post(basePath + '/Post/UserCollectionIchiban.php', {
                user_id: user_id
            }, (response) => {
                if (typeof (response.has) != "undefined") {
                    collectIchiban = [...response.has]
                }
                if (typeof (response.no) != "undefined") {
                    collectIchiban = [...collectIchiban, ...response.no]
                }
                setUerFavor(collectIchiban.map(item => item.id))
            })
        }, [user_id])
    }

    useEffect(() => {
        console.log("new : " + userFavor)
        if (userFavor.includes(parseInt(seriesId))) {
            setIsFavorited(true)
            console.log("isfavorited after : " + isFavorited)
        }
    }, [userFavor])

    const [heartImg, setHeartImg] = useState("")

    useEffect(() => {
        console.log("Hello : " + isFavorited)
        setHeartImg(isFavorited ? 'http://localhost/gachoraProject/public/images/gachoHome/Vector (2).png' : 'http://localhost/gachoraProject/public/images/gachoHome/Vector.png')
    }, [isFavorited])

    // 加入我的最愛事件
    function toggleFavorite() {
        if (user) {
            setIsFavorited(!isFavorited);
            $.post(basePath + "/Post/ToCollection.php", {
                user_id: user_id,
                series_id: seriesId
            })
        } else {
            setIsLoginAlertOpen(true)
            // alert("請先登入")
        }
    }


    const [bigImageSrc, setBigImageSrc] = useState("");
    const [characters, setCharacters] = useState([]);
    const [recommend, setRecommend] = useState([])
    const [currentPosition, setCurrentPosition] = useState(0);  //推薦商品切換
    const [isOpen, setIsOpen] = useState(false);  //判斷開關
    const [selectedNumbers, setSelectedNumbers] = useState([]);  //已經選中的號碼
    const [seatNumbers, setSeatNumbers] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])


    const [seriesImg, setSeriesImg] = useState("")
    const [seriesData, setSeriesData] = useState([]);
    // 當 seriesId 改變時，發送請求獲取詳細資料
    useEffect(() => {
        $.post(basePath + "/Post/IchibanDetail.php", {
            series_id: seriesId
        }, (response) => {
            console.log('一番賞詳細頁', response);
            setSeriesData(response.series)
            setSeriesImg(response.series.img[0])
            setCharacters(response.series.character)
            setRecommend(response.recommend)
            setBigImageSrc(response.series.character[0].img)
            setSeatNumbers(Array.from({ length: response.series.total }, (_, i) => i + 1))
            setBookedSeats(response.label ? response.label : [])
        })
    }, [seriesId]);


    useEffect(() => {
        console.log("seriesData 已更新:", seriesData);
    }, [seriesData]);

    // 當 seriesData 還沒有加載完成時，顯示 loading 或其他提示
    // if (!seriesData) {
    //     return <div>載入中...</div>;
    // }

    // //上張圖、下張圖
    const mainImages = [seriesImg];
    const [currentImageIndex, setcurrentImageIndex] = useState(0);  //上張圖下張圖
    function prevImage() {
        setcurrentImageIndex((currentImageIndex - 1 + mainImages.length) % mainImages.length)
    }

    function nextImage() {
        setcurrentImageIndex((currentImageIndex + 1) % mainImages.length)
    }

    // //點集大圖切換
    function switchBigImage(imageSrc) {
        setBigImageSrc(imageSrc);
    }

    // //推薦商品左右切換
    const itemWidth = 33;
    const visibleItems = 3;
    const totalItems = characters.length;
    const prevCarousel = () => {
        setCurrentPosition((prevPosition) => Math.min(prevPosition + itemWidth, 0));
    };

    const nextCarousel = () => {
        const maxPosition = -(itemWidth * (totalItems - visibleItems));
        setCurrentPosition((prevPosition) => Math.max(prevPosition - itemWidth, maxPosition));
    };

    // 切換摺疊區域的展開/收起
    const [timer, setTimer] = useState(0)
    const [generalTimer, setGeneralTimer] = useState(0)
    const [yourTimer, setYourTimer] = useState(0)
    function toggleCollapse() {
        if (user) {
            clearAllIntervals(intervalMyWaitTime)
            clearAllIntervals(intervalMyPlayTime)
            clearAllIntervals(intervalGeneralTime)
            if (yourNumber == 0) {
                // setIsOpen(true)
                clearAllIntervals(intervalGeneralTime)
                const url = 'http://localhost/gachoraProject/app/Models/Post/LineIn.php'
                $.post(url, {
                    user_id: user_id,
                    series_id: seriesId
                }, (response) => {
                    let wait
                    setYourNumber(response[0].yournumber)
                    localStorage.setItem(`yourichiban${seriesId}`, response[0].yournumber)
                    wait = response[0].waiting
                    setYourTimer(response[0].waiting)
                    // console.log('user_number:', yourNumber)
                    PingMyWaitTime(wait)
                })
                location.reload()
            } else {
                clearAllIntervals(intervalMyPlayTime)
                // 刪除排隊
                if (isOpen) {
                    deleteWait(seriesId, yourNumber)
                } else {
                    deleteSelfWait(seriesId, yourNumber)
                }
                setIsOpen(false)
                // error
                setTimeout(() => {
                    localStorage.removeItem(`ichibanPlay${seriesId}User${user_id}`)
                    setYourTimer('bye')
                    console.log('自主中離')
                    clearAllIntervals(intervalMyPlayTime)
                    location.reload()
                }, 1000)
            }
            // setIsOpen(!isOpen);
        } else {
            setIsLoginAlertOpen(true)
            // alert("請先登入")
        }
    };
    function clearAllIntervals(intervalname) {
        console.log('clear')
        intervalname.forEach(intervalId => clearInterval(intervalId)); // 清除所有定時器
        intervalname = []; // 清空數組
    }

    // post series_id, 號碼牌，告訴後端中離與要離開
    function deleteWait(series_id, yournumber) {
        clearAllIntervals(intervalMyPlayTime)
        clearAllIntervals(intervalMyWaitTime)
        setIsOpen(false)

        $.post('http://localhost/gachoraProject/app/Models/Post/DeleteWait.php', {
            series_id: series_id,
            number: yournumber,
        }, (response) => { })
        clearAllIntervals(intervalMyPlayTime)
    }
    // post series_id, 號碼牌，告訴後端中離與要離開
    function deleteSelfWait(series_id, yournumber) {
        clearAllIntervals(intervalMyPlayTime)
        clearAllIntervals(intervalMyWaitTime)
        setIsOpen(false)

        $.post('http://localhost/gachoraProject/app/Models/Post/DeleteSelfWait.php', {
            series_id: series_id,
            number: yournumber,
        }, (response) => { })
        clearAllIntervals(intervalMyPlayTime)
    }


    // 處理座位選中/取消的函數
    const toggleSeatSelection = (number) => {
        if (bookedSeats.includes(number)) return; // 已被買走的號碼不可選
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number)); // 取消選中
        } else {
            setSelectedNumbers([...selectedNumbers, number]); // 新增選中
        }
    }

    const [isSelect, setIsSelect] = useState(true)
    const [isGEnough, setIsGEnough] = useState(true)

    const playIchiban = function () {
        // console.log(`${selectedNumbers.sort((a, b) => a - b).join(",")}`)
        // console.log(selectedNumbers.length)
        if (user) {
            if (myGash < seriesData.price * selectedNumbers.length) {
                setIsGEnough(false)
                // alert("你沒有足夠的G幣")
            } else if (selectedNumbers.sort((a, b) => a - b).join(",") == 0) {
                setIsSelect(false)
                // alert("你什麼都沒抽")
            } else {
                localStorage.setItem("ichibanLabel", selectedNumbers.sort((a, b) => a - b).join(","))
                localStorage.setItem("ichibanQuantity", selectedNumbers.length)
                window.location.replace("http://localhost/gachoraProject/public/lottryfunction?seriesId=" + seriesId);
                // $.post(basePath + '/Post/PlayIchiban.php', {
                //     series_id: seriesId,
                //     user_id: user_id,
                //     label: selectedNumbers.sort((a, b) => a - b).join(",")
                // }, (response) => {
                //     console.log("Hi")
                //     console.log(response)
                //     $.post(basePath + '/Post/IchibanDetail.php', {
                //         series_id: seriesId
                //     }, (response) => {
                //         console.log(response)
                //         setBookedSeats(response.label ? response.label : [])
                //     })
                // })
            }
        } else {
            setIsLoginAlertOpen(true)
            // alert('請先登入')
        }
    }

    const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
    function handleRedirect() {
        window.location.href = "http://localhost/gachoraProject/public/login"
    }


    // 多張seriesImg => {mainImages[currentImageIndex]}
    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue)" />
            <Head title="lottryDetail" />
            {/* loginAlert */}
            {isLoginAlertOpen && (
                <AlertLogin setIsLoginAlertOpen={setIsLoginAlertOpen}>
                    <h3 style={{ margin: "30px 0px", color: "#ED1C24" }}>請先登入</h3>
                    <h5 style={{ color: "var(--main-darkblue)" }}>
                        登入後才可進行<br />
                        收藏、抽賞、抽扭蛋等活動哦!<br />
                        過年期間加入即贈2025年節小蛇頭像。
                    </h5>
                    <button onClick={handleRedirect} style={{ width: "100px", height: "35px", margin: "20px 10px", borderRadius: "50px", backgroundColor: "var(--main-yellow)", color: "var(--main-darkblue)", border: "none", opacity: "1" }}>前往登入</button>
                </AlertLogin>
            )}
            {!isSelect && (
                <AlertLogin setIsLoginAlertOpen={setIsLoginAlertOpen} setIsSelect={setIsSelect}>
                    <h3 style={{ margin: "30px 0px", color: "#ED1C24" }}>未選擇號碼</h3>
                    <h5 style={{ color: "var(--main-darkblue)" }}>
                        請選擇欲抽取的號碼<br />
                        點選數字即可進行選號，灰色區域為已被抽走的號碼
                    </h5>
                </AlertLogin>
            )}
            {!isGEnough && (
                <AlertLogin setIsLoginAlertOpen={setIsLoginAlertOpen} setIsGEnough={setIsGEnough}>
                    <h3 style={{ margin: "30px 0px", color: "#ED1C24" }}>餘額不足!</h3>
                    <h5 style={{ color: "var(--main-darkblue)" }}>
                        餘額不足，請減少數量，或前往儲值!<br />
                        點選上方頭像標誌<img src='http://localhost/gachoraProject/public/images/member.svg' style={{ filter: "var(--main-darkblue-filter)" }} />，將出現會員小視窗可進行儲值<br />
                    </h5>
                </AlertLogin>
            )}
            <body id='lottrybody'>
                <main id='lottryDetail' className="container container-xxl">
                    {/* <!-- 商品圖片區塊 --> */}
                    <div className="row mt-5">
                        <div className="col-xxl-8">
                            <div className="product-image">
                                <img src={seriesImg}
                                    alt="商品圖片"
                                    id="mainProductImage" />
                                {/* <button className="carousel-control-prev"
                                    onClick={prevImage}>&#8249;</button>
                                <button className="carousel-control-next"
                                    onClick={nextImage}>&#8250;</button> */}
                            </div>
                        </div>
                        <div className="col-xxl-4">
                            <div className="product-info">
                                <h1 style={{ color: 'var(--main-bg-gray)' }}>商品名稱:{seriesData.name}</h1> {/* {seriesData.name} */}
                                <div className="pdinfocolor">
                                    <ul>
                                        {/* <li>結束日期:</li> */}
                                        <li>種類:共{characters.length}種</li> {/* {seriesData.character.length} */}
                                        <li>配送時間:下單後3~7天出貨</li>
                                    </ul>
                                </div>
                                <h3 className='subtitles'>價格:NT {seriesData.price} /抽</h3> {/* {seriesData.price} */}
                                <p className='lottrynumber my-3'>剩餘G幣 : $ {myGash ? myGash : 0}</p>
                                <p className='lottrynumber my-3' >已抽數/總數:{seriesData.remain}/{seriesData.total}</p> {/* {seriesData.remain}/{seriesData.total} */}
                                <p className='lottrynumber my-3' >預估等待時間 : 最晚等 {Math.floor(timer != 0 ? timer / 60 : generalTimer == -1 ? 0 : generalTimer / 60)} 分 {(timer != 0 ? timer % 60 : generalTimer == -1 ? 0 : generalTimer % 60)}秒</p>
                                {/* <button className='Favorite_bt' >點擊往下排隊/抽選</button> */}
                                <button
                                    className={`Favorite_bt ${isFavorited ? 'active' : ''} scale_bn`}
                                    onClick={toggleFavorite}>
                                    <img src={heartImg} alt="" />
                                    {isFavorited ? '已收藏' : '加入收藏'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- 商品種類小圖 --> */}
                    <div className="row mt-1 d-flex">
                        <div className="col-xxl-7 row" id='sm-pd-grid'>
                            {characters.map((chara, index) => (
                                <LottryDetailCard
                                    character={chara}
                                    switchBigImage={switchBigImage}
                                    probability={((chara.remain / seriesData.remain) * 100).toFixed(2) + "%"}
                                    key={index}>
                                </LottryDetailCard>
                            ))}
                        </div>
                        <div className="col-xxl-5">
                            <span className="big-image">
                                <img src={bigImageSrc}
                                    alt="大圖"
                                    id="bigProductImage" />
                            </span>
                        </div>
                    </div>

                    <div className="container mt-4">
                        {/* 展開/收起的按鈕 */}
                        <button
                            className="Favorite_bt scale_bn"
                            onClick={toggleCollapse}
                            aria-expanded={isOpen}
                            aria-controls="collapsibleSection"
                        >
                            {isOpen ? '取消/結束抽選' : '點選排隊/抽獎'}
                        </button>
                        {/* <span className='subtitles'>剩餘時間:{Math.floor((180 + yourTimer) / 60)}分{((180 + yourTimer) % 60)}秒</span> */}
                        <span className='subtitles'>你的號碼牌 : {yourNumber} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; 預估等待時間 : 最晚等 {generalTimer == -1 ? 0 : Math.floor(timer != 0 ? timer / 60 : generalTimer == -1 ? 0 : generalTimer / 60)} 分 {(timer != 0 ? timer % 60 : generalTimer == -1 ? 0 : generalTimer % 60)}秒</span>
                        {/* <span className='subtitles'>預估等待時間 : 最晚等 {generalTimer == -1 ? 0 : Math.floor(timer != 0 ? timer / 60 : generalTimer == -1 ? 0 : generalTimer / 60)} 分 {(timer != 0 ? timer % 60 : generalTimer == -1 ? 0 : generalTimer % 60)}秒</span> */}
                        <span className='subtitles'>剩餘G幣 : $ {myGash}</span>

                        {/* 摺疊區域 */}
                        <div
                            className={`collapse ${isOpen ? 'show' : ''}`}
                            id="collapsibleSection"
                        >
                            <div className="card card-body mt-3">
                                <h4>請於此處開始選號</h4>
                                <h5>剩餘時間:{isNaN(yourTimer) ? '' : Math.floor((yourTimer) / 60)}分{isNaN(yourTimer) ? '' : ((yourTimer) % 60)}秒</h5>
                                <p>選取號碼後送出即可開始抽選,若要取消抽選可點選左上方取消抽選按鈕。
                                </p>
                                <div className="seat-container">
                                    {seatNumbers.map((number) => (
                                        <div
                                            key={number}
                                            className={`seat ${bookedSeats.includes(number)
                                                ? "booked" // 已被買走的樣式
                                                : selectedNumbers.includes(number)
                                                    ? "selected" // 已選中的樣式
                                                    : ""
                                                }`}
                                            onClick={() => toggleSeatSelection(number)}>
                                            {number}
                                        </div>
                                    ))}
                                    <div className="displayNumber">
                                        <h5>已選擇號碼：{selectedNumbers.length > 0 ? selectedNumbers.sort((a, b) => a - b).join(", ") : "無"}</h5>
                                        {/* <label style={{ display: 'flex', cursor: 'pointer', gap: '8px' }}>
                                            <input type="checkbox" style={{ width: '20px' }} />
                                            <span>是否要跳過抽獎動畫?</span>
                                        </label> */}


                                    </div>
                                </div>
                                <button className='Favorite_bt' onClick={playIchiban}>確認送出</button>
                            </div>
                        </div>

                    </div>

                    {/* 商品詳情/送貨付款方式/評價 */}
                    <div className='container lottrydt'>
                        <ul className="nav nav-tabs d-flex justify-content-evenly"
                            id="myTab"
                            role="tablist">
                            <li className="nav-item "
                                role="presentation">
                                <button className="nav-link active"
                                    id="details-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#details"
                                    type="button"
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected="true">商品詳情</button>
                            </li>
                            <li className="nav-item "
                                role="presentation">
                                <button className="nav-link"
                                    id="shipping-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#shipping"
                                    type="button"
                                    role="tab"
                                    aria-controls="shipping"
                                    aria-selected="false">送貨及付款方式</button>
                            </li>
                            <li className="nav-item "
                                role="presentation">
                                <button className="nav-link"
                                    id="reviews-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#reviews"
                                    type="button"
                                    role="tab"
                                    aria-controls="reviews"
                                    aria-selected="false">顧客評價</button>
                            </li>
                        </ul>

                        {/* <!-- 內容區 --> */}
                        <div className="tab-content mt-4 lottrydt">
                            <div className="tab-pane fade show active"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab">
                                <h3>商品詳情</h3>
                                <p>商品詳情內容。</p>
                            </div>
                            <div className="tab-pane fade"
                                id="shipping"
                                role="tabpanel"
                                aria-labelledby="shipping-tab">
                                <h3>送貨及付款方式</h3>
                                <p>送貨及付款方式內容。</p>
                            </div>
                            <div className="tab-pane fade"
                                id="reviews"
                                role="tabpanel"
                                aria-labelledby="reviews-tab">
                                <h3>顧客評價</h3>
                                <p>顧客評價內容。</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- 靜態圖片區塊 --> */}
                    <h1 className="text-center"
                        style={{
                            color: "var(--main-bg-gray)", display: "block", margin: "30px,0,0,15px",
                            textDecoration: "underline", textDecorationColor: "var(--main-yellow)", textUnderlineOffset: "5pt"
                        }}>線上一番賞新手教學</h1>
                    <div className="static-image">
                        <img src="http://localhost/gachoraProject/public/images/gachoHome/lottryStep7.svg"
                            alt="靜態教學圖"
                            className="img-fluid" />
                    </div>

                    {/* <!-- 底部商品切換 --> */}
                    <h4 className="text-center">推薦商品</h4>
                    <div className="mt-4">
                        <div className=" position-relative d-flex justify-content-center">
                            <button className="carousel-btn left"
                                onClick={prevCarousel} ><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="" /></button>
                            <div className="carousel-wrapper">
                                <div className="carousel-items" style={{ transform: `translateX(${currentPosition}%)` }}>
                                    {recommend.map((product, index) => (
                                        <div className="item" key={index}>
                                            <PdCard className="d-flex flex-wrap justify-content-center"
                                                seriesId={product.series_id}
                                                series={product}
                                                prize={product.character}
                                                userFavor={userFavor}
                                                setIsLoginAlertOpen={setIsLoginAlertOpen}
                                                img={product.img[0]}>
                                            </PdCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="carousel-btn right"
                                onClick={nextCarousel}><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" />
                            </button>
                        </div>
                    </div>
                </main >
                <Footer imgSrc='http://localhost/gachoraProject/public/images/Footer3.svg' bgColor="var(--main-darkblue)"></Footer>
            </body >

        </>
    )
}

export default C_3_LottryDetail
