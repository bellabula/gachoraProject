import React, { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react';
function MyProfile({ id, className = "" }) {
    const user = usePage().props.auth.user;

    const hasFetched = useRef(false)

    let cityNumb = {}
    async function getCounty() {
        let response = await fetch("http://localhost/gachoraProject/resources/json/county.json");
        let data = await response.json();
        data[0].data.forEach((ele) => {
            cityNumb[ele.id] = ele.city + ele.county
        });
        hasFetched.current = true;
    }

    useEffect(() => {

        getCounty().then(() => {
            if (user.road) {
                document.querySelector("#profile > form > div:nth-child(5) > input").value = (user.county_id ? cityNumb[user.county_id] + user.road : user.road)
            }
        })

        $("#editPwdBtn").click(() => {
            $("#pwdSection").css("display", "block")
            $("#editPwdBtn").css("display", "none")
        })
        $("#confirmPwdBtn").click(() => {
            $("#pwdSection").css("display", "none")
            $("#editPwdBtn").css("display", "inline")
        })
    })

    let user_id = user.id;

    const [headPhotos, setHeadPhotos] = useState([]); // 儲存頭像數據
    const [selectedPhoto, setSelectedPhoto] = useState(null); // 儲存選中的頭像
    const [isModalOpen, setIsModalOpen] = useState(false); // 控制模態框顯示

    const handleClickPicture = () => {
        $.post('../app/Models/Post/MainUser.php', { user_id }, (response) => {
            let items = [];
            if (response && typeof response === 'object') {
                items = Array.isArray(response.achievement) ? response.achievement : [];
            } // 如果 response.achievement 是陣列，將它賦值給 items；否則設為空陣列

            setHeadPhotos(items); // 儲存頭像數據
            setIsModalOpen(true); // 打開更改頭貼介面
            console.log("照片:", JSON.stringify(response.achievement));
        });
    };

    // photo 會是這種型態 { id: 1, img: "http://localhost/image1.png" }
    // photo 是在下面抓的
    const handleSelectPhoto = (photo) => {
        setSelectedPhoto(photo.img); // 設置選中的頭像
        localStorage.setItem('selectedPhoto', photo.img);
        setIsModalOpen(false); // 關閉模態框
        console.log("選中的頭像:", photo); // 您可以在這裡調用接口保存選擇結果

        if (photo) {
            fetch('http://localhost/gachoraProject/app/Models/Post/ChangeHeadPhoto.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    user_id: user_id, // 傳送的參數
                    headphoto_id: photo.id
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // 將回應轉為 JSON 格式
                })
                .then((data) => {
                    console.log("成功回應：", data);
                })
                .catch((error) => {
                    console.error("Fetch 發生錯誤：", error);
                })
        }
    };

    useEffect(() => {
        const savedPhoto = localStorage.getItem('selectedPhoto');
        if (savedPhoto) {
            setSelectedPhoto(savedPhoto);
        }
        // 如果 localStorage 有存有存到 selectedPhoto 
    }, []);  

    return (
        <>
            {/* <!-- 6. 基本資料 --> */}
            <div id={id} className={"tab-pane profile-container " + className}>
                {/* <!-- 頭像 --> */}
                <div>
                    <div className="d-flex flex-column align-items-center">
                        <img src={selectedPhoto || "http://localhost/gachoraProject/public/images/gachoButton.png"} alt="頭像"
                            className="rounded-circle d-inline-block object-fit-contain" width="150px" height="150px" style={{ marginBottom: '1vw' }} />
                        <button className="btn-icon m-auto d-block" onClick={handleClickPicture} style={{ marginTop: '1vw' }}>更換頭像</button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2 style={{ marginBottom: '2vw' }}>選擇頭像</h2>
                            <div className="photo-grid">
                                {headPhotos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={photo.img}
                                        alt={`頭像 ${photo.id}`}
                                        className="head-photo"
                                        onClick={() => handleSelectPhoto(photo)}
                                    />
                                ))}
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="photo-button">關閉</button>
                        </div>
                    </div>
                )}
                {/* <!-- 表單資料 --> */}
                <div className="mt-5" id="profile">
                    <form>
                        {/* <!-- 姓名 --> */}
                        <div className="mb-3">
                            <label className="form-label">姓名*</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={user.name} readOnly />
                        </div>

                        {/* <!-- 電子郵件 --> */}
                        <div className="mb-3">
                            <label className="form-label">電子郵件*</label>
                            <input type="mail" className="form-control-plaintext rounded-pill px-3"
                                defaultValue={user.email} readOnly />
                        </div>

                        {/* <!-- 電話號碼 --> */}
                        <div className="mb-3">
                            <label className="form-label">電話號碼</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={user.phone} readOnly />
                        </div>

                        {/* <!-- 生日 --> */}
                        <div className="mb-3">
                            <label className="form-label">生日</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={user.birth} readOnly />
                            <span className="small-info">ℹ️ 設定後無法修改</span>
                        </div>

                        {/* <!-- 地址 --> */}
                        <div className="mb-3">
                            <label className="form-label">地址</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={user.road} readOnly />
                        </div>

                        {/* <!-- 付款方式 --> */}
                        {/* <div className="mb-3">
                            <label className="form-label">付款方式</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="-" readOnly />
                        </div> */}

                        {/* <!-- 推薦碼 --> */}
                        <div className="mb-3">
                            <label className="form-label">我的推薦碼</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={"GCR" + user.id + "657"} readOnly />
                        </div>

                        {/* <!-- 修改按鈕 --> */}

                        <div className="edit-button text-end mt-4">
                            <Link href={route('profile.edit')}>
                                <button type="button" className="btn rounded-pill">修改基本資料</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MyProfile