import React from 'react'

function MyWallGacha({src=""}) {
    return (
        <div>
            <img src="http://localhost/gachoraProject/public/images/gachoTop.svg" className="d-block" style={{ height: "80px", position: "relative", bottom: "-20px" }} />
            <img src={src} />
            <img src="http://localhost/gachoraProject/public/images/gachoBotton.svg" className="d-block" style={{ height: "100px", objectFit: "contain" }} />
        </div>
    )
}

export default MyWallGacha