import React from 'react'
import Navbar from '@/Components/Navbar';
import PdCard from '@/Components/PdCard';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';


function C_2_LottryTagPage() {
    // 假資料
    // const [allProducts] = useState([
    //     { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$100", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$120", img: "https://via.placeholder.com/301x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "最新商品", seriesName: "系列名", productName: "最新商品", productPrice: "$50", img: "https://via.placeholder.com/302x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "最新商品", seriesName: "系列名", productName: "最新商品", productPrice: "$60", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "限時商品", seriesName: "系列名", productName: "限時商品", productPrice: "$30", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "限時商品", seriesName: "系列名", productName: "限時商品", productPrice: "$40", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "玩具", seriesName: "系列名", productName: "玩具1", productPrice: "$20", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "玩具", seriesName: "系列名", productName: "玩具2", productPrice: "$25", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
    //     { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$110", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" }
    // ]);



    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);

    let url = 'http://localhost/gachoraProject/app/Models/Fetch/AllIchiban.php'
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    React.useEffect(function () {
        console.log("Fetching data...");
        const callAPI = async function () {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error status:${response.status}`);
                }
                const data = await response.json();
                setAllProducts(data);
            } catch (err) {
                setError(err.message);
            }
        };
        callAPI();
    }, [])
    if (error) return <div>Error: {error}</div>;
    console.log("C_2_LottryTagPage rendered");

    const [currentPage, setcurrentPage] = useState(1);
    const [category, setcategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 24; // 每頁商品數量


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

    // 分頁
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // 搜尋處理
    const handleSearch = () => {
        setcurrentPage(1); // 搜索時重設為第一頁
    };

    // 分類切換
    const handleCategoryClick = (newCategory) => {
        setcategory(newCategory);
        setSearchQuery(""); // 切換分類時清空搜尋
        setcurrentPage(1); // 每次分類重置到第一頁
    };



    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo.png' bgcolor="var(--main-darkblue)" navbgcolor="var(--main-bg-gray)" svgColor="var(--main-darkblue-filter)" textColor="var(--main-darkblue) logout='list-item' " />
            <Head title="lottryTagPage" />
            <body id='lottrybody'>
                <main id='lottryTagPage' className="container container-xxl">
                    <div className="detailbanner">
                        <img src="http://localhost/gachoraProject/public/images/gachoHome/少主貓貓.JPG"
                            alt="" />
                    </div>
                    <div className="container-fluid mt-4 flex-wrap centered-container">
                        <div className="row">
                            {/* <!-- 左側分類區 --> */}
                            <div className="col-md-2 d-flex flex-column left-pd">
                                <ul className="category-list list-unstyled">
                                    {["all", "熱門商品", "最新商品", "限量商品"].map(cat => (
                                        <li key={cat} onClick={() => handleCategoryClick(cat)}>
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
                                        <input type="search" className="search-type" placeholder="搜尋品項"
                                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                        <button className="search-icon" onClick={handleSearch}>
                                            <img src="http://localhost/gachoraProject/public/images/gachoHome/search-normal2.svg" alt="搜尋" />
                                        </button>
                                    </span>
                                </div>
                                <div className="row d-flex right-product"
                                    id="product-list">
                                    {/* 商品區 */}
                                    {productsToShow.length === 0 ? (
                                        <div>無符合資料</div> // 顯示正在加載訊息
                                    ) : (
                                        productsToShow.map((product, index) => (
                                            <PdCard
                                                key={index}
                                                seriesId={product.series_id}
                                                pdName={product.name}
                                                pdPrice={product.price}
                                                pdQuantity={product.remain}
                                                pdTotal={product.total}
                                                aPrizeName={product.character[0].name}
                                                aRemain={product.character[0].remain}
                                                aTotal={product.character[0].total}
                                                bPrizeName={product.character[1].name}
                                                bRemain={product.character[1].remain}
                                                bTotal={product.character[1].total}
                                                cPrizeName={product.character[2].name}
                                                cRemain={product.character[2].remain}
                                                cTotal={product.character[2].total}
                                                img={product.img[0]}
                                            />
                                        ))
                                    )}
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
                                                <a className="page-link" href="">{index + 1}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </body>

        </>
    )
}

export default C_2_LottryTagPage
