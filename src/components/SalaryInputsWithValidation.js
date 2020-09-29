import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";

function SalaryInputsWithValidation(props) {
    const { options } = props;
    const [isErrorVisInhouse, setIsErrorVisInhouse] = useState(false);
    const [isErrorVisOutsourse, setIsErrorVisOutsourse] = useState(false);
    const [isErrorDesInhouse, setIsErrorDesInhouse] = useState(false);
    const [isErrorDesOutsourse, setIsErrorDesOutsourse] = useState(false);
    const [isErrorModInhouse, setIsErrorModInhouse] = useState(false);
    const [isErrorModOutsourse, setIsErrorModOutsourse] = useState(false);
    const [isErrorDevInhouse, setIsErrorDevInhouse] = useState(false);
    const [isErrorDevOutsourse, setIsErrorDevOutsourse] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);


    const [helperText, setHelperText] = useState(null);

    const onChangeVisualizerSalaryInhouse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorVisInhouse(true);
            setHelperText('not a number');
        } else {
            setIsErrorVisOutsourse(false);
            options.setVisualizerSalaryInhouse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeVisualizerSalaryOutsourse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorVisOutsourse(true);
            setHelperText('not a number');
        } else {
            setIsErrorVisOutsourse(false);
            options.setVisualizerSalaryOutsourse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeDeveloperSalaryInhouse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorDevInhouse(true);
            setHelperText('not a number');
        } else {
            setIsErrorDevInhouse(false);
            options.setDeveloperSalaryInhouse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeDeveloperSalaryOutsourse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorDevOutsourse(true);
            setHelperText('not a number');
        } else {
            setIsErrorDevOutsourse(false);
            options.setDeveloperSalaryOutsourse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeDesignerSalaryInhouse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorDesInhouse(true);
            setHelperText('not a number');
        } else {
            setIsErrorDesInhouse(false);
            options.setDesignerSalaryInhouse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeDesignerSalaryOutsourse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorDesOutsourse(true);
            setHelperText('not a number');
        } else {
            setIsErrorDesOutsourse(false);
            options.setDesignerSalaryOutsourse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeModelerSalaryInhouse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorModInhouse(true);
            setHelperText('not a number');
        } else {
            setIsErrorModInhouse(false);
            options.setModelerSalaryInhouse(e.target.value);
            setHelperText('');
        }
    }

    const onChangeModelerSalaryOutsourse = (e) => {
        if (isNaN(e.target.value)) {
            setIsErrorModOutsourse(true);
            setHelperText('not a number');
        } else {
            setIsErrorModOutsourse(false);
            options.setModelerSalaryOutsourse(e.target.value);
            setHelperText('');
        }
    }

    return (
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
                        <TextField ref={register} error={isErrorVisInhouse} helperText={helperText} id={'visualizer-Salary-Inhouse'} label="Set salary" variant="outlined" value={options.visualizerSalaryInhouse} onChange={onChangeVisualizerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorVisOutsourse} helperText={helperText} id="visualizer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.visualizerSalaryOutsourse} onChange={onChangeVisualizerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Designer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorDesInhouse} helperText={helperText} id="designer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.designerSalaryInhouse} onChange={onChangeDesignerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorDesOutsourse} helperText={helperText} id="designer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.designerSalaryOutsourse} onChange={onChangeDesignerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Modeler</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorModInhouse} helperText={helperText} id="modeler-Salary-Inhouse" label="Set salary" variant="outlined" value={options.modelerSalaryInhouse} onChange={onChangeModelerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorModOutsourse} helperText={helperText} id="modeler-Salary-Outsourse" label="Set salary" variant="outlined" value={options.modelerSalaryOutsourse} onChange={onChangeModelerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Developer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorDevInhouse} helperText={helperText} id="developer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.developerSalaryInhouse} onChange={onChangeDeveloperSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} error={isErrorDevOutsourse} helperText={helperText} id="developer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.developerSalaryOutsourse} onChange={onChangeDeveloperSalaryOutsourse}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalaryInputsWithValidation;