import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import Modal from 'react-awesome-modal';

function SalaryInputs(props) {
    const { options } = props;
    const { isError, setIsError } = useState(false);
    // const [isErrorVisInhouse, setIsErrorVisInhouse] = useState(false);
    // const [isErrorVisOutsource, setIsErrorVisOutsource] = useState(false);
    // const [isErrorDesInhouse, setIsErrorDesInhouse] = useState(false);
    // const [isErrorDesOutsource, setIsErrorDesOutsource] = useState(false);
    // const [isErrorModInhouse, setIsErrorModInhouse] = useState(false);
    // const [isErrorModOutsource, setIsErrorModOutsource] = useState(false);
    // const [isErrorDevInhouse, setIsErrorDevInhouse] = useState(false);
    // const [isErrorDevOutsource, setIsErrorDevOutsource] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);


    const [helperText, setHelperText] = useState(null);

    const handleError = (e) => {
        if (isNaN(e.target.value)) {
            setIsError(true);
            setHelperText('not a number');
        } else {
            setIsError(false);
            options.setVisualizerSalaryInhouse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeVisualizerSalaryInhouse = (e) => {
        options.setVisualizerSalaryInhouse(e.target.value);
    }

    const onChangeVisualizerSalaryOutsource = (e) => {
        options.setVisualizerSalaryOutsource(e.target.value);
    }

    const onChangeDeveloperSalaryInhouse = (e) => {
        options.setDeveloperSalaryInhouse(e.target.value);
    }

    const onChangeDeveloperSalaryOutsource = (e) => {
        options.setDeveloperSalaryOutsource(e.target.value);
    }

    const onChangeDesignerSalaryInhouse = (e) => {
        options.setDesignerSalaryInhouse(e.target.value);
    }

    const onChangeDesignerSalaryOutsource = (e) => {
        options.setDesignerSalaryOutsource(e.target.value);
    }

    const onChangeModelerSalaryInhouse = (e) => {
        options.setModelerSalaryInhouse(e.target.value);
    }

    const onChangeModelerSalaryOutsource = (e) => {
        options.setModelerSalaryOutsource(e.target.value);
    }

    const closeModal = () => {
        document.querySelector('.calculator-table').nextElementSibling.style.display = 'none';
        options.setIsCalcModalVisible(false);
    }

    return (
        <Modal visible={options.isCalcModalVisible} width="400" height="440" effect="fadeInUp" onClickAway={() => closeModal()}>
        <div className='salary-table column'>
            <div className='salary-table_title column-title'>
                Salary
            </div>
            <div className='salary-table_block_title block-title'>
                <div className="salary-table_name">Salary/rates</div>
                <div className="salary-table_check">Inhouse</div>
                <div className="salary-table_name">Outsourcing/m</div>
            </div>
            <div className="salary-table_block" onSubmit={handleSubmit(onSubmit)}>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Visualizer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id={'visualizer-Salary-Inhouse'} label="Set salary" variant="outlined" value={options.visualizerSalaryInhouse} onChange={onChangeVisualizerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="visualizer-Salary-Outsource" label="Set salary" variant="outlined" value={options.visualizerSalaryOutsource} onChange={onChangeVisualizerSalaryOutsource}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Designer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register}  helperText={helperText} id="designer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.designerSalaryInhouse} onChange={onChangeDesignerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="designer-Salary-Outsource" label="Set salary" variant="outlined" value={options.designerSalaryOutsource} onChange={onChangeDesignerSalaryOutsource}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Modeler</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="modeler-Salary-Inhouse" label="Set salary" variant="outlined" value={options.modelerSalaryInhouse} onChange={onChangeModelerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="modeler-Salary-Outsource" label="Set salary" variant="outlined" value={options.modelerSalaryOutsource} onChange={onChangeModelerSalaryOutsource}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Developer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="developer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.developerSalaryInhouse} onChange={onChangeDeveloperSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="developer-Salary-Outsource" disabled={true} label="Set salary" variant="outlined" value={options.developerSalaryOutsource} onChange={onChangeDeveloperSalaryOutsource}/>
                    </div>
                </div>
            </div>
            <div className='actions-calc_block popup-actions'>
                <div className='adjust-salary_box'>
                    <a href="javascript:void(0);" className='reset-button_styles clear-button close-button' onClick={closeModal}>Close</a>
                </div>
            <div className='save-box calculate-box'>
                <button className='save-button calculate-button reset-button_styles'  effect="fadeInDown" onClick={closeModal}>
                    <span>SAVE</span>
                </button>
            </div>
        </div>
        </div>
        </Modal>

    )}


export default SalaryInputs;