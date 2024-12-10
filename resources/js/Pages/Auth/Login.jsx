import Checkbox from '@/Components/init/Checkbox';
import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import Navbar from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Navbar logo='http://localhost/gachoraLRB/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="Log in" />
            <main className="container container-xxl" id='login'>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <div className="container">
                    <div className="xx">
                        <div className="xa"></div> {/*<!--藍 大長方形-->*/}
                        <div className="xb"></div> {/*<!--黃 小長方形-->*/}
                        <div className="xc"></div>
                        <div className="xd">還不是會員?</div>
                        <div>
                            <Link href={route('register')} className="xe">
                                前往註冊頁面
                            </Link>
                        </div>
                    </div>

                    <div className="member">
                        <h1>會員登入</h1>
                        <div className="container">
                            <form onSubmit={submit}>
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={data.email}
                                            className="form-control"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <label htmlFor="email" value="Email">電子郵件*</label>

                                        <InputError message={errors.email} className="mt-2 errorMessage" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={data.password}
                                            className="form-control"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <label htmlFor="password" value="Password">密碼*</label>

                                        <InputError message={errors.password} className="mt-2 errorMessage" />
                                    </div>
                                </div>
                                <div className='ms-5'>
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            記住我
                                        </span>
                                    </label>
                                </div>
                                <div className="forget">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="forget"
                                        >
                                            忘記密碼?
                                        </Link>
                                    )}
                                    <button className="btn1">確認</button>
                                </div>
                                <Link href={route('register')} className="back">
                                    前往註冊頁面
                                </Link>
                            </form>
                        </div>

                        <div className="col-md-6 text-wrap">
                            <h3 className="contact" style={{ fontWeight: "bold", marginTop: "50px" }}>無法更改密碼？</h3>
                            <p className="contact">如果您有任何密碼問題，請連絡客服人員，我們會竭誠為您處理。</p>

                            <div className="contact-item">
                                <img src="./images/mailWithBg.svg" />&nbsp;&nbsp;
                                <div className="contact-text">
                                    <span>電子郵件gachora.offical@gmail.com</span><br />
                                    <span>我們收到你的問題後，將於工作日由專人以郵件與您聯絡。</span>
                                </div>
                            </div><br />


                            <div className="contact-item">
                                <img src="./images/telWithBg.svg" />&nbsp;&nbsp;
                                <div className="contact-text">
                                    <span>客服專線 04-123-4567</span><br />
                                    <span>服務時間 周一至周五10:00~18:00</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
