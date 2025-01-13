import FAQcomponent from "../Components/FAQcomponent";
import FAAcomponent from "../Components/FAAcomponent";
import { Head, usePage } from '@inertiajs/react';
// import Footer from "@/Components/Footer";
// import Navbar from "@/Components/Navbar";
import React, { useEffect, useState, useRef } from "react";
// import axios from 'axios';
import emailjs from '@emailjs/browser';
import ScrollToTop from "@/Components/ScrollTop";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlertLogin from '@/Components/AlertLogin';


export default function FAQ() {

  const goto = usePage().props.goto
  useEffect(() => {
    if (goto === 'contact') {
      $(`#faq-category-1`).addClass('d-none');
      $(`#faq-category-6`).removeClass('d-none');
    }
  })

  function showFaq(categoryId) {

    // 把FAQ的內容全部隱藏
    $('.faq-category').each(function () {
      $(this).addClass('d-none');
    });


    // 將選中的 FAQ 內容取消隱藏
    $(`#${categoryId}`).removeClass('d-none');

    // 更新左側選單的 active 樣式
    $('.sidebar button').each(function () {
      $(this).removeClass('active');
    });

    // 選取特定的類別，讓他active
    $(`#${categoryId + "g"}`).addClass('active');

  }

  const form = useRef();
  const [isEmailSend, setIsEmailSend] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target)); // 檢查送出的資料

    emailjs
      .sendForm('service_w2kzikj', 'template_6yrxgme', form.current, {
        publicKey: 'XSNnYkDdyr6X8b0Tn',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    setIsEmailSend(true)
  };

  // $(document).ready(function () {
  // $('.button2').on('click', function () {
  // alert('郵件已寄出!'); // 顯示訊息
  // $('.formDetail').val(''); // 清空輸入框內容
  // window.location.replace("http://localhost/gachoraProject/public/faq?goto=contact")
  // });
  // }
  // );

  return (
    <>
      <AuthenticatedLayout header={"FAQ"}>
        {isEmailSend && (
          <AlertLogin setIsDone={setIsEmailSend} redirectSrc="http://localhost/gachoraProject/public/faq?goto=contact">
            <h3 style={{ margin: "30px 0px", color: "var(--main-darkblue)" }}>郵件已寄出</h3>
          </AlertLogin>
        )}
        <main id="faq">
          <div className="bluesquare">
            <div className="pp" style={{ display: "flex" }}>
              <p className="p1">Q&A分類</p>
              <p className="p2">FAQ常見問題</p>
            </div>
            <div className="container">
              <div className="yellowsquare">
                <div className="sidebar">
                  <button id="faq-category-1g" className={goto === 'contact' ? '' : 'active'} onClick={() => showFaq('faq-category-1')} style={{ marginTop: '10%' }}>扭蛋與一番賞</button>
                  <button id="faq-category-2g" onClick={() => showFaq('faq-category-2')}>會員與優惠</button>
                  <button id="faq-category-3g" onClick={() => showFaq('faq-category-3')}>付款與交易</button>
                  <button id="faq-category-4g" onClick={() => showFaq('faq-category-4')}>活動與公告</button>
                  <button id="faq-category-5g" onClick={() => showFaq('faq-category-5')}>技術與操作</button>
                  <button id="faq-category-6g" className={goto === 'contact' ? 'active' : ''} onClick={() => showFaq('faq-category-6')} >聯絡我們</button>
                </div>
              </div>
              {/* <!-- FAQ 內容 --> */}
              <div className="col-7">
                <div id="faq-category-1" className="faq-category">
                  <div className="accordion" id="accordion-category-1">

                    {/* <!-- 1-1 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question11">Q: 每次抽扭蛋的機率是否公平？</FAQcomponent>
                      <FAAcomponent targetId="question11" targetId2="accordion-category-1">A: 點擊右上方的會員圖片，即可註冊會員。</FAAcomponent>
                    </div>


                    {/* <!-- 1-2 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question12">Q: 一番賞的抽獎規則？</FAQcomponent>
                      <FAAcomponent targetId="question12" targetId2="accordion-category-1">A: 點擊任一商品，下面都有教學過程。</FAAcomponent>
                    </div>

                    {/* <!-- 1-3 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question13">Q: 如何操作抽扭蛋？</FAQcomponent>
                      <FAAcomponent targetId="question13" targetId2="accordion-category-1">A: 請登入會員帳號，選擇喜歡的扭蛋系列，點擊「GO」，即可隨機獲得商品。。</FAAcomponent>
                    </div>

                    {/* <!-- 1-4 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question14">Q: 抽到不喜歡或重複的可以換嗎？</FAQcomponent>
                      <FAAcomponent targetId="question14" targetId2="accordion-category-1">A: 無法更換，但可以有部分的退款，請到會員專區的戰利儲藏庫退款。</FAAcomponent>
                    </div>

                    {/* <!-- 1-5 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question15">Q: 想購買的商品已售完 / 沒看到想要的商品？</FAQcomponent>
                      <FAAcomponent targetId="question15" targetId2="accordion-category-1">A: 可以到「聯絡我們」，向客服詢問是否會進貨 / 是否有庫存可以補貨。</FAAcomponent>
                    </div>

                  </div>
                </div>

                <div id="faq-category-2" className="faq-category d-none">
                  <div className="accordion" id="accordion-category-2">

                    {/* <!-- 2-1 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question21">Q: 如何成為Gachora會員？</FAQcomponent>
                      <FAAcomponent targetId="question21" targetId2="accordion-category-2">A: 點擊右上方的會員圖片，即可註冊會員。</FAAcomponent>
                    </div>



                    {/* <!-- 2-2 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question22">Q: 如何修改個人資料？</FAQcomponent>
                      <FAAcomponent targetId="question22" targetId2="accordion-category-2">A: 可以透過會員專區裡面的基本資料進行修改。</FAAcomponent>
                    </div>

                    {/* <!-- 2-3 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question23">Q: 會員有哪些福利？</FAQcomponent>
                      <FAAcomponent targetId="question23" targetId2="accordion-category-2">A: 包括專屬優惠券、生日禮和購物折扣等。</FAAcomponent>
                    </div>

                    {/* <!-- 2-4 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question24">Q: 忘記密碼怎麼辦？</FAQcomponent>
                      <FAAcomponent targetId="question24" targetId2="accordion-category-2">A: 可以到我們登入會員頁面的下方，點擊「忘記密碼」。</FAAcomponent>
                    </div>


                  </div>
                </div>

                <div id="faq-category-3" className="faq-category d-none">
                  <div className="accordion" id="accordion-category-3">

                    {/* <!-- 3-1 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question31">Q: 如何購買？</FAQcomponent>
                      <FAAcomponent targetId="question31" targetId2="accordion-category-3">A: 儲值G幣後，扭蛋、一番賞隨抽隨開獎。</FAAcomponent>
                    </div>

                    {/* <!-- 3-2 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question32">Q: 有哪些付款方式？</FAQcomponent>
                      <FAAcomponent targetId="question32" targetId2="accordion-category-3">A: 儲值G幣可以使用信用卡或ATM轉帳；運費目前有711貨到付款。</FAAcomponent>
                    </div>

                    {/* <!-- 3-3 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question33">Q: 什麼是G幣？</FAQcomponent>
                      <FAAcomponent targetId="question33" targetId2="accordion-category-3">A: G幣是我們官方使用的代幣，點擊右上方的會員圖片，即可看到儲值G幣的按鈕。</FAAcomponent>
                    </div>

                    {/* <!-- 3-4 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question34">Q: 商品可以一直放在儲藏庫嗎？</FAQcomponent>
                      <FAAcomponent targetId="question34" targetId2="accordion-category-3">A: 抽中的商品在30天後，就會自動轉成G幣。</FAAcomponent>
                    </div>

                    {/* <!-- 3-5 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question35">Q: 運費如何計算？</FAQcomponent>
                      <FAAcomponent targetId="question35" targetId2="accordion-category-3">A: 目前僅有711貨到付款，運費為39元。</FAAcomponent>
                    </div>

                  </div>
                </div>

                <div id="faq-category-4" className="faq-category d-none">
                  <div className="accordion" id="accordion-category-4">

                    {/* <!-- 4-1 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question41">Q: 如何參與店內活動？</FAQcomponent>
                      <FAAcomponent targetId="question41" targetId2="accordion-category-4">A: 憑會員資格參加，可以現通過我們的官網預約參加活動。具體規則請參閱各活動細則。</FAAcomponent>
                    </div>

                    {/* <!-- 4-2 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question42">Q: 如果活動結束但商品未領取怎麼辦？</FAQcomponent>
                      <FAAcomponent targetId="question42" targetId2="accordion-category-4">A: 活動結束後，未領取的獎品將進入後續回收階段，無法再補領，請務必在期限內領取。</FAAcomponent>
                    </div>

                    {/* <!-- 4-3 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question43">Q: 新品扭蛋系列什麼時候上架？</FAQcomponent>
                      <FAAcomponent targetId="question43" targetId2="accordion-category-4">A: 新品通常會於每月 15 日上架，敬請期待。</FAAcomponent>
                    </div>

                    {/* <!-- 4-4 QA --> */}
                    {/* <div className="accordion-item">
                    <FAQcomponent targetId="question44">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question44" targetId2="accordion-category-4">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div> */}

                  </div>
                </div>

                <div id="faq-category-5" className="faq-category d-none">
                  <div className="accordion" id="accordion-category-5">

                    {/* <!-- 5-1 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question51">Q: 扭蛋機的操作介面可以切換語言嗎？</FAQcomponent>
                      <FAAcomponent targetId="question51" targetId2="accordion-category-5">A: 目前僅支援繁體中文操作，未來將逐步推出多語言版本，敬請期待。</FAAcomponent>
                    </div>

                    {/* <!-- 5-2 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question52">Q: 如何查看我抽到的商品？</FAQcomponent>
                      <FAAcomponent targetId="question52" targetId2="accordion-category-5">A: 登入會員後，進入「我的儲藏庫」頁面，即可查看您抽到的所有商品及詳細資訊。</FAAcomponent>
                    </div>

                    {/* <!-- 5-3 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question53">Q: 扭蛋抽取有機會失敗嗎？</FAQcomponent>
                      <FAAcomponent targetId="question53" targetId2="accordion-category-5">A: 抽取過程為線上系統自動執行，付款成功後必定會獲得商品。如因技術問題導致異常，請聯繫客服處理。</FAAcomponent>
                    </div>

                    {/* <!-- 5-4 QA --> */}
                    <div className="accordion-item">
                      <FAQcomponent targetId="question54">Q: 支付時遇到錯誤訊息怎麼辦？</FAQcomponent>
                      <FAAcomponent targetId="question54" targetId2="accordion-category-5">A: 請確認網路連線穩定，並確保您的支付帳戶餘額充足。若問題仍存在，建議更換支付方式或聯繫客服協助處理。</FAAcomponent>
                    </div>
                  </div>
                </div>
                <div id="faq-category-6" className="faq-category d-none" style={{ display: "flex" }}>
                  <form className="contact11" ref={form} onSubmit={sendEmail}
                  // action="https://docs.google.com/forms/u/0/d/1LZXOqs0SHz_0kxbgvNFLESLd6wbL_fgg2xhhJHK7mp8/previewResponse" method="POST"
                  >
                    <p>若您有任何需要我們服務的地方，請填寫以下表單～<br />我們收到您的來信後，將於3~5日內回覆（不含週六例假日）</p>
                    <div className="form" style={{ display: "flex" }}>
                      <h3 className="col-4">姓名</h3><input className="col-6 formDetail ps-2" type="text" name="from_name" placeholder="請填寫姓名"
                      // name="entry.196632432"
                      />
                    </div>
                    <div className="form" style={{ display: "flex" }}>
                      <h3 className="col-4">電子郵件</h3><input className="col-6 formDetail ps-2" type="email" name="from_email" placeholder="請輸入電子郵件"
                      // name="entry.176927514"
                      />
                    </div>
                    <div className="form" style={{ display: "flex" }}>
                      <h3 className="col-4">意見</h3>
                      <textarea className="col-6 formDetail ps-2 pt-2" name="message" placeholder="請填寫意見內容"
                      // name="entry.894253798"
                      />
                    </div>
                    <label className="check">
                      <input type="checkbox" required />
                      <span>我同意個人資料的收集及遵守本公司之</span><a href="#">隱私權政策</a>
                    </label>
                    <div className="buttonCheck">
                      <button className="button1" type="reset" >重新填寫</button>
                      <button className="button2" type="submit" value="Send">完成送出</button>

                    </div>
                  </form>
                  <div className="contact22">
                    <p>聯絡我們</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <ScrollToTop/> */}
        {/* <Footer /> */}
      </AuthenticatedLayout>
    </>
  )
}