import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'turn.js'; // 引入 Turn.js

const C_3_3_LottryFuntion = () => {
    const bookRef = useRef(null);
    const [remainingDraws, setRemainingDraws] = useState(3); // 剩餘抽數
    const [currentDraw, setCurrentDraw] = useState(0); // 當前抽數
    const [showNextDrawButton, setShowNextDrawButton] = useState(false); // 控制 "下一抽" 按鈕顯示
    const pages = [
        'http://localhost/gachoraProject/public/images/一番賞FT.svg',
        'http://localhost/gachoraProject/public/images/一番賞A.svg',
    ];

    const calculateBookSize = () => {
        const containerWidth = window.innerWidth * 0.5; // 書本寬度為螢幕寬度的 80%
        const containerHeight = containerWidth * 0.29; // 書本高度按比例設定
        return { width: containerWidth, height: containerHeight };
    };

    const [bookSize, setBookSize] = useState(calculateBookSize()); // 初始化書本尺寸

    useEffect(() => {
        const resizeHandler = () => {
            setBookSize(calculateBookSize());
            if (bookRef.current) {
                $(bookRef.current).turn('size', bookSize.width, bookSize.height);
            }
        };

        window.addEventListener('resize', resizeHandler);

        if (typeof $.fn.turn === 'function') {
            $(bookRef.current).turn({
                width: bookSize.width, // 書本動態寬度
                height: bookSize.height, // 書本動態高度
                autoCenter: true,
                when: {
                    turned: (event, page) => {
                        console.log(`Page turned to: ${page}`);
                        if (page === pages.length) {
                            setShowNextDrawButton(true); // 顯示 "下一抽" 按鈕
                        }
                    },
                },
            });
        } else {
            console.error('Turn.js 未正確加載');
        }

        return () => {
            // 清理 Turn.js 資源
            window.removeEventListener('resize', resizeHandler);
            if (bookRef.current) {
                $(bookRef.current).turn('destroy');
            }
        };
    }, [bookSize]);

    const startNextDraw = () => {
        if (remainingDraws > 1) {
            setShowNextDrawButton(false); // 隱藏按鈕
            setRemainingDraws((prev) => prev - 1); // 減少剩餘抽數
            setCurrentDraw((prev) => prev + 1); // 增加當前抽數
            $(bookRef.current).turn('page', 1); // 重置到第一頁
        } else {
            console.log('抽獎已完成，跳轉至首頁');
            // navigate('/gachaHome'); // 跳轉至首頁
        }
    };

    return (
        <main id="lottryfunction">
            {/* 剩餘抽數顯示 */}
            <span className="gacha-info">
                <img src="http://localhost/gachoraProject/public/images/一番賞.svg" alt="gachaball" />
                <h3>X {remainingDraws}</h3>
            </span>
            {/* 背景層 */}
            <div className="bg-img-wrapper">
                <img
                    className="bg-img"
                    src="http://localhost/gachoraProject/public/images/一番賞bg.svg"
                    alt="背景圖片"
                />
            </div>

            {/* 商品名稱 */}
            <h3 className="product-name">商品名稱</h3>

            {/* 翻頁書 */}
            <div
                ref={bookRef}
                className="book"
                style={{ width: bookSize.width, height: bookSize.height }}
            >
                {pages.map((page, index) => (
                    <div key={index} className="page">
                        <img src={page} alt={`page-${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* "下一番" 按鈕 */}
            {showNextDrawButton && (
                <div className="next-draw-wrapper">
                    <button
                        className="next-draw-button custom-btn btn-lg"
                        onClick={startNextDraw}
                    >
                        下一抽
                    </button>
                </div>
            )}
        </main>
    );
};

export default C_3_3_LottryFuntion;
