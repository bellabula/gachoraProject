import React from 'react'

function MyFavorCard({src = "", href = "" }) {
    return (
        <div className="col-12 col-sm-6 col-lg-3">
            <div className="position-relative w-100 h-100">
                <img className="w-100" src="http://localhost/gachoraProject/public/images/gachoHome/一番賞票卡框.svg" style={{ zIndex: 0 }} />
                <a href={href} target='_blank' style={{ position: "absolute", width: "100%", height: "100%", right: "0px" }}>
                    <div className="w-100 h-100">
                        <img className="w-100 position-absolute h-100" src={src} style={{ zIndex: -1, right: "0px", objectFit:"cover" }} />
                    </div>
                </a>

            </div>
        </div>
    )
}

export default MyFavorCard