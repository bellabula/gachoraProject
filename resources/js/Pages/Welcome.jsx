import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import PdCard from '@/Components/PdCard';

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

        if (!isFormVisible) {
            icon.classList.add('rotate');
            formContainer.classList.add('show');
            formContent.classList.add('show');
            icon.classList.remove('reverse-rotate');
            ichibanSection.style.marginTop = '1000px';
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



            <main id="homepage" style={{ backgroundColor: "var(--main-darkblue)", margin: "0px" }}>
                <Navbar svgColor="none" textColor="white" homepage="true" />
                {/* 首頁開始/動畫/按鈕 */}

                <div id="home">

                    <div id="animation1" style={{ position: 'absolute', top: 0, left: 0 }}></div>
                    <div id="animation2" style={{ position: 'absolute', top: 0, left: 0 }}></div>
                    <section className="clouds">
                        <img src="http://localhost/gachoraProject/public/images/darkclouds.svg" className="d_cloud" />
                        <img src="http://localhost/gachoraProject/public/images/lightclouds.svg" className="l_cloud" />
                        <div className="mycontainer">
                            <button type="button" className="btn custom-btn btn-lg" id="button1">
                                前往扭蛋頁面
                            </button>
                            <button type="button" className="btn custom-btn btn-lg" id="button2">
                                前往一番賞頁面
                            </button>
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
                    <div className="desc_form">
                        <div className="desc">
                            <form>
                                {/* 關於我們內容 */}
                            </form>
                        </div>
                    </div>
                </div>

                <br />
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
                                <h3 className="ti-content slide-in from-left">一番賞內容1</h3>
                                <p className="content slide-in from-left">Your information content goes here...</p>
                                <br />
                                <br />
                                <br />
                                <p className="content slide-in from-left">Your information content goes here...</p>
                                <br />
                                <br />
                                <br />
                                <p className="content slide-in from-left">Your information content goes here...</p>
                                <br />
                                <br />
                                <br />
                                <p className="content slide-in from-left">Your information content goes here...</p>
                                <br />
                                <br />
                                <br />
                                <p className="content slide-in from-left">Your information content goes here...</p>
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="col-md-5 slide-in from-right">
                                <div className="sticky-top">
                                    <img src="http://localhost/gachoraProject/public/images/oneticket.gif" className="img-fluid" alt="一番賞" />
                                </div>
                            </div>
                        </div>
                        <div className='btncontainer'>
                            <button type="button" className="btn custom-btn btn-lg" id="button3">
                                前往一翻賞頁面
                            </button>
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
                                <h3 className="ti-content slide-in from-left">扭蛋內容1</h3>
                                <p className="ti-content slide-in from-left">Your information content goes here...</p>
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
                                <h3 className="ti-content slide-in from-right">扭蛋內容2</h3>
                                <p className="ti-content slide-in from-right">Your information content goes here...</p>
                            </div>
                        </div>
                        <div className='btncontainer'>
                            <button type="button" className="btn custom-btn btn-lg" id="button4">
                                前往扭蛋頁面
                            </button>
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




            </main>
        </>
    );
}
