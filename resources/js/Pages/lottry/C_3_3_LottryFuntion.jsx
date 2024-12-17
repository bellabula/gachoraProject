import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'turn.js'; // 引入 Turn.js

const C_3_3_LottryFuntion = () => {
    const bookRef = useRef(null);

    useEffect(() => {
        if (typeof $.fn.turn === 'function') {
            $(bookRef.current).turn({
                width: 880, // 書本寬度 (像素)
                height: 250, // 書本高度 (像素)
                autoCenter: true,
            });
        } else {
            console.error('Turn.js 未正確加載');
        }
    }, []);

    const pages = [
        'http://localhost/gachoraProject/public/images/一番賞FT.svg',
        'http://localhost/gachoraProject/public/images/一番賞A.svg',
    ];

    return (
        <main id="lottryfunction">
            {/* 剩餘抽數顯示 */}
            <span className="gacha-info">
                <img src="http://localhost/gachoraProject/public/images/一番賞.svg" alt="gachaball" />
                <h3>X 5</h3>
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
            <div ref={bookRef} className="book">
                {pages.map((page, index) => (
                    <div key={index} className="page">
                        <img src={page} alt={`page-${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* "下一番" 按鈕 */}
            {/* <div className="next-draw-wrapper">
                <button className="next-draw-button custom-btn btn-lg">下一番</button>
            </div> */}
        </main>
    );
};

export default C_3_3_LottryFuntion;
