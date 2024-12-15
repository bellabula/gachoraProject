import React from 'react'

function GachaDetailCard({productImg,switchBigImage,productName,probability}) {
    return (
        <>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <div className="small-images text-center">
                    <img src={productImg}  className="img-fluid" onclick={switchBigImage}/>
                        <h5 className="mt-1">{productName}</h5>
                        <p>{probability}</p>
                </div>
            </div>
        </>
    )
}

export default GachaDetailCard