import React from 'react'
import Navbar from '@/Components/Navbar';
import GachaPdCard from '@/Components/GachaPdCard';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';


function B_2_GachaTagPage() {
    // 假資料
    const [allProducts] = useState([
        { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$100", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$120", img: "https://via.placeholder.com/301x200", img2: "https://via.placeholder.com/500x700" },
        { category: "最新商品", seriesName: "系列名", productName: "最新商品", productPrice: "$50", img: "https://via.placeholder.com/302x200", img2: "https://via.placeholder.com/500x700" },
        { category: "最新商品", seriesName: "系列名", productName: "最新商品", productPrice: "$60", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "限時商品", seriesName: "系列名", productName: "限時商品", productPrice: "$30", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "限時商品", seriesName: "系列名", productName: "限時商品", productPrice: "$40", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "玩具", seriesName: "系列名", productName: "玩具1", productPrice: "$20", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "玩具", seriesName: "系列名", productName: "玩具2", productPrice: "$25", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" },
        { category: "熱門商品", seriesName: "系列名", productName: "熱門商品", productPrice: "$110", img: "https://via.placeholder.com/300x200", img2: "https://via.placeholder.com/500x700" }
    ]);
    // const [allProducts, setAllProducts] = useState([])
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
    
    // useEffect(()=>{
    //     let basePath = '../app/Models'
    //     fetch(basePath + '/Fetch/AllEgg.php')
    //         .then(response => response.json())
    //         .then(data => {
    //             data.forEach((ele)=>{
    //                 console.log(ele)
    //             })
    //             console.log(data)
    //             // setAllProducts(data)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         })
    // }, [])

    const [currentPage, setcurrentPage] = useState(1);
    const [category, setcategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 6; // 每頁商品數量

    // 動態篩選商品
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = category === "all" || product.category === category;
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // 計算分頁
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    //搜尋按鈕觸發
    const handleSearch = () => {
        const filtered = allProducts.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length === 0) {
            alert("沒有找到符合條件的商品!");
        }
        setcurrentPage(1);
    };

    // 分類切換
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
                                {["all", "熱門商品", "最新商品", "限時商品", "玩具"].map(cat => (
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
                                        seriesName={product.seriesName}
                                        productName={product.productName}
                                        productPrice={product.productPrice}
                                        img={product.img}
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
                                            <a className="page-link" href="">{index + 1}</a>
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
