import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import Modal from 'react-awesome-modal';

function SalaryInputs(props) {
    const { options } = props;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [helperText, setHelperText] = useState(null);

    // const onChange = (set, obj, e) => {
    //     set('');
    //     let value = e.target.value;
    //     if (isNaN(value)) {
    //         setOpen({
    //             ...open,
    //             [obj]: true,
    //         });
    //         set(value.replace(/[^\d]/g, ''));
    //         setOpenTooltipText({...openTooltipText, [obj]: "Contains unacceptable characters"});
    //
    //     } else if (parseInt(value) === 0 || !value) {
    //         if (obj !== 'tourApartments' && obj !== 'tourAmenities') {
    //             setOpen({
    //                 ...open,
    //                 [obj]: true,
    //             });
    //             setOpenTooltipText({...openTooltipText, [obj]: 'Has to be more than 0'});
    //         } else {
    //             set(value);
    //         }
    //     } else {
    //         set(value.replace(/[^\d]/g, ''));
    //         lessThanMore(obj, value);
    //     }
    // };

    const onChange = (set, e) => {
        // debugger
        set('');
        let value = e.target.value;
        if (isNaN(value)) {
            // setOpen({
            //     ...open,
            //     [obj]: true,
            // });
            set(value.replace(/[^\d]/g, ''));
            // setOpenTooltipText({...openTooltipText, [obj]: "Contains unacceptable characters"});

        // } else if (parseInt(value) === 0 || !value) {
        //     if (obj !== 'tourApartments' && obj !== 'tourAmenities') {
        //         setOpen({
        //             ...open,
        //             [obj]: true,
        //         });
        //         setOpenTooltipText({...openTooltipText, [obj]: 'Has to be more than 0'});
        //     } else {
        //         set(value);
        //     }
        } else {
            set(value);
            // lessThanMore(obj, value);
        }
    };


    const closeModal = () => {
        document.querySelector('.calculator-table').nextElementSibling.style.display = 'none';
        options.setIsCalcModalVisible(false);
    }

    return (
        <Modal visible={options.isCalcModalVisible} width="828" height="570" effect="fadeInUp" onClickAway={() => closeModal()}>
        <div className='salary-table column'>
            <span className='salary-border'></span>
            <div className='salary-table_title column-title'>
                Salaries
            </div>
            <div className='salary-table_block_title block-title'>
                <div className="salary-table_name salary-title"></div>
                <div className="salary-table_name salary-title">Inhouse, $ monthly</div>
                <div className="salary-table_name salary-title">Outsource, $</div>
            </div>
            <div className="salary-table_block" onSubmit={handleSubmit(onSubmit)}>
                <div className="salary-table_item">

                    <div className="salary-table_item-name">Developers</div>
                    <div className="salary-table_item-input">
                        <label htmlFor='salary-input-inhouse' className='label-inhouse'></label>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            id='developer-Salary-Inhouse'
                            placeholder='0'
                            value={options.developerSalaryInhouse}
                            onChange={(e) => onChange(options.setDeveloperSalaryInhouse, e)}
                        />
                    </div>
                    {/*<div className="salary-table_item-input input-outsource">*/}
                    {/*    <input*/}
                    {/*        className='salary-input-outsource number-input'*/}
                    {/*        type='text'*/}
                    {/*        id='developer-Salary-Outsource'*/}
                    {/*        value={options.developerSalaryOutsource}*/}
                    {/*        onChange={(e) => onChange(options.setDeveloperSalaryOutsource, e)}*/}
                    {/*        />*/}
                    {/*</div>*/}
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">2D designers</div>
                    <div className="salary-table_item-input">
                        <label htmlFor='designer-Salary-Inhouse' className='label-inhouse'></label>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            placeholder='0'
                            id='designer-Salary-Inhouse'
                            value={options.designerSalaryInhouse}
                            onChange={(e) => onChange(options.setDesignerSalaryInhouse, e)}
                        />
                    </div>
                    <div className="salary-table_item-input input-outsource ">
                        <label htmlFor='designer-Salary-Outsource' className='label-outsource des-outsource'></label>
                        <input
                            className='salary-input-outsource number-input'
                            type='text'
                            placeholder='0'
                            id='designer-Salary-Outsource'
                            value={options.designerSalaryOutsource}
                            onChange={(e) => onChange(options.setDesignerSalaryOutsource, e)}
                        />
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">3D modellers</div>
                    <div className="salary-table_item-input">
                        <label htmlFor='modeler-Salary-Inhouse' className='label-inhouse'></label>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            placeholder='0'
                            id='modeler-Salary-Inhouse'
                            value={options.modelerSalaryInhouse}
                            onChange={(e) => onChange(options.setModelerSalaryInhouse, e)}
                        />
                    </div>
                    <div className="salary-table_item-input input-outsource">
                        <label htmlFor='modeler-Salary-Outsource' className='label-outsource mod-outsource'></label>
                        <input
                            className='salary-input-outsource number-input'
                            type='text'
                            placeholder='0'
                            id='modeler-Salary-Outsource'
                            value={options.modelerSalaryOutsource}
                            onChange={(e) => onChange(options.setModelerSalaryOutsource, e)}
                        />
                    </div>
                </div>
                <div className="salary-table_item salary-table_item-visualizers">
                    <div className="salary-table_item-name">Visualizers</div>
                    <div className="salary-table_item-input">
                        <label htmlFor='visualizer-Salary-Inhouse' className='label-inhouse'></label>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            placeholder='0'
                            id='visualizer-Salary-Inhouse'
                            value={options.visualizerSalaryInhouse}
                            onChange={(e) => onChange(options.setVisualizerSalaryInhouse, e)}
                        />
                    </div>
                    <div className="salary-table_item-input input-outsource">
                        <label htmlFor='designer-Salary-Inhouse' className='label-outsource'></label>
                        <input
                            className='salary-input-outsource number-input'
                            type='text'
                            placeholder='0'
                            id='visualizer-Salary-Outsource'
                            value={options.visualizerSalaryOutsource}
                            onChange={(e) => onChange(options.visualizerSalaryOutsource, e)}
                        />
                    </div>
                    <div className="salary-table_item-input input-outsource">
                        <label htmlFor='developer-Salary-Outsource' className='label-outsource vis-outsource'></label>
                        <input
                            className='salary-input-outsource number-input'
                            type='text'
                            placeholder='0'
                            id='developer-Salary-Outsource' // change  !!!
                            value={options.visualizerSalaryOutsource} // change  !!!
                            onChange={(e) => onChange(options.visualizerSalaryOutsource, e)}  // change !!!
                        />
                    </div>
                </div>
            </div>
            <div className='actions-calc_block popup-actions'>
                <div className='adjust-salary_box'>
                    <a href="javascript:void(0);" className='close-button'
                       onClick={closeModal}></a>
                </div>
                <div className='save-box calculate-box'>
                    <button className='save-button calculate-button reset-button_styles' effect="fadeInDown"
                            onClick={closeModal}>
                        <span>SAVE</span>
                    </button>
                </div>
            </div>
        </div>
        </Modal>

    )
}


export default SalaryInputs;