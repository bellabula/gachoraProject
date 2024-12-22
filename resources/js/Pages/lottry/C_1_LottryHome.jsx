import Navbar from '@/Components/Navbar';
import LottryWallItem from '@/Pages/lottry/LottryWallItem';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import PdCard from '@/Components/PdCard';
import Carousel from '@/Components/Carousel'

function C_1_LottryHome() {

    //叫資料
    const [allProducts, setallProducts] = useState([]);
    const [error, setError] = useState();
    const [images, setImages] = useState([]);
    let url = 'http://localhost/gachoraProject/app/Models/Fetch/AllIchiban.php'
    React.useEffect(function () {
        const callAPI = async function () {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error status:${response.status}`);
                }
                const data = await response.json();
                setImages(data.map(item => item.img));
                setallProducts(data);
            } catch (err) {
                setError(err.message);
                setImages(['https://via.placeholder.com/150']);
            }
        };
        callAPI();
    }, [])
    if (error) return <div>Error: {error}</div>;
    //導入會員資料
    const user = usePage().props.auth.user;
    const basePath = '../app/Models'
    const [userFavor, setUerFavor] = useState([]);
    if (user) {
        const user_id = user.id
        let collectEgg = [];
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
                // console.log(userFavor)
                // console.log('蛋收藏：', [...response.has, ...response.no])
            })
        }, [user_id])
    }

    //top10
    const top10Products = allProducts
        .sort((a, b) => b.rank - a.rank)
        .slice(0, 10); // 取前 10 筆資料

    useEffect(() => {
        const itemsContainer = document.querySelector('.items'); // 獲取滑動容器

        // 計算單張卡片的寬度（包括 margin）
        function getCardWidth() {
            const card = document.querySelector('.items > li'); // 獲取單張卡片
            return card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
        }

        // 定義右滑函數
        function scrollRight() {
            if (!itemsContainer) return;
            const cardWidth = getCardWidth();
            itemsContainer.scrollBy({
                left: cardWidth, // 向右滑動一張卡片的寬度
                behavior: 'smooth',
            });
        }
        // 定義左滑函數
        function scrollLeft() {
            if (!itemsContainer) return;
            const cardWidth = getCardWidth();
            itemsContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth',
            });
        }

        // 綁定按鈕點擊事件
        const leftButton = document.getElementById('leftButton');
        const rightButton = document.getElementById('rightButton');

        if (leftButton) {
            leftButton.addEventListener('click', () => {
                console.log('Left button clicked!');
                scrollLeft(); // 呼叫左滑函數
            });
        }

        if (rightButton) {
            rightButton.addEventListener('click', () => {
                console.log('Right button clicked!');
                scrollRight(); // 呼叫右滑函數
            });
        }

        // 綁定鍵盤按鍵事件
        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft') {
                scrollLeft(); // 左鍵觸發左滑
            }
            if (e.key === 'ArrowRight') {
                scrollRight(); // 右鍵觸發右滑
            }
        };

        document.addEventListener('keydown', keyHandler);

        // 清理函數，在組件卸載時移除事件監聽器
        return () => {
            document.removeEventListener('keydown', keyHandler);
            if (leftButton) leftButton.removeEventListener('click', scrollLeft);
            if (rightButton) rightButton.removeEventListener('click', scrollRight);
        };
    }, []);

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

    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue) logout='list-item' " />
            <Head title="LottryHome" />
            <body id='lottrybody'>
                <main id='lottryHome'>
                    {/* <!--輪播圖區--> */}
                    <div className='lottrybody'>
                        <div className="wrapper scroll-x">
                            <button className="carousel-btn left"
                                id="leftButton"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg"
                                    alt="" /></button>
                            <ul className="items">
                                <li>
                                    <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG" alt="Image 1" />
                                </li>
                                <li>
                                    <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG" alt="Image 2" />
                                </li>
                                <li>
                                    <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG" alt="Image 3" />
                                </li>
                                <li>
                                    <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG" alt="Image 4" />
                                </li>
                                <li>
                                    <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG" alt="Image 5" />
                                </li>
                            </ul>
                            <button className="carousel-btn right"
                                id="rightButton"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg"
                                    alt="" /></button>
                        </div>
                    </div>
                    {/* <!--標籤連結--> */}
                    <div className="labelitem d-flex justify-content-end">
                        <div className="ms-1 itemtag"><a href={route('lottrytagpage')}>全部商品</a></div>
                        <div className="ms-1 itemtag"><a href="#">熱門商品</a></div>
                        <div className="ms-1 itemtag"><a href="#">最新商品</a></div>
                        <div className="ms-1 itemtag"><a href="#">限時商品</a></div>
                    </div>
                    <h1 className='lottryTitle'>人氣TOP10</h1>
                    {/* <!--TOP30區--> */}
                    <div className="top30 row mt-1 d-flex">
                        {/* 左側小圖 */}
                        <div className="col-xxl-8 ">
                            <Carousel cols={3} gap={0}>
                                {top10Products.map((product, index) => (
                                    <Carousel.Item key={index}>
                                        <Link className="top10item no-link-style" key={index} href={route('lottrydetail', { seriesId: product.series_id })}>
                                            <div className="top30ProductImg">
                                                <img src={product.img[0]} alt={`商品圖片 ${index + 1}`} />
                                            </div>
                                            <div className="top30ProductText">
                                                {product.title}
                                            </div>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

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
                    </div>
                    <h1 className="text-center lottryTitle">商品牆</h1>
                    <section>
                        {/* <!-- 三排滾動區域 --> */}
                        <section className="scroll-container">
                            <br />
                            <div className="scroll-row">
                                <div className="scroll-content top">
                                    {topRowProducts.map((product, index) => (
                                        <LottryWallItem src={product.img[0]} key={index} />
                                    ))}
                                    {topRowProducts.map((product, index) => (
                                        <LottryWallItem src={product.img[0]} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="scroll-row">
                                <div className="scroll-content bottom">
                                    {bottomRowProducts.map((product, index) => (
                                        <LottryWallItem src={product.img[0]} key={index} />
                                    ))}
                                    {bottomRowProducts.map((product, index) => (
                                        <LottryWallItem src={product.img[0]} key={index} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </section>
                    <div className="b-example-divider"></div>
                    <h1 className="text-center lottryTitle">強檔活動</h1>
                    <div style={{ position: "relative", height: "80vh", width: "100%", color: "var(--main-bg-gray)" }}>
                        <img src="http://localhost/gachoraProject/public/images/gachoHome/banner1.jpg" alt=""
                            style={{ height: "80vh", width: "80%", position: "relative", borderRadius: "120px", display: "block", margin: "auto", border: "20px var(--main-bg-gray) solid" }} />
                        <img src="http://localhost/gachoraProject/public/images/gachoHome/molly1.png" alt="" className='molly'
                            style={{ position: 'absolute', top: "10%", left: "60%", height: "70vh", animation: 'float 3s ease-in-out infinite' }} />
                        <img src="http://localhost/gachoraProject/public/images/gachoHome/molly2.png" alt=""
                            style={{ position: 'absolute', top: "40%", left: "50%", height: "20vh", animation: 'float 8s ease-in-out infinite' }} />
                        <h2 style={{ position: 'absolute', top: "25%", left: "15%", }}>與泡泡瑪特MOLLY</h2>
                        <h1 style={{ position: 'absolute', top: "30%", left: "15%", fontSize: "72px" }}>一同勇闖太空!</h1>
                        <p style={{ position: 'absolute', top: "40%", left: "15%", margin: "10px" }}>
                            探索獨特的太空系列，精彩獎品等你來抽！快來挑戰，開啟屬於你的宇宙探險！</p>
                        <Link
                            className='itemtag no-link-style' style={{ position: 'absolute', top: "42%", left: "30%", border: "none" }}
                            href={route('lottrydetail', { seriesId: 29 })}>
                            點我開抽!
                        </Link>
                    </div>

                    {/* <!-- 底部商品切換 --> */}
                    <h1 className="text-center lottryTitle">推薦商品</h1>
                    <div className="texttext">
                        <Carousel cols={4} gap={0}>
                            {allProducts.map((product, index) => (
                                <Carousel.Item key={index}>
                                    <div className='item'>
                                        <PdCard
                                            pdName={product.name}
                                            pdQuantity={product.remain}
                                            pdTitle={product.title}
                                            pdTotal={product.total}
                                            pdPrice={product.price}
                                            pdAvailable={product.remain >= 0 ? "尚有大賞" : "大賞已釋出"}
                                            aPrizeName={product.character?.[0]?.name || ""}
                                            aRemain={product.character?.[0]?.remain || 0}
                                            aTotal={product.character?.[0]?.total || 0}
                                            bPrizeName={product.character?.[1]?.name || ""}
                                            bRemain={product.character?.[1]?.remain || 0}
                                            bTotal={product.character?.[1]?.total || 0}
                                            cPrizeName={product.character?.[2]?.name || 0}
                                            cRemain={product.character?.[2]?.remain || 0}
                                            cTotal={product.character?.[2]?.total || 0}
                                            userFavor={userFavor}
                                            img={product.img[0]}>
                                        </PdCard>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>


                </main>
            </body>
        </>
    )
}

export default C_1_LottryHome
