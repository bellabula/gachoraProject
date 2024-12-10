import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import Navbar from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Navbar logo='http://localhost/gachoraLRB/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="Register" />
            <main className="container container-xxl" id='register'>
                <h1>會員註冊</h1>
                <form onSubmit={submit}>
                    <div className="container">
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    placeholder="name"
                                    className="form-control"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputLabel htmlFor="name" value="您的名字*" />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-floating mb-3">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="email"
                                    className="form-control"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputLabel htmlFor="email" value="電子郵件*" />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="form-floating">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Code"
                                    className="form-control"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputLabel htmlFor="password" value="密碼*" />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="form-floating">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    placeholder="Code"
                                    className="form-control"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />

                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="密碼再次輸入*"
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                            <div className="form-floating">
                                <TextInput
                                    id="invitationCode"
                                    name="invitationCode"
                                    value={data.invitationCode}
                                    placeholder="Code"
                                    className="form-control"
                                    autoComplete="invitationCode"
                                    isFocused={true}
                                    onChange={(e) => setData('invitationCode', e.target.value)}
                                />

                                <InputLabel htmlFor="invitationCode" value="推薦碼" />

                                <InputError message={errors.invitationCode} className="mt-2" />
                            </div>
                            <label className="check">
                                <div>
                                    <input type="checkbox" name="agree" />
                                    &nbsp;
                                    <span>我已詳細閱讀並同意<a href="#">會員條款</a></span>
                                </div>
                            </label>
                        </div>
                        <button>確認</button>
                    </div>
                </form>
                <Link href={route('login')} className="back">
                    前往登入頁面
                </Link>
                <div className="xx">
                    <div className="xa"></div>
                    <div className="xb"></div>
                    <div className="xc"></div>
                    <div className="xd">我已經有會員了?</div>
                    <div>
                        <Link href={route('login')} className="xe">
                            前往登入頁面
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
