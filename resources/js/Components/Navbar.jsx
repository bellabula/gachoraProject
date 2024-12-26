import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import Deposit from '../Pages/member/Deposit';

export default function Navbar({ logo, bgcolor, navbgcolor, textColor, svgColor, cartNumber = 0, logout = "none", homepage = false, dCount = "none" }) {
    const [cartCount, setCartCount] = useState(0)
    const [userName, setUserName] = useState("")
    const [myGash, setMyGash] = useState("")
    const [myIcon, setMyIcon] = useState("")

    if (usePage().props.auth.user) {
        logout = "item-list"
        const user_id = usePage().props.auth.user.id
        useEffect(() => {
            $.post('../app/Models/Post/MainUser.php', {
                user_id: user_id
            }, (response) => {
                // console.log('MainUser')
                // console.log(response)
                setUserName(response.name)
                setMyGash(response.gash)
                setMyIcon(response.achievement.slice(-1)[0])
            })
        }, [user_id])
        useEffect(() => {
            $.post('../app/Models/Post/UserCart.php', {
                user_id: user_id
            }, (response) => {
                // console.log('購物車：', response.length)
                setCartCount(response.length)
            })
        }, [user_id])
        if (cartCount > 0) {
            dCount = "flex"
        }
        useEffect(()=>{
            $("#memberClick").click(openMember)
        },[])
    } else {
        useEffect(()=>{
            $("#memberClick").click(()=>{location.replace(route('dashboard'))})
        },[])
    }
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
                    height: "100px"
                })

            $(".navbar-toggler-icon")
                .css({
                    backgroundImage: 'url("http://localhost/gachoraProject/public/images/homemenu.svg")',
                });

        }
    })

    // 控制顯示模態框的狀態
    const [isCoinOpen, setIsCoinOpen] = useState(false);

    // 開啟模態框
    const openCoin = () => {
        setIsCoinOpen(true);
    };

    // 關閉模態框
    const closeCoin = () => {
        setIsCoinOpen(false);
    };

    const [dMember, setDMember] = useState("none")
    const memberRef = useRef(null); // 追蹤 navbarMember 區塊
    const triggerRef = useRef(null); // 追蹤 img 元素

    function openMember() {
        { dMember == "none" ? setDMember("block") : setDMember("none") }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                memberRef.current &&
                !memberRef.current.contains(event.target) && // 點擊不在 navbarMember 裡
                triggerRef.current &&
                !triggerRef.current.contains(event.target) // 點擊不在觸發按鈕裡
            ) {
                setDMember("none");
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isCoinOpen && (
                <>
                    {/* 遮罩層 */}
                    <div className="overlay" onClick={closeCoin}></div>

                    {/* 中間的模態框 */}
                    <div className="modal">
                        <Deposit gash={myGash} />
                        <button className='d-block m-auto' onClick={closeCoin}>取消</button>
                    </div>
                </>
            )}
            <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: bgcolor, height: "80px" }}>
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
                            <li className="nav-item fs-4 me-3">
                                <Link href={route('lottryHome')} className="dropdown-item">
                                    一番賞
                                </Link>
                            </li>
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
                            <li className="nav-item position-relative">
                                <img id='memberClick' ref={triggerRef} src="http://localhost/gachoraProject/public/images/member.svg" style={{ filter: svgColor, cursor: "pointer" }} title='會員' />
                                <div ref={memberRef} id='navbarMember' style={{ backgroundColor: navbgcolor, color: textColor, display: dMember }}>
                                    <Link href={route('login')}>
                                        <img style={{ marginBottom: "10px" }} className='memberImg' src={myIcon} />
                                    </Link>
                                    <div>
                                        <h4 style={{ lineHeight: "10px", textAlign: "left", padding: "10px", display: "inline-block" }}>{userName} 您好 !</h4><a href={route('login')}><button className="rounded-5 mt-2">會員專區</button></a>
                                    </div>
                                    <h5 style={{ lineHeight: "10px", textAlign: "left", padding: "10px", margin: "0" }}>您的G幣餘額 : $ {myGash}</h5>
                                    <button className="rounded-5 float-end mt-2" onClick={openCoin}>儲值G幣</button>
                                </div>
                            </li>
                            <li className="nav-item"><a className="dropdown-item" href="#"><img src="http://localhost/gachoraProject/public/images/notify.svg" style={{ filter: svgColor }} title='通知' /></a></li>
                            {/* <li className="nav-item">
                                <Link href={route('dashboard', { highlight: 'wallet' })}>
                                    <img src="http://localhost/gachoraProject/public/images/wallet.svg" style={{ filter: svgColor }} title='錢包' />
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link href={route('dashboard', { highlight: 'storage' })}>
                                    <img src="http://localhost/gachoraProject/public/images/storage.svg" style={{ filter: svgColor }} title='儲藏庫' />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('shoppingCart')} className="dropdown-item position-relative">
                                    <img src="http://localhost/gachoraProject/public/images/cart.svg" style={{ filter: svgColor }} title='購物車' />
                                    <div className='cartCount' style={{ display: `${dCount}` }}>{cartNumber == 0 ? cartCount : cartNumber}</div>
                                    {/* <span className='cartCount' style={{ display: `${dCount}` }}>{cartCount}</span> */}
                                </Link>
                            </li>
                            {/* 語言切換 */}
                            {/* <li className="nav-item"><a className="dropdown-item" href="#"><img src="http://localhost/gachoraProject/public/images/lang.svg" style={{ filter: svgColor }} /></a></li> */}
                            <li className="nav-item" style={{ display: logout }}>
                                <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                    <img src="http://localhost/gachoraProject/public/images/logout.svg" style={{ filter: svgColor }} title='登出' />
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
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src="http://localhost/gachoraProject/public/images/logo2.png" width="70%" /></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body pt-0">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link href={route('login')} className="nav-link">
                                        會員專區
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href={route('home')}>首頁</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        扭蛋
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href={route('gachaHome')}>扭蛋首頁</a></li>
                                        <li><a className="dropdown-item" href={route('gachatagpage')}>扭蛋商品頁</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        一番賞
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href={route('lottryHome')}>一番賞首頁</a></li>
                                        <li><a className="dropdown-item" href={route('lottrytagpage')}>一番賞商品頁</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link href={route('shoppingCart')} className="nav-link">
                                        購物車
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
                                <li className="nav-item" style={{ display: logout }}>
                                    <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                        登出
                                    </Link>
                                </li>
                                {/* 語言切換 */}
                                {/* <li className="nav-item">
                                <a className="nav-link" href="#">English</a>
                            </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
