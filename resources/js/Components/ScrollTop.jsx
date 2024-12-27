import React, { useEffect, useState } from "react";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {isVisible && (

                <button
                    style={{
                        position: "fixed",
                        bottom: "50px",
                        right: "50px",
                        height: "50px",
                        width: "50px",
                        fontSize: "25px",
                        borderRadius: "50%",
                        backgroundColor: "#F3F2ED",
                        color: "#FEC265",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 1px 10px rgba(0,0,0,0.2)",
                    }}
                    onClick={scrollUp}
                >
                🢁
                </button>
            )}
        </div>
    );
}

export default ScrollToTop;
