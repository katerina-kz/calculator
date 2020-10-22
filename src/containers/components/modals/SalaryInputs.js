import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import Modal from 'react-awesome-modal';
import {Tooltip} from "@material-ui/core";
import {Popup} from 'reactjs-popup';

function SalaryInputs(props) {
    const { options } = props;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [isEmptySalaries, setIsEmptySalaries] = useState(false);
    const [helperText, setHelperText] = useState(null);

    useEffect(() => {
        if (options.isCalcModalVisible) {
            if (!options.visualizerSalaryInhouse ||
                !options.modelerSalaryInhouse ||
                !options.designerSalaryInhouse ||
                !options.developerSalaryInhouse) {
                setIsEmptySalaries(true);
            }
        } else {
            setIsEmptySalaries(false)
        }
    }, [options.isCalcModalVisible, options.visualizerSalaryInhouse, options.modelerSalaryInhouse, options.developerSalaryInhouse, options.designerSalaryInhouse]);

    const handleTooltipsFalse = () => {
        options.setIsOutsourceFill({
            designer: false,
            modelerForEnv: false,
            modelerForBuild: false,
            visualizer: false
        });
    };

    const onChange = (set, e) => {
        setIsEmptySalaries(false);
        handleTooltipsFalse();
        set('');
        let value = e.target.value;
        if (isNaN(value)) {
            set(value.replace(/[^\d]/g, ''));
        } else {
            set(value);
        }
    };

    const handleChecked = () => {
        if (options.visualizerSalaryOutsource === '' && document.getElementById('id-outsource-apt_tour').checked) {
            document.getElementById('id-outsource-apt_tour').checked = false;
            options.setIsOutSource({...options.isOutsource, "360-tours count - apartments": 0})
        } else if (options.visualizerSalaryOutsource === '' && document.getElementById('id-outsource-am_tour').checked) {
            document.getElementById('id-outsource-am_tour').checked = false;
            options.setIsOutSource({...options.isOutsource, '360-tours count - amenities': 0})
        } else if (options.modelerSalaryOutsource === '' && document.getElementById('id-outsource-build').checked) {
            document.getElementById('id-outsource-build').checked = false;
            options.setIsOutSource({...options.isOutsource, 'Building count': 0})
        } else if (options.modelerForEnvSalaryOutsource === '' && document.getElementById('id-outsource-envinr').checked) {
            document.getElementById('id-outsource-envinr').checked = false;
            options.setIsOutSource({...options.isOutsource, 'Environment complexity': 0})
        }

        if (document.getElementById('id-outsource-apt_tour').checked) options.setIsOutSource({...options.isOutsource, "360-tours count - apartments": 1});
        if (document.getElementById('id-outsource-am_tour').checked) options.setIsOutSource({...options.isOutsource, "360-tours count - amenities": 1});
        if (document.getElementById('id-outsource-build').checked) options.setIsOutSource({...options.isOutsource, "Building count": 1});
        if (document.getElementById('id-outsource-envinr').checked) options.setIsOutSource({...options.isOutsource, "Environment complexity": 1});
    };

    const closeModal = () => {
        if ( options.isOutsourceFill.visualizer || options.isOutsourceFill.modelerForBuild || options.isOutsourceFill.modelerForEnv) {
            handleTooltipsFalse();
            handleChecked();
            document.querySelector('.calculator-table').nextElementSibling.style.display = 'none';
            options.setIsCalcModalVisible(false);
           // document.querySelector('.MuiTooltip-tooltipPlacementBottom').classList.add('tramble'); // TODO If checkbox doesn't work correct
        } else {
            handleChecked();
            document.querySelector('.calculator-table').nextElementSibling.style.display = 'none';
            options.setIsCalcModalVisible(false);
        }
        // setTimeout(() => {
        //     if (document.querySelector('.MuiTooltip-tooltipPlacementBottom') && document.querySelector('.MuiTooltip-tooltipPlacementBottom').classList.contains('tramble'))
        //     document.querySelector('.MuiTooltip-tooltipPlacementBottom').classList.remove('tramble');
        // }, 200)
    };

    return (
        <Modal visible={options.isCalcModalVisible} width="828" height="570" effect='fadeInLeft' onClickAway={() => closeModal()}>
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
                        <Tooltip className='platform_tooltip' open={isEmptySalaries} TransitionProps={{timeout: 600}}
                                 placement="right" title="Please, fill in the salaries fields first" arrow={true}>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            id='developer-Salary-Inhouse'
                            placeholder='-'
                            value={options.developerSalaryInhouse}
                            onChange={(e) => onChange(options.setDeveloperSalaryInhouse, e)}
                        />
                        </Tooltip>
                    </div>
                    <div className="salary-table_item-input salary-table_item-input-text">No one can replace our developers</div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">2D designers</div>
                    <div className="salary-table_item-input">
                        <label htmlFor='designer-Salary-Inhouse' className='label-inhouse'></label>
                        <input
                            className='salary-input-inhouse number-input'
                            type='text'
                            placeholder='-'
                            id='designer-Salary-Inhouse'
                            value={options.designerSalaryInhouse}
                            onChange={(e) => onChange(options.setDesignerSalaryInhouse, e)}
                        />
                    </div>
                    <div className="salary-table_item-input salary-table_item-input-text">No one can replace our designers</div>
                    {/*<div className="salary-table_item-input input-outsource ">*/}
                        {/*<label htmlFor='designer-Salary-Outsource' className='label-outsource des-outsource'></label>*/}
                        {/*<Tooltip className='platform_tooltip' open={options.isOutsourceFill.designer} TransitionProps={{timeout: 600}}*/}
                        {/*         placement="bottom" title="Has to be filled!" arrow={true}>*/}
                        {/*    <input*/}
                        {/*        className='salary-input-outsource number-input'*/}
                        {/*        type='text'*/}
                        {/*        placeholder='0'*/}
                        {/*        id='designer-Salary-Outsource'*/}
                        {/*        value={options.designerSalaryOutsource}*/}
                        {/*        onChange={(e) => onChange(options.setDesignerSalaryOutsource, e)}*/}
                        {/*    />*/}
                        {/*</Tooltip>*/}
                    {/*</div>*/}
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
                        <Tooltip className='platform_tooltip' open={options.isOutsourceFill.modelerForBuild} TransitionProps={{timeout: 600}}
                                 placement="bottom" title="Has to be filled!" arrow={true}>
                            <input
                                className='salary-input-outsource number-input'
                                type='text'
                                placeholder='0'
                                id='modeler-Salary-Outsource'
                                value={options.modelerSalaryOutsource}
                                onChange={(e) => onChange(options.setModelerSalaryOutsource, e)}
                            />
                        </Tooltip>
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
                        <label htmlFor='visualizer-Salary-Outsource' className='label-outsource'></label>
                        <Tooltip className='platform_tooltip' open={options.isOutsourceFill.visualizer} TransitionProps={{timeout: 600}}
                                 placement="bottom" title="Has to be filled!" arrow={true}>
                            <input
                                className='salary-input-outsource number-input'
                                type='text'
                                placeholder='0'
                                id='visualizer-Salary-Outsource'
                                value={options.visualizerSalaryOutsource}
                                onChange={(e) => onChange(options.setVisualizerSalaryOutsource, e)}
                            />
                        </Tooltip>
                    </div>
                    <div className="salary-table_item-input input-outsource">
                        <label htmlFor='modeler-For-Env-Salary-Outsource' className='label-outsource vis-outsource'></label>
                        <Tooltip className='platform_tooltip' open={options.isOutsourceFill.modelerForEnv} TransitionProps={{timeout: 600}}
                                 placement="bottom" title="Has to be filled!" arrow={true}>
                            <input
                                className='salary-input-outsource number-input'
                                type='text'
                                placeholder='0'
                                // id='developer-Salary-Outsource' // change  !!!
                                // value={options.visualizerSalaryOutsource} // change  !!!
                                // onChange={(e) => onChange(options.visualizerSalaryOutsource, e)}  // change !!!
                                id='modeler-For-Env-Salary-Outsource'
                                value={options.modelerForEnvSalaryOutsource}
                                onChange={(e) => onChange(options.setModelerForEnvSalaryOutsource, e)}
                            />
                        </Tooltip>
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