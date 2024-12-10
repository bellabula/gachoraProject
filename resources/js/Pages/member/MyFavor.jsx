import React from 'react'

function MyFavor({id}) {
    return (
        <>
            {/* <!-- 2. 收藏清單 --> */}
            <div id={id} className="tab-pane">
                <div className="favor-section">
                    <ul className="nav nav-pills justify-content-center nav-justified">
                        <li className="nav-item">
                            <a className="nav-link active" href="#gachofavor" data-bs-toggle="pill">扭蛋收藏</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#ichibanfavor" data-bs-toggle="pill">一番賞收藏</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content pt-5">
                    <div id="gachofavor" className="tab-pane active">
                        <div className="row  row-gap-2">
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                            <div className="col-3"><a href=""><img className="w-100" src="http://localhost/gachoraLRB/public/images/gachoMachineA.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div id="ichibanfavor" className="tab-pane">
                        <h1>一番賞收藏</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavor