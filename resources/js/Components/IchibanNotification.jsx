import React from 'react'

function IchibanNotification({ seriesID = 0, seriesName = "", waitMin = 0, waitSec = 0, display = "none", myPlayTime = 0 }) {
    function closeNoti() {
        $("#ichibanNoti").removeClass("openIchibanNoti")
        $("#ichibanNoti").addClass("closeIchibanNoti")
        setTimeout(() => {
            $("#ichibanNoti").css("display", "none")
        }, 900)
    }
    return (
        <div id='ichibanNoti' className='' style={{ display: display, position: "fixed", zIndex: "1200", bottom: "2%", right: "2%", width: "450px", backgroundColor: "var(--main-bg-gray)", paddingLeft: "20px", border: "5px solid var(--main-yellow)", borderRadius: "30px" }}> {/* , boxShadow: "5px 5px var(--main-yellow)" */}
            <button className='float-end mt-2 me-3 border-0' style={{ color: "#B3B3B3" }} onClick={closeNoti}>X</button>
            <img style={{ width: "150px", paddingTop: "20px", marginBottom: "10px" }} src="http://localhost/gachoraProject/public/images/logo2.png" />
            {myPlayTime > 0 ?
                <>
                    <h5 style={{ color: "var(--main-darkblue)", paddingBottom: "10px" }}>
                        您所排隊的一番賞 <span style={{ color: "red" }}>{seriesName}</span> <br />
                        還剩 <span style={{ color: "red" }}>{Math.floor(myPlayTime / 60)} 分 {myPlayTime % 60} 秒</span> 可以抽 <br />
                        請進入抽選頁面抽選
                    </h5>
                    <button className='btn rounded-5 float-end position-fixed' style={{ backgroundColor: "var(--main-yellow)", color: "var(--main-darkblue)", bottom: "4%", right: "3%" }} onClick={() => { window.location.href = 'http://localhost/gachoraProject/public/lottrydetail?seriesId=' + seriesID }}>前往抽賞頁面 <img src="http://localhost/gachoraProject/public/images/rightArrow.svg" height={"20px"} /></button>
                </>
                :
                <>
                    <h5 style={{ color: "var(--main-darkblue)", paddingBottom: "10px" }}>
                        您所排隊的一番賞 <span style={{ color: "#FF8000" }}>{seriesName}</span> <br />
                        將於 <span style={{ color: "#FF8000" }}>{waitMin} 分 {waitSec} 秒</span> 後輪到您 <br />
                        請盡早進入抽選頁面等待
                    </h5>
                    <button className='btn rounded-5 float-end position-fixed' style={{ backgroundColor: "var(--main-darkblue)", color: "var(--main-bg-gray)", bottom: "4%", right: "3%" }} onClick={() => { window.location.href = 'http://localhost/gachoraProject/public/lottrydetail?seriesId=' + seriesID }}>前往頁面等待 <img src="http://localhost/gachoraProject/public/images/rightArrow.svg" height={"20px"} /></button>
                </>}

        </div>
    )
}

export default IchibanNotification