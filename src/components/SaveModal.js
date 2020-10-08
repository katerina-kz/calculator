import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import Modal from 'react-awesome-modal';

function SalaryInputs(props) {
    const { options, click, close } = props;
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const onChangeEmail = (e) => {
        options.setEmail(e.target.value);
    }

    return (
        <Modal visible={options.isSaveModalVisible} width="400" height="150" effect="fadeInUp" onClickAway={close}>
            <div className='email-input'>
                <TextField  ref={register} id={'email-id'} label="Add your email for sending result" variant="outlined" value={options.email} onChange={onChangeEmail}/>
            </div>
            <div className='save-box calculate-box'>
                <button className='save-modal-button calculate-button reset-button_styles' effect="fadeInDown"
                        onClick={click}>
                    <span>SAVE</span>
                </button>
            </div>
        </Modal>

    )}


export default SalaryInputs;