import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function B_2_3GachaMachine() {
    const [animation3Completed, setAnimation3Completed] = useState(false);
    const [remainingDraws, setRemainingDraws] = useState(5); // 剩餘抽數
    const [currentDraw, setCurrentDraw] = useState(0); // 當前抽數
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false); // 控制動畫播放
    const [showNextDrawButton, setShowNextDrawButton] = useState(false); // 控制"下一抽"按鈕顯示
    const animation5InstanceRef = useRef(null);

    useEffect(() => {
        // 初始化 animation3
        const animationInstance3 = lottie.loadAnimation({
            container: document.getElementById("animation3"),
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: `http://localhost/gachoraProject/resources/json/扭蛋選轉.json`,
        });

        const handleClick = () => {
            animationInstance3.play();
            animationInstance3.addEventListener("complete", () => {
                setAnimation3Completed(true); // animation3 播放完成
            });
        };

        const animationContainer = document.getElementById("animation3");
        if (animationContainer) {
            animationContainer.addEventListener("click", handleClick);
        }

        return () => {
            if (animationContainer) {
                animationContainer.removeEventListener("click", handleClick);
            }
            animationInstance3.destroy();
        };
    }, []);

    useEffect(() => {
        if (animation3Completed) {
            // 只在 animation3 完成後載入 animation5
            loadAndPlayAnimation5();
        }

        return () => {
            if (animation5InstanceRef.current) {
                animation5InstanceRef.current.destroy(); // 清理動畫
                animation5InstanceRef.current = null;
            }
        };
    }, [animation3Completed]);

    const loadAndPlayAnimation5 = () => {
        if (animation5InstanceRef.current) {
            animation5InstanceRef.current.destroy(); // 清除現有動畫實例
        }

        animation5InstanceRef.current = lottie.loadAnimation({
            container: document.getElementById("animation5"),
            renderer: "svg",
            loop: false,
            autoplay: false, // 確保動畫不自動播放
            path: `http://localhost/gachoraProject/resources/json/扭蛋打開.json`,
        });

        playAnimation5();
    };

    const playAnimation5 = () => {
        if (animation5InstanceRef.current && !isAnimationPlaying) {
            setIsAnimationPlaying(true); // 標記動畫正在播放
            animation5InstanceRef.current.play();

            animation5InstanceRef.current.addEventListener("complete", () => {
                setIsAnimationPlaying(false); // 動畫播放結束
                setShowNextDrawButton(true); // 顯示"下一抽"按鈕
            });
        }
    };

    const startNextDraw = () => {
        if (remainingDraws > 0 && !isAnimationPlaying) {
            setShowNextDrawButton(false); // 隱藏"下一抽"按鈕
            loadAndPlayAnimation5(); // 重新加載並播放 animation5
            setRemainingDraws((prev) => prev - 1); // 更新剩餘抽數
            setCurrentDraw((prev) => prev + 1); // 更新當前抽數
        }

        if (remainingDraws === 1) {
            navigate('/gachaHome'); // 最後一次抽完跳轉到 gachaHome 頁面
        }
    };

    return (
        <>
            <Head title="GachaMachine" />
            <main id="gachaMachine">
                {/* 剩餘抽數顯示 */}
                <span className="gacha-info">
                    <img src="http://localhost/gachoraProject/public/images/gachaball-01.svg" alt="gachaball" />
                    <h3>X {remainingDraws}</h3>
                </span>

                {/* 扭蛋動畫 */}
                <div className={`animation-container ${animation3Completed ? "hidden" : ""}`}>
                    <div id="animation3" className="animationgif"></div>
                    <img src="http://localhost/gachoraProject/public/images/arrow.gif" className="click_arrow" />
                    <p className="click-prompt">請點擊</p>
                </div>

                {/* 扭蛋結果顯示 */}
                {animation3Completed && remainingDraws > 0 && (
                    <div className="gacha-result active">
                        <div className="gacha-egg" onClick={playAnimation5}>
                            <div id="animation5"></div>
                        </div>
                        <div className="content">
                            <img src="http://localhost/gachoraProject/public/images/扭蛋.jpg" alt="扭蛋" />
                            <h3>商品名稱</h3>
                        </div>
                        {showNextDrawButton && (
                            <button
                                className="next-draw-button custom-btn btn-lg"
                                onClick={startNextDraw}
                            >
                                下一抽
                            </button>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

export default B_2_3GachaMachine;
