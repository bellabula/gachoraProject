import React from 'react'

function MyFavorCard({ seriesId, name, removeFavor, user_id, src = "", href = "" }) {
    return (
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div className="position-relative w-100 h-100">
                <div className="heart-icon">
                    <img className="heart active" src='http://localhost/gachoraProject\public\images\heart.svg' onClick={()=>removeFavor(user_id, seriesId)} />
                </div>
                <img className="w-100" src="http://localhost/gachoraProject/public/images/gachoHome/一番賞票卡框Favor.svg" style={{ zIndex: 0 }} />
                <a href={href} target='_blank' style={{ position: "absolute", width: "80%", height: "80%", left: "6%", top: "7%" }}>
                    <div className="w-100 h-100">
                        <img className="w-100 position-absolute h-100 ichibanImg" src={src} />
                    </div>
                </a>
                <p className='position-absolute' style={{ bottom: "-10px", left: "10px" }}>{name}</p>
            </div>
        </div>
    )
}

export default MyFavorCard