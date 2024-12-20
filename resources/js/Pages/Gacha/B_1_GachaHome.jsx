import Navbar from '@/Components/Navbar';
import GachaWallItem from '@/Pages/Gacha/GachaWallItem';
import { Head, Link } from '@inertiajs/react';

function B_1_GachaHome() {
    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="GachaHome" />
            <main id='gachaHome'>
                {/* <!--輪播圖區--> */}
                <div id="mainCarousel"
                    className="carousel slide mb-3"
                    data-bs-ride="carousel">
                    {/* <!--大輪播圖--> */}
                    <div className="bigcarousel carousel-inner">
                        <div className="carousel-item active">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG"
                                    alt="Image 1"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/IVAN2.JPG"
                                    alt="Image 2"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/少主貓貓.JPG"
                                    alt="Image 3"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/少主.JPG"
                                    alt="Image 4"
                                    className="d-block w-100" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carouselimgsize">
                                <img src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg"
                                    alt="Image 5"
                                    className="d-block w-100" />
                            </div>
                        </div>
                    </div>

                    {/* <!--小控制圖--> */}
                    <div className="smallcarousel d-flex flex-row-reverse">
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="0"
                            src="http://localhost/gachoraProject/public/images/gachoHome/IVAN(1).JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="1"
                            src="http://localhost/gachoraProject/public/images/gachoHome//IVAN2.JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="2"
                            src="http://localhost/gachoraProject/public/images/gachoHome/少主貓貓.JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="3"
                            src="http://localhost/gachoraProject/public/images/gachoHome/少主.JPG"
                            style={{ cursor: "pointer" }} />
                        <img className="ms-1 smallcarouselimg"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to="4"
                            src="http://localhost/gachoraProject/public/images/gachoHome/210601-mha-4.jpg"
                            style={{ cursor: "pointer" }} />
                    </div>
                </div>
                {/* <!--標籤連結--> */}
                <div className="labelitem d-flex justify-content-end">
                    <a className="ms-1 item" href={route('gachatagpage')}><div>全部商品</div></a>
                    <a className="ms-1 item" href="#"><div >熱門商品</div></a>
                    <a className="ms-1 item" href="#"><div >最新商品</div></a>
                    <a className="ms-1 item" href="#"><div >限時商品</div></a>
                </div>
                {/* <!--TOP30區--> */}
                <div className="top30 d-flex flex-wrap justify-content-center">
                    {/* <!--左側大圖--> */}
                    <div className="ms-5">
                        <div className="top30BigProduct"></div>
                    </div>
                    {/* <!--右側小圖--> */}
                    <div className="ms-5">
                        {/* <!--垂直flex--> */}
                        <div className="d-flex flex-column ">
                            <img src="#"
                                className="top30ProductImg"></img>
                            <div className="top30ProductText text-center">
                                【食小福 第一彈】
                                <br />
                                狐狸小穗、貓貓栗子
                            </div>
                        </div>
                    </div>
                    {/* <!--右側小圖--> */}
                    <div className="ms-5 ">
                        {/* <!--垂直flex--> */}
                        <div className="d-flex flex-column ">
                            <img src="#"
                                className="top30ProductImg"></img>
                            <div className="top30ProductText text-center">
                                【食小福 第一彈】
                                <br />
                                狐狸小穗、貓貓栗子
                            </div>
                        </div>
                    </div>
                    {/* <!--右側小圖--> */}
                    <div className="ms-5 ">
                        {/* <!--垂直flex--> */}
                        <div className="d-flex flex-column ">
                            <img src="#"
                                className="top30ProductImg"></img>
                            <div className="top30ProductText text-center">
                                【食小福 第一彈】
                                <br />
                                狐狸小穗、貓貓栗子
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    {/* <!-- 三排滾動區域 --> */}
                    <section className="scroll-container">
                        <br />
                        <div className="scroll-row">
                            <div className="scroll-content">
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
                        <div className="scroll-row">
                            <div className="scroll-content">
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
                <div className="b-example-divider"></div>
            </main>

        </>
    )
}

export default B_1_GachaHome