export default function Footer({imgSrc="http://localhost/gachoraProject/public/images/Footer.svg", bgColor="var(--main-bg-gray)"}) {
    $(".footer").css(`background-image`,`url(${imgSrc})`)
  return (
    <footer className="footerBody">
        <div className="footer text-center" style={{backgroundColor: bgColor}}></div>
    </footer>
  )
}
