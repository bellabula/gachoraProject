import React from 'react'

function AlertLogin({setIsLoginAlertOpen=null, setIsItemEnough=null, setIsGEnough=null, setIsSelectItem=null, setIsPwdChange=null, children=""}) {
  function closeAlert() {
    if(setIsLoginAlertOpen){
      setIsLoginAlertOpen(false);
    }
    if(setIsItemEnough){
      setIsItemEnough(true);
    }
    if(setIsSelectItem){
      setIsSelectItem(true);
    }
    if(setIsGEnough){
      setIsGEnough(true);
    }
    if(setIsPwdChange){
      setIsPwdChange(false);
    }
  }

  return (
    <div>
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: "1100"
      }}></div>
      <div style={{ position: "fixed", zIndex: "1200", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", backgroundColor: "var(--main-bg-gray)", textAlign: "center", borderRadius: "50px", boxShadow: "10px 10px #B3B3B3" }}>
        <img style={{ width: "50%", paddingTop: "30px" }} src="http://localhost/gachoraProject/public/images/logo2.png" />
        {children}
        {/* <h3 style={{ margin: "30px 0px", color: "#ED1C24" }}>請先登入</h3>
        <h5 style={{ color: "var(--main-darkblue)" }}>
          登入後才可進行<br />
          收藏、抽賞、抽扭蛋等活動哦!<br />
          過年期間加入即贈2025年節小蛇頭像。
        </h5>
        <button onClick={handleRedirect} style={{ width: "100px", height: "35px", margin: "20px 10px", borderRadius: "50px", backgroundColor: "var(--main-yellow)", color: "var(--main-darkblue)", border: "none", opacity: "1" }}>前往登入</button> */}
        <button onClick={closeAlert} style={{ width: "100px", height: "35px", margin: "20px 10px", borderRadius: "50px", backgroundColor: "var(--main-darkblue)", color: "var(--main-bg-gray)", border: "none" }}>關閉</button>
      </div>
    </div>
  )
}

export default AlertLogin