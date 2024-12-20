import React, {useState} from 'react'

const storeData = {
    "南屯區": [
        { name: "南屯門市", address: "台中市南屯區XXX路" },
        { name: "大墩門市", address: "台中市南屯區YYY路" }
    ],
    "東區": [
        { name: "東門門市", address: "台中市東區ZZZ路" },
        { name: "成功門市", address: "台中市東區AAA路" }
    ]
};

function StoreSelector() {
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 選中的行政區
//     const [stores, setStores] = useState([]); // 顯示的門市列表

//     // 當選擇行政區時觸發
    const handleDistrictChange = (event) => {
        const district = event.target.value; // 獲取選中的值。指向觸發事件的 DOM 物件。
        setSelectedDistrict(district);

        // 更新門市列表
        // 如果有選取(district存在)
        if (district && storeData[district]) {
            setStores(storeData[district]);
        } else {
            setStores([]); // 清空門市列表
        }
    }
        return (
            <>
                <div>
                    請選擇欲查詢門市 :
                    &nbsp;&nbsp;&nbsp;
                    <select>
                        <option value="">全部縣市</option>
                        <option value="">臺北市</option>
                        <option value="">新北市</option>
                        <option value="">基隆市</option>
                        <option value="">桃園市</option>
                        <option value="">新竹市</option>
                        <option value="">新竹縣</option>
                        <option value="">宜蘭縣</option>
                        <option value="">臺中市</option>
                        <option value="">苗栗縣</option>
                        <option value="">彰化縣</option>
                        <option value="">南投縣</option>
                        <option value="">雲林縣</option>
                        <option value="">高雄市</option>
                        <option value="">臺南市</option>
                        <option value="">嘉義市</option>
                        <option value="">嘉義縣</option>
                        <option value="">屏東縣</option>
                        <option value="">澎湖縣</option>
                        <option value="">花蓮縣</option>
                        <option value="">臺東縣</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <select onChange={handleDistrictChange} value={selectedDistrict}>
                    <option value="">全部行政區</option>
                {/* {Object.keys(storeData).map((district, index) => ( */}
                    <option value={district} key={index}>
                        {district}
                    </option>
                {/* ) */}
                {/* ) */}
                {/* } */}
            </select>
              {/* 門市列表 */}
              {/* <ul>
                {stores.length > 0 ? (
                    stores.map((store, index) => (
                        <li key={index}>
                            {store.name} - {store.address}
                        </li>
                    ))
                ) : (
                    <li>請選擇行政區查看門市資料</li>
                )}
            </ul> */}
                    {/* <select name="" id="">
                        <option value="">全部行政區</option>
                        <option value="">中區</option>
                        <option value="">東區</option>
                        <option value="">西區</option>
                        <option value="">南區</option>
                        <option value="">北區</option>
                        <option value="">西屯區</option>
                        <option value="">南屯區</option>
                        <option value="">北屯區</option>
                        <option value="">豐原區</option>
                        <option value="">大里區</option>
                        <option value="">太平區</option>
                        <option value="">清水區</option>
                        <option value="">沙鹿區</option>
                        <option value="">大甲區</option>
                        <option value="">東勢區</option>
                        <option value="">梧棲區</option>
                        <option value="">烏日區</option>
                        <option value="">神岡區</option>
                        <option value="">大肚區</option>
                        <option value="">大雅區</option>
                        <option value="">后里區</option>
                        <option value="">霧峰區</option>
                        <option value="">潭子區</option>
                        <option value="">龍井區</option>
                        <option value="">外埔區</option>
                        <option value="">和平區</option>
                        <option value="">石岡區</option>
                        <option value="">大安區</option>
                        <option value="">新社區</option>
                    </select> */}
                </div>
            </>
        )
//     }
}

export default StoreSelector 