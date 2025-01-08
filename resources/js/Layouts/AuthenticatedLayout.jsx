import ApplicationLogo from '@/Components/init/ApplicationLogo';
import Dropdown from '@/Components/init/Dropdown';
import NavLink from '@/Components/init/NavLink';
import ResponsiveNavLink from '@/Components/init/ResponsiveNavLink';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ScrollToTop from '@/Components/ScrollTop';

export default function AuthenticatedLayout({ header, imgSrc, children, cartNumber, bagNumber, dCount, dBagCount }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" logout='list-item' cartNumber={cartNumber} bagNumber={bagNumber} dCount={dCount} dBagCount={dBagCount} />
            <Head title={header} />
            {children}
            <ScrollToTop />
            <Footer imgSrc={imgSrc} />
        </>
    );
}
