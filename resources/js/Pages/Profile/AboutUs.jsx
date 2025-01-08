import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import ScrollToTop from '@/Components/ScrollTop';
import Footer from '@/Components/Footer';

export default function AboutUs() {


    return (
        <>

            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue) logout='list-item' " />
            <Head title="AboutUs" />
            <main id="aboutus" style={{ backgroundColor: "var(--main-darkblue)", margin: "0px", height: "auto" }}>
                <div className="desc_form">
                    <h1>關於我們</h1>
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
            </main>
            <ScrollToTop />
            {/* <Footer imgSrc='http://localhost/gachoraProject/public/images/Footer2.svg' bgColor="var(--main-darkblue)"/> */}
        </>
    );
}
