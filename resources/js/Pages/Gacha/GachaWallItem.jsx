import React from 'react'

function GachaWallItem({src}) {
    return (
        <div className="GachaWall" href="">
            <img className="img1" src="http://localhost/gachoraProject/public/images/gachoHome/扭蛋機.png" />
            <img className="img2" src={src} />
        </div>
    )
}

export default GachaWallItem