import React from 'react'
import Navbar from '@/Components/Navbar';
import GachaDetailCard from '@/Pages/Gacha/GachaDetailCard';
import PdCard from '@/Components/PdCard';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function C_3_LottryDetail() {
    const basePath = '../app/Models'
    const seriesId = usePage().props.seriesId;
    const user = usePage().props.auth.user;
    let user_id = null;

    // 愛心收藏
    const [userFavor, setUerFavor] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);  //我的最愛切換
    const [myGash, setmyGash] = useState(null)

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
            alert("請先登入")
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
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        // const user_id = $(this).prev().val()
        // const series_id = $(this).val()
        // const url = 'http://localhost/gachoraProject/app/Models/Post/LineIn.php'
        // $.post(url, {
        //     user_id: user_id,
        //     series_id: series_id
        // }, (response) => {
        //     FrontTime(series_id, response[0].yournumber, response[0].waiting)
        //     $('.yournumber').text(response[0].yournumber)
        // })
    };


    // 處理座位選中/取消的函數
    const toggleSeatSelection = (number) => {
        if (bookedSeats.includes(number)) return; // 已被買走的號碼不可選
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number)); // 取消選中
        } else {
            setSelectedNumbers([...selectedNumbers, number]); // 新增選中
        }
    }


    // 多張seriesImg => {mainImages[currentImageIndex]}
    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue) logout='list-item' " />
            <Head title="lottryDetail" />
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
                                <span className='lottrynumber'>剩餘G幣:{myGash ? myGash : "請先登入"}</span>
                                <span className='lottrynumber' >已抽數/總數:{seriesData.remain}/{seriesData.total}</span> {/* {seriesData.remain}/{seriesData.total} */}
                                <p className='lottrynumber' >目前排隊人數/預估等待時間:</p>
                                {/* <button className='Favorite_bt' >點擊往下排隊/抽選</button> */}
                                <button
                                    className={`Favorite_bt ${isFavorited ? 'active' : ''}`}
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
                                <GachaDetailCard
                                    productName={chara.name}
                                    switchBigImage={switchBigImage}
                                    probability={((chara.remain / seriesData.remain) * 100).toFixed(2) + "%"}
                                    productImg={chara.img}
                                    key={index}>
                                </GachaDetailCard>
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
                            className="Favorite_bt"
                            onClick={toggleCollapse}
                            aria-expanded={isOpen}
                            aria-controls="collapsibleSection"
                        >
                            {isOpen ? '取消抽選' : '點選排隊/抽獎'}
                        </button>
                        <span className='subtitles'>排隊人數:?人</span>
                        <span className='subtitles'>預估等待時間:?分</span>
                        <span className='subtitles'>剩餘G幣:???</span>

                        {/* 摺疊區域 */}
                        <div
                            className={`collapse ${isOpen ? 'show' : ''}`}
                            id="collapsibleSection"
                        >
                            <div className="card card-body mt-3">
                                <h4>請於此處開始選號—</h4>
                                <h5>剩餘時間:???</h5>
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
                                        <label style={{ display: 'flex', cursor: 'pointer', gap: '8px' }}>
                                            <input type="checkbox" style={{ width: '20px' }} />
                                            <span>是否要跳過抽獎動畫?</span>
                                        </label>


                                    </div>
                                </div>
                                <button className='Favorite_bt'>確認送出</button>
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
                    <div className="row mt-4">
                        <div className="col-12 static-image">
                            <img src="static.jpg"
                                alt="靜態教學圖"
                                className="img-fluid" />
                        </div>
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
            </body >
        </>
    )
}

export default C_3_LottryDetail
