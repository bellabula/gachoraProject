import React, { useState } from 'react'

function DepositOption({cost, gash, className="", onClick=""}) {
    return (
        <div
            key={cost}
            className={`optionBox d-inline-block `+className}
            onClick={onClick}
        >
            NT{cost}
            <br />
            G幣{gash}
        </div>
    )
}

export default DepositOption