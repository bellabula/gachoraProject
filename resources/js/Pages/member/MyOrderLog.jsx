import React from 'react'

function MyOrderLog({oId, oDate, oStatus, dPath}) {
    return (
        <tr>
            <td className="text-start">{oId}</td>
            <td>{oDate}</td>
            <td>{oStatus}</td>
            <td>{dPath}</td>
            <td><a href="">明細</a></td>
        </tr>
    )
}

export default MyOrderLog