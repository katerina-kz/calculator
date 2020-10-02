import React, {useEffect, useState} from 'react';

function ProjectFeaturesInputs(props) {
    const { options, click, clear } = props;
    const [isDisable, setIsDisable] = useState(false); // change in production

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
        options.platformInput !== 0 &&
        options.buildingsCount !== 'Building total' &&
        options.uniqueBuildings !== 'Unique buildings' &&
        options.uniqueApartment !== 'Unique apt.' &&
        options.tourApartments !== 'Apt. tours' &&
        options.tourAmenities !== 'Amenities tours' ? setIsDisable(false) : setIsDisable(true)
    };

    const onBlurBuild = () => {
         options.buildingsCount === '' ? options.setBuildingsCount('Building total') : options.setBuildingsCount(options.buildingsCount);
         handleDisabled();
    }

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

    return (
        <div className="setting-table column">
            <div className="settings-table_block ">
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Platforms</div>
                    <div className="settings-table_item-input">
                        <input className='platform-input' type='checkbox' value='left' id='id-web' name={"1"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-web' className='platform-input-label web-label'/>

                        <input className='platform-input' type='checkbox' value='left' id='id-mobile' name={"2"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-mobile' className='platform-input-label mobile-label'/>

                        <input className='platform-input' type='checkbox' value='left' id='id-desktop' name={"3"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-desktop' className='platform-input-label desktop-label' />
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
                            onClick={() => isNaN(options.buildingsCount) ? options.setBuildingsCount('') : options.setBuildingsCount(options.buildingsCount)}
                            onBlur={() => options.buildingsCount === '' ? options.setBuildingsCount('Building total') : options.setBuildingsCount(options.buildingsCount)}
                            // onBlur={onBlurBuild}
                            onChange={onChangeBuildingCount}
                        />
                        <input
                            className='buildings-input number-input'
                            type='text'
                            id='id-building-total'
                            value={options.uniqueBuildings}
                            onClick={() => isNaN(options.uniqueBuildings) ? options.setUniqueBuildings('') : options.setUniqueBuildings(options.uniqueBuildings)}
                            onBlur={() => options.uniqueBuildings === '' ? options.setUniqueBuildings('Unique buildings') : options.setUniqueBuildings(options.uniqueBuildings)}
                            onChange={onChangeUniqueBuildings}
                        />
                        <input
                            className='buildings-input number-input'
                            type='text'
                            id='id-building-total'
                            value={options.uniqueApartment}
                            onClick={() => isNaN(options.uniqueApartment) ? options.setUniqueApartment('') : options.setUniqueApartment(options.uniqueApartment)}
                            onBlur={() => options.uniqueApartment === '' ?  options.setUniqueApartment('Unique apt.') : options.setUniqueApartment(options.uniqueApartment)}
                            onChange={onChangeUniqueApartment}
                        />
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
                        <input
                            className='tour-input-360 number-input'
                            type='text'
                            id='id-tour-ap'
                            value={options.tourApartments}
                            onClick={() => isNaN(options.tourApartments) ? options.setTourApartments('') : options.setTourApartments(options.tourApartments)}
                            onBlur={() => options.tourApartments === '' ? options.setTourApartments('Apt. tours') : options.setTourApartments(options.tourApartments)}
                            onChange={onChangeTourApartments}
                        />
                        <input
                            className='tour-input-360 number-input'
                            type='text'
                            id='id-tour-am'
                            value={options.tourAmenities}
                            onClick={() => isNaN(options.tourAmenities) ? options.setTourAmenities('') : options.setTourAmenities(options.tourAmenities)}
                            onBlur={() => options.tourAmenities === '' ? options.setTourAmenities('Amenities tours') : options.setTourAmenities(options.tourAmenities)}
                            onChange={onChangeTourAmenities}
                        />
                    </div>
                </div>
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
                <div className='actions-block'>
                    <div className='clear-box'>
                        <button className='clear-button reset-button_styles' onClick={clear}>Clear</button>
                    </div>
                    {
                        options.loaderBlock &&
                        <div className='calculate-box' >
                            <button className='calculate-button reset-button_styles' disabled={isDisable} onClick={click}>
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