export default function Footer() {
  return (
    <footer className="footerBody">
        <div className="footer  text-center">

            <div className="footerDetail">
                <div className="footerGachora">
                    <img src="http://localhost/gachoraProject/public/images/logo.png" width="200px"/>

                    <h3>"Capsules of Wonder, Moments of Joy."</h3>
                    <h5>Service Hours: Mon.- Fri. 10:00-18:30</h5>
                    <p>&copy; 2024 Gochara 保留所有權利。</p>
                </div>
                <div style={{display: "flex"}} className="col-6">
    
                    <div className="footerInfo">
                        <div className="footerXa">
                            <div className="footerXb">
                                <img src="http://localhost/gachoraProject/public/images/mailWithBg.svg" className="footerImg1" height="50px" width="50px" />
                                <p className="footerEmail">gachora.offical@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="footerInfo2">
                        <div className="footerXc">
                            <div className="footerXd">
                                <img src="http://localhost/gachoraProject/public/images/telWithBg.svg" className="footerImg2" />
                                <p className="footerTel">04-123-4567</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
