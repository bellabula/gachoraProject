import Navbar from '@/Components/Navbar';
import LottryWallItem from '@/Pages/lottry/LottryWallItem';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import PdCard from '@/Components/PdCard';
import Carousel from '@/Components/Carousel'

function C_1_LottryHome() {
    const [allProducts, setallProducts] = useState([]);
    const [error, setError] = useState();

    let url = 'http://localhost/gachoraProject/app/Models/Fetch/AllIchiban.php'

    React.useEffect(function () {
        console.log("Fetching data...");
        const callAPI = async function () {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error status:${response.status}`);
                }
                const data = await response.json();
                setallProducts(data);
                console.log(data[0].title)
            } catch (err) {
                setError(err.message);
            }
        };
        callAPI();
    }, [])
    if (error) return <div>Error: {error}</div>;

    const top10Products = allProducts
        .sort((a, b) => b.rank - a.rank) // 按 rank 從大到小排序
        .slice(0, 10); // 取前 10 筆資料

    console.log(top10Products)

    useEffect(() => {
        const itemsContainer = document.querySelector('.items'); // 獲取滑動容器

        // 計算單張卡片的寬度（包括 margin）
        function getCardWidth() {
            const card = document.querySelector('.items > li'); // 獲取單張卡片
            return card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
        }

        // 定義右滑函數
        function scrollRight() {
            if (!itemsContainer) return; // 確保 itemsContainer 已定義
            const cardWidth = getCardWidth(); // 單張卡片的寬度
            itemsContainer.scrollBy({
                left: cardWidth, // 向右滑動一張卡片的寬度
                behavior: 'smooth', // 平滑滑動
            });
        }

        // 定義左滑函數
        function scrollLeft() {
            if (!itemsContainer) return; // 確保 itemsContainer 已定義
            const cardWidth = getCardWidth(); // 單張卡片的寬度
            itemsContainer.scrollBy({
                left: -cardWidth, // 向左滑動一張卡片的寬度
                behavior: 'smooth', // 平滑滑動
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

    const [currentPosition, setCurrentPosition] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemWidth = 260 + 20 + 20;
    const visibleItems = 3;   // 顯示的商品數量
    const totalItems = 10; // 商品總數量

    // 上一個按鈕邏輯
    const prevCarousel = () => {
        setCurrentPosition((prevPosition) => Math.min(prevPosition + itemWidth, 0));
        console.log(prevPosition)
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // 下一個按鈕邏輯
    const nextCarousel = () => {
        const maxPosition = -(itemWidth * (totalItems - visibleItems));  // 計算最大移動位置，防止滑動超過最後一個商品
        console.log(maxPosition)
        setCurrentPosition((prevPosition) => Math.max(prevPosition - itemWidth, maxPosition));
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, top10Products.length - 1));  // 防止索引超過最大值
    };


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
                            <div className="position-relative d-flex justify-content-center">
                                {/* 左右按鈕 */}
                                <button className="carousel-btn left" onClick={prevCarousel}>
                                    <img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="Left Arrow" />
                                </button>

                                <div className="carousel-wrapper row">
                                    <div className="carousel-items col-xl-4" style={{ transform: `translateX(${currentPosition}%)` }}>
                                        {/* 顯示商品 */}
                                        {top10Products.map((product, index) => (
                                            <div className="top10item" key={index} >
                                                <div className="top30ProductImg">
                                                    <img src={product.img} alt={`商品圖片 ${index + 1}`} />
                                                </div>
                                                <div className="top30ProductText">
                                                    {product.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className="carousel-btn right" onClick={nextCarousel}>
                                    <img src="http://localhost/gachoraProject/public/images/arrowRight.svg" alt="Right Arrow" />
                                </button>
                            </div>
                        </div>

                        {/* 右側大圖 */}
                        <div className="col-xxl-4">
                            <div className="top30BigProduct"><img src={top10Products[currentIndex]?.img} alt={`商品 ${currentIndex + 1}`} /></div>
                        </div>
                    </div>
                    <section>
                        {/* <!-- 三排滾動區域 --> */}
                        <section className="scroll-container">
                            <br />
                            <div className="scroll-row">
                                <div className="scroll-content">
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                </div>
                            </div>
                            <div className="scroll-row">
                                <div className="scroll-content">
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <LottryWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                </div>
                            </div>
                        </section>
                    </section>
                    <div className="b-example-divider"></div>
                    {/* <!-- 底部商品切換 --> */}
                    <h1 className="text-center lottryTitle">推薦商品</h1>
                    <div className="mt-4">
                        <div className=" position-relative d-flex justify-content-center">
                            {/* <!-- 左右按鈕 --> */}
                            <button className="carousel-btn left"
                                onClick={prevCarousel} ><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="" /></button>
                            <div className="carousel-wrapper">
                                <div className="carousel-items" style={{ transform: `translateX(${currentPosition}%)` }}>
                                    {/* 假設這裡放 10 個商品圖片 */}
                                    {allProducts.map((product, index) => (
                                        <div className="itembottom" key={index}>
                                            <PdCard className="d-flex flex-wrap justify-content-center"
                                                pdName={product.name}
                                                pdQuantity={5}
                                                pdTotal={50}
                                                pdPrice={'500'}
                                                pdAvailable={'尚有大賞'}
                                                aPrizeName={'魯夫'}
                                                bPrizeName={'魯夫'}
                                                cPrizeName={'魯夫'}
                                                img={product.img}>
                                            </PdCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="carousel-btn right"
                                onClick={nextCarousel}><img src="http://localhost/gachoraProject/public/images/arrowRight.svg" alt="" /></button>
                        </div>
                    </div>
                    <div className="texttext">
                        <Carousel cols={3} gap={0}>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="item"><PdCard></PdCard></div>
                            </Carousel.Item>
                        </Carousel>
                    </div>


                </main>
            </body>
        </>
    )
}

export default C_1_LottryHome
