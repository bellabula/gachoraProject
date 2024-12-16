import Navbar from '@/Components/Navbar';
import LottryWallItem from '@/Pages/lottry/LottryWallItem';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

function C_1_LottryHome() {
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
    const [currentIndex, setCurrentIndex] = useState(0);

    const allProducts = [
        { name: "商品 1", img: "#" },
        { name: "商品 2", img: "#" },
        { name: "商品 3", img: "#" },
        { name: "商品 4", img: "#" },
        { name: "商品 5", img: "#" },
        { name: "商品 6", img: "#" },
        { name: "商品 7", img: "#" },
        { name: "商品 8", img: "#" },
        { name: "商品 9", img: "#" },
        { name: "商品 10", img: "#" },
    ];

    const [currentPosition, setCurrentPosition] = useState(0);

    const itemWidth = 33.33;  // 每個商品占的百分比寬度 (33.33%)
    const visibleItems = 3;   // 顯示的商品數量
    const totalItems = allProducts.length; // 商品總數量

    // 上一個按鈕邏輯
    const prevCarousel = () => {
        setCurrentPosition((prevPosition) => Math.min(prevPosition + itemWidth, 0));
    };

    // 下一個按鈕邏輯
    const nextCarousel = () => {
        const maxPosition = -(itemWidth * (totalItems - visibleItems));  // 計算最大移動位置，防止滑動超過最後一個商品
        setCurrentPosition((prevPosition) => Math.max(prevPosition - itemWidth, maxPosition));
    };



    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue) logout='list-item' " />
            <Head title="LottryHome" />
            <body id='lottrybody'>
                <main id='lottryHome'>
                    {/* <!--輪播圖區--> */}
                    <div className='lottrybody'>
                        <div class="wrapper scroll-x">
                            <button class="carousel-btn left"
                                id="leftButton"><img src="http://localhost/gachoraProject/public/images/arrowLeft.svg"
                                    alt="" /></button>
                            <ul class="items">
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
                            <button class="carousel-btn right"
                                id="rightButton"><img src="http://localhost/gachoraProject/public/images/arrowRight.svg"
                                    alt="" /></button>
                        </div>
                    </div>
                    {/* <!--標籤連結--> */}
                    <div class="labelitem d-flex justify-content-end">
                        <div class="ms-1 item"><a href="#">全部商品</a></div>
                        <div class="ms-1 item"><a href="#">熱門商品</a></div>
                        <div class="ms-1 item"><a href="#">最新商品</a></div>
                        <div class="ms-1 item"><a href="#">限時商品</a></div>
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
                                        {allProducts.map((product, index) => (
                                            <div className="top10item" key={index} >
                                                <div className="top30ProductImg">
                                                    <img src={product.img} />
                                                </div>
                                                <div className="top30ProductText">
                                                    {product.name}
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
                            <div className="top30BigProduct"></div>
                        </div>
                    </div>
                    <section>
                        {/* <!-- 三排滾動區域 --> */}
                        <section class="scroll-container">
                            <br />
                            <div class="scroll-row">
                                <div class="scroll-content">
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
                            <div class="scroll-row">
                                <div class="scroll-content">
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
                    <div class="b-example-divider"></div>
                </main>
            </body>
        </>
    )
}

export default C_1_LottryHome
