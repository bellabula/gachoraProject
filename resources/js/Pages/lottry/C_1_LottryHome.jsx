import Navbar from '@/Components/Navbar';
import GachaWallItem from '@/Pages/Gacha/GachaWallItem';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';

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
                        <div class="ms-1 item"><a href={route('lottrytagpage')}>全部商品</a></div>
                        <div class="ms-1 item"><a href="#">熱門商品</a></div>
                        <div class="ms-1 item"><a href="#">最新商品</a></div>
                        <div class="ms-1 item"><a href="#">限時商品</a></div>
                    </div>
                    <h1 className='lottryTitle'>人氣TOP10</h1>
                    {/* <!--TOP30區--> */}
                    <div class="top30 d-flex flex-wrap justify-content-center">
                        {/* <!--右側小圖--> */}
                        <div class="ms-5">
                            {/* <!--垂直flex--> */}
                            <div class="d-flex flex-column ">
                                <img src="#"
                                    class="top30ProductImg"></img>
                                <div class="top30ProductText text-center">
                                    【食小福 第一彈】
                                    <br />
                                    狐狸小穗、貓貓栗子
                                </div>
                            </div>
                        </div>
                        {/* <!--右側小圖--> */}
                        <div class="ms-5 ">
                            {/* <!--垂直flex--> */}
                            <div class="d-flex flex-column ">
                                <img src="#"
                                    class="top30ProductImg"></img>
                                <div class="top30ProductText text-center">
                                    【食小福 第一彈】
                                    <br />
                                    狐狸小穗、貓貓栗子
                                </div>
                            </div>
                        </div>
                        {/* <!--右側小圖--> */}
                        <div class="ms-5 ">
                            {/* <!--垂直flex--> */}
                            <div class="d-flex flex-column ">
                                <img src="#"
                                    class="top30ProductImg"></img>
                                <div class="top30ProductText text-center">
                                    【食小福 第一彈】
                                    <br />
                                    狐狸小穗、貓貓栗子
                                </div>
                            </div>
                        </div>
                        {/* <!--左側大圖--> */}
                        <div class="ms-5">
                            <div class="top30BigProduct"></div>
                        </div>
                    </div>
                    <section>
                        {/* <!-- 三排滾動區域 --> */}
                        <section class="scroll-container">
                            <br />
                            <div class="scroll-row">
                                <div class="scroll-content">
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                </div>
                            </div>
                            <div class="scroll-row">
                                <div class="scroll-content">
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
                                    <GachaWallItem src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg" />
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
