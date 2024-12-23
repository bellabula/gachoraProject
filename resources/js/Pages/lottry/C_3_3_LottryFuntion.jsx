import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'turn.js';

const C_3_3_LottryFuntion = () => {
    const bookRef = useRef(null);
    const [remainingDraws, setRemainingDraws] = useState(3);
    const [currentDraw, setCurrentDraw] = useState(0);
    const [showNextDrawButton, setShowNextDrawButton] = useState(false);
    const [showResultButton, setShowResultButton] = useState(false);
    const [drawResults, setDrawResults] = useState([]);
    const [showResultsOnly, setShowResultsOnly] = useState(false);

    const pages = [
        'http://localhost/gachoraProject/public/images/一番賞FT.svg',
        'http://localhost/gachoraProject/public/images/一番賞A.svg',
    ];

    const calculateBookSize = () => {
        const containerWidth = window.innerWidth * 0.5; // Set book width to 50% of window width
        const containerHeight = containerWidth * 0.29; // Set book height proportionally
        return { width: containerWidth, height: containerHeight };
    };

    const [bookSize, setBookSize] = useState(calculateBookSize());
    useEffect(() => {
        if (remainingDraws === 0) {
            setShowResultButton(true);
            setShowNextDrawButton(false);
        }
    }, [remainingDraws]);
    useEffect(() => {
        const resizeHandler = () => {
            const newBookSize = calculateBookSize();
            setBookSize(newBookSize); // Update the state with new dimensions
            if (bookRef.current) {
                $(bookRef.current).turn('size', newBookSize.width, newBookSize.height); // Reinitialize Turn.js with new size
            }
        };

        window.addEventListener('resize', resizeHandler);

        if (typeof $.fn.turn === 'function') {
            $(bookRef.current).turn({
                width: bookSize.width,
                height: bookSize.height,
                autoCenter: true,
                when: {
                    turned: (event, page) => {
                        if (page === pages.length && remainingDraws >= 0) {
                            setRemainingDraws((prev) => prev - 1);
                            setCurrentDraw((prev) => prev + 1);
                            setShowNextDrawButton(true);
                        } else if (page === pages.length && remainingDraws === 0) {
                            showResults(); // 直接顯示結果
                        }
                    },
                },
            });
        } else {
            console.error('Turn.js failed to load');
        }

        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (bookRef.current) {
                $(bookRef.current).turn('destroy'); // Destroy Turn.js on cleanup
            }
        };
    }, [bookSize]);

    const startNextDraw = () => {
        if (remainingDraws > 0) {
            setShowNextDrawButton(false);
            setCurrentDraw((prev) => prev + 1);
            $(bookRef.current).turn('page', 1); // Reset to the first page after the draw
        } else {
            setRemainingDraws(0);
            setShowNextDrawButton(false);
            setShowResultButton(true);
        }
    };

    const showResults = () => {
        const mockResults = [
            { id: 1, prize: 'A賞', img: 'http://localhost/gachoraProject/public/images/ichibanitem/a1-1.png', name: '商品名稱' },
            { id: 2, prize: 'C賞', img: 'http://localhost/gachoraProject/public/images/ichibanitem/a1-3.png', name: '商品名稱' },
        ];
        setDrawResults(mockResults);
        setShowResultsOnly(true);
    };

    return (
        <>
            {!showResultsOnly && (
                <main id="lottryfunction">
                    <span className="gacha-info">
                        <img src="http://localhost/gachoraProject/public/images/一番賞.svg" alt="gachaball" />
                        <h3>X {remainingDraws}</h3>
                    </span>

                    <div className="bg-img-wrapper">
                        <img
                            className="bg-img"
                            src="http://localhost/gachoraProject/public/images/一番賞bg.svg"
                            alt="背景圖片"
                        />
                    </div>

                    <h3 className="product-name">商品名稱</h3>

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

                    {showNextDrawButton && remainingDraws > 0 && (
                        <div className="next-draw-wrapper">
                            <button
                                className="next-draw-button custom-btn btn-lg"
                                onClick={startNextDraw}
                            >
                                下一抽
                            </button>
                        </div>
                    )}

                    {showResultButton && (
                        <div className="result-wrapper">
                            <button
                                className="result-button custom-btn btn-lg"
                                onClick={showResults}
                            >
                                查看獎品
                            </button>
                        </div>
                    )}
                </main>
            )}

            {showResultsOnly && drawResults.length > 0 && (
                <>
                    <div className="result-list text-center mt-5 pt-5">
                        {drawResults.map((item, index) => (
                            <div className="d-inline-block result-item ms-3 me-3" key={index}>
                                <h4 className='text-center'>{item.prize}</h4>
                                <img className='d-block m-auto' src={item.img} width="200px" alt={item.name} />
                                <h4 className='text-center'>{item.name}</h4>
                            </div>
                        ))}
                    </div>
                    <button className='d-block m-auto btn-lg mt-5 custom-btn'>回商品頁面</button>
                </>
            )}
        </>

    );
};

export default C_3_3_LottryFuntion;
