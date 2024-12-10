import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (

        <AuthenticatedLayout>
            <Head title="Edit Profile" />
            <main className="container container-xxl" id='member'>
                <div className="tab-content pt-5">
                    <div>
                        <div className="text-center">
                            <img src="http://localhost/gachoraLRB/public/images/gachoButton.png" alt="頭像"
                                className="rounded-circle d-inline-block object-fit-contain" width="200px" height="200px" />
                            <button className="btn-icon m-auto d-block">更換頭像</button>
                        </div>
                    </div>
                    <div className="mt-5 profile-container" id='memberProfile'>
                        {/* <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" id='memberProfile'> */}
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                            <hr />
                            {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> */}
                                <UpdatePasswordForm className="max-w-xl" />
                            {/* </div> */}
                            <hr />
                            {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> */}
                                <DeleteUserForm className="max-w-xl" />
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>

    );
}
