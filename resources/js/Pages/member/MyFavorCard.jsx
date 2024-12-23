import React from 'react'

function MyFavorCard({ src = "", href = "" }) {
    return (
        <div className="col-12 col-sm-6 col-lg-3">
            <div className="position-relative w-100 h-100">
                <img className="w-100" src="http://localhost/gachoraProject/public/images/gachoMachineA.png" style={{ zIndex: 0 }} />
                <a href={href} target='_blank' style={{ position: "absolute", width: "100%", height: "60%", right: "0px" }}>
                    <div>
                        <img className="w-100 position-absolute" src={src} style={{ zIndex: -1, right: "0px", top:"20px" }} />
                    </div>
                </a>

            </div>
        </div>
    )
}

export default MyFavorCard