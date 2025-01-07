import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useEffect, useState } from 'react';
import AlertLogin from '@/Components/AlertLogin';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                $("#pwdSection").css("display", "none")
                $("#editPwdBtn").css("display", "inline")
                setIsPwdChange(true)
                // alert('密碼已修改')
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    useEffect(() => {
        $("#editPwdBtn").click(() => {
            $("#pwdSection").css("display", "block")
            $("#editPwdBtn").css("display", "none")
        })
        // $("#confirmPwdBtn").click(() => {
        //     $("#pwdSection").css("display", "none")
        //     $("#editPwdBtn").css("display", "inline")
        // })
    })
    const [isPwdChange, setIsPwdChange] = useState(false)
    return (
        <>
            {isPwdChange && (
                <AlertLogin setIsPwdChange={setIsPwdChange}>
                    <h3 style={{ margin: "30px 0px", color: "var(--main-darkblue)" }}>密碼已修改</h3>
                </AlertLogin>
            )}
            <section className={className}>
                {/* <div className="edit-button text-end mt-4">
                <button id="editPwdBtn" type="button" className="btn rounded-pill">修改密碼</button>
            </div> */}
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        修改密碼
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        為確保您的帳戶安全，請使用較長且隨機的密碼。
                    </p>
                </header>
                <div className="edit-button text-end mt-4">
                    <button id="editPwdBtn" type="button" className="btn rounded-pill">修改密碼</button>
                </div>
                <form onSubmit={updatePassword} id="pwdSection" style={{ display: "none" }}>
                    <div className='mb-3'>
                        <InputLabel htmlFor="current_password" value="舊密碼*" className='form-label' />

                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                            className="form-control-plaintext rounded-pill px-3 editFocus"
                            autoComplete="current-password"
                        />

                        <InputError
                            message={errors.current_password}
                            className="mt-2 errorMessage"
                        />
                    </div>

                    <div className='mb-3'>
                        <InputLabel htmlFor="password" value="新密碼*" className='form-label' />

                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            type="password"
                            className="form-control-plaintext rounded-pill px-3 editFocus"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password} className="mt-2 errorMessage" />
                    </div>

                    <div className='mb-3'>
                        <InputLabel htmlFor="password_confirmation" value="密碼再次輸入*" className='form-label' />

                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type="password"
                            className="form-control-plaintext rounded-pill px-3 editFocus"
                            autoComplete="new-password"
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2 errorMessage"
                        />
                    </div>

                    <div className="edit-button text-end mt-4"> {/* className="flex items-center gap-4" */}
                        {/* <PrimaryButton disabled={processing}>Save</PrimaryButton> */}
                        <button className="btn rounded-pill">確認修改密碼</button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </form>
            </section>
        </>
    );
}
