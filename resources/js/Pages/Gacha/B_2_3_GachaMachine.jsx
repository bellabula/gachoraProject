import { Head, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function B_2_3GachaMachine() {
    const amount = localStorage.getItem("quantity")
    const [animation3Completed, setAnimation3Completed] = useState(false);
    const [remainingDraws, setRemainingDraws] = useState(amount); // 剩餘抽數
    const [currentDraw, setCurrentDraw] = useState(0); // 當前抽數
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false); // 控制動畫播放
    const [showNextDrawButton, setShowNextDrawButton] = useState(false); // 控制"下一抽"按鈕顯示
    const animation5InstanceRef = useRef(null);
    const [drawResults, setDrawResults] = useState([]);
    const [showResultsOnly, setShowResultsOnly] = useState(false);
    const [currentEgg, setCurrentEgg] = useState(null)

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
            console.log("start: 扭蛋機動畫")
            setRemainingDraws((prev) => prev - 1);
            animationInstance3.play();
            animationInstance3.addEventListener("complete", () => {
                setAnimation3Completed(true); // animation3 播放完成
                console.log("完成扭蛋機動畫")
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
            console.log("刪除扭蛋機動畫")
        };
    }, []);

    useEffect(() => {
        if (animation3Completed) {
            // 只在 animation3 完成後載入 animation5
            console.log("啟動開彈動畫")
            loadAndPlayAnimation5();
        }
        // animation3Completed 只有一次，以下沒機會做
        return () => {
            if (animation5InstanceRef.current) {
                console.log("刪除開蛋動畫return")
                animation5InstanceRef.current.destroy(); // 清理動畫
                animation5InstanceRef.current = null;
            }
        };
    }, [animation3Completed]);

    const loadAndPlayAnimation5 = () => {
        console.log(animation5InstanceRef.current)
        if (animation5InstanceRef.current) {
            console.log("刪除開蛋動畫")
            animation5InstanceRef.current.destroy(); // 清除現有動畫實例
        }
        console.log("建立新的開蛋動畫")
        animation5InstanceRef.current = lottie.loadAnimation({
            container: document.getElementById("animation5"),
            renderer: "svg",
            loop: false,
            autoplay: false, // 確保動畫不自動播放
            path: `http://localhost/gachoraProject/resources/json/扭蛋打開.json`,
        });

        playAnimation5();
        console.log("完成開蛋動畫")
    };

    const playAnimation5 = () => {
        console.log("是否在扭 : " + isAnimationPlaying)
        if (animation5InstanceRef.current && !isAnimationPlaying) {
            setIsAnimationPlaying(true); // 標記動畫正在播放
            console.log("開蛋中... : animation" + isAnimationPlaying)
            animation5InstanceRef.current.play();

            animation5InstanceRef.current.addEventListener("complete", () => {
                setIsAnimationPlaying(false); // 動畫播放結束
                console.log("結束開蛋 : animation" + isAnimationPlaying)
                setShowNextDrawButton(true); // 顯示"下一抽"按鈕
                console.log("顯示下一抽按鈕")
            });
        }
    };

    const startNextDraw = () => {
        console.log("按下按鈕")
        console.log("remain:" + remainingDraws)
        console.log("isAnimationPlaying:" + isAnimationPlaying)
        if (remainingDraws > 0 && !isAnimationPlaying) {
            setCurrentEgg(response[response.length-remainingDraws])
            console.log("Do")
            setShowNextDrawButton(false); // 隱藏"下一抽"按鈕
            loadAndPlayAnimation5(); // 重新加載並播放 animation5
            setRemainingDraws((prev) => prev - 1); // 更新剩餘抽數
            // setCurrentDraw((prev) => prev + 1); // 更新當前抽數
        }

        // if (remainingDraws === 0) {
        //     navigate('/gachaHome'); // 最後一次抽完跳轉到 gachaHome 頁面
        // }
    };

    // 接資料庫
    const user = usePage().props.auth.user;
    const user_id = user.id
    const gachaId = usePage().props.seriesId;
    const basePath = '../app/Models'
    const [response, setResponse] = useState([])
    useEffect(() => {
        $.post(basePath + '/Post/PlayEgg.php', {
            user_id: user_id,
            series_id: gachaId,
            amounts: amount
        }, (response) => {
            setResponse(response)
            console.log(response)
            setCurrentEgg(response[0])
        })
        localStorage.setItem("quantity", 0)
    }, [])

    const showResults = () => {
        const mockResults = response;
        setDrawResults(mockResults);
        setShowResultsOnly(true);
    };
    return (
        <div style={{ backgroundColor: "var(--main-darkblue)", height: "100vh" }}>
            <Head title="GachaMachine" />

            {!showResultsOnly && (
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
                    {animation3Completed && remainingDraws >= 0 && (
                        <div className="gacha-result active">
                            <div className="gacha-egg" onClick={playAnimation5}>
                                <div id="animation5"></div>
                            </div>
                            <div className="content">
                                {/* {response.map((ele, index) => (
                                    <div key={index}>
                                        <img src={ele.img} alt="扭蛋" />
                                        <h3>{ele.name}</h3>
                                    </div>
                                ))} */}
                                <div>
                                    <img src={currentEgg.img} alt="扭蛋" />
                                    <h3>{currentEgg.name}</h3>
                                </div>
                            </div>
                            {showNextDrawButton && remainingDraws > 0 && (
                                <button
                                    className="next-draw-button custom-btn btn-lg"
                                    onClick={startNextDraw}
                                >
                                    下一抽
                                </button>
                            )}
                            {showNextDrawButton && remainingDraws == 0 && (
                                <button
                                    className="next-draw-button custom-btn btn-lg"
                                    onClick={showResults}
                                >
                                    查看獎品
                                </button>
                            )}

                        </div>
                    )}
                </main >
            )}
            {showResultsOnly && drawResults.length > 0 && (
                <>
                    <div className="result-list text-center" style={{ paddingTop: "250px" }}>
                        {drawResults.map((item, index) => (
                            <div key={index} className="d-inline-block result-item ms-3 me-3">
                                <img className='d-block m-auto' width="150px" src={item.img} alt={item.name} />
                                <h4 className='text-center' style={{ color: "white" }}>{item.name}</h4>
                            </div>
                        ))}
                    </div>
                    <a href={route('gachadetail', { seriesId: gachaId })} className='no-link-style'><button className='d-block m-auto btn-lg mt-5 custom-btn'>回商品頁面</button></a>
                </>
            )}

        </div>
    );
}

export default B_2_3GachaMachine;