import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import Deposit from '../Pages/member/Deposit';
import IchibanNotification from './IchibanNotification';
import AlertReminder from '@/Components/AlertReminder';

export default function Navbar({ logo, bgcolor, navbgcolor, textColor, svgColor, dCount, dBagCount, cartNumber = 0, bagNumber = 0, logout = "none", dlogin = "item-list", homepage = false }) {
    const [cartCount, setCartCount] = useState(0)
    const [bagCount, setBagCount] = useState(0)
    const [userName, setUserName] = useState("")
    const [myGash, setMyGash] = useState("")
    const [myIcon, setMyIcon] = useState("")
    const [user_id, setUser_id] = useState(0)

    if (usePage().props.auth.user) {
        dlogin = "none"
        logout = "item-list"
        const user_id = usePage().props.auth.user.id
        useEffect(() => {
            setUser_id(user_id)
            $.post('../app/Models/Post/MainUser.php', {
                user_id: user_id
            }, (response) => {
                // console.log('MainUser')
                // console.log(response)
                setUserName(response.name)
                setMyGash(response.gash)
                setMyIcon(response.achievement.slice(-1)[0].img)
            })
            MyTimer(user_id)
        }, [user_id])
        useEffect(() => {
            $.post('../app/Models/Post/UserCart.php', {
                user_id: user_id
            }, (response) => {
                // console.log('購物車：', response.length)
                setCartCount(response.length)
            })
            $.post('../app/Models/Post/UserBag.php', {
                user_id: user_id
            }, (response) => {
                // console.log('儲藏庫：', response.length)
                setBagCount(response.length)
            })
            if (cartCount > 0) {
                dCount = "flex"
            } else {
                // dCount = "none"
            }
            if (bagCount > 0) {
                dBagCount = "flex"
            } else {
                // dBagCount = "none"
            }
        }, [user_id])
        ///
        // useEffect(() => {
        // $.post('../app/Models/Post/ToGReminder.php', {
        //     user_id: user_id
        // }, (response) => {
        //     // console.log('30天快過期：', response.past)
        //     if (response[0].pasted != 0 && response[0].pasting != 0) {
        //         // error 亮提醒
        //         // alert(`您有<br>
        //         //     ${response.pasted}項戰利品已被兌換為G幣。<br>
        //         //     ${response.pasting}項即將被兌換為G幣，快打包回家。`)
        //     }
        // })
        // $.post('http://localhost/gachoraProject/app/Models/Post/GiveBirthGift.php', {
        //     user_id: user_id
        // }, function (response) {
        //     console.log(response.error)
        //     // response.error == 'birthday gift' && 亮提醒
        // })

        // }, [user_id])
        useEffect(() => {
            $("#memberClick").click(openMember)
        }, [])
        useEffect(() => {
            MyTimer(user_id)
        }, [user_id])

    } else {
        useEffect(() => {
            $("#memberClick").click(() => { location.replace(route('login')) })
        }, [])
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
    // 一番賞快到提醒
    function MyTimer(user_id) {
        console.log('Mytimer');
        const url = 'http://localhost/gachoraProject/app/Models/Post/MyTimer.php'
        $.post(url, {
            user_id: user_id
        }, function (response) {
            // console.log(response.length)
            if (Array.isArray(response) && response.length > 0) {
                AutoTime(user_id, response)
            }
        })
    }
    function confirmAndRedirect(series_id, text) {
        // 顯示確認框
        const userConfirmed = confirm(text);

        // 如果用戶點擊"確定"，則跳轉到指定連結
        if (userConfirmed) {
            window.location.href = 'http://localhost/gachoraProject/public/lottrydetail?seriesId=' + series_id; // 跳轉到連結
        }
    }
    const [waitMin, setWaitMin] = useState(0)
    const [waitSec, setWaitSec] = useState(0)
    const [seriesName, setSeriesName] = useState("")
    const [seriesID, setSeriesID] = useState(null)
    const [myPlayTime, setMyplayTime] = useState(null)
    // 每秒刷新
    let myIchiTimer
    function AutoTime(user_id, response) {
        if (response.length > 0) {
            response.filter((v) => {
                setWaitMin(Math.floor(v.waiting / 60))
                setWaitSec(v.waiting % 60)
                setSeriesName(v.name)
                setSeriesID(v.series_id)
                setMyplayTime(localStorage.getItem(`ichibanPlay${v.series_id}User${user_id}`) ? localStorage.getItem(`ichibanPlay${v.series_id}User${user_id}`) : 0)
                myIchiTimer = localStorage.getItem(`ichibanPlay${v.series_id}User${user_id}`)
                v.waiting > 0 && console.log(`${v.series_id}最晚${Math.floor(v.waiting / 60)}分${v.waiting % 60}秒輪到你抽${v.name}`)
                if (v.waiting == 179) {
                    // confirmAndRedirect(`${v.series_id}`, '下個輪到你，前往頁面等著抽？')
                    $("#ichibanNoti").removeClass("closeIchibanNoti")
                    $("#ichibanNoti").css("display", "block")
                    $("#ichibanNoti").addClass("openIchibanNoti")
                }
                if (v.waiting == 121) {
                    console.log($("#ichibanNoti"))
                    // confirmAndRedirect(`${v.series_id}`, '最快2分輪到你，前往頁面等著抽？')
                    $("#ichibanNoti").removeClass("closeIchibanNoti")
                    $("#ichibanNoti").css("display", "block")
                    $("#ichibanNoti").addClass("openIchibanNoti")
                }
                if (v.waiting == 61) {
                    console.log($("#ichibanNoti"))
                    // confirmAndRedirect(`${v.series_id}`, '最快1分輪到你，前往頁面等著抽？')
                    $("#ichibanNoti").removeClass("closeIchibanNoti")
                    $("#ichibanNoti").css("display", "block")
                    $("#ichibanNoti").addClass("openIchibanNoti")
                }
                if (v.waiting == 21) {
                    console.log($("#ichibanNoti"))
                    // confirmAndRedirect(`${v.series_id}`, '最快20秒輪到你，前往頁面等著抽？')
                    $("#ichibanNoti").removeClass("closeIchibanNoti")
                    $("#ichibanNoti").css("display", "block")
                    $("#ichibanNoti").addClass("openIchibanNoti")
                }
                if (v.waiting == 0) {
                    $("#ichibanNoti").removeClass("openIchibanNoti")
                    $("#ichibanNoti").addClass("closeIchibanNoti")
                    setTimeout(() => {
                        $("#ichibanNoti").css("display", "none")
                    }, 900)
                }
                if (window.location.href != ('http://localhost/gachoraProject/public/lottrydetail?seriesId=' + v.series_id)) {
                    console.log('myPlayTime' + v.series_id + ' : ' + myIchiTimer)
                    if (myIchiTimer == 181 || myIchiTimer == 151 || myIchiTimer == 121 || myIchiTimer == 91 || myIchiTimer == 61 || myIchiTimer == 31) {
                        $("#ichibanNoti").removeClass("closeIchibanNoti")
                        $("#ichibanNoti").css("display", "block")
                        $("#ichibanNoti").addClass("openIchibanNoti")
                    }
                }
            })
            setTimeout(() => {
                MyTimer(user_id)
            }, 1000)
        } else {
            $('#remainingTime').text('')
        }
    }
    const [alertText, setAlertText] = useState([]);
    const handleClickGReminder = () => {
        // useEffect(() => {
        let waitText = []
        let birthText = []
        let toGText = []
        $.post('http://localhost/gachoraProject/app/Models/Post/MyTimer.php', {
            user_id: user_id
        }, function (response) {
            console.log("waiting")
            console.log(response)
            if (response.length > 0) {
                response.filter((v) => {
                    if (v.waiting > 0) {
                        waitText.push({
                            series_id: v.series_id,
                            message: `您好！您所排隊的一番賞 <br>『<span style="color:#FF8000">${v.name}</span>』<br>預估將於<span style="color:#FF8000">${Math.floor(v.waiting / 60)}分${v.waiting % 60}秒</span>後輪到您`
                        })
                    } else if (v.waiting < 0 & v.waiting > -190){
                        waitText.push({
                            series_id: v.series_id,
                            message: `您好！您所排隊的一番賞 <br>『<span style="color:red">${v.name}</span>』<br>剩餘 <span style="color:red">${Math.floor((v.waiting+190) / 60)}分${(v.waiting+190) % 60}秒</span> 可以抽`
                        })
                    }else{

                    }
                })
            }
            setAlertText([...waitText, ...birthText, ...toGText])
        })
        $.post('http://localhost/gachoraProject/app/Models/Post/GiveBirthGift.php', {
            user_id: user_id
        }, function (response) {
            console.log(response.error)
            if (response.error == 'birthday gift') {
                birthText.push({
                    series_id: '',
                    message: `${userName}生日快樂！專屬於您的生日禮已存入您的G幣錢包中(生日起算1個月後到期)！`
                })
            } else {
                // birthText.push('沒生日')
            }
            setAlertText([...waitText, ...birthText, ...toGText])
        })
        $.post('http://localhost/gachoraProject/app/Models/Post/ToGReminder.php', {
            user_id: user_id
        }, function (response) {
            console.log(response)
            console.log('pasted', response[0].pasted)
            console.log('pasting', response[0].pasting)
            if (response[0].pasted != 0) {
                toGText.push({
                    series_id: '',
                    message: `您有${response[0].pasted}樣儲存庫商品已過期，並自動兌換成G幣，請於帳戶中查收。`
                })
            } else if (response[0].pasting != 0) {
                toGText.push({
                    series_id: '',
                    message: `您有${response[0].pasting}樣儲存庫商品即將過期，過期將自動兌換成G幣...`
                })
            } else {
                // toGText.push('沒資料')
            }
            setAlertText([...waitText, ...birthText, ...toGText])
        })
        console.log('alertText', alertText)
        // },[])
    }

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

    const [originalPhoto, setOriginalPhoto] = useState([]); // 從資料庫抓的頭貼

    useEffect(() => {
        if (user_id > 0) {
            fetch('http://localhost/gachoraProject/app/Models/Post/UserInfo.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    user_id: user_id, // 傳送的參數
                })
            })
                .then((response) => {
                    return response.json(); // 將回應轉為 JSON 格式
                })
                .then((data) => {
                    // console.log("資料庫頭貼：", data[0].headphoto);
                    setOriginalPhoto(data[0].headphoto);
                })
                .catch((error) => {
                    console.error("資料庫頭貼發生錯誤：", error);
                })
        }
    })
    // 控制控制 loginAlert, reminder 是否出現
    const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
    function handleRedirect(page) {
        if (page.charAt(0) == 'w') {
            localStorage.setItem('activeTab', 'memberWallet');
            window.location.href = "http://localhost/gachoraProject/public/dashboard"
        }
        if (page.charAt(0) == 'b') {
            localStorage.setItem('activeTab', 'memberStore');
            window.location.href = "http://localhost/gachoraProject/public/dashboard"
        }
        if (page.charAt(0) == 'i') window.location.href = 'http://localhost/gachoraProject/public/lottrydetail?seriesId=' + page.slice(1)
    }
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
                    {/* Navbar 中間 文字導覽 區塊 */}
                    <div id="bigNavbar-l" className="position-absolute" style={{ marginLeft: "300px", color: textColor }}>
                        <ul className="navbar-nav me-auto my-lg-0 navbar-nav-scroll ms-4"
                            style={{ bsScrollHeight: "80px" }}>
                            {/* About Us */}
                            <li className="nav-item fs-4 me-3"><a className="dropdown-item" href={route('aboutus')}>品牌故事</a></li>
                            {/* 扭蛋首頁 */}
                            <li className="nav-item fs-4 me-3">
                                <Link href={route('gachaHome')} className="dropdown-item">
                                    扭蛋
                                </Link>
                            </li>
                            {/* 一番賞首頁 */}
                            <li className="nav-item fs-4 me-3">
                                <Link href={route('lottryHome')} className="dropdown-item">
                                    一番賞
                                </Link>
                            </li>
                            {/* 常見問題 */}
                            <li className="nav-item fs-4 me-3">
                                <Link href={route('faq')} className="dropdown-item">
                                    常見問題
                                </Link>
                            </li>
                            {/* 聯絡我們 */}
                            <li className="nav-item fs-4 me-3">
                                <Link href={route('faq', { goto: 'contact' })} className="dropdown-item">
                                    聯絡我們
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Navbar 右側 Icon 區塊 */}
                    <div id="bigNavbar-r">
                        <ul className="navbar-nav me-auto my-lg-0 pe-4 navbar-nav-scroll"
                            style={{ bsScrollHeight: "80px" }}>
                            {/* 會員 */}
                            <li className="nav-item position-relative">
                                <img id='memberClick' ref={triggerRef} src="http://localhost/gachoraProject/public/images/member.svg" style={{ filter: svgColor, cursor: "pointer" }} title='會員' />
                                <div ref={memberRef} id='navbarMember' style={{ display: dMember }}> {/*  backgroundColor: navbgcolor, color: textColor,  */}
                                    {/* <img src="http://localhost/gachoraProject/public/images/memberClick5.svg" className='w-100 h-100' alt="" /> */}
                                    <img src="http://localhost/gachoraProject/public/images/navbarClickBg.svg" className='w-100 h-100' alt="" />
                                    <div className='memberTop w-100'>
                                        <Link href={route('login')}>
                                            <img style={{ marginBottom: "10px" }} className='memberImg' src={originalPhoto} />
                                        </Link>
                                        <h4>{userName} 您好 !</h4>
                                        <div className='w-100' style={{ height: "35px" }}>
                                            <a href={route('login')} style={{ height: "35px" }} className='d-inline-block' onClick={() => { localStorage.setItem("activeTab", "memberWall") }}><button style={{ verticalAlign: "top" }} className="rounded-5 mx-2">會員專區</button></a>
                                            <a href={route('dashboard')} style={{ height: "35px" }} className='d-inline-block' onClick={() => { localStorage.setItem("activeTab", "memberFavor") }}><button className="rounded-5 mx-2" style={{ width: "100px", verticalAlign: "top" }}>❤ 收藏清單</button></a>
                                        </div>
                                        <div style={{ marginTop: "40px", height: "40px" }}>
                                            <h5 style={{ color: "var(--main-bg-gray)", display: "inline-block", height: "40px", verticalAlign: "top" }}><img width="35px" src="http://localhost/gachoraProject/public/images/GPointIcon.svg" />&nbsp; $ {myGash}</h5>
                                            <button className="rounded-5 float-end me-5 topUp" onClick={openCoin}>儲值G幣</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* 通知 */}
                            <li className="nav-item position-relative">
                                {/* <a className="dropdown-item" style={{position: "relative"}} onClick={() => {
                                    handleClickGReminder()
                                    setIsLoginAlertOpen(true)
                                }} href="#"> */}
                                <img src="http://localhost/gachoraProject/public/images/notify.svg" style={{ filter: svgColor, cursor: "pointer" }} title='通知'
                                    onClick={() => {
                                        handleClickGReminder()
                                        setIsLoginAlertOpen(true)
                                    }} />
                                <div className='notiCount' style={{ position: "absolute", left: "16px" }}></div> {/* alertText.length > 0 */}
                                {isLoginAlertOpen && (
                                    <AlertReminder setIsLoginAlertOpen={setIsLoginAlertOpen}>
                                        <div className="remindercard">
                                            <div>
                                                <h5 style={{ color: "var(--main-darkblue)" }}>
                                                    {alertText.length === 0 ? (
                                                        <div className="r-card-container">
                                                            <div className="r-card">
                                                                <img className="r-card-img" src="http://localhost/gachoraProject/public/images/dark!.svg" alt="提醒圖示" style={{ opacity: "0" }} />
                                                                <span className="r-card-text" style={{ marginLeft: "25px" }}>您沒有任何提醒事項</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        alertText.map((text, index) => (
                                                            text.message.endsWith('！') ? (
                                                                <div className="r-card-container" onClick={() => { handleRedirect('w') }}>
                                                                    <div className="r-card">
                                                                        <img className="r-card-img" src="http://localhost/gachoraProject/public/images/cake.svg" alt="提醒圖示" />
                                                                        <span key={index} className="r-card-text" dangerouslySetInnerHTML={{ __html: text.message }} />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                text.message.endsWith('。') ? (
                                                                    <div className="r-card-container" onClick={() => { handleRedirect('w') }}>
                                                                        <div className="r-card">
                                                                            <img className="r-card-img" src="http://localhost/gachoraProject/public/images/dark!.svg" alt="提醒圖示" />
                                                                            <span key={index} className="r-card-text" dangerouslySetInnerHTML={{ __html: text.message }} />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    text.message.endsWith('...') ? (
                                                                        <div className="r-card-container" onClick={() => { handleRedirect('b') }}>
                                                                            <div className="r-card">
                                                                                <img className="r-card-img" src="http://localhost/gachoraProject/public/images/yellow!.svg" alt="提醒圖示" />
                                                                                <span key={index} className="r-card-text" dangerouslySetInnerHTML={{ __html: text.message }} />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="r-card-container" onClick={() => { handleRedirect('i' + text.series_id) }}>
                                                                            <div className="r-card">
                                                                                <img className="r-card-img" src="http://localhost/gachoraProject/public/images/hourglass.svg" alt="提醒圖示" />
                                                                                <span key={text.series_id} className="r-card-text" dangerouslySetInnerHTML={{ __html: text.message }} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )
                                                            )
                                                        ))
                                                    )}
                                                </h5>
                                            </div>
                                        </div>
                                    </AlertReminder>
                                )}
                                {/* </a> */}
                            </li>
                            {/* 儲藏庫 */}
                            <li className="nav-item">
                                <Link href={route('dashboard')} className="dropdown-item position-relative" onClick={() => { localStorage.setItem("activeTab", "memberStore") }}>
                                    <img src="http://localhost/gachoraProject/public/images/storage.svg" style={{ filter: svgColor }} title='儲藏庫' />
                                    <div className='cartCount' style={{ display: `${dBagCount}` }}>{bagNumber == 0 ? bagCount : bagNumber}</div>
                                </Link>
                            </li>
                            {/* 購物車 */}
                            <li className="nav-item">
                                <Link href={route('shoppingCart')} className="dropdown-item position-relative">
                                    <img src="http://localhost/gachoraProject/public/images/cart.svg" style={{ filter: svgColor }} title='購物車' />
                                    <div className='cartCount' style={{ display: `${dCount}` }}>{cartNumber == 0 ? cartCount : cartNumber}</div>
                                    {/* <span className='cartCount' style={{ display: `${dCount}` }}>{cartCount}</span> */}
                                </Link>
                            </li>
                            {/* 語言切換 */}
                            {/* <li className="nav-item"><a className="dropdown-item" href="#"><img src="http://localhost/gachoraProject/public/images/lang.svg" style={{ filter: svgColor }} /></a></li> */}
                            {/* 登出 */}
                            <li className="nav-item" style={{ display: logout }}>
                                <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                    <img src="http://localhost/gachoraProject/public/images/logout.svg" style={{ filter: svgColor }} title='登出' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* offcanvas Icon Button */}
                    <button className="navbar-toggler me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ filter: svgColor }}></span>
                    </button>
                    {/* offcanvas content */}
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src="http://localhost/gachoraProject/public/images/logo2.png" width="70%" /></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        {/* offcanvas list */}
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
                                <li className="nav-item" style={{ display: dlogin }}>
                                    <Link href={route('login')} className="nav-link">
                                        登入
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ display: dlogin }}>
                                    <Link href={route('register')} className="nav-link">
                                        註冊
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ display: logout }}>
                                    <Link href={route('logout')} method="post" as="button" className="nav-link">
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
            <IchibanNotification seriesID={seriesID} seriesName={seriesName} waitMin={waitMin} waitSec={waitSec} myPlayTime={myPlayTime} />
        </>
    )
}
