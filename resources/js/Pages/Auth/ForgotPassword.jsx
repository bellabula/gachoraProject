import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import Navbar from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Navbar logo='http://localhost/gachoraLRB/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="Forgot Password" />
            <main className="container container-xxl" id='resetPwd'>
                <h1>忘記密碼?</h1>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mainTextColor">
                                <p></p>
                                <p>忘記密碼了嗎？沒問題。只需告訴我們您的電子郵件地址，我們就會透過電子郵件向您發送密碼重設鏈接，您可以透過該連結選擇新密碼。</p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="form-floating mb-3">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="email"
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputLabel htmlFor="email" value="電子郵件*" />

                                    <InputError message={errors.email} className="mt-2 errorMessage" />

                                    <button>重設密碼</button>
                                    {/* <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Email Password Reset Link
                                    </PrimaryButton>
                                </div> */}
                                </div>
                            </form>
                            <div class="ff">
                                <div class="aa d-inline-block">
                                    <span></span>
                                    <span>已有會員</span>
                                    <span>&nbsp;&nbsp;</span>
                                    <Link href={route('login')}>登入</Link>
                                </div>
                                <div class="aa d-inline-block">
                                    <span></span>
                                    <span>還沒有會員</span>
                                    <span>&nbsp;&nbsp;</span>
                                    <Link href={route('register')}>註冊</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 ps-md-4">
                            <h3 className="contact" style={{ fontWeight: "bold" }}>無法更改密碼？</h3>
                            <p className="contact">如果您有任何密碼問題，請連絡客服人員，我們會竭誠為您處理。</p>

                            <div className="contact-item">
                                <img src="http://localhost/gachoraLRB/public/images/mailWithBg.svg" width="50px" height="50px" />&nbsp;&nbsp;
                                <div className="contact-text">
                                    <span>電子郵件gachora.offical@gmail.com</span><br />
                                    <span>我們收到你的問題後，將於工作日由專人以郵件與您聯絡。</span>
                                </div>
                            </div><br />

                            <div className="contact-item">
                                <img src="http://localhost/gachoraLRB/public/images/telWithBg.svg" />&nbsp;&nbsp;
                                <div className="contact-text">
                                    <span>客服專線 04-123-4567</span><br />
                                    <span>服務時間 周一至周五10:00~18:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form> */}
            </main>
        </>
    );
}
