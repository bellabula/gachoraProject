import FAQcomponent from "../Components/FAQcomponent";
import FAAcomponent from "../Components/FAAcomponent";
import { Head, usePage } from '@inertiajs/react';
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useEffect, useState, useRef } from "react";
// import axios from 'axios';
import emailjs from '@emailjs/browser';
import ScrollToTop from "@/Components/ScrollTop";


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
  };

  // $(document).ready(function () {
    // $('.button2').on('click', function () {
      // alert('郵件已寄出!'); // 顯示訊息
      // $('.formDetail').val(''); // 清空輸入框內容
      // window.location.replace("http://localhost/gachoraProject/public/faq?goto=contact")
    // });
  // }
// );
  function handleSubmit(){
    alert('郵件已寄出')
    window.location.replace("http://localhost/gachoraProject/public/faq?goto=contact")
  }


  return (
    <>
      <Navbar logo='http://localhost/gachoraProject/public/images/logo2.png' bgcolor="var(--main-bg-gray)" navbgcolor="var(--main-darkblue)" svgColor="var(--white-filter)" textColor="white" />
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
                    <FAQcomponent targetId="question11">Q:每次抽扭蛋的機率是否公平？</FAQcomponent>
                    <FAAcomponent targetId="question11" targetId2="accordion-category-1">A:是的，我們的扭蛋機率完全隨機，所有玩家的機會均等。</FAAcomponent>
                  </div>


                  {/* <!-- 1-2 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question12">Q:？</FAQcomponent>
                    <FAAcomponent targetId="question12" targetId2="accordion-category-1">A:。</FAAcomponent>
                  </div>

                  {/* <!-- 1-3 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question13">Q:？</FAQcomponent>
                    <FAAcomponent targetId="question13" targetId2="accordion-category-1">A:</FAAcomponent>
                  </div>

                  {/* <!-- 1-4 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question14">Q:？</FAQcomponent>
                    <FAAcomponent targetId="question14" targetId2="accordion-category-1">A:是的，每日限時活動會提供免費抽一次的機會！</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-2" className="faq-category d-none">
                <div className="accordion" id="accordion-category-2">

                  {/* <!-- 2-1 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question21">Q:會員如何升級等級？21</FAQcomponent>
                    <FAAcomponent targetId="question21" targetId2="accordion-category-2">A:累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>



                  {/* <!-- 2-2 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question22">Q:會員有哪些福利？22</FAQcomponent>
                    <FAAcomponent targetId="question22" targetId2="accordion-category-2">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 2-3 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question23">Q:會員有哪些福利？23</FAQcomponent>
                    <FAAcomponent targetId="question23" targetId2="accordion-category-2">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 2-4 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question24">Q:會員有哪些福利？24</FAQcomponent>
                    <FAAcomponent targetId="question24" targetId2="accordion-category-2">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>


                </div>
              </div>

              <div id="faq-category-3" className="faq-category d-none">
                <div className="accordion" id="accordion-category-3">

                  {/* <!-- 3-1 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question31">Q:如何購買？</FAQcomponent>
                    <FAAcomponent targetId="question31" targetId2="accordion-category-3">A:儲值G幣後，扭蛋、一番賞隨抽隨開獎。</FAAcomponent>
                  </div>



                  {/* <!-- 3-2 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question32">Q;有哪些付款方式？</FAQcomponent>
                    <FAAcomponent targetId="question32" targetId2="accordion-category-3">A:儲值G幣可以使用信用卡或ATM轉帳；運費目前有711貨到付款。</FAAcomponent>
                  </div>

                  {/* <!-- 3-3 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question33">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question33" targetId2="accordion-category-3">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 3-4 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question34">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question34" targetId2="accordion-category-3">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-4" className="faq-category d-none">
                <div className="accordion" id="accordion-category-4">

                  {/* <!-- 4-1 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question41">Q:會員如何升級等級？</FAQcomponent>
                    <FAAcomponent targetId="question41" targetId2="accordion-category-4">A:累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>

                  {/* <!-- 4-2 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question42">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question42" targetId2="accordion-category-4">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 4-3 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question43">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question43" targetId2="accordion-category-4">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 4-4 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question44">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question44" targetId2="accordion-category-4">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                </div>
              </div>

              <div id="faq-category-5" className="faq-category d-none">
                <div className="accordion" id="accordion-category-5">

                  {/* <!-- 5-1 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question51">Q:會員如何升級等級？</FAQcomponent>
                    <FAAcomponent targetId="question51" targetId2="accordion-category-5">A:累積消費金額即可升級會員等級，享受更多專屬福利。</FAAcomponent>
                  </div>

                  {/* <!-- 5-2 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question52">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question52" targetId2="accordion-category-5">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 5-3 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question53">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question53" targetId2="accordion-category-5">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>

                  {/* <!-- 5-4 QA --> */}
                  <div className="accordion-item">
                    <FAQcomponent targetId="question54">Q:會員有哪些福利？</FAQcomponent>
                    <FAAcomponent targetId="question54" targetId2="accordion-category-5">A:包括專屬優惠券、生日禮物和購物折扣等。</FAAcomponent>
                  </div>
                </div>
              </div>
              <div id="faq-category-6" className="faq-category d-none" style={{ display: "flex" }}>
                <form className="contact11" ref={form} onSubmit={sendEmail}
                // action="https://docs.google.com/forms/u/0/d/1LZXOqs0SHz_0kxbgvNFLESLd6wbL_fgg2xhhJHK7mp8/previewResponse" method="POST"
                >
                  <p>若您有任何需要我們服務的地方，請填寫以下表單～<br />我們收到您的來信後，將於3~5日內回覆（不含週六例假日）</p>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">姓名</h3><input className="col-6 formDetail" type="text" name="from_name" placeholder="請填寫姓名"
                    // name="entry.196632432"
                    />
                  </div>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">電子郵件</h3><input className="col-6 formDetail" type="email" name="from_email" placeholder="請輸入電子郵件" 
                    // name="entry.176927514"
                    />
                  </div>
                  <div className="form" style={{ display: "flex" }}>
                    <h3 className="col-4">意見</h3>
                    <textarea className="col-6 formDetail" name="message" placeholder="請填寫意見內容" 
                    // name="entry.894253798"
                    />
                  </div>
                  <label className="check">
                    <input type="checkbox" />
                    <span>我已詳細閱讀並同意</span><a href="#">會員條款</a>
                  </label>
                  <div className="buttonCheck">
                    <button className="button1" type="reset" >重新填寫</button>
                    <button className="button2" type="submit" value="Send" onClick={handleSubmit}>完成送出</button>

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
      <ScrollToTop/>
      <Footer />
    </>
  )
}