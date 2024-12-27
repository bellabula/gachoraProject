import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import ScrollToTop from '@/Components/ScrollTop';

export default function Welcome({ auth, laravelVersion, phpVersion }) {


    useEffect(function () {

        //開頭動畫
        lottie.loadAnimation({
            container: document.getElementById("animation2"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: `http://localhost/gachoraProject/resources/json/universe.json`,
        });
        const animation = lottie.loadAnimation({
            container: document.getElementById("animation1"),
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: `http://localhost/gachoraProject/resources/json/homebegin.json`,
        });


        //按鈕在動畫後出現

        animation.addEventListener('complete', function () {
            console.log('Animation complete');
            const button1 = document.getElementById('button1');
            const button2 = document.getElementById('button2');
            // 添加類名來顯示按鈕
            button1.classList.add('show-buttons');
            button2.classList.add('show-buttons');
            console.log(button1, button2);  // Confirm buttons' visibility change
        });

        //logo 漂走
        const title = document.getElementById('animation1');
        console.log(title)
        document.addEventListener('scroll', function () {
            let value = window.scrollY;
            let scale = Math.max(1 - value / 1000, 0.5); // Shrink to 50% minimum
            let translateY = -Math.min(value / 2, 200); // Move up to -200px max

            title.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        });

        // 雲朵漂走
        const clouds = document.querySelector('.d_cloud');
        let lastScrollY = 0;
        console.log(clouds)

        document.addEventListener('scroll', function () {
            let value = window.scrollY;
            let delta = value - lastScrollY;
            lastScrollY = value;

            // Apply easing to create a delay and smooth movement
            let translateY = Math.min(value / 5, 800); // Move down slower
            let opacity = Math.max(1 - value / 1000, 0); // Fade out more smoothly

            clouds.style.transform = `translateY(${translateY}px)`;
            clouds.style.opacity = opacity;
        });

        // 監聽頁面的滾動事件
        window.addEventListener("scroll", function () {
            var scrollHint = document.querySelector(".scroll-hint");

            // 當頁面向下滾動 100px 時，隱藏 "往下滑"
            if (window.scrollY > 100) {
                scrollHint.style.display = "none";
            } else {
                scrollHint.style.display = "flex";
            }
        });

        //扭蛋動畫
        const animation3 = lottie.loadAnimation({
            container: document.getElementById("animation3"),
            renderer: "svg",
            loop: true,
            autoplay: true, // autoplay false for manual trigger
            path: `http://localhost/gachoraProject/resources/json/eggrotate.json`,
        });

        const animation4 = lottie.loadAnimation({
            container: document.getElementById("animation4"),
            renderer: "svg",
            loop: true,
            autoplay: true, // autoplay false for manual trigger
            path: `http://localhost/gachoraProject/resources/json/egghit.json`,
        });

        return () => {
            animation.destroy();
        };
    }, []);



    //選轉按鈕
    let isFormVisible = false;

    function toggleRotation() {
        const icon = document.getElementById('rotate-icon');
        const formContainer = document.querySelector('.desc_form');
        const formContent = document.querySelector('.desc');
        const ichibanSection = document.querySelector('.container1');

        // 計算根據螢幕寬度動態設置的 marginTop
        let marginTopValue;
        if (window.innerWidth < 576) {
            // 螢幕寬度小於 576px 時，設置較小的 marginTop
            marginTopValue = '400px';
        } else if (window.innerWidth < 768) {
            // 螢幕寬度小於 768px 時，設置中等的 marginTop
            marginTopValue = '600px';
        } else if (window.innerWidth < 1024) {
            // 螢幕寬度小於 1024px 時，設置中等的 marginTop
            marginTopValue = '800px';
        } else {
            // 螢幕寬度大於或等於 1024px 時，設置較大的 marginTop
            marginTopValue = '1700px';
        }

        if (!isFormVisible) {
            icon.classList.add('rotate');
            formContainer.classList.add('show');
            formContent.classList.add('show');
            icon.classList.remove('reverse-rotate');
            ichibanSection.style.marginTop = marginTopValue;
        } else {
            icon.classList.add('reverse-rotate');
            formContainer.classList.remove('show');
            formContent.classList.remove('show');
            ichibanSection.style.marginTop = '0';
        }

        isFormVisible = !isFormVisible;
    }

    // 一翻賞內容
    const sliders = document.querySelectorAll(".slide-in");

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -300px 0px"
    };

    const appearOnScroll = new IntersectionObserver(
        function (entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.classList.remove("appear");
                } else {
                    entry.target.classList.add("appear");
                    // appearOnScroll.unobserve(entry.target);
                }
            });
        },
        appearOptions);

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });




    return (
        <>

            <Head title="GachoraHome" />



            <main id="homepage" style={{ backgroundColor: "var(--main-darkblue)", margin: "0px", height: "auto" }}>
                <Navbar svgColor="none" textColor="white" homepage="true" />
                {/* 首頁開始/動畫/按鈕 */}

                <div id="home">

                    <div id="animation1" style={{ position: 'absolute', top: 0, left: 0 }}></div>
                    <div id="animation2" style={{ position: 'absolute', top: 0, left: 0 }}></div>
                    <section className="clouds">
                        <img src="http://localhost/gachoraProject/public/images/darkclouds.svg" className="d_cloud" />
                        <img src="http://localhost/gachoraProject/public/images/lightclouds.svg" className="l_cloud" />
                        <div className="mycontainer">
                            <a href={route('gachaHome')}><button type="button" className="btn custom-btn btn-lg" id="button1">
                                前往扭蛋頁面
                            </button></a>
                            <a href={route('lottryHome')}><button type="button" className="btn custom-btn btn-lg" id="button2">
                                前往一番賞頁面
                            </button></a>
                        </div>
                    </section>
                    <div className="scroll-hint">
                        <p>
                            往下滑 <span className="arrow">
                                <img src="http://localhost/gachoraProject/public/images/arrow.gif" alt="" />
                            </span>
                        </p>
                    </div>
                </div>
                {/* 選轉按鈕 */}
                <div id="rotate">
                    <img
                        id="rotate-icon"
                        src="http://localhost/gachoraProject/public/images/rotatebutton.svg"
                        alt="rotate icon"
                        onClick={() => toggleRotation()} // Define `toggleRotation` function if used
                        style={{ cursor: 'pointer' }}
                    />
                    {/* 點開按鈕後內容 */}
                    <div className="desc_form">
                        <div className="desc">
                            <form>
                                <div className='abimg'>
                                    <img src="http://localhost/gachoraProject/public/images/abimg-01.svg" alt="about us img1" />
                                </div>
                                <div className='abimg2'>
                                    <img src="http://localhost/gachoraProject/public/images/abimg2-01.svg" alt="about us img2" />
                                </div>
                                <div className='ab1'>
                                    <div className='image-container'>
                                        <img src="http://localhost/gachoraProject/public/images/aboutus1-1.svg" alt="about us 1" />
                                        <div className='text-overlay1'>歡迎來到 Gachora，一個結合扭蛋樂趣與一番賞驚喜的獨特星球！在這裡，每一次點擊都是一場與未知的邂逅，彷彿穿越浩瀚宇宙，探索無數閃耀的星球與無窮的驚喜。</div>
                                    </div>
                                    <div className='image-container'>
                                        <img src="http://localhost/gachoraProject/public/images/aboutus2-1.svg" alt="about us 2" />
                                        <div className='text-overlay2'>讓 Gachora 帶你來體驗一場無與倫比的探索之旅。</div>
                                    </div>
                                    <div className='image-container'>
                                        <img src="http://localhost/gachoraProject/public/images/aboutus3.svg" alt="about us 3" />
                                        <div className='text-overlay3'>每一個抽選都是一段未知的探索，每一次驚喜都是來自星球深處的禮物。讓我們一起踏上這場充滿樂趣與期待的旅程，探索無盡的可能性，創造屬於你的快樂時刻！</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <br />

                {/* 扭蛋內容 */}
                <section className="container1">
                    <div className="upper-curve2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path
                                fill="#FEC265"
                                fillOpacity="1"
                                d="M0,64L40,58.7C80,53,160,43,240,37.3C320,32,400,32,480,69.3C560,107,640,181,720,186.7C800,192,880,128,960,122.7C1040,117,1120,171,1200,192C1280,213,1360,203,1400,197.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                            />
                        </svg>
                    </div>
                    <div className="wave-container2">
                        <h1 className="title slide-in from-bottom">扭蛋</h1>
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="ti-content slide-in from-left">互動式扭蛋體驗</h3>
                                <p className="ti-content slide-in from-left">歡迎來到全新線上扭蛋機，為您打造充滿樂趣與驚喜的互動體驗！</p>
                                <p className="ti-content slide-in from-left">透過精美的機台設計與獨特的操作模式，點擊機台即可感受扭蛋</p>
                                <p className="ti-content slide-in from-left">機的晃動效果，彷彿置身實體扭蛋店般身歷其境。每個細節都經</p>
                                <p className="ti-content slide-in from-left">過精心設計，讓您在家中也能感受到趣味十足的扭蛋體驗，增添</p>
                                <p className="ti-content slide-in from-left">互動性與參與感。</p>
                            </div>
                            <div className="col-md-5">
                                <div>
                                    <div id="animation4" className="img-fluid col-md-5 slide-in from-right"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <div>
                                    <div id="animation3" className="img-fluid col-md-5 slide-in from-left"></div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <h3 className="ti-content slide-in from-right">點擊按鈕，開啟驚喜</h3>
                                <p className="ti-content slide-in from-right">準備好迎接未知的驚喜了嗎？只需點擊扭蛋機的按鈕，機台便會</p>
                                <p className="ti-content slide-in from-right">開始轉動，緊接著彈出隱藏的驚喜產品！每一次轉動都是一場期</p>
                                <p className="ti-content slide-in from-right">待的冒險，無論是收藏好物還是限定商品，皆有機會成為您的收穫。</p>
                                <p className="ti-content slide-in from-right">快來試試手氣，探索專屬於您的扭蛋驚喜，讓每一個瞬間都充滿</p>
                                <p className="ti-content slide-in from-right">期待與歡樂！</p>
                            </div>
                        </div>
                        {/* 商品promote 1 */}
                        <div className='pdinfo'>
                            <img src="http://localhost/gachoraProject/public/images/eggingo-01.png" alt="Background" />
                            <div className="text-container">
                                <h3 className="slide-in from-bottom">開啟太空探險</h3>
                                <p className="slide-in from-bottom">每一顆都是獨特的太空冒險，搭配泡泡瑪特經典設計。快來轉動扭蛋，駕駛你的星際車輛！</p>
                                <a href={route('gachaHome')} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn custom-btn btn-lg" id="button3">
                                        前往扭蛋頁面
                                    </button>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="lower-curve2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path
                                fill="#FEC265"
                                fillOpacity="1"
                                d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,213.3C480,181,549,139,617,128C685.7,117,754,139,823,133.3C891.4,128,960,96,1029,106.7C1097.1,117,1166,171,1234,181.3C1302.9,192,1371,160,1406,144L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
                            />
                        </svg>
                    </div>
                </section>

                {/* 一番賞內容 */}
                <section className="container1">
                    <div className="upper-curve">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path
                                fill="#f2f1ec"
                                fillOpacity="1"
                                d="M0,0L48,21.3C96,43,192,85,288,133.3C384,181,480,235,576,218.7C672,203,768,117,864,122.7C960,128,1056,224,1152,245.3C1248,267,1344,213,1392,186.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </svg>
                    </div>
                    <div className="wave-container">
                        <h1 className="title slide-in from-bottom">一番賞</h1>
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="ti-content slide-in from-left">撕開幸運的瞬間，揭曉您的專屬大獎</h3>
                                <p className="ti-content content slide-in from-left">歡迎來到線上互動一番賞，結合精緻設計與真實感的全新玩法！</p>
                                <p className="ti-content content slide-in from-left">透過模擬撕開紙張的互動效果，讓您一點一滴揭開獎項的神秘面紗。</p>
                                <p className="ti-content content slide-in from-left">每一片紙張的剝落都帶著未知的期待，彷彿親手拆禮物般，</p>
                                <p className="ti-content content slide-in from-left">讓抽選過程成為充滿儀式感的享受。從特別獎到經典商品，<br /></p>
                                <p className="ti-content content slide-in from-left">每一個獎項都讓人驚喜不已！與其只看結果，為何不投入這充滿樂趣</p>
                                <p className="ti-content content slide-in from-left">的互動體驗？現在就試試您的運氣，感受撕開紙張的細膩過程，</p>
                                <p className="ti-content content slide-in from-left">讓每一次抽選都成為專屬於您的幸運旅程，體驗真正的心跳瞬間！</p>

                            </div>

                            <div className="col-md-5 slide-in from-right">
                                <div className="sticky-top">
                                    <img src="http://localhost/gachoraProject/public/images/oneticket.gif" className="img-fluid" alt="一番賞" />
                                </div>
                            </div>
                        </div>
                        {/* 商品promote 2 */}
                        <div className='pdinfo' style={{ marginTop: "10%" }}>
                            <img src="http://localhost/gachoraProject/public/images/lottryimg-01.png" alt="Background" />
                            <div className="text-container">
                                <h3 className="slide-in from-bottom">開啟太空探險</h3>
                                <p className="slide-in from-bottom">每一顆都是獨特的太空冒險，搭配泡泡瑪特經典設計。快來轉動扭蛋，駕駛你的星際車輛！</p>
                                <a href={route('lottryHome')} style={{ textDecoration: 'none' }}><button type="button" className="btn custom-btn btn-lg" id="button3">
                                    前往一番賞頁面
                                </button></a>
                            </div>
                        </div>
                    </div>
                    <div className="lower-curve">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path
                                fill="#365B60"
                                fillOpacity="1"
                                d="M0,0L48,10.7C96,21,192,43,288,69.3C384,96,480,128,576,138.7C672,149,768,139,864,117.3C960,96,1056,64,1152,80C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </svg>
                    </div>
                </section>



                <ScrollToTop />
            </main>
        </>
    );
}
