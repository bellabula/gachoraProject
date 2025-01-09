import React from 'react'

function LottryWallItem({ src }) {
    return (
        <div className="GachaWall">
            <div
                className="img1"
                style={{
                    backgroundImage: 'url(http://localhost/gachoraProject/public/images/gachoHome/一番賞票卡框.svg)',
                    backgroundSize: 'contain',
                    width: '350px',
                    height: '350px'
                }}
            />
            <img className="img2" src={src} />
        </div>
    )
}

export default LottryWallItem
