import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
        });
    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    修改基本資料
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-5">

                <div className="mb-3">
                    <InputLabel htmlFor="name" value="姓名*" className='form-label' />

                    <TextInput
                        id="name"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 errorMessage" message={errors.name} />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="email" value="信箱*" className='form-label' />

                    <TextInput
                        id="email"
                        type="email"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        readOnly
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )} */}

                <div className="mb-3">
                    <InputLabel htmlFor="phone" value="電話號碼" className='form-label' />

                    <TextInput
                        id="phone"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        isFocused
                        autoComplete="phone"
                    />

                    <InputError className="mt-2 errorMessage" message={errors.phone} />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="birth" value="生日" className='form-label' />

                    <TextInput
                        id="birth"
                        type="date"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.birth}
                        onChange={(e) => setData('birth', e.target.value)}
                        isFocused
                        autoComplete="birth"
                        readOnly
                    />

                    <InputError className="mt-2 errorMessage" message={errors.birth} />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="address" value="地址" className='form-label' />

                    <TextInput
                        id="address"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        isFocused
                        autoComplete="address"
                    />

                    <InputError className="mt-2 errorMessage" message={errors.address} />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="payment" value="付款方式" className='form-label' />

                    <TextInput
                        id="payment"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.payment}
                        onChange={(e) => setData('payment', e.target.value)}
                        isFocused
                        autoComplete="payment"
                    />

                    <InputError className="mt-2 errorMessage" message={errors.payment} />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="invitationCode" value="我的推薦碼" className='form-label' />

                    <TextInput
                        id="invitationCode"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.invitationCode}
                        onChange={(e) => setData('invitationCode', e.target.value)}
                        isFocused
                        autoComplete="invitationCode"
                        readOnly
                    />

                    <InputError className="mt-2 errorMessage" message={errors.invitationCode} />
                </div>

                <div className="edit-button text-end mt-4">
                    {/* <PrimaryButton disabled={processing}>Save</PrimaryButton> */}
                    <button className="btn rounded-pill">確認修改資料</button>

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
    );
}
