import Navbar from '@/Components/Navbar';
import GachaWallItem from '@/Pages/Gacha/GachaWallItem';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Carousel from '@/Components/Carousel'
import GachaPdCard from '@/Components/GachaPdCard';
import Footer from '@/Components/Footer';




function B_1_GachaHome() {
    //叫資料
    const [allProducts, setallProducts] = useState([]);
    const [error, setError] = useState();
    const [user_id, setUserId] = useState();
    // const [images, setImages] = useState([]);
    useEffect(function () {
        let url = 'http://localhost/gachoraProject/app/Models/Fetch/AllEgg.php'
        const callAPI = async function () {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error status:`);
                }
                const data = await response.json();
                // setImages(data.map(item => item.img));
                setallProducts(data);
                console.log(data)
            } catch (err) {
                setError(err.message);
                // setImages(['https://via.placeholder.com/150']);
            }
        };
        callAPI();
    }, [])
    if (error) return <div>Error: {error}</div>;

    //導入會員資料
    const user = usePage().props.auth.user;
    const basePath = '../app/Models'
    const [userFavor, setUserFavor] = useState([]);
    useEffect(() => {
        if (user) {
            setUserId(user.id)
            let collectEgg = [];

            $.post(basePath + '/Post/UserCollectionEgg.php', {
                user_id: user_id
            }, (response) => {
                if (typeof (response.has) != "undefined") {
                    collectEgg = [...response.has]
                }
                if (typeof (response.no) != "undefined") {
                    collectEgg = [...collectEgg, ...response.no]
                }
                setUserFavor(collectEgg.map(item => item.id))
                // console.log(userFavor)
                // console.log('蛋收藏：', [...response.has, ...response.no])
            })
        }
    }, [user_id]) //rerenderCount
    //top10
    const top10Products = allProducts
        .sort((a, b) => b.rank - a.rank)
        .slice(0, 10); // 取前 10 筆資料
    //top10大圖自動輪播
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % top10Products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [top10Products]);
    //票卷牆打亂圖片
    const shuffleArray = (array) => {
        const shuffled = [...allProducts] //複製一個新的陣列
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    const shuffledProducts = shuffleArray(allProducts);
    // 將打亂的商品分成上下兩個區域顯示
    const half = Math.floor(shuffledProducts.length / 2);
    const topRowProducts = shuffledProducts.slice(0, half); // 上方顯示的商品
    const bottomRowProducts = shuffledProducts.slice(half); // 下方顯示的商品

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive((prev) => !prev); // 切換狀態
    };

    function toggleHeart(event, seriesId) {
        let updatedFavor = []
        if (user_id) {
            $.post('../app/Models/Post/ToCollection.php', {
                user_id: user_id,
                series_id: seriesId
            })
            if (event.target.classList.contains("active")) {
                // $(event.target).removeClass('active')
                updatedFavor = userFavor.filter(item => item !== seriesId)
            } else {
                // $(event.target).addClass('active')
                updatedFavor = [...userFavor, seriesId]
            }
            setUserFavor(updatedFavor);
            console.log(updatedFavor)
        } else {
            alert("請先登入")
        }
    }
    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="GachaHome" />
            <main id='gachaHome'>
                {/* <!--輪播圖區--> */}
                <div id="mainCarousel"
                    className="carousel slide mb-3"
                    data-bs-ride="carousel">
                    {/* <!--大輪播圖--> */}
                    <div className="bigcarousel carousel-inner">
                        <div className="carousel-item active">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/卡比.JPG"
                                    alt="Image 1"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/banner5.png"
                                    alt="Image 2"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/福莉蓮.JPG"
                                    alt="Image 3"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/NewYear.png"
                                    alt="Image 4"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/航海王遙遙收藏1.JPG"
                                    alt="Image 5"
                                    className="d-block w-100" />
                            </div>
                        </div>
                    </div>

                    {/* <!--小控制圖--> */}
                    <div className="smallcarousel d-flex flex-row-reverse">
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="0"
                            src="http://localhost/gachoraProject/public/images/gachoHome/卡比.JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="1"
                            src="http://localhost/gachoraProject/public/images/gachoHome/banner5.png"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="2"
                            src="http://localhost/gachoraProject/public/images/gachoHome/福莉蓮.JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="3"
                            src="http://localhost/gachoraProject/public/images/gachoHome/NewYear.png"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="4"
                            src="http://localhost/gachoraProject/public/images/gachoHome/航海王遙遙收藏1.JPG"
                            style={{ cursor: "pointer" }} />
                    </div>
                </div>
                {/* <!--標籤連結--> */}
                <div className="labelitem d-flex justify-content-end">
                    <a className="ms-1 itemtag" href={route('gachatagpage') + '?category=all'}><div>全部商品</div></a>
                    <a className="ms-1 itemtag" href={route('gachatagpage') + '?category=熱門商品'}><div >熱門商品</div></a>
                    <a className="ms-1 itemtag" href={route('gachatagpage') + '?category=最新商品'}><div >最新商品</div></a>
                    <a className="ms-1 itemtag" href={route('gachatagpage') + '?category=限量商品'}><div >限量商品</div></a>
                </div>
                <h1 className='gachaTitle'>人氣TOP10</h1>
                {/* <!--TOP30區--> */}
                <div className="top30 row mt-1 d-flex">
                    {/* 右側大圖 */}
                    <div className="col-xxl-4">
                        <div className="top30BigProduct">
                            <img
                                src={top10Products[currentIndex]?.img[0] || 'https://via.placeholder.com/150'}
                                alt={`商品 ${currentIndex + 1}`}
                                onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                        </div>
                        <h3>第{currentIndex + 1}名</h3>
                    </div>
                    {/* 左側小圖 */}
                    <div className="col-xxl-8 ">
                        <Carousel cols={3} gap={0}>
                            {top10Products.map((product, index) => (
                                <Carousel.Item key={index}>
                                    <div className="heart-icon">
                                        <img className={"heart " + (userFavor.includes(product.series_id) ? "active" : "")} onClick={() => toggleHeart(event, product.series_id)} src='http://localhost/gachoraProject/public/images/heart.svg' />
                                    </div>
                                    <Link className="top10item no-link-style" key={index} href={route('gachadetail', { seriesId: product.series_id })}>
                                        <div className="top30ProductImg">
                                            <img src={product.img[0]} alt={`商品圖片 ${index + 1}`} />
                                        </div>
                                        <div className="top30ProductText">
                                            {product.title}
                                        </div>
                                    </Link>
                                </Carousel.Item>
                            )
                            )}
                        </Carousel>
                    </div>
                </div>
                <h1 className='gachaTitle'>商品牆</h1>
                <section>
                    {/* <!-- 三排滾動區域 --> */}
                    <section className="scroll-container">
                        <br />
                        <div className="scroll-row">
                            <div className="scroll-content top">
                                {topRowProducts.map((product, index) => (
                                    <GachaWallItem src={product.img[0]} key={index} />
                                ))}
                                {topRowProducts.map((product, index) => (
                                    <GachaWallItem src={product.img[0]} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="scroll-row">
                            <div className="scroll-content bottom">
                                {bottomRowProducts.map((product, index) => (
                                    <GachaWallItem src={product.img[0]} key={index} />
                                ))}
                                {bottomRowProducts.map((product, index) => (
                                    <GachaWallItem src={product.img[0]} key={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                </section>
                <div className="b-example-divider"></div>
                <h1 className="text-center gachaTitle">強檔活動</h1>
                <div style={{ position: "relative", height: "80vh", width: "100%", color: "var(--main-bg-gray)" }}>
                    <img src="http://localhost/gachoraProject/public/images/gachoHome/gachaActivity.jpg" alt=""
                        style={{ height: "80vh", width: "80%", position: "relative", borderRadius: "120px", display: "block", margin: "auto", border: "20px var(--main-yellow ) solid" }} />
                    <img src="http://localhost/gachoraProject/public/images/gachoHome/molly3.png" alt=""
                        className={`molly molly3 ${isActive ? "active" : ""}`}
                        onClick={handleClick}
                        style={{ position: 'absolute', top: "25%", left: "35%", height: "60vh", animation: 'floatA 3s ease-in-out infinite' }} />
                    <img src="http://localhost/gachoraProject/public/images/gachoHome/molly4.png" alt=""
                        style={{ position: 'absolute', top: "10%", left: "60%", height: "40vh", animation: 'float 8s ease-in-out infinite' }} />
                    <h2 style={{ position: 'absolute', top: "15%", left: "15%", }}>與泡泡瑪特MOLLY</h2>
                    <h1 style={{ position: 'absolute', top: "20%", left: "15%", fontSize: "72px" }}>一起在太空漫遊!</h1>
                    <p style={{ position: 'absolute', top: "33%", left: "15%", margin: "10px" }}>
                        探索獨特的太空系列，精彩獎品等你來抽！快來挑戰，開啟屬於你的宇宙探險！</p>
                    <h5 style={{
                        position: 'absolute', top: "70%", left: "20%", margin: "10px", color: "var(--main-darkblue)",
                        backgroundColor: "var(--main-yellow )", padding: "10px", borderRadius: "20px"
                    }}>點擊Molly啟程!</h5>
                    <Link
                        className='itemtag no-link-style mollyClick' style={{ position: 'absolute', top: "35%", left: "30%", border: "none" }}
                        href={route('gachadetail', { seriesId: 4 })}>
                        點我開抽!
                    </Link>
                </div>
                {/* <!-- 底部商品切換 --> */}
                <h1 className="text-center gachaTitle">推薦商品</h1>
                <div className="texttext">
                    <Carousel cols={4} gap={0}>
                        {allProducts.map((product, index) => (
                            <Carousel.Item key={index}>
                                <div className='item'>
                                    <GachaPdCard className="col-md-4 mb-4 d-flex flex-wrap justify-content-center"
                                        seriesId={product.series_id}
                                        seriesName={product.title}
                                        productName={product.name}
                                        productPrice={product.price}
                                        img={product.img[0]}
                                        userFavor={userFavor}
                                        key={index}>
                                    </GachaPdCard>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </main>
            <Footer imgSrc='http://localhost/gachoraProject/public/images/Footer4.svg'></Footer>
        </>
    )
}

export default B_1_GachaHome
