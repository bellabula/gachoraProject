import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import TextInput from '@/Components/init/TextInput';
import Navbar from '@/Components/Navbar';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Navbar logo='http://localhost/gachoraLRB/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
            <Head title="Reset Password" />
            <main className="container container-xxl" id='resetPwd'>
                <h1>忘記密碼</h1>
                <div className="container">
                    <div className="row">
                        {/* <!-- 左側 - 表單 --> */}
                        <div className="col-md-6">
                            <form onSubmit={submit}>
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
                                    />

                                    <InputLabel htmlFor="email" value="電子郵件*" />

                                    <InputError message={errors.email} className="mt-2 errorMessage" />
                                </div>
                                <div className="form-floating mb-3">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder="Code"
                                        className="form-control"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputLabel htmlFor="password" value="密碼*" />

                                    <InputError message={errors.password} className="mt-2 errorMessage" />
                                </div>
                                <div className="form-floating mb-3">
                                    <TextInput
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="confirmPwd"
                                        className="form-control"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                    />

                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="密碼再次輸入*"
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2 errorMessage"
                                    />
                                </div>
                                <button>確認</button>
                                {/* <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Reset Password
                                    </PrimaryButton>
                                </div> */}
                            </form>
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
                <div className="ee">
                    <div className="bb"></div>
                    <div className="cc"></div>
                </div>

            </main>
        </>
    );
}
