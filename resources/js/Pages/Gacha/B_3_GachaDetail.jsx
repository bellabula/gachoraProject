import React, { useEffect } from 'react'
import Navbar from '@/Components/Navbar';
import GachaDetailCard from '@/Pages/Gacha/GachaDetailCard';
import GachaPdCard from '@/Components/GachaPdCard';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function B_3_GachaDetail() {
    const basePath = '../app/Models'
    const gachaId = usePage().props.seriesId;
    const user = usePage().props.auth.user;
    let user_id = null;
    const [userFavor, setUerFavor] = useState([]);
    const [myGash, setmyGash] = useState(null)
    // //加入我的最愛事件
    const [isFavorited, setIsFavorited] = useState(false);
    if (user) {
        user_id = user.id


        let collectEgg = [];
        useEffect(() => {
            $.post(basePath + '/Post/MainUser.php', {
                user_id: user_id
            }, (response) => {
                // console.log(response)
                setmyGash(response.gash)
            })
        }, [myGash])
        useEffect(() => {
            $.post(basePath + '/Post/UserCollectionEgg.php', {
                user_id: user_id
            }, (response) => {
                if (typeof (response.has) != "undefined") {
                    collectEgg = [...response.has]
                }
                if (typeof (response.no) != "undefined") {
                    collectEgg = [...collectEgg, ...response.no]
                }
                setUerFavor(collectEgg.map(item => item.id))
            })
        }, [user_id])
    }

    useEffect(() => {
        console.log("new : " + userFavor)
        if (userFavor.includes(parseInt(gachaId))) {
            setIsFavorited(true)
            console.log("isfavorited after : " + isFavorited)
        }
    }, [userFavor])

    const [heartImg, setHeartImg] = useState("")

    useEffect(() => {
        console.log("Hello : " + isFavorited)
        setHeartImg(isFavorited ? 'http://localhost/gachoraProject/public/images/gachoHome/Vector (2).png' : 'http://localhost/gachoraProject/public/images/gachoHome/Vector.png')
    }, [isFavorited])

    const [characters, setCharacters] = useState([])
    const [series, setSeries] = useState([])
    const [seriesImg, setSeriesImg] = useState()
    const [recommend, setRecommend] = useState([])

    const url = basePath + '/Post/EggDetail.php'
    useEffect(() => {
        $.post(url, {
            series_id: gachaId
        }, (response) => {
            console.log(response)
            // console.log('扭蛋詳細頁', response);
            setCharacters(response.character)
            setSeries(response.series[0])
            setSeriesImg(response.series[0].img[0])
            // console.log(response.series[0].img)
            // console.log(response.series)
            // console.log(response.character)
            // console.log(series)
            setRecommend(response.recommend)
            // console.log(response.recommend)
            setBigImageSrc(response.character[0].img)
        })
    }, [gachaId])

    //上張圖、下張圖
    const mainImages = [seriesImg];
    // console.log(seriesImg)
    // const mainImages = series.img
    const [currentImageIndex, setcurrentImageIndex] = useState(0);

    function prevImage() {
        setcurrentImageIndex((currentImageIndex - 1 + mainImages.length) % mainImages.length)
    }

    function nextImage() {
        setcurrentImageIndex((currentImageIndex + 1) % mainImages.length)
    }

    //點集大圖切換
    const [bigImageSrc, setBigImageSrc] = useState(mainImages[0]);

    function switchBigImage(imageSrc) {
        setBigImageSrc(imageSrc);
    }

    // 加減數量
    const [quantity, setQuantity] = useState(1);
    const minusValue = () => {
        setQuantity(quantity - 1 > 0 ? quantity - 1 : 1);
    };
    const addValue = () => {
        setQuantity(quantity + 1);
    };

    //推薦商品左右切換
    const [currentPosition, setCurrentPosition] = useState(0);
    const itemWidth = 33;
    const visibleItems = 3;
    const totalItems = recommend.length;
    const prevCarousel = () => {
        setCurrentPosition((prevPosition) => Math.min(prevPosition + itemWidth, 0));

    };

    const nextCarousel = () => {
        const maxPosition = -(itemWidth * (totalItems - visibleItems));
        setCurrentPosition((prevPosition) => Math.max(prevPosition - itemWidth, maxPosition));
    };

    const isEnough = () => {
        if (myGash < series.price * $("#quantityInput").val()) {
            alert("你沒有足夠的G幣")
        } else {
            window.location.replace("http://localhost/gachoraProject/public/gachamachine?seriesId=" + gachaId);
        }
    }

    function toggleFavorite() {
        if (user) {
            setIsFavorited(!isFavorited);
            $.post(basePath + "/Post/ToCollection.php", {
                user_id: user_id,
                series_id: gachaId
            })
        } else {
            alert("請先登入")
        }
    }

    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="gachaDetail" />
            <main id='gachaDetail' className="container container-xxl">
                {/* <!-- 商品圖片區塊 --> */}
                <div className="row mt-5">
                    <div className="col-xxl-8">
                        <div className="product-image">
                            <img src={mainImages[currentImageIndex]}
                                alt="商品圖片"
                                id="mainProductImage" /> {/* {mainImages[currentImageIndex]} */}
                            <button className="carousel-control-prev"
                                onClick={prevImage}>&#8249;</button>
                            <button className="carousel-control-next"
                                onClick={nextImage}>&#8250;</button>
                        </div>
                    </div>
                    <div className="col-xxl-4">
                        <div className="product-info">
                            <h1>{series.title} : {series.name}</h1>
                            <h5>產品介紹</h5>
                            <div className="pdinfocolor">
                                <ul>
                                    <h4>價格 : {series.price}</h4>
                                    {/* <li>配送時間:</li> */}
                                    {/* <li>結束日期:</li> */}
                                    {/* <li>產品尺寸:</li> */}
                                    {/* <li>產品材質:</li> */}
                                    <li>種類:共{characters.length}種</li>
                                </ul>
                            </div>
                            <p>機台剩餘數量：<span id="stockCount">{series.remain}</span></p>
                            <p>您的G幣餘額：<span id="coinBalance">{myGash ? myGash : "請先登入"}</span></p>
                            <label htmlFor="quantity">抽取數量</label>
                            <div className="number-input"
                                id="quantity">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/minus-square.png"
                                    className="decrement"
                                    onClick={minusValue} />
                                <input type="number"
                                    id="quantityInput"
                                    defaultValue={quantity}
                                    min="1"
                                    max="100" />
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/add-square.png"
                                    className="increment"
                                    onClick={addValue} />
                                {/* <Link href={route('gachamachine', { seriesId: gachaId })} style={{ textDecoration: "none", color: "var(--main-darkblue)" }}><button onClick={isEnough}>GO</button></Link> */}
                                <button onClick={isEnough}>GO</button>
                            </div>
                            <button
                                className={`Favorite_bt ${isFavorited ? 'active' : ''}`}
                                onClick={toggleFavorite}>
                                <img src={heartImg} alt="" />
                                {isFavorited ? '已收藏' : '加入收藏'}
                            </button>
                            {/* <button className="Restock-bt">補貨通知</button> */}
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
                                probability="30%"
                                productImg={chara.img}
                                key={index}>
                            </GachaDetailCard>
                        ))}
                    </div>
                    <div className="col-xxl-5">
                        <span className="big-image">
                            <img src={bigImageSrc}
                                alt="大圖"
                                id="bigProductImage"
                            />
                        </span>
                    </div>
                </div>

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
                <div className="tab-content mt-4">
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

                {/* <!-- 靜態圖片區塊 --> */}
                <div className="row mt-4">
                    <div className="col-12 static-image">
                        <img src=""
                            alt="靜態教學圖"
                            className="img-fluid" />
                    </div>
                </div>

                {/* <!-- 底部商品切換 --> */}
                <h4 className="text-center">推薦商品</h4>
                <div className="mt-4">
                    <div className=" position-relative d-flex justify-content-center">
                        {/* <!-- 左右按鈕 --> */}
                        <button className="carousel-btn left"
                            onClick={prevCarousel} ><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="" /></button>
                        <div className="carousel-wrapper">
                            <div className="carousel-items" style={{ transform: `translateX(${currentPosition}%)` }}>
                                {/* 假設這裡放 10 個商品圖片 */}
                                {recommend.map((ele, index) => (
                                    <div className="item" key={index}>
                                        <GachaPdCard className="col-md-4 mb-4 d-flex flex-wrap justify-content-center"
                                            seriesId={ele.series_id}
                                            seriesName={ele.title}
                                            productName={ele.name}
                                            productPrice={ele.price}
                                            img={ele.img[0]}
                                            userFavor={userFavor}
                                            key={index}>
                                        </GachaPdCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="carousel-btn right"
                            onClick={nextCarousel}><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" alt="" /></button>
                    </div>
                </div>

            </main>
        </>
    )
}

export default B_3_GachaDetail
