// import '../css/app.css';
import './bootstrap';
import '../css/style.css';
import '../css/navbar.css';
import '../css/login.css';
import '../css/signUpStyle.css';
import '../css/member.css';
import '../css/forgetPassword.css';
import '../css/home.css';

import '../css/gachaHome.css';
import '../css/gachaTagPage.css';
import '../css/GachaPdCard.css';
import '../css/home.css';
import '../css/faq.css';
import '../css/footer.css';

import '../css/shoppingCart.css';
import '../css/gachaDetail.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
