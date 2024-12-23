import React from 'react'

function NavLink({id, target, children, onClick, className="" }) {
    return (
        <li className="nav-item">
            <button id={id} onClick={onClick} className={"nav-link " + className} data-bs-target={target} data-bs-toggle="tab">{children}</button>
        </li>
    )
}

export default NavLink