import React from 'react'

function FAAcomponent({targetId, targetId2, children}) {
  return (
    <>
     {/* <!-- 答案 --> */}
     <div id={`${targetId}`} className="accordion-collapse collapse" data-bs-parent={`#${targetId2}`}>
     <div className="accordion-body">
     {children}
     </div>
   </div>
   </>
  )
}

export default FAAcomponent