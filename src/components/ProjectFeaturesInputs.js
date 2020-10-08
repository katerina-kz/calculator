import React, {useEffect, useState} from 'react';
import {Tooltip, Fade} from '@material-ui/core';

function ProjectFeaturesInputs(props) {
    const { options, click, clear } = props;
    const [isCheckedWeb, setIsCheckedWeb] = useState(false);
    const [isCheckedMob, setIsCheckedMob] = useState(false);
    const [isCheckedDesk, setIsCheckedDesk] = useState(false);

    const [open, setOpen] = useState({
        'buildingsCount': false,
        'uniqueBuildings': false,
        'uniqueApartment': false,
        'tourApartments': false,
        'tourAmenities': false,
    })

    useEffect(() => {
        if (options.buildingsCount) document.querySelector('.buildings-total-label').classList.add('top');
        if (options.uniqueBuildings) document.querySelector('.unique-buildings-label').classList.add('top');
        if (options.uniqueApartment) document.querySelector('.unique-apartment-label').classList.add('top');
        if (options.tourApartments) document.querySelector('.tour-apart-label').classList.add('top');
        if (options.tourAmenities) document.querySelector('.tour-amen-label').classList.add('top');
    }, [options.buildingsCount, options.uniqueBuildings, options.uniqueApartment ,options.tourApartments, options.tourAmenities])

    useEffect( () => {
        options.platform[1] === 1 ? setIsCheckedWeb(true) : setIsCheckedWeb(false);
        options.platform[2] === 1 ? setIsCheckedMob(true) : setIsCheckedMob(false);
        options.platform[3] === 1 ? setIsCheckedDesk(true) : setIsCheckedDesk(false);
        if (options.isDisabledCalc !== 0) {
            options.setIsDisabledCalc(false);
        }
    }, [ options.platform]);

    const onChangeProjectName = (e) => options.setProjectName(e.target.value);

    const onChange = (set, obj, e) => {
        set('');
        let value = e.target.value;
        if (isNaN(value)) {
            setOpen({...open,
                [obj]: true,
            });
            set(value.replace(/[^\d]/g, ''));
        } else {
            setOpen({
                'buildingsCount': false,
                'uniqueBuildings': false,
                'uniqueApartment': false,
                'tourApartments': false,
                'tourAmenities': false,
            });
            set(value.replace(/[^\d]/g, ''));
        }
    }

    const onClick = (classLabel, classInput, state, set) => {
        // debugger
        document.querySelector(classLabel).classList.add('top');
        if (state) {
           set(state);
            document.querySelector(classInput).classList.add('white-back');
        } else set(state);
    }

    const onChangeEnvironmentComplexity = (e) => options.setEnvironmentComplexity(e.target.value);
    const onChangeBuildingComplexity = (e) => options.setBuildingComplexity(e.target.value);

    const onChangePlatform = (e) => {
        e.target.checked === true
            ? options.setPlatform({...options.platform, [e.target.name]: 1})
            : options.setPlatform({...options.platform, [e.target.name]: 0})
    }

    const onBlur = (state, set, className) => {
        if (!state) document.querySelector(className).classList.remove('top');
        setOpen({
            'buildingsCount': false,
            'uniqueBuildings': false,
            'uniqueApartment': false,
            'tourApartments': false,
            'tourAmenities': false,
        });
        state === '' ? set('') : set(state);
    }


 // change when breakpoints exist
    useEffect(() => {
        if (options.totalDays) {
            if ((0 <= options.totalDays) && (options.totalDays < 60)) {
                document.querySelector('.setting-table').classList.remove('blue', 'yellow', 'red');
                document.querySelector('.setting-table').classList.add('green');
                document.querySelector('.arrow-square.calc').classList.remove('blue', 'yellow', 'red');
                document.querySelector('.arrow-square.calc').classList.add('green');
            } else if ((60 <= options.totalDays) && (options.totalDays < 150)) {
                document.querySelector('.setting-table').classList.remove('green', 'yellow', 'red');
                document.querySelector('.setting-table').classList.add('blue');
                document.querySelector('.arrow-square.calc').classList.remove('green', 'yellow', 'red');
                document.querySelector('.arrow-square.calc').classList.add('blue');
            } else if ( (150 <= options.totalDays) && (options.totalDays < 300)) {
                document.querySelector('.setting-table').classList.remove('blue', 'green', 'red');
                document.querySelector('.setting-table').classList.add('yellow');
                document.querySelector('.arrow-square.calc').classList.remove('blue', 'green', 'red');
                document.querySelector('.arrow-square.calc').classList.add('yellow');
            } else if (300 <= options.totalDays) {
                document.querySelector('.setting-table').classList.remove('blue', 'yellow', 'green');
                document.querySelector('.setting-table').classList.add('red');
                document.querySelector('.arrow-square.calc').classList.remove('blue', 'yellow', 'green');
                document.querySelector('.arrow-square.calc').classList.add('red');
            }
        }
    }, [options.totalDays])

    /********* Return when logic exist **********/
    // const onChangeFurnishingComplexity = (e) => options.setFurnishingComplexity(e.target.value);

    return (
        <div className="setting-table column">
            <div className="settings-table_block ">
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Platforms<span className='footnote platform_footnote'>*</span></div>
                    <div className="settings-table_item-input">
                        <input className='platform-input' checked={isCheckedWeb} type='checkbox'  value='left' id='id-web' name={"1"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-web' className='platform-input-label web-label'/>
                        <Tooltip className='platform_tooltip' open={!!options.isDisabledCalc} TransitionProps={{ timeout: 600 }} placement="top" title="Select at least 1 platform" arrow={true}>
                            <input className='platform-input' checked={isCheckedMob} type='checkbox'  value='left' id='id-mobile' name={"2"}
                                   onChange={onChangePlatform}/>
                        </Tooltip>
                            <label htmlFor='id-mobile' className='platform-input-label mobile-label'/>
                        <input className='platform-input' checked={isCheckedDesk} type='checkbox' value='left' id='id-desktop' name={"3"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-desktop' className='platform-input-label desktop-label' />
                    </div>
                </div>
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Buildings</div>
                    <div className="settings-table_item-input">
                        <label htmlFor="id-tour-am" className='input-text-label buildings-total-label'></label>
                        <Tooltip open={open.buildingsCount} TransitionProps={{ timeout: 600 }} title="Contains unacceptable characters" arrow={true}>
                            <input
                                className='buildings-input number-input buildings-total-input'
                                type='text'
                                id='buildings-total-label'
                                value={options.buildingsCount}
                                onClick={() => onClick('.buildings-total-label', '.buildings-total-input', options.buildingsCount, options.setBuildingsCount)}
                                // onClick={() => isNaN(options.buildingsCount) ? options.setBuildingsCount('') : options.setBuildingsCount(options.buildingsCount)}
                                onBlur={() => onBlur(options.buildingsCount, options.setBuildingsCount, '.buildings-total-label')}
                                onChange={(e) => onChange(options.setBuildingsCount, 'buildingsCount', e)}
                            />

                        </Tooltip>
                        {/*<span className='footnote building-total_footnote'>*</span>*/}
                        <label htmlFor="id-tour-am" className='input-text-label unique-buildings-label'></label>
                        <Tooltip open={open.uniqueBuildings} TransitionProps={{ timeout: 600 }} title="Contains unacceptable characters" arrow={true}>
                            <input
                                className='buildings-input number-input unique-buildings-input'
                                type='text'
                                id='unique-buildings-label'
                                value={options.uniqueBuildings}
                                onClick={() => onClick('.unique-buildings-label', '.unique-buildings-input', options.uniqueBuildings, options.setUniqueBuildings)}
                                // onClick={() => isNaN(options.uniqueBuildings) ? options.setUniqueBuildings('') : options.setUniqueBuildings(options.uniqueBuildings)}
                                onBlur={() => onBlur(options.uniqueBuildings, options.setUniqueBuildings, '.unique-buildings-label')}
                                onChange={(e) => onChange(options.setUniqueBuildings, 'uniqueBuildings', e)}
                            />
                        </Tooltip>
                        {/*<span className='footnote unique-buildings_footnote'>*</span>*/}
                        <label htmlFor="id-tour-am" className='input-text-label unique-apartment-label'></label>
                        <Tooltip open={open.uniqueApartment} TransitionProps={{ timeout: 600 }} title="Contains unacceptable characters" arrow={true}>
                            <input
                                className='buildings-input number-input unique-apartment-input'
                                type='text'
                                id='unique-apartment-input'
                                value={options.uniqueApartment}
                                onClick={() => onClick('.unique-apartment-label', '.unique-apartment-input', options.uniqueApartment, options.setUniqueApartment)}
                                // onClick={() => isNaN(options.uniqueApartment) ? options.setUniqueApartment('') : options.setUniqueApartment(options.uniqueApartment)}
                                onBlur={() => onBlur(options.uniqueApartment, options.setUniqueApartment, '.unique-apartment-label')}
                                onChange={(e) => onChange(options.setUniqueApartment, 'uniqueApartment', e)}
                            />
                        </Tooltip>
                        {/*<span className='footnote unique-apart_footnote'>*</span>*/}
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
                    </div>
                </div>
                <div className="settings-table_item">
                    <div className="settings-table_item-name">360 tours</div>
                    <div className="settings-table_item-input tour-block-360">
                        <label htmlFor="id-tour-ap" className='input-text-label tour-apart-label'></label>
                        <Tooltip open={open.tourApartments} TransitionProps={{ timeout: 600 }} title="Contains unacceptable characters" arrow={true}>
                            <input
                                className='tour-input-360 number-input tour-apart-input'
                                type='text'
                                id='id-tour-ap'
                                value={options.tourApartments}
                                onClick={() => onClick('.tour-apart-label', '.tour-apart-input', options.tourApartments, options.setTourApartments)}
                                onBlur={() => onBlur(options.tourApartments, options.setTourApartments, '.tour-apart-label')}
                                onChange={(e) => onChange(options.setTourApartments, 'tourApartments', e)}
                            />
                            {/*<span className="input-value">{options.tourApartments}</span>*/}
                        </Tooltip>

                        <label for="id-tour-am" className='input-text-label tour-amen-label'></label>
                        <Tooltip open={open.tourAmenities} TransitionProps={{timeout: 600}}  title="Contains unacceptable characters" arrow={true}>
                            <input
                                className='tour-input-360 number-input tour-amen-input'
                                type='text'
                                id='id-tour-am'
                                value={options.tourAmenities}
                                onClick={() => onClick('.tour-amen-label', '.tour-amen-input', options.tourAmenities, options.setTourAmenities)}
                                // onClick={() => redExp.tourAmenities.test(options.tourAmenities) ? options.setTourAmenities('') : options.setTourAmenities(options.tourAmenities)}
                                onBlur={() => onBlur(options.tourAmenities, options.setTourAmenities, '.tour-amen-label')}
                                onChange={(e) => onChange(options.setTourAmenities, 'tourAmenities', e)}
                            />
                        </Tooltip>
                    </div>
                </div>

                 {/***************** Uncommit when Denis add funcionality **********************/}

                {/*<div className="settings-table_item">*/}
                {/*    <div className="settings-table_item-name">Furnishing complexity</div>*/}
                {/*    /!*dont have functional yet *!/*/}
                {/*    <div className="settings-table_item-input general-input-block furnishing-complexity-block">*/}
                {/*        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_left'>*/}
                {/*            <span className='line line-furnishing'></span>*/}
                {/*            <input*/}
                {/*                className='general-input furnishing-complexity-input furnishing-complexity-input_left'*/}
                {/*                type="radio" id="furnishing-complexity-min" name="furnishing-complexity" value="Min"*/}
                {/*                onChange={onChangeFurnishingComplexity}*/}
                {/*                checked={options.furnishingComplexity === "Min"}/>*/}
                {/*            <label*/}
                {/*                className='general-label furnishing-complexity-label furnishing-complexity-label_left'*/}
                {/*                htmlFor="furnishing-complexity-min">Min</label>*/}
                {/*        </div>*/}
                {/*        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_center'>*/}
                {/*            <span className='line line-center line-furnishing'></span>*/}
                {/*            <input*/}
                {/*                className='general-input furnishing-complexity-input furnishing-complexity-input_center'*/}
                {/*                type="radio" id="furnishing-complexity-mid" name="furnishing-complexity" value="Mid"*/}
                {/*                onChange={onChangeFurnishingComplexity}*/}
                {/*                checked={options.furnishingComplexity === "Mid"}/>*/}
                {/*            <label*/}
                {/*                className='general-label furnishing-complexity-label furnishing-complexity-label_center'*/}
                {/*                htmlFor="furnishing-complexity-mid">Mid</label>*/}
                {/*        </div>*/}
                {/*        <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_right'>*/}
                {/*            <input*/}
                {/*                className='general-input furnishing-complexity-input furnishing-complexity-input_right'*/}
                {/*                type="radio" id="furnishing-complexity-max" name="furnishing-complexity" value="Max"*/}
                {/*                onChange={onChangeFurnishingComplexity}*/}
                {/*                checked={options.furnishingComplexity === "Max"}/>*/}
                {/*            <label*/}
                {/*                className='general-label furnishing-complexity-label furnishing-complexity-label_right'*/}
                {/*                htmlFor="furnishing-complexity-max">Max</label>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Environment complexity</div>
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
                <div className='actions-block'>
                    <div className='clear-box'>
                        <button className='clear-button reset-button_styles' onClick={clear}>Clear</button>
                    </div>
                    {
                        options.loaderBlock &&
                        <div className='calculate-box' >
                            <button disabled={options.isDisabledCalc} className='calculate-button reset-button_styles' onClick={click}>
                                <span>Calculate</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProjectFeaturesInputs;