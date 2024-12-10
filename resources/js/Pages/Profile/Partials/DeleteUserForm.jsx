import DangerButton from '@/Components/init/DangerButton';
import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import Modal from '@/Components/init/Modal';
import SecondaryButton from '@/Components/init/SecondaryButton';
import TextInput from '@/Components/init/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    刪除帳號
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <div className="edit-button text-end mt-4">
                <button className="btn" style={{ backgroundColor: "red" }} onClick={confirmUserDeletion}>刪除帳號</button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        您確定要刪除帳號嗎?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="form-floating mb-3 mt-3">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            placeholder="Password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="form-control"
                            isFocused
                        />

                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 errorMessage"
                        />
                    </div>
                    <div className="text-end mt-4">
                        <button className="btn" style={{ backgroundColor: "var(--main-darkblue)", color: "white" }} onClick={closeModal}>取消</button>
                        &nbsp;
                        <button className="btn" style={{ backgroundColor: "red", color: "white" }} onClick={confirmUserDeletion}>確認刪除</button>
                    </div>
                    {/* <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div> */}
                </form>
            </Modal>
        </section>
    );
}
