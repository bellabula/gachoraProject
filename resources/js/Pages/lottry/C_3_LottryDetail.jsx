import React from 'react'
import Navbar from '@/Components/Navbar';
import GachaDetailCard from '@/Pages/Gacha/GachaDetailCard';
import GachaPdCard from '@/Components/GachaPdCard';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

function C_3_LottryDetail() {

    //上張圖、下張圖
    const mainImages = ["https://via.placeholder.com/150", "https://via.placeholder.com/250"];
    const [currentImageIndex, setcurrentImageIndex] = useState(0);

    function prevImage() {
        setcurrentImageIndex((currentImageIndex - 1 + mainImages.length) % mainImages.length)
    }

    function nextImage() {
        setcurrentImageIndex((currentImageIndex + 1) % mainImages.length)
    }

    // //加入我的最愛事件
    const [isFavorited, setIsFavorited] = useState(false);
    function toggleFavorite() {
        setIsFavorited(!isFavorited);
    }

    //點集大圖切換
    const [bigImageSrc, setBigImageSrc] = useState(mainImages[0]);

    function switchBigImage(imageSrc) {
        setBigImageSrc(imageSrc);
    }

    // 模擬從資料庫取得的產品資料
    const [allProducts] = useState([
        { id: 1, name: "產品A", probability: "10%", img: "https://via.placeholder.com/250" },
        { id: 2, name: "產品B", probability: "20%", img: "https://via.placeholder.com/250" },
        { id: 3, name: "產品C", probability: "30%", img: "https://via.placeholder.com/350" },
        { id: 4, name: "產品D", probability: "40%", img: "https://via.placeholder.com/450" },
        { id: 5, name: "產品E", probability: "50%", img: "https://via.placeholder.com/550" },
        { id: 6, name: "產品F", probability: "60%", img: "https://via.placeholder.com/650" },
        { id: 7, name: "產品G", probability: "70%", img: "https://via.placeholder.com/750" },
        { id: 8, name: "產品H", probability: "80%", img: "https://via.placeholder.com/850" },
        { id: 9, name: "產品I", probability: "90%", img: "https://via.placeholder.com/950" }
    ]);

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
    const totalItems = allProducts.length;
    const prevCarousel = () => {
        setCurrentPosition((prevPosition) => Math.min(prevPosition + itemWidth, 0));

    };

    const nextCarousel = () => {
        const maxPosition = -(itemWidth * (totalItems - visibleItems));
        setCurrentPosition((prevPosition) => Math.max(prevPosition - itemWidth, maxPosition));
    };

    const [isOpen, setIsOpen] = useState(false);

    // 切換摺疊區域的展開/收起
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    // 模擬從資料庫獲取的數據
    const seatNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // 生成 1~50 的號碼
    const bookedSeats = [5, 10, 15, 25, 30]; // 模擬已被買走的號碼

    const [selectedNumbers, setSelectedNumbers] = useState([]); // 已選中的號碼

    // 處理座位選中/取消的函數
    const toggleSeatSelection = (number) => {
        if (bookedSeats.includes(number)) return; // 已被買走的號碼不可選
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number)); // 取消選中
        } else {
            setSelectedNumbers([...selectedNumbers, number]); // 新增選中
        }
    }

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
                                <img src={mainImages[currentImageIndex]}
                                    alt="商品圖片"
                                    id="mainProductImage" />
                                <button className="carousel-control-prev"
                                    onClick={prevImage}>&#8249;</button>
                                <button className="carousel-control-next"
                                    onClick={nextImage}>&#8250;</button>
                            </div>
                        </div>
                        <div className="col-xxl-4">
                            <div className="product-info">
                                <h1>商品名稱</h1>
                                <div className="pdinfocolor">
                                    <ul>
                                        <li>配送時間:</li>
                                        <li>結束日期:</li>
                                        <li>獎項介紹:</li>
                                        <li>A賞:</li>
                                        <li>B賞:</li>
                                        <li>C賞:</li>
                                        <li>D賞:</li>
                                        <li>E賞:</li>
                                        <li>F賞:</li>
                                        <li>G賞:</li>
                                        <li>種類:共?種</li>
                                    </ul>
                                </div>
                                <h3 className='subtitles'>每抽價格:</h3>
                                <p className='lottrynumber'>剩餘G幣:???</p>
                                <p className='lottrynumber' >已抽人數/總數:</p>
                                <p className='lottrynumber' >排隊人數/等待時間:</p>
                                <button className='Favorite_bt' >點擊往下排隊/抽選</button>
                                <button
                                    className={`Favorite_bt ${isFavorited ? 'active' : ''}`}
                                    onClick={toggleFavorite}>
                                    <img src={isFavorited ? 'http://localhost/gachoraProject/public/images/gachoHome/Vector (2).png' : 'http://localhost/gachoraProject/public/images/gachoHome/Vector.png'} alt="" />
                                    {isFavorited ? '已收藏' : '加入收藏'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- 商品種類小圖 --> */}
                    <div className="row mt-1 d-flex">
                        <div className="col-xxl-7 row" id='sm-pd-grid'>
                            {allProducts.map((product, index) => (
                                <GachaDetailCard
                                    productName={product.name}
                                    switchBigImage={switchBigImage}
                                    probability={product.probability}
                                    productImg={product.img}
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
                            {/* <!-- 左右按鈕 --> */}
                            <button className="carousel-btn left"
                                onClick={prevCarousel} ><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="" /></button>
                            <div className="carousel-wrapper">
                                <div className="carousel-items" style={{ transform: `translateX(${currentPosition}%)` }}>
                                    {/* 假設這裡放 10 個商品圖片 */}
                                    {allProducts.map((product, index) => (
                                        <div className="item" key={index}>
                                            <GachaPdCard
                                                className="d-flex flex-wrap justify-content-center"
                                                seriesName={product.probability}
                                                productName={product.name}
                                                img={product.img}
                                                productPrice="50">
                                            </GachaPdCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="carousel-btn right"
                                onClick={nextCarousel}><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" alt="" /></button>
                        </div>
                    </div>
                </main >
            </body >
        </>
    )
}

export default C_3_LottryDetail