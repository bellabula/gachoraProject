import React from 'react'

function MyWalletRecord({rDate, rItem, rCate, rPrice, rAmount}) {
    return (
        <tr>
            <td className="text-start">{rDate}</td>
            <td>{rItem}</td>
            <td>{rCate}</td>
            <td>{rAmount}</td>
            <td>{rPrice}</td>
            <td>G 幣 / NT</td>
            <td>-G xxxx</td>
            <td>G xxxx</td>
        </tr>
    )
}

export default MyWalletRecord