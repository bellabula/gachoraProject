import React, { useEffect, useState} from "react";

const CityDropdown = () => {
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState();
  const [error, setError] = useState("");


  const selectStyle = {
    borderColor: 'var(--main-darkblue)',
    borderRadius: '10px',
    height: '3vw',
    marginTop: '1vw'
  };

  const inputStyle = {
    borderColor: 'var(--main-darkblue)',
    borderRadius: '10px',
    height: '3vw',
    marginTop: '1vw',
    padding: '1vw'
  };

  useEffect(() => {
    fetch("http://localhost/gachoraProject/app/Models/Fetch/AllCity.php")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.error) {
          setError(data.error);
          console.error("API Error:", data.error);
        } else {
          setCities(data); // 設定縣市數據
        }
      })
  }, []);


  const handleCityChange = (event) => {
    const cityId = event.target.value;
    console.log(cityId)
    setSelectedCityId(cityId); // 設定選擇的城市 ID
    // fetchCounties(cityId); // 根據選擇的城市 ID 請求區縣數據
  };



  useEffect(() => {
    if (selectedCityId) {
      fetch("http://localhost/gachoraProject/app/Models/Fetch/AllCounty.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `city_id=${selectedCityId}`, // 使用 URL 編碼的請求
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
            console.error("API Error:", data.error);
          } else {
            setCounties(data); // 設定鄉鎮數據
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [selectedCityId]); // selectedCityId 應作為依賴陣列

  // console.log("id是"+counties.id)




  return (
    <div>
      {/* 城市下拉選單 */}
      <span>請選擇縣市：</span>
      <select id="cityDropdown" onChange={handleCityChange} value={selectedCityId} style={selectStyle}>
      <option value="">請選擇</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city}
          </option>
        ))}
      </select>
<br />
      {/* 顯示鄉鎮下拉選單 */}
      <span>請選擇鄉、鎮、市、區：</span>
      <select id="countyDropdown" style={selectStyle}>
        <option value="">
          請選擇
        </option>
        {counties.map((county) => (
          <option key={county.id} value={county.county}>
            {county.county}
          </option>
        ))}
      </select>

      <br />
      <span>請選擇街道：
        <input type="text" style={inputStyle} placeholder="請填入"/>
      </span>
      {/* 錯誤訊息 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CityDropdown;
