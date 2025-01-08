import React from 'react'

function AlertReminder({setIsLoginAlertOpen=null, setIsItemEnough=null, setIsSelect=null, setIsGEnough=null, setIsSelectItem=null, setIsDone=null, redirectSrc=null, children=""}) {
  function closeAlert() {
    if(setIsLoginAlertOpen){
      setIsLoginAlertOpen(false);
    }
    if(setIsItemEnough){
      setIsItemEnough(true);
    }
    if(setIsSelect){
      setIsSelect(true);
    }
    if(setIsGEnough){
      setIsGEnough(true);
    }
    if(setIsDone){
      if(redirectSrc){
        window.location.replace(redirectSrc)
      }else{
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
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: "1100"
      }}></div>
      <div style={{ 
        position: "fixed", 
        zIndex: "1200", 
        top: "85px", 
        right: "30px", 
        width: "370px", 
        height: "500px",
        backgroundColor: "var(--main-bg-gray)", 
        borderRadius: "50px", 
        boxShadow: "10px 10px  var(--main-yellow)" }}>
        <img style={{ width: "40%", paddingTop: "35px", marginLeft:"35px"}} src="http://localhost/gachoraProject/public/images/logo2.png" />
        <div style={{ margin: "20px", marginLeft:"125px"}}>
            <span style={{ fontSize: "1.3em", color: "var(--main-darkblue)", backgroundColor: "var(--main-yellow)", padding: "6px 20px", borderRadius:"4.5px" }}>提醒通知</span>
        </div>
        <div style={{height: "320px", margin: "0 48px",overflowY: "scroll"}}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AlertReminder