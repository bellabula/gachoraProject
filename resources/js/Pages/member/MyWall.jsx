import React from 'react'

function MyWall({id}) {
    return (
        <>
            {/* <!-- 1. 戰利牆 --> */}
            <div id={id} className="tab-pane active">
                <div className="container">
                    {/* <!-- 成就 --> */}
                    <div>
                        <h2 className="text-center fw-bolder my-5">成就</h2>
                        <div className="d-flex justify-content-between">
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowLeft.svg" /></button>
                            <div className="d-flex gap-3 flex-wrap">
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                                <img src="http://localhost/gachoraLRB/public/images/dodolong.png" className="circle-container" />
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>

                    {/* <!-- 抽獎獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">扭蛋戰利品</h2>
                        <div className="d-flex justify-content-between" style={{ backgroundColor: "var(--main-darkblue)" }}>
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowLeft.svg" /></button>
                            <div className="d-flex gap-3 flex-wrap">
                                <div>
                                    <img src="http://localhost/gachoraLRB/public/images/gachoTop.svg" className="d-block" style={{ height: "80px", position: "relative", bottom: "-20px" }} />
                                    <img src="http://localhost/gachoraLRB/public/images/dodolong.png" />
                                    <img src="http://localhost/gachoraLRB/public/images/gachoBotton.svg" className="d-block" style={{ height: "100px", objectFit: "contain" }} />
                                </div>
                                <div>
                                    <img src="http://localhost/gachoraLRB/public/images/gachoTop.svg" className="d-block" style={{ height: "80px", position: "relative", bottom: "-20px" }} />
                                    <img src="http://localhost/gachoraLRB/public/images/dodolong.png" />
                                    <img src="http://localhost/gachoraLRB/public/images/gachoBotton.svg" className="d-block" style={{ height: "100px", objectFit: "contain" }} />
                                </div>
                                <div>
                                    <img src="http://localhost/gachoraLRB/public/images/gachoTop.svg" className="d-block" style={{ height: "80px", position: "relative", bottom: "-20px" }} />
                                    <img src="http://localhost/gachoraLRB/public/images/dodolong.png" />
                                    <img src="http://localhost/gachoraLRB/public/images/gachoBotton.svg" className="d-block" style={{ height: "100px", objectFit: "contain" }} />
                                </div>
                                <div>
                                    <img src="http://localhost/gachoraLRB/public/images/gachoTop.svg" className="d-block" style={{ height: "80px", position: "relative", bottom: "-20px" }} />
                                    <img src="http://localhost/gachoraLRB/public/images/dodolong.png" />
                                    <img src="http://localhost/gachoraLRB/public/images/gachoBotton.svg" className="d-block" style={{ height: "100px", objectFit: "contain" }} />
                                </div>
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>

                    {/* <!-- 一番賞獲利檔 --> */}
                    <div className="mt-4">
                        <h2 className="text-center fw-bolder my-5">一番賞戰利品</h2>
                        <div className="d-flex justify-content-between">
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowLeft.svg" /></button>
                            <div className="d-flex gap-3 flex-wrap">
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                                <img src="http://localhost/gachoraLRB/public/images/ichiban1.png" />
                            </div>
                            <button className="btn"><img src="http://localhost/gachoraLRB/public/images/arrowRight.svg" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWall