import InputError from '@/Components/init/InputError';
import InputLabel from '@/Components/init/InputLabel';
import PrimaryButton from '@/Components/init/PrimaryButton';
import TextInput from '@/Components/init/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

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
            phone: user.phone || "-",
            birth: user.birth || "-",
            road: user.road || "-",
            county_id: user.county_id,
        });
    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const cityList = [
        "台北市", "新北市", "基隆市", "桃園市", "新竹縣", "新竹市", "苗栗縣",
        "台中市", "南投縣", "彰化縣", "雲林縣", "嘉義縣", "嘉義市", "台南市",
        "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"
    ]

    useEffect(() => {
        if (user.birth != "-") {
            $("#birth").prop('readOnly', true)
        }
    })

    // const cityList = []
    const hasFetched = useRef(false)

    let cityObj = { "": "" }
    let cityData = {}
    let cityNumb = {}
    let [countyList, setCountyList] = useState([""])
    async function getCounty() {
        let response = await fetch("http://localhost/gachoraProject/resources/json/county.json");
        let data = await response.json();
        data[0].data.forEach((ele) => {
            cityData[ele.city + ele.county] = ele.id
            cityNumb[ele.id] = {city:ele.city, county:ele.county}
            if (!(ele.city in cityObj)) {
                // cityList.push(ele.city)
                cityObj[ele.city] = [ele.county];
            } else {
                cityObj[ele.city].push(ele.county);
            }
        });
        hasFetched.current = true;
    }

    let a = ""
    let i = 0
    useEffect(() => {
        if (!hasFetched.current) {
            getCounty().then(()=>{
                $(`#city option[value=${cityNumb[data.county_id].city}]`).attr('selected', 'selected')
                countyList = cityObj[$("#city :selected").text()]
                $("#county").html(countyList.map((ele, index) => `<option value=${ele} key=${index}>${ele}</option>`).reduce((accumulator, current) => accumulator + current))
                $(`#county option[value=${cityNumb[data.county_id].county}]`).attr('selected', 'selected')
            })
            $("#city").change((e) => {
                if(i == 0){
                    $("#county").html("<option value='DEFAULT'> -- 選擇鄉鎮區 -- </option>")
                    i += 1
                }
                setCountyList(cityObj[$("#city :selected").text()])
                a = e.target.value
            })
            $('#county').change((e) => {
                setData('county_id', cityData[a + e.target.value])
            })
        }
    }, [])

    return (
        <section className={className} id='profileEdit'>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    修改基本資料
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
                <div className="edit-button text-end mt-4">
                    <button type='button' className="btn rounded-pill">
                        <Link href={route('dashboard', { highlight: 'profile' })} className="dropdown-item">
                            回到我的基本資料
                        </Link>
                    </button>
                </div>
            </header>

            <form onSubmit={submit} className="mt-5">
                {/* 1. 姓名 */}
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
                {/* 2. 信箱 */}
                <div className="mb-3">
                    <InputLabel htmlFor="email" value="信箱*" className='form-label' />

                    <TextInput
                        id="email"
                        type="email"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        required
                        readOnly
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                {/* 3. 信箱驗證 */}
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
                {/* 4. 電話號碼 */}
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
                {/* 5. 生日 */}
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
                    />

                    <InputError className="mt-2 errorMessage" message={errors.birth} />
                    <span className="small-info">ℹ️ 設定後無法修改</span>
                </div>
                {/* 6. 地址 */}
                <div className="mb-3">
                    <InputLabel htmlFor="road" value="地址" className='form-label d-block' />

                    <select name="city" id="city" defaultValue="DEFAULT"
                        className="form-control-plaintext rounded-pill px-3 mb-2 me-2 d-inline-block"
                        style={{ border: "1px solid var(--main-darkblue)", width: "30%" }}
                        onChange={(e) => {
                            // setData()
                        }
                        }>
                        <option disabled value="DEFAULT"> -- 選擇縣市 -- </option>
                        {cityList.map((ele, index) => <option value={ele} key={index}>{ele}</option>)}
                    </select>
                    <select name="county" id="county" defaultValue="DEFAULT"
                        className="form-control-plaintext rounded-pill px-3 mb-2 d-inline-block"
                        style={{ border: "1px solid var(--main-darkblue)", width: "30%" }}
                        onChange={(e) => {
                            // setData()
                        }
                        }>
                        <option disabled value="DEFAULT"> -- 選擇鄉鎮區 -- </option>
                        {countyList.map((ele, index) => <option value={ele} key={index}>{ele}</option>)}
                    </select>

                    <TextInput
                        id="road"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.road}
                        onChange={(e) => setData('road', e.target.value)}
                        isFocused
                        autoComplete="road"
                    />

                    <InputError className="mt-2 errorMessage" message={errors.road} />
                </div>
                {/* 7. 付款方式 */}
                {/* <div className="mb-3">
                    <InputLabel htmlFor="payment" value="付款方式" className='form-label' />

                    <TextInput
                        id="payment"
                        className="form-control-plaintext rounded-pill px-3 editFocus"
                        value={data.payment}
                        onChange={(e) => setData('payment', e.target.value)}
                        isFocused
                        autoComplete="payment"
                        readOnly
                    />

                    <InputError className="mt-2 errorMessage" message={errors.payment} />
                    <div className="edit-button text-end mt-2">
                        <button type="button" className="btn rounded-pill btn-sm">刪除</button>
                        &nbsp;
                        <button type="button" className="btn rounded-pill btn-sm">新增</button>
                    </div>
                </div> */}
                {/* 確認修改資料按鈕 */}
                <div className="edit-button text-end mt-4">
                    {/* <PrimaryButton disabled={processing}>Save</PrimaryButton> */}
                    <button type='submit' className="btn rounded-pill">確認修改資料</button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            資料已修改.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
