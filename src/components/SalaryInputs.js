import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";

function SalaryInputs(props) {
    const { options } = props;
    const { isError, setIsError } = useState(false);
    // const [isErrorVisInhouse, setIsErrorVisInhouse] = useState(false);
    // const [isErrorVisOutsourse, setIsErrorVisOutsourse] = useState(false);
    // const [isErrorDesInhouse, setIsErrorDesInhouse] = useState(false);
    // const [isErrorDesOutsourse, setIsErrorDesOutsourse] = useState(false);
    // const [isErrorModInhouse, setIsErrorModInhouse] = useState(false);
    // const [isErrorModOutsourse, setIsErrorModOutsourse] = useState(false);
    // const [isErrorDevInhouse, setIsErrorDevInhouse] = useState(false);
    // const [isErrorDevOutsourse, setIsErrorDevOutsourse] = useState(false);

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

    const onChangeVisualizerSalaryOutsourse = (e) => {
        options.setVisualizerSalaryOutsourse(e.target.value);
    }

    const onChangeDeveloperSalaryInhouse = (e) => {
        options.setDeveloperSalaryInhouse(e.target.value);
    }

    const onChangeDeveloperSalaryOutsourse = (e) => {
        options.setDeveloperSalaryOutsourse(e.target.value);
    }

    const onChangeDesignerSalaryInhouse = (e) => {
        options.setDesignerSalaryInhouse(e.target.value);
    }

    const onChangeDesignerSalaryOutsourse = (e) => {
        options.setDesignerSalaryOutsourse(e.target.value);
    }

    const onChangeModelerSalaryInhouse = (e) => {
        options.setModelerSalaryInhouse(e.target.value);
    }

    const onChangeModelerSalaryOutsourse = (e) => {
        options.setModelerSalaryOutsourse(e.target.value);
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
                        <TextField ref={register} helperText={helperText} id={'visualizer-Salary-Inhouse'} label="Set salary" variant="outlined" value={options.visualizerSalaryInhouse} onChange={onChangeVisualizerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="visualizer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.visualizerSalaryOutsourse} onChange={onChangeVisualizerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Designer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register}  helperText={helperText} id="designer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.designerSalaryInhouse} onChange={onChangeDesignerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="designer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.designerSalaryOutsourse} onChange={onChangeDesignerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Modeler</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="modeler-Salary-Inhouse" label="Set salary" variant="outlined" value={options.modelerSalaryInhouse} onChange={onChangeModelerSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="modeler-Salary-Outsourse" label="Set salary" variant="outlined" value={options.modelerSalaryOutsourse} onChange={onChangeModelerSalaryOutsourse}/>
                    </div>
                </div>
                <div className="salary-table_item">
                    <div className="salary-table_item-name">Developer</div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="developer-Salary-Inhouse" label="Set salary" variant="outlined" value={options.developerSalaryInhouse} onChange={onChangeDeveloperSalaryInhouse}/>
                    </div>
                    <div className="salary-table_item-input">
                        <TextField ref={register} helperText={helperText} id="developer-Salary-Outsourse" label="Set salary" variant="outlined" value={options.developerSalaryOutsourse} onChange={onChangeDeveloperSalaryOutsourse}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalaryInputs;