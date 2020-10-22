import React, {useState} from 'react';
import Modal from 'react-awesome-modal';
import {Tooltip} from "@material-ui/core";

function SaveModal(props) {
    const { options, click, close, name, setName } = props;

    const onChangeEmail = (e) => {
        options.setEmail(e.target.value);
        options.setEmailTooltip(false);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const closeModal = () => {
        options.setEmailTooltip(false);
        setTimeout(() => {
            options.setIsSaveModalVisible(false);
        }, 300)
    };


    return (
        <Modal className="modal-save" visible={options.isSaveModalVisible} width="628" height="366" effect="fadeInUp" onClickAway={closeModal}>
            <div className='email-input-block'>
                <div className='save-popup-title'>Send to e-mail</div>
                <label htmlFor='email-id' className='save-label'></label>
                <Tooltip className='platform_tooltip' open={options.emailTooltip} TransitionProps={{timeout: 600}}
                         placement="top" title="Contains unacceptable characters" arrow={true}>
                    <input
                        className='email-input number-input'
                        type='text'
                        placeholder='example@email.com'
                        id='email-id'
                        value={options.email}
                        onChange={(e) => onChangeEmail(e)}
                    />
                </Tooltip>
                <span className='required-star'>*</span>
                <input
                    className='project-name-input number-input'
                    type='text'
                    placeholder='Project name (optional)'
                    id='project-name-id'
                    value={name}
                    onChange={(e) => onChangeName(e)}
                />
                <div className='save-box calculate-box'>
                    <div className='adjust-salary_box'>
                        <a href="javascript:void(0);" className='close-button save-close-button'
                           onClick={closeModal}></a>
                    </div>
                    <button className='save-modal-button calculate-button reset-button_styles' effect="fadeInDown"
                            onClick={click}>
                        <span>SEND</span>
                    </button>
                </div>
            </div>
        </Modal>

    )}


export default SaveModal;