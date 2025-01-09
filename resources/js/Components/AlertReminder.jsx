import React from 'react'

function AlertReminder({ setIsLoginAlertOpen = null, setIsItemEnough = null, setIsSelect = null, setIsGEnough = null, setIsSelectItem = null, setIsDone = null, redirectSrc = null, children = "" }) {
  function closeAlert() {
    if (setIsLoginAlertOpen) {
      setIsLoginAlertOpen(false);
    }
    if (setIsItemEnough) {
      setIsItemEnough(true);
    }
    if (setIsSelect) {
      setIsSelect(true);
    }
    if (setIsGEnough) {
      setIsGEnough(true);
    }
    if (setIsDone) {
      if (redirectSrc) {
        window.location.replace(redirectSrc)
      } else {
        setIsDone(false);
      }
    }
  }
  const handleClickDn = () => {
    setIsLoginAlertOpen(false)
  }

  return (
    <div>
      <div onClick={handleClickDn} style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: "1100"
      }}></div>
      <div style={{
        position: "absolute",
        zIndex: "1200",
        top: "85px",
        // right: "30px",
        left: "10px",
        width: "370px",
        height: "500px",
        backgroundColor: "var(--main-bg-gray)",
        borderRadius: "20px",
        border: "10px solid #EDB866"
      }}>
        <img style={{ width: "40%", verticalAlign: "left" }} src="http://localhost/gachoraProject/public/images/logo2.png" />
        {/* <div style={{ margin: "20px", marginLeft:"125px"}}>
            <span style={{ fontSize: "1.3em", color: "var(--main-darkblue)", backgroundColor: "var(--main-yellow)", padding: "6px 20px", borderRadius:"4.5px" }}>提醒通知</span>
        </div> */}
        <div className='scroll-bar' style={{ height: "320px", margin: "0px 15px 20px 25px", overflowY: "scroll" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AlertReminder