import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
export default function Navbar({ logo, bgcolor, navbgcolor, textColor, svgColor, logout = "none", homepage = false }) {
    useEffect(() => {
        if (homepage) {
            $("#bigNavbar-l").css("display", "none")
            $("#bigNavbar-r").css("display", "none")
            $("nav div div.ps-4 img").css("display", "none")
            $("#offcanvasNavbar").css("display", "block")
            $("div.container-xxl").removeClass("container-xxl");


            $("nav")
                .removeClass("navbar-expand-lg")
                .css({
                    height:"100px"
                })

                $(".navbar-toggler-icon")
                .css({
                    backgroundImage: 'url("http://localhost/gachoraProject/public/images/homemenu.svg")',
                });

        }
    })
    return (
        <nav className="navbar fixed-top navbar-expand-lg overflow-hidden" style={{ backgroundColor: bgcolor, height: "80px" }}>
            <div className="container-fluid pe-0 ps-0 container-xxl">
                <div className="ps-4">
                    <Link href={route('home')} className="navbar-brand">
                        <img src={logo} alt="logo" width="200px" />
                    </Link>
                </div>
                <div className="w-100 position-absolute" style={{ backgroundColor: navbgcolor, height: "80px", borderRadius: "40px 0 0 40px", marginLeft: "280px" }}></div>
                <div id="bigNavbar-l" className="position-absolute" style={{ marginLeft: "300px", color: textColor }}>
                    <ul className="navbar-nav me-auto my-lg-0 navbar-nav-scroll ms-4"
                        style={{ bsScrollHeight: "80px" }}>
                        <li className="nav-item fs-4 me-3"><a className="dropdown-item" href="#">品牌故事</a></li>
                        <li className="nav-item fs-4 me-3">
                            <Link href={route('gachaHome')} className="dropdown-item">
                                扭蛋
                            </Link>
                        </li>
                        <li className="nav-item fs-4 me-3"><a className="dropdown-item" href="#">一番賞</a></li>

                        <li className="nav-item fs-4 me-3">
                            <Link href={route('faq')} className="dropdown-item">
                                常見問題
                            </Link>
                        </li>
                        <li className="nav-item fs-4 me-3">
                            <Link href={route('faq', { goto: 'contact' })} className="dropdown-item">
                                聯絡我們
                            </Link>
                        </li>
                    </ul>
                </div>
                <div id="bigNavbar-r">
                    <ul className="navbar-nav me-auto my-lg-0 pe-4 navbar-nav-scroll"
                        style={{ bsScrollHeight: "80px" }}>
                        <li className="nav-item">
                            <Link href={route('login')} className="dropdown-item">
                                <img src="http://localhost/gachoraProject/public/images/member.svg" style={{ filter: svgColor }} />
                            </Link>
                        </li>
                        <li className="nav-item"><a className="dropdown-item" href="#"><img src="http://localhost/gachoraProject/public/images/notify.svg" style={{ filter: svgColor }} /></a></li>
                        <li className="nav-item">
                            <Link href={route('dashboard', { highlight: 'wallet' })}>
                                <img src="http://localhost/gachoraProject/public/images/wallet.svg" style={{ filter: svgColor }} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={route('shoppingCart')} className="dropdown-item">
                                <img src="http://localhost/gachoraProject/public/images/cart.svg" style={{ filter: svgColor }} />
                            </Link>
                        </li>
                        <li className="nav-item"><a className="dropdown-item" href="#"><img src="http://localhost/gachoraProject/public/images/lang.svg" style={{ filter: svgColor }} /></a></li>
                        <li className="nav-item" style={{ display: logout }}>
                            <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                <img src="http://localhost/gachoraProject/public/images/logout.svg" style={{ filter: svgColor }} title='logout' />
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ filter: svgColor }}></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Gachora</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link href={route('login')} className="nav-link">
                                    會員專區
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">首頁</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    扭蛋
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">扭蛋首頁</a></li>
                                    <li><a className="dropdown-item" href="#">扭蛋分類頁</a></li>
                                    <li><a className="dropdown-item" href="#">扭蛋商品頁</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    一番賞
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">一番賞首頁</a></li>
                                    <li><a className="dropdown-item" href="#">一番賞分類頁</a></li>
                                    <li><a className="dropdown-item" href="#">一番賞商品頁</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href={route('shoppingCart')} className="nav-link">
                                    購物車
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('dashboard', { highlight: 'wallet' })} className="nav-link">
                                    我的錢包
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('faq')} className="nav-link">
                                    常見問題
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('faq', { goto: 'contact' })} className="nav-link">
                                    聯絡我們
                                </Link>
                            </li>
                            <li className="nav-item" style={{ display: logout}}>
                                <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                    登出
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">English</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}