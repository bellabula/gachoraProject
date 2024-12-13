import React from 'react'

function GachaWallItem({src}) {
    return (
        <div class="GachaWall" href="">
            <img class="img1" src="http://localhost/gachoraProject/public/images/gachoHome/扭蛋機.png" />
            <img class="img2" src={src} />
        </div>
    )
}

export default GachaWallItem