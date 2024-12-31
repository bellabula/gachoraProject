import React from 'react'

function GachaDetailCard({character, switchBigImage, probability }) {
    console.log("角色資料")
    console.log(character)
    return (
        <>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <div className="small-images text-center">
                    <h3>{character.prize}賞</h3>
                    <img style={{objectFit:"cover"}} src={character.img} className="img-fluid" alt={character.name} onClick={() => switchBigImage(character.img)} />
                    <h5 className="mt-1">{character.name}</h5>
                    <p>體積 : {character.size}</p>
                    <p>材質 : {character.material}</p>
                    <p>數量 : {character.remain + "/" + character.total}</p>
                </div>
            </div>
        </>
    )
}

export default GachaDetailCard
