import React from 'react'

function MyWalletRecord({rDate, rItem, rCate, rPrice, rAmount, rTotal}) {
    let money = 0;
    if (rCate === "儲值") {
        switch (Math.abs(rPrice)) {
            case 300:
                money = 300;
                break;
            case 500:
                money = 500;
                break;
            case 1000:
                money = 1000;
                break;
            case 3030:
                money = 3000;
                break;
            case 5100:
                money = 5000;
                break;
            case 10250:
                money = 10000;
                break;
            case 20600:
                money = 20000;
                break;
            case 31000:
                money = 30000;
                break;
            case 52000:
                money = 50000;
                break;
        }
    }
    return (
        <tr>
            <td className="text-start">{rDate}</td>
            <td>{rItem}</td>
            <td>{rCate}</td>
            <td>{rAmount}</td>
            <td>{money === 0 ? rPrice*rAmount : money}</td>
            <td>{rCate === "儲值" ? "NT" : "G 幣"}</td>
            <td>{rPrice > 0 ? "G " : "- G "}{Math.abs(rPrice)*rAmount}</td>
            <td>G {rTotal}</td>
        </tr>
    )
}

export default MyWalletRecord