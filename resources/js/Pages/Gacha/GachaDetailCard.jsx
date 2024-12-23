import React from 'react'

function GachaDetailCard({ productImg, switchBigImage, productName, probability }) {
    return (
        <>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <div className="small-images text-center">
                    <img style={{objectFit:"cover"}} src={productImg} className="img-fluid" alt={productName} onClick={() => switchBigImage(productImg)} />
                    <h5 className="mt-1">{productName}</h5>
                    <p>機率:{probability}</p>
                </div>
            </div>
        </>
    )
}

export default GachaDetailCard
