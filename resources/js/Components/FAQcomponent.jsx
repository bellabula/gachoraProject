import React from 'react'

function FAQcomponent({ targetId, children }) { 
    return (
        <>
            {/* <!-- 問題 --> */}
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${targetId}`}>
                    {children}
                </button>
            </h2>
        </>
    );
};

export default FAQcomponent