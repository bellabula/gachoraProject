import React from 'react'
import Navbar from '@/Components/Navbar';
import GachaPdCard from '@/Components/GachaPdCard';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function B_2_GachaTagPage() {

    const user = usePage().props.auth.user;
    const basePath = '../app/Models'
    const [userFavor, setUerFavor] = useState([]);
    if (user) {
        const user_id = user.id
        let collectEgg = [];
        useEffect(() => {
            $.post(basePath + '/Post/UserCollectionEgg.php', {
                user_id: user_id
            }, (response) => {
                if (typeof (response.has) != "undefined") {
                    collectEgg = [...response.has]
                }
                if (typeof (response.no) != "undefined") {
                    collectEgg = [...collectEgg, ...response.no]
                }
                setUerFavor(collectEgg.map(item => item.id))
                // console.log(userFavor)
                // console.log('蛋收藏：', [...response.has, ...response.no])
            })
        }, [user_id])
    }

    const [allProducts, setAllProducts] = useState([])
    // const [allProductsAPI, setAllProductsAPI] = useState([])

    // let url = 'http://localhost/gachoraProject/app/Models/Fetch/AllEgg.php'
    // React.useEffect(function () {
    //     let callAPI = async function () {
    //         let response = await fetch(url);
    //         let data = await response.json()
    //         setAllProductsAPI(data);
    //         // let datanoImg =
    //         // setAllProductsImg(data);
    //     }
    //     callAPI();
    // }, [])
    useEffect(() => {
        let basePath = '../app/Models'
        fetch(basePath + '/Fetch/AllEgg.php')
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setAllProducts(data)
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }, [])

    const [currentPage, setcurrentPage] = useState(1);
    const [category, setcategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 24; // 每頁商品數量

    // !!!!!! 待確認 !!!!!!
    // 篩選和排序
    const filteredProducts = [...allProducts].filter(product => {
        // 判斷是否符合篩選條件（分類和搜尋）
        const matchesCategory = category === "all" ||
            (category === "最新商品" && product.release_time) ||
            (category === "熱門商品" && product.rank) ||
            (category === "限量商品" && product.rare);

        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        // 根據分類排序商品
        if (category === "最新商品") {
            // 依照 release_time 排序（由新到舊）
            return b.release_time - a.release_time;
        } else if (category === "熱門商品") {
            // 依照 rank 排序（由高到低）
            return b.rank - a.rank;
        } else if (category === "限量商品") {
            // 依照 rare 排序（由小到大）
            return a.rare - b.rare;
        } else {
            return 0; // 如果不需要排序，則保持原順序
        }
    });

    // // 動態篩選商品
    // const filteredProducts = allProducts.filter(product => {
    //     const matchesCategory = category === "all" || product.theme === category;
    //     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    //     return matchesCategory && matchesSearch;
    // });

    // // 計算分頁
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // //搜尋按鈕觸發
    const handleSearch = () => {
        const filtered = allProducts.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length === 0) {
            alert("沒有找到符合條件的商品!");
        }
        setcurrentPage(1);
    };

    // // 分類切換
    const handleCategoryClick = (newCategory) => {
        setcategory(newCategory);
        setSearchQuery(""); // 切換分類時清空搜尋
        setcurrentPage(1); // 每次分類重置到第一頁
    };

    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="GachaTagPage" />
            <main id='gachaTagPage' className="container container-xxl">
                <div className="detailbanner">
                    <img src="http://localhost/gachoraProject/public/images/gachoHome/少主貓貓.JPG"
                        alt="" />
                </div>
                <div className="container-fluid mt-4 flex-wrap centered-container">
                    <div className="row">
                        {/* <!-- 左側分類區 --> */}
                        <div className="col-md-2 d-flex flex-column left-pd">
                            <ul className="category-list list-unstyled">
                                {["all", "熱門商品", "最新商品", "限量商品", "玩具"].map(cat => (
                                    <li
                                        key={cat}
                                        className={cat === category ? "active" : ""}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        {cat === "all" ? "所有商品" : cat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* <!-- 右側商品展示區 --> */}
                        <div className="col-md-10 col-12 d-flex flex-wrap">
                            <div style={{ width: '100%' }}>
                                <div className="detail-dropdown">
                                    <span>
                                        商品排序 ▼
                                    </span>
                                    <ul className="detail-dropdown-menu">
                                        <li>【上架時間】由新到舊</li>
                                        <li>【上架時間】由舊到新</li>
                                        <li>【價格】由高至低</li>
                                        <li>【價格】由低至高</li>
                                    </ul>
                                </div>
                                <span className='searchdiv'>
                                    <input type="search"
                                        className="search-type"
                                        placeholder="搜尋品項"
                                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    <button className="search-icon">
                                        <img src="http://localhost/gachoraProject/public/images/gachoHome/search-normal2.svg"
                                            style={{filter:"var(--white-filter)"}}
                                            onClick={handleSearch}
                                            alt="搜尋" />
                                    </button>
                                </span>
                            </div>


                            <div className="row d-flex right-product"
                                id="product-list">
                                {/* 商品區 */}
                                {productsToShow.map((product, index) => (
                                    <GachaPdCard className="col-md-4 mb-4 d-flex flex-wrap justify-content-center"
                                        seriesId={product.series_id}
                                        seriesName={product.title}
                                        productName={product.name}
                                        productPrice={product.price}
                                        img={product.img[0]}
                                        userFavor={userFavor}
                                        key={index}>
                                    </GachaPdCard>
                                ))}
                            </div>

                            {/* <!-- 分頁按鈕 --> */}
                            <div aria-label="Page navigation" className="d-flex justify-content-center" style={{ width: "100%" }} >
                                <ul className="pagination mt-3"
                                    id="pagination">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <li
                                            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                                            key={index}
                                            onClick={() => setcurrentPage(index + 1)}
                                        >
                                            <a className="page-link" href="#">{index + 1}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default B_2_GachaTagPage
