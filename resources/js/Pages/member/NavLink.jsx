import React from 'react'

function NavLink({ href, children, className="" }) {
    return (
        <li className="nav-item">
            <a className={"nav-link " + className} href={href} data-bs-toggle="pill">{children}</a>
        </li>
    )
}

export default NavLink