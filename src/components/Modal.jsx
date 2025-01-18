import React from 'react'
import ReactDom from 'react-dom'

export default function Modal() {
  return ReactDom.createPortal(
    <div className="modal-container">
      <button onClick={handleCloseModal} className="modal-underlay" />

      <div className="modal-content">
        {children}
      </div>
    </div>,
    //find that id of portal
    document.getElementById('portal')
  )
}
