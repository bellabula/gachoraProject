import React, { useState } from 'react';

function StoreSelector() {

    const selectStyle = {
        borderColor: 'var(--main-darkblue)',
        borderRadius: '10px',
        height: '3vw',
        marginTop: '1vw'
    };

    const [storeInfo, setStoreInfo] = useState(''); // 用來儲存選擇的門市資訊

    const handleStreetChange = (event) => {
        const selectedStreet = event.target.value;
        if (selectedStreet === '昌進門市') {
            setStoreInfo(
                '昌進門市\n台中市南屯區大進街387號1樓\n大墩十二街151號1樓'
            );
        } else {
            setStoreInfo('');
        }
    };
    return (
        <>
            <div style={{display: 'flex'}}>
                <div style={{ flex: 1, textAlign: "left"}}>
                    <p></p>
                    請選擇縣市 :
                    <br />
                    <select style={selectStyle}>
                        <option value="">請選擇</option>
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
                    <br />
                    請選擇鄉、鎮、市、區 :
                    <br />
                    <select style={selectStyle}>
                        <option value="">請選擇</option>
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
                    </select>
                    <br />
                    請選擇街道:
                    <br />
                    <select name="" id="" style={selectStyle}>
                        <option value="">請選擇</option>
                        <option value="">大進街</option>
                    </select>
                    <br />
                    請選擇門市:
                    <br />
                    <select onChange={handleStreetChange} style={selectStyle}>
                        <option value="">請選擇</option>
                        <option value="昌進門市">昌進門市</option>
                    </select>
                </div>
                <div style={{ marginTop: '20px', whiteSpace: 'pre-line', flex: 1, textAlign: "left" }}>
                    {storeInfo && (
                        <>
                            <strong>門市資訊：</strong>
                            <p>{storeInfo}</p>
                        </>
                    )}
                    <p className="grey">取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。</p>
                </div>
            </div>
        </>
    )
}

export default StoreSelector 