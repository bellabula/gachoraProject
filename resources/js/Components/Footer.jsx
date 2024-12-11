export default function Footer() {
  return (
    <footer className="FooterBody">
        <div className="footer  text-center">
            <div className="FooterDetail">
                <div className="FooterGachora">
                    <img src="http://localhost/gachoraProject/public/images/logo.png" width="200px"/>
                    <h3>"Capsules of Wonder, Moments of Joy."</h3>
                    <h5>Service Hours: Mon.- Fri. 10:00-18:30</h5>
                    <p>&copy; 2024 Gochara 保留所有權利。</p>
                </div>
                <div style={{display: "flex"}} className="col-6">
                    <div className="FooterInfo">
                        <div className="FooterXa">
                            <div className="FooterXb">
                                <img src="http://localhost/gachoraProject/public/images/mailWithBg.svg" className="FooterImg1" height="50px" width="50px" />
                                <p className="FooterEmail">gachora.offical@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="FooterInfo2">
                        <div className="FooterXc">
                            <div className="FooterXd">
                                <img src="http://localhost/gachoraProject/public/images/telWithBg.svg" className="FooterImg2" />
                                <p className="FooterTel">04-123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
