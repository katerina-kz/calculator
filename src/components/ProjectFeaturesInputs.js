import React, { useState, useEffect, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

function ProjectFeaturesInputs(props) {
    const { options, click, clear } = props;
    const [isDisable, setIsDisable] = useState(true);

    const onChangeProjectName = (e) => {
        options.setProjectName(e.target.value);
    }

    const onChangeBuildingCount = (e) => {
        options.setBuildingsCount('');
        options.setBuildingsCount(e.target.value);
        handleDisabled();
    }

    const onChangeUniqueBuildings = (e) => {
        options.setUniqueBuildings(e.target.value);
        handleDisabled();
    }

    const onChangeUniqueApartment = (e) => {
        options.setUniqueApartment(e.target.value);
        handleDisabled();
    }

    const onChangeTourApartments = (e) => {
        options.setTourApartments(e.target.value);
        handleDisabled();
    }

    const onChangeTourAmenities = (e) => {
        options.setTourAmenities(e.target.value);
        handleDisabled();
    }

    const onChangeFurnishingComplexity = (e) => {
        options.setFurnishingComplexity(e.target.value);
    }

    const onChangeEnvironmentComplexity = (e) => {
        options.setEnvironmentComplexity(e.target.value);
    }

    const onChangePlatform = (e) => {
        e.target.checked === true
            ? options.setPlatform({...options.platform, [e.target.name]: 1})
            : options.setPlatform({...options.platform, [e.target.name]: 0})
        handleDisabled();
    }

    const onChangeBuildingComplexity = (e) => {
        options.setBuildingComplexity(e.target.value);
    }

    const handleDisabled = () => {
        options.buildingsCount &&
        options.uniqueBuildings &&
        options.uniqueApartment &&
        options.tourApartments &&
        options.tourAmenities ? setIsDisable(false) : setIsDisable(true)
    };

    console.log(isDisable);
    return (
        <div className="setting-table column">
            {/*<div className='settings-table_title column-title'>*/}
            {/*    Project Setting*/}
            {/*</div>*/}
            {/*<div className='settings-table_block_title block-title'>*/}
            {/*    <div className="settings-table_name">Name</div>*/}
            {/*    <div className="settings-table_check">Check</div>*/}
            {/*</div>*/}
            <div className="settings-table_block ">
                {/*<div className="settings-table_item">*/}
                {/*    /!*<div className="settings-table_item-name" >Project Name</div>*!/*/}
                {/*    <div className="settings-table_item-input" >*/}
                {/*        <TextField id="outlined-basic" label="Set name" variant="outlined" value={options.projectName} onChange={onChangeProjectName} />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Platforms</div>
                    <div className="settings-table_item-input">
                            <input className='platform-input' type='checkbox' value='left' id='id-web' name={"1"} onChange={onChangePlatform}/>
                            <label htmlFor='id-web' className='platform-input-label web-label' />

                            <input className='platform-input' type='checkbox' value='left' id='id-mobile' name={"2"} onChange={onChangePlatform}/>
                            <label htmlFor='id-mobile' className='platform-input-label mobile-label' />

                            <input className='platform-input' type='checkbox' value='left' id='id-desktop' name={"3"} onChange={onChangePlatform}/>
                            <label htmlFor='id-desktop' className='platform-input-label desktop-label' />
                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormGroup aria-label="position" row>*/}
                        {/*        <Checkbox*/}
                        {/*            value="left"*/}
                        {/*            // control={<Checkbox color="primary"/>}*/}
                        {/*            label="Web"*/}
                        {/*            name={"1"}*/}
                        {/*            onChange={onChangePlatform}*/}
                        {/*        />*/}
                        {/*    </FormGroup>*/}
                        {/*</FormControl>*/}
                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormGroup aria-label="position" row>*/}
                        {/*        <Checkbox*/}
                        {/*            value="left"*/}
                        {/*            control={<Checkbox color="primary"/>}*/}
                        {/*            label="Mobile"*/}
                        {/*            name={"2"}*/}
                        {/*            onChange={onChangePlatform}*/}
                        {/*        />*/}
                        {/*    </FormGroup>*/}
                        {/*</FormControl>*/}
                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormGroup aria-label="position" row>*/}
                        {/*        <Checkbox*/}
                        {/*            value="left"*/}
                        {/*            control={<Checkbox color="primary"/>}*/}
                        {/*            label="Desktop"*/}
                        {/*            name={"3"}*/}
                        {/*            onChange={onChangePlatform}*/}
                        {/*        />*/}
                        {/*    </FormGroup>*/}
                        {/*</FormControl>*/}
                    </div>
                </div>
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Buildings</div>
                    <div className="settings-table_item-input">
                        <input
                            className='buildings-input number-input'
                            type='text'
                            id='id-building-total'
                            value={options.buildingsCount}
                            onClick={() => options.setBuildingsCount('')}
                            onBlur={() => options.buildingsCount === '' ? options.setBuildingsCount('Building total') : options.setBuildingsCount(options.buildingsCount)}
                            onChange={onChangeBuildingCount}
                        />
                        <input
                            className='buildings-input number-input'
                            type='text'
                            id='id-building-total'
                            value={options.uniqueBuildings}
                            onClick={() => options.setUniqueBuildings('')}
                            onBlur={() => options.uniqueBuildings === '' ? options.setUniqueBuildings('Unique buildings') : options.setUniqueBuildings(options.uniqueBuildings)}
                            onChange={onChangeUniqueBuildings}
                        />
                        <input
                            className='buildings-input number-input'
                            type='text'
                            id='id-building-total'
                            value={options.uniqueApartment}
                            onClick={() => options.setUniqueApartment('')}
                            onBlur={() => options.uniqueApartment === '' ?  options.setUniqueApartment('Unique apt.') : options.setUniqueApartment(options.uniqueApartment)}
                            onChange={onChangeUniqueApartment}
                        />
                        {/*<label for='id-building-total' className='building-total-input-label'/>*/}
                        {/*<TextField*/}
                        {/*    className='number-input'*/}
                        {/*    label="Number"*/}
                        {/*    min={0}*/}
                        {/*    type="number"*/}
                        {/*    id="outlined-size-small"*/}
                        {/*    variant="outlined"*/}
                        {/*    size="small"*/}
                        {/*    placeholder='Buildings total'*/}
                        {/*    InputLabelProps={{*/}
                        {/*        shrink: true,*/}
                        {/*    }}*/}
                        {/*    InputProps={{*/}
                        {/*        inputProps: {*/}
                        {/*            min: 0*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*    value={options.buildingsCount}*/}
                        {/*    onChange={onChangeBuildingCount}*/}
                        {/*/>*/}
                    </div>
                </div>
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Facade complexity</div>
                    <div className="settings-table_item-input general-input-block facade-complexity-block">
                        <div className='general-input-div facade-complexity-div facade-complexity-div_left'>
                            <span className='line'></span>
                            <input className='general-input facade-complexity-input facade-complexity-input_left' type="radio" id="facade-complexity-easy" name="facade-complexity" value="Simple geometrical shape" onChange={onChangeBuildingComplexity} checked={options.buildingComplexity === "Simple geometrical shape"}/>
                            <label className='general-label facade-complexity-label facade-complexity-label_left' htmlFor="facade-complexity-easy">Simple geometrical shape</label>
                        </div>
                        <div className='general-input-div facade-complexity-div facade-complexity-div_center'>
                            <span className='line line-center'></span>
                            <input className='general-input facade-complexity-input facade-complexity-input_center' type="radio" id="facade-complexity-mid" name="facade-complexity" value="Moderately complex exterior" onChange={onChangeBuildingComplexity} checked={options.buildingComplexity === "Moderately complex exterior"}/>
                            <label className='general-label facade-complexity-label facade-complexity-label_center' htmlFor="facade-complexity-mid">Moderately complex exterior</label>
                        </div>
                        <div className='general-input-div facade-complexity-div facade-complexity-div_right'>
                            <input className='general-input facade-complexity-input facade-complexity-input_right' type="radio" id="facade-complexity-max" name="facade-complexity" value="Baroque edifice" onChange={onChangeBuildingComplexity} checked={options.buildingComplexity === "Baroque edifice"}/>
                            <label className='general-label facade-complexity-label facade-complexity-label_right' htmlFor="facade-complexity-max">Baroque edifice</label>
                        </div>
                        {/*<FormControl component="fieldset">*/}
                        {/*    <RadioGroup className='facade-complexity' value={options.buildingComplexity} onChange={onChangeBuildingComplexity}>*/}
                        {/*        <FormControlLabel className='building-complexity_input building-complexity_input-left' value="Simple geometrical shape" control={<Radio color="primary"/>}*/}
                        {/*                          label="Simple geometrical shape"/>*/}
                        {/*        <FormControlLabel className='building-complexity_input building-complexity_input-center' value="Moderately complex exterior" control={<Radio color="primary"/>}*/}
                        {/*                          label="Moderately complex exterior"/>*/}
                        {/*        <FormControlLabel className='building-complexity_input building-complexity_input-right' value="Baroque edifice" control={<Radio color="primary"/>}*/}
                        {/*                          label="Baroque edifice"/>*/}
                        {/*    </RadioGroup>*/}
                        {/*</FormControl>*/}
                    </div>
                </div>
                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">Unique buildings count</div>*/}
                {/*    <div className="settings-table_item-input">*/}
                {/*        <TextField*/}
                {/*            className='number-input'*/}
                {/*            label="Number"*/}
                {/*            type="number"*/}
                {/*            id="outlined-size-small"*/}
                {/*            variant="outlined"*/}
                {/*            size="small"*/}
                {/*            value={options.uniqueBuildings}*/}
                {/*            // onBlur={handleOnblur()}*/}
                {/*            onChange={onChangeUniqueBuildings}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            InputProps={{*/}
                {/*                inputProps: {*/}
                {/*                    min: 0*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">Unique apartment count</div>*/}
                {/*    <div className="settings-table_item-input">*/}
                {/*        <TextField*/}
                {/*            className='number-input'*/}
                {/*            label="Number"*/}
                {/*            type="number"*/}
                {/*            id="outlined-size-small"*/}
                {/*            variant="outlined"*/}
                {/*            size="small"*/}
                {/*            value={options.uniqueApartment}*/}
                {/*            onChange={onChangeUniqueApartment}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            InputProps={{*/}
                {/*                inputProps: {*/}
                {/*                    min: 0*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="settings-table_item">
                    <div className="settings-table_item-name">360 tours</div>
                    <div className="settings-table_item-input tour-block-360">
                        <input
                            className='tour-input-360 number-input'
                            type='text'
                            id='id-tour-ap'
                            value={options.tourApartments}
                            onClick={() => options.setTourApartments('')}
                            onBlur={() => options.tourApartments === '' ? options.setTourApartments('Apt. tours') : options.setTourApartments(options.tourApartments)}
                            onChange={onChangeTourApartments}
                        />
                        <input
                            className='tour-input-360 number-input'
                            type='text'
                            id='id-tour-am'
                            value={options.tourAmenities}
                            onClick={() => options.setTourAmenities('')}
                            onBlur={() => options.tourAmenities === '' ? options.setTourAmenities('Amenities tours') : options.setTourAmenities(options.tourAmenities)}
                            onChange={onChangeTourAmenities}
                        />
                        {/*<label for='id-building-total' className='building-total-input-label'/>*/}
                        {/*<TextField*/}
                        {/*    className='number-input'*/}
                        {/*    label="Number"*/}
                        {/*    min={0}*/}
                        {/*    type="number"*/}
                        {/*    id="outlined-size-small"*/}
                        {/*    variant="outlined"*/}
                        {/*    size="small"*/}
                        {/*    placeholder='Buildings total'*/}
                        {/*    InputLabelProps={{*/}
                        {/*        shrink: true,*/}
                        {/*    }}*/}
                        {/*    InputProps={{*/}
                        {/*        inputProps: {*/}
                        {/*            min: 0*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*    value={options.buildingsCount}*/}
                        {/*    onChange={onChangeBuildingCount}*/}
                        {/*/>*/}
                    </div>
                </div>
                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">360-tours count - apartments</div>*/}
                {/*    <div className="settings-table_item-input">*/}
                {/*        <TextField*/}
                {/*            className='number-input'*/}
                {/*            label="Number"*/}
                {/*            type="number"*/}
                {/*            id="outlined-size-small"*/}
                {/*            variant="outlined"*/}
                {/*            size="small"*/}
                {/*            value={options.tourApartments}*/}
                {/*            onChange={onChangeTourApartments}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            InputProps={{*/}
                {/*                inputProps: {*/}
                {/*                    min: 0*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">360-tours count - amenities</div>*/}
                {/*    <div className="settings-table_item-input">*/}
                {/*        <TextField*/}
                {/*            className='number-input'*/}
                {/*            label="Number"*/}
                {/*            type="number"*/}
                {/*            id="outlined-size-small"*/}
                {/*            variant="outlined"*/}
                {/*            size="small"*/}
                {/*            value={options.tourAmenities}*/}
                {/*            onChange={onChangeTourAmenities}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            InputProps={{*/}
                {/*                inputProps: {*/}
                {/*                    min: 0*/}
                {/*                }*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Furnishing complexity</div>
                    {/*dont have functional yet */}
                    <div className="settings-table_item-input general-input-block furnishing-complexity-block">
                        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_left'>
                            <span className='line line-furnishing'></span>
                            <input
                                className='general-input furnishing-complexity-input furnishing-complexity-input_left'
                                type="radio" id="furnishing-complexity-min" name="furnishing-complexity" value="Min"
                                onChange={onChangeFurnishingComplexity}
                                checked={options.furnishingComplexity === "Min"}/>
                            <label
                                className='general-label furnishing-complexity-label furnishing-complexity-label_left'
                                htmlFor="furnishing-complexity-min">Min</label>
                        </div>
                        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_center'>
                            <span className='line line-center line-furnishing'></span>
                            <input
                                className='general-input furnishing-complexity-input furnishing-complexity-input_center'
                                type="radio" id="furnishing-complexity-mid" name="furnishing-complexity" value="Mid"
                                onChange={onChangeFurnishingComplexity}
                                checked={options.furnishingComplexity === "Mid"}/>
                            <label
                                className='general-label furnishing-complexity-label furnishing-complexity-label_center'
                                htmlFor="furnishing-complexity-mid">Mid</label>
                        </div>
                        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_right'>
                            <input
                                className='general-input furnishing-complexity-input furnishing-complexity-input_right'
                                type="radio" id="furnishing-complexity-max" name="furnishing-complexity" value="Max"
                                onChange={onChangeFurnishingComplexity}
                                checked={options.furnishingComplexity === "Max"}/>
                            <label
                                className='general-label furnishing-complexity-label furnishing-complexity-label_right'
                                htmlFor="furnishing-complexity-max">Max</label>
                        </div>
                    </div>
                </div>
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Environment complexity</div>
                    {/*dont have functional yet */}
                    <div className="settings-table_item-input general-input-block environment-complexity-block">
                        <div className='general-input-div environment-complexity-div environment-complexity-div_left'>
                            <span className='line line-environment'></span>
                            <input
                                className='general-input environment-complexity-input environment-complexity-input_left'
                                type="radio" id="environment-complexity-min" name="environment-complexity" value="Rural landscape"
                                onChange={onChangeEnvironmentComplexity}
                                checked={options.environmentComplexity === "Rural landscape"}/>
                            <label
                                className='general-label environment-complexity-label environment-complexity-label_left'
                                htmlFor="environment-complexity-min">Rural landscape</label>
                        </div>
                        <div className='general-input-div environment-complexity-div environment-complexity-div_center'>
                            <span className='line line-center line-environment'></span>
                            <input
                                className='general-input environment-complexity-input environment-complexity-input_center'
                                type="radio" id="environment-complexity-mid" name="environment-complexity" value="Low town"
                                onChange={onChangeEnvironmentComplexity}
                                checked={options.environmentComplexity === "Low town"}/>
                            <label
                                className='general-label environment-complexity-label environment-complexity-label_center'
                                htmlFor="environment-complexity-mid">Low town</label>
                        </div>
                        <div className='general-input-div environment-complexity-div environment-complexity-div_right'>
                            <input
                                className='general-input environment-complexity-input environment-complexity-input_right'
                                type="radio" id="environment-complexity-max" name="environment-complexity" value="Dense city"
                                onChange={onChangeEnvironmentComplexity}
                                checked={options.environmentComplexity === "Dense city"}/>
                            <label
                                className='general-label environment-complexity-label environment-complexity-label_right'
                                htmlFor="environment-complexity-max">Dense city</label>
                        </div>
                    </div>
                </div>
                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">Environment complexity</div>*/}
                {/*    <div className="settings-table_item-input">*/}
                {/*        <FormControl component="fieldset">*/}
                {/*            <RadioGroup value={options.environmentComplexity} onChange={onChangeEnvironmentComplexity}>*/}
                {/*                <FormControlLabel value="Rural landscape" control={<Radio color="primary"/>}*/}
                {/*                                  label="Rural landscape"/>*/}
                {/*                <FormControlLabel value="Low town" control={<Radio color="primary"/>}*/}
                {/*                                  label="Low town"/>*/}
                {/*                <FormControlLabel value="Dense city" control={<Radio color="primary"/>}*/}
                {/*                                  label="Dense city"/>*/}
                {/*            </RadioGroup>*/}
                {/*        </FormControl>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='actions-block'>
                    <div className='clear-box'>
                        <button className='clear-button reset-button_styles' onClick={clear}>Clear</button>
                    </div>
                    <div className='calculate-box' >
                        <button className='calculate-button reset-button_styles' disabled={isDisable} onClick={click}>
                            <span>Calculate</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectFeaturesInputs;