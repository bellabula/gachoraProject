import FAQcomponent from "../Components/FAQcomponent";
import FAAcomponent from "../Components/FAAcomponent";
import { Head } from '@inertiajs/react';


export default function FAQ() {
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  function showFaq(categoryId) {

    // 把FAQ的內容全部隱藏
    $('.faq-category').each(function () {
      $(this).addClass('d-none');
    });

    // 將選中的 FAQ 類別取消隱藏
    $(`#${categoryId}`).removeClass('d-none');

    // 更新左側選單的 active 樣式
    $('.sidebar button').each(function () {
      $(this).removeClass('active');
    });

    // 選取特定的類別，讓他active
    // const selector = `.sidebar button onClick={() => "showFaq('#${categoryId}')"}`;
    // console.log(selector);
    // $(selector).addClass('active');
    const selector = `.sidebar button[onclick="showFaq('${categoryId}')"]`
    $(selector).on("click", function(){
      $(this).addClass('active');
    })
    console.log(categoryId)
    

  }

  return (
    <>
      <Head title="FAQ" />
      <main id="faq">
        <div className="bluesquare">
          <div className="pp" style={{ display: "flex" }}>
            <p className="p1">Q&A分類</p>
            <p className="p2">FAQ常見問題</p>
          </div>
          <div className="container">
            <div className="yellowsquare">
              <div className="sidebar">
                <button onClick={() => showFaq('faq-category-1')}>扭蛋與一番賞</button>
                <button onClick={() => showFaq('faq-category-2')}>會員與優惠</button>
                <button onClick={() => showFaq('faq-category-3')}>付款與交易</button>
                <button onClick={() => showFaq('faq-category-4')}>活動與公告</button>
                <button onClick={() => showFaq('faq-category-5')}>技術與操作</button>
                <button onClick={() => showFaq('faq-category-6')}>聯絡我們</button>
              </div>
            </div>
            {/* <!-- FAQ 內容 --> */}
            <div className="col-8">
              <div id="faq-category-1" className="faq-category">
                <div className="accordion" id="accordion-category-1">

                  {/* <!-- 1-1 QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 1-1 QA --> */}
                    <FAQcomponent targetId="question11">每次抽扭蛋的機率是否公平？</FAQcomponent>
                    <FAAcomponent targetId="question11" targetId2="accordion-category-1">是的，我們的扭蛋機率完全隨機，所有玩家的機會均等。</FAAcomponent>
                  </div>


                  {/* <!-- 1-2 QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 1-2 QA --> */}
                    <FAQcomponent targetId="question12">有沒有每日免費抽一次的活動？</FAQcomponent>
                    <FAAcomponent targetId="question12" targetId2="accordion-category-1">是的，每日限時活動會提供免費抽一次的機會！</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-2" className="faq-category d-none">
                <div className="accordion" id="accordion-category-2">

                  {/* <!-- 2-1 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 2-1 QA --> */}
                    <FAQcomponent targetId="question21">會員如何升級等級？</FAQcomponent>
                    <FAAcomponent targetId="question21" targetId2="accordion-category-2">累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>



                  {/* <!-- 2-2 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 2-2 QA --> */}
                    <FAQcomponent targetId="question22">會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question22" targetId2="accordion-category-2">包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>


                </div>
              </div>

              <div id="faq-category-3" className="faq-category d-none">
                <div className="accordion" id="accordion-category-3">

                  {/* <!-- 3-1 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 3-1 QA --> */}
                    <FAQcomponent targetId="question31">會員如何升級等級？31</FAQcomponent>
                    <FAAcomponent targetId="question31" targetId2="accordion-category-3">累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>



                  {/* <!-- 3-2 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 3-2 QA --> */}
                    <FAQcomponent targetId="question32">會員有哪些福利？32</FAQcomponent>
                    <FAAcomponent targetId="question32" targetId2="accordion-category-3">包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-4" className="faq-category d-none">
                <div className="accordion" id="accordion-category-4">

                  {/* <!-- 4-1 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 4-1 QA --> */}
                    <FAQcomponent targetId="question41">會員如何升級等級？41</FAQcomponent>
                    <FAAcomponent targetId="question41" targetId2="accordion-category-4">累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>



                  {/* <!-- 4-2 QA --> */}
                  {/* <!-- QA --> */}
                  <div className="accordion-item">
                    {/* <!-- 4-2 QA --> */}
                    <FAQcomponent targetId="question42">會員有哪些福利？42</FAQcomponent>
                    <FAAcomponent targetId="question42" targetId2="accordion-category-4">包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-5" className="faq-category d-none">
                <div className="accordion" id="accordion-category-5">

                  {/* <!-- 5-1 QA --> */}
                  <div className="accordion-item">

                    {/* <!-- 5-1 問題 --> */}
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#question51">
                        會員如何升級等級？
                      </button>
                    </h2>

                    {/* <!-- 5-1 答案--> */}
                    <div id="question51" className="accordion-collapse collapse show" data-bs-parent="#accordion-category-5">
                      <div className="accordion-body">
                        累積消費金額即可升級會員等級，享受更多專屬福利。
                      </div>
                    </div>
                  </div>

                  {/* <!-- 5-2 QA --> */}
                  <div className="accordion-item">

                    {/* <!-- 5-2 問題 --> */}
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#question52">
                        會員有哪些福利？
                      </button>
                    </h2>

                    {/* <!-- 5-2 答案 --> */}
                    <div id="question52" className="accordion-collapse collapse" data-bs-parent="#accordion-category-5">
                      <div className="accordion-body">
                        包括專屬優惠券、生日禮物和購物折扣等。
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div id="faq-category-6" className="faq-category d-none" style={{ display: "flex" }}>
                <div className="contact11">
                  <p>若您有任何需要我們服務的地方，請填寫以下表單～<br />我們收到您的來信後，將於3~5日內回覆（不含週六例假日）</p>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">姓名</h3><input className="col-6" type="text" placeholder="請填寫姓名" />
                  </div>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">電子郵件</h3><input className="col-6" type="email" placeholder="請輸入電子郵件" />
                  </div>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">意見</h3>
                    <textarea className="col-6" placeholder="請填寫意見內容" />
                  </div>
                  <label className="check">
                    <input type="checkbox" />
                    <span>我已詳細閱讀並同意</span><a href="#">會員條款</a>
                  </label>
                  <div className="buttonCheck">
                    <button className="button1">重新填寫</button>
                    <button className="button2">完成送出</button>
                  </div>
                </div>
                <div className="contact22">
                  <p>聯絡我們</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}