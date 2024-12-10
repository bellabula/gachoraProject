import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react';
function MyProfile({id}) {
    const user = usePage().props.auth.user;
    
    useEffect(()=>{
        $("#editProfile").click(() => {
            $("#profile").addClass("d-none")
            $("#profileEdit").removeClass("d-none")
        })
        $("#confirmEdit").click(() => {
            $("#profileEdit").addClass("d-none")
            $("#profile").removeClass("d-none")
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
            <div id={id} className="tab-pane profile-container">
                {/* <!-- 頭像 --> */}
                <div>
                    <div className="text-center">
                        <img src="http://localhost/gachoraLRB/public/images/gachoButton.png" alt="頭像"
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
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="-" readOnly />
                            <span className="small-info">ℹ️ 設定後無法修改</span>
                        </div>

                        {/* <!-- 地址 --> */}
                        <div className="mb-3">
                            <label className="form-label">地址</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="-" readOnly />
                        </div>

                        {/* <!-- 付款方式 --> */}
                        <div className="mb-3">
                            <label className="form-label">付款方式</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="-" readOnly />
                        </div>

                        {/* <!-- 推薦碼 --> */}
                        <div className="mb-3">
                            <label className="form-label">我的推薦碼</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="550481" readOnly />
                        </div>

                        {/* <!-- 修改按鈕 --> */}

                        <div className="edit-button text-end mt-4">
                            <button type="button" className="btn rounded-pill" id="editProfile">修改基本資料</button>
                        </div>

                        <Link href={route('profile.edit')}>
                            <div className="edit-button text-end mt-4">
                                <button type="button" className="btn rounded-pill">修改基本資料LinkToPage</button>
                            </div>
                        </Link>
                    </form>
                </div>
                {/* <!-- 修改表單資料 --> */}
                <div className="mt-5 d-none" id="profileEdit">
                    <form>
                        {/* <!-- 姓名 --> */}
                        <div className="mb-3">
                            <label className="form-label">姓名*</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="陳寶寶" />
                        </div>

                        {/* <!-- 電子郵件 --> */}
                        <div className="mb-3">
                            <label className="form-label">電子郵件*</label>
                            <input type="mail" className="form-control-plaintext rounded-pill px-3"
                                defaultValue="baobaoChen@gmail.com" readOnly />
                        </div>

                        {/* <!-- 電話號碼 --> */}
                        <div className="mb-3">
                            <label className="form-label">電話號碼</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                        </div>

                        {/* <!-- 生日 --> */}
                        <div className="mb-3">
                            <label className="form-label">生日</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                            <span className="small-info">ℹ️ 設定後無法修改</span>
                        </div>

                        {/* <!-- 地址 --> */}
                        <div className="mb-3">
                            <label className="form-label">地址</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                        </div>

                        {/* <!-- 付款方式 --> */}
                        <div className="mb-3">
                            <label className="form-label">付款方式</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" readOnly />
                            <div className="edit-button text-end mt-2">
                                <button type="button" className="btn rounded-pill btn-sm">刪除</button>
                                <button type="button" className="btn rounded-pill btn-sm">新增</button>
                            </div>
                        </div>

                        {/* <!-- 推薦碼 --> */}
                        <div className="mb-3">
                            <label className="form-label">我的推薦碼</label>
                            <input type="text" className="form-control-plaintext rounded-pill px-3" defaultValue="550481" readOnly />
                        </div>

                        {/* <!-- 修改按鈕 --> */}
                        <div className="edit-button text-end mt-4">
                            <button type="button" className="btn rounded-pill" id="confirmEdit">確認修改</button>
                        </div>
                    </form>
                    <hr />
                    {/* <!-- 修改密碼 --> */}
                    <div className="edit-button text-end mt-4">
                        <button id="editPwdBtn" type="button" className="btn rounded-pill">修改密碼</button>
                    </div>
                    <form id="pwdSection" style={{ display: "none" }}>
                        <div className="mb-3">
                            <label className="form-label">舊密碼*</label>
                            <input type="password" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">新密碼*</label>
                            <input type="password" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">確認密碼*</label>
                            <input type="password" className="form-control-plaintext rounded-pill px-3 editFocus" defaultValue="" />
                        </div>
                        {/* <!-- 修改密碼按鈕 --> */}
                        <div className="edit-button text-end mt-4">
                            <button id="confirmPwdBtn" type="button" className="btn rounded-pill">確認修改密碼</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MyProfile