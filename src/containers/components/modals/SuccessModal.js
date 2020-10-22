import React from 'react';
import Modal from 'react-awesome-modal';

function SuccessModal(props) {
    const { options } = props;

    const closeModal = () => {
        options.setIsSuccessEmail(false);
    };

    return (
        <Modal className="modal-success" visible={options.isSuccessEmail} width="628" height="366" effect="fadeInUp" onClickAway={closeModal}>
            <div className='modal-success'>
                <div className='kitten'></div>
                <div className='success-popup-title'>The quote has been sent to your e-mail!</div>
                <button className='save-modal-button calculate-button reset-button_styles' effect="fadeInDown"
                        onClick={closeModal}>
                    <span>OK</span>
                </button>
            </div>
            <div className='save-box calculate-box'>
                <div className='adjust-salary_box'>
                    <a href="javascript:void(0);" className='close-button save-close-button'
                       onClick={closeModal}></a>
                </div>
            </div>
        </Modal>

    )}


export default SuccessModal;