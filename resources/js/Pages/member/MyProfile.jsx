import React, { useEffect, useRef } from 'react'
import { Link, usePage } from '@inertiajs/react';
function MyProfile({ id, className="" }) {
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

        getCounty().then(()=>{
            if(user.road){
                document.querySelector("#profile > form > div:nth-child(5) > input").value = cityNumb[user.county_id]+user.road
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

    return (
        <>
            {/* <!-- 6. 基本資料 --> */}
            <div id={id} className={"tab-pane profile-container " + className}>
                {/* <!-- 頭像 --> */}
                <div>
                    <div className="text-center">
                        <img src="http://localhost/gachoraProject/public/images/gachoButton.png" alt="頭像"
                            className="rounded-circle d-inline-block object-fit-contain" width="200px" height="200px" />
                        <button className="btn-icon m-auto d-block">更換頭像</button>
                    </div>
                </div>
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
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue={"GACHO" + user.id} readOnly />
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