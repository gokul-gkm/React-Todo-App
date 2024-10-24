import React from 'react'

const ConfirmationButton = ({message, onConfirm, onCancel}) => {
  return (
    <div>
        <div className="confirmation-dialog">
              <div className="confirmation-dialog-content">
                  <p>{message}</p>
                  <button className="btn btn-background-slide yes-btn" onClick={onConfirm}>Yes</button>
                  <button className="btn btn-background-slide no-btn" onClick={onCancel}>No</button>
              </div>
      </div>
    </div>
  )
}

export default ConfirmationButton
