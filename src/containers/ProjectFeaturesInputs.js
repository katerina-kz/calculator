import React, {useEffect, useState} from 'react';
import {Tooltip, Fade} from '@material-ui/core';
import EnvironmentInput from "./inputs_modules/EnvironmentInput";
import FacadeInputs from "./inputs_modules/FacadeInputs";
import FurnishingInput from "./inputs_modules/FurnishingInput";
import Button from "./components/Button";

function ProjectFeaturesInputs(props) {
    const { options, clear } = props;
    const [isCheckedWeb, setIsCheckedWeb] = useState(false);
    const [isCheckedMob, setIsCheckedMob] = useState(false);
    const [isCheckedDesk, setIsCheckedDesk] = useState(false);

    const [openTooltipText, setOpenTooltipText] = useState({
        'buildingsCount': '',
        'uniqueBuildings': '',
        'uniqueApartment': '',
        'tourApartments': '',
        'tourAmenities': '',
        'platform': '',
    });

    const openModalCalc = () => {
        // e.preventDefault();
        document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
        options.setIsCalcModalVisible(true);
    }


    const [open, setOpen] = useState({
        'buildingsCount': false,
        'uniqueBuildings': false,
        'uniqueApartment': false,
        'tourApartments': false,
        'tourAmenities': false,
        'platform': false,
    });

    useEffect(() => {
        if (options.buildingsCount) document.querySelector('.buildings-total-label').classList.add('top');
        if (options.uniqueBuildings) document.querySelector('.unique-buildings-label').classList.add('top');
        if (options.uniqueApartment) document.querySelector('.unique-apartment-label').classList.add('top');
        if (options.tourApartments) document.querySelector('.tour-apart-label').classList.add('top');
        if (options.tourAmenities) document.querySelector('.tour-amen-label').classList.add('top');
    }, [options.buildingsCount, options.uniqueBuildings, options.uniqueApartment, options.tourApartments, options.tourAmenities])

    useEffect( () => {
        options.platform[1] === 1 ? setIsCheckedWeb(true) : setIsCheckedWeb(false);
        options.platform[2] === 1 ? setIsCheckedMob(true) : setIsCheckedMob(false);
        options.platform[3] === 1 ? setIsCheckedDesk(true) : setIsCheckedDesk(false);
        setOpen({...open, platform: false});
    }, [options.platform]);

    const onChangeProjectName = (e) => options.setProjectName(e.target.value);

    useEffect(() => {

        document.querySelector('.calculate-button').addEventListener('click', function () {
            // debugger
        if (options.buildingsCount === '') {
            setOpen({...open, buildingsCount: true});
            setOpenTooltipText({...openTooltipText, buildingsCount: 'Has to be more than 0'});
        }

        if (options.uniqueBuildings === '') {
            setOpen({...open, uniqueBuildings: true});
            setOpenTooltipText({...openTooltipText, uniqueBuildings: 'Has to be more than 0'});
        }

        if (options.uniqueApartment === '') {
            setOpen({...open, uniqueApartment: true});
            setOpenTooltipText({...openTooltipText, uniqueApartment: 'Has to be more than 0'});
        }

        if (options.platformInput === 0) {
            setOpen({...open, platform: true});
        }

        if (options.uniqueBuildings > options.buildingsCount) {
            setOpen({...open, uniqueBuildings: true, buildingsCount: true});
            setOpenTooltipText({...openTooltipText,
                uniqueBuildings: '"Can\'t be more than \'Buildings total\'"',
                buildingsCount: '"Can\'t be less than \'Unique Buildings\'"'});
        }

        // options.setIsSaveModalVisible(true);
            if (options.platformInput !== 0 && options.buildingsCount !== '' && options.uniqueBuildings !== '' && options.uniqueApartment !== ''
            && options.uniqueBuildings < options.buildingsCount) {
                if (options.visualizerSalaryInhouse === '' || options.designerSalaryInhouse === '' || options.modelerSalaryInhouse === '' || options.developerSalaryInhouse === '') {
                    openModalCalc();
                }
            setOpen({...open, platform: false});
            setOpen({
                buildingsCount: false,
                uniqueBuildings: false,
                uniqueApartment: false,
                tourApartments: false,
                tourAmenities: false,
                platform: false
            });
            document.querySelector('.setting-table').classList.remove('block');
            document.querySelector('.setting-table').classList.add('transition-left-calc', 'opacity-calc');
            setTimeout(() => {
                options.setLoaderBlock(false);
                options.setComplexity(false);
                document.querySelector('.calculator-table').classList.remove('none');
            }, 800);
        }})
    }, [options.platformInput, options.buildingsCount, options.uniqueBuildings, options.uniqueApartment,
        options.visualizerSalaryInhouse, options.designerSalaryInhouse, options.modelerSalaryInhouse, options.developerSalaryInhouse
    ]);


    const lessThanMore = (obj, value) => {
        debugger
        if (obj === 'uniqueBuildings') {
            if (value > parseInt(options.buildingsCount)) {
                setOpen({
                    ...open,
                    uniqueBuildings: true,
                });
                setOpenTooltipText({...openTooltipText, uniqueBuildings: "Can't be more than 'Buildings total'"});
            } else {
                setOpen({
                    ...open,
                    uniqueBuildings: false,
                });
                setOpenTooltipText({...openTooltipText, uniqueBuildings: "", buildingsCount: ""});
            }
        } else if (obj === 'buildingsCount') {
            if (value < parseInt(options.uniqueBuildings)) {
                setOpen({
                    ...open,
                    buildingsCount: true,
                });
                setOpenTooltipText({...openTooltipText, buildingsCount: "Can't be less than 'Unique Buildings'"});
            } else {
                setOpen({
                    ...open,
                    buildingsCount: false,
                });
                setOpenTooltipText({...openTooltipText, buildingsCount: "", uniqueBuildings: ""});
            }
        } else {
            setOpen({
                'buildingsCount': false,
                'uniqueBuildings': false,
                'uniqueApartment': false,
                'tourApartments': false,
                'tourAmenities': false,
            });
        }
    }

    const onChange360 = (set, obj, e) => {
        set('');
        let value = e.target.value;
        if (isNaN(value)) {
            setOpen({
                ...open,
                [obj]: true,
            });
            set(value.replace(/[^\d]/g, ''));
            setOpenTooltipText({...openTooltipText, [obj]: "Contains unacceptable characters"});
        } else {
            set(value.replace(/[^\d]/g, ''));
            lessThanMore(obj, value);
        }
    }

    const onChange = (set, obj, e) => {
        set('');
        let value = e.target.value;
        if (isNaN(value)) {
            setOpen({
                ...open,
                [obj]: true,
            });
            set(value.replace(/[^\d]/g, ''));
            setOpenTooltipText({...openTooltipText, [obj]: "Contains unacceptable characters"});

        } else if (parseInt(value) === 0 || !value) {
            if (obj !== 'tourApartments' && obj !== 'tourAmenities') {
                setOpen({
                    ...open,
                    [obj]: true,
                });
                setOpenTooltipText({...openTooltipText, [obj]: 'Has to be more than 0'});
            } else {
                set(value);
            }
        } else {
            set(value.replace(/[^\d]/g, ''));
            lessThanMore(obj, value);
        }
    };


    const onClick = (classLabel, classInput, state, set) => {
        document.querySelector(classLabel).classList.add('top');
        if (state) {
           set(state);
            document.querySelector(classInput).classList.add('white-back');
        } else set(state);
    };

    const onChangePlatform = (e) => {
        if (e.target.checked === true) {
            options.setPlatform({...options.platform, [e.target.name]: 1});
        } else {
            options.setPlatform({...options.platform, [e.target.name]: 0});
        }
    };

    const onBlur360 = (state, set, className, obj) => {
        if (!state) document.querySelector(className).classList.remove('top');
        if (state === '') {
            set('');
        } else set(state);
    };

    const onBlur = (state, set, className, obj) => {
        if (!state) document.querySelector(className).classList.remove('top');
        if (state === '') {
            set('');
            setOpenTooltipText({...openTooltipText, [obj]:'Has to be more than 0'});
            setOpen({...open, [obj]: true});
        } else {
            setOpen({...open, [obj]: false});
            set(state);
        }
    };

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
    }, [options.totalDays]);

    return (
        <div className="setting-table column">
            <div className="settings-table_block ">
                <div className="settings-table_item">
                    <div className="settings-table_item-name">Platforms<span className='footnote platform_footnote'>*</span></div>
                    <div className="settings-table_item-input">
                        <input className='platform-input' checked={isCheckedWeb} type='checkbox'  value='left' id='id-web' name={"1"}
                               onChange={onChangePlatform}/>
                        <label htmlFor='id-web' className='platform-input-label web-label'/>
                        <Tooltip className='platform_tooltip' open={open.platform} TransitionProps={{ timeout: 600 }} placement="top" title="Select at least 1 platform" arrow={true}>
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
                        <Tooltip open={open.buildingsCount} TransitionProps={{ timeout: 600 }} title={openTooltipText.buildingsCount} arrow={true}>
                            <input
                                className='buildings-input number-input buildings-total-input'
                                type='text'
                                id='buildings-total-label'
                                value={options.buildingsCount}
                                onClick={() => onClick('.buildings-total-label', '.buildings-total-input', options.buildingsCount, options.setBuildingsCount)}
                                onBlur={() => onBlur(options.buildingsCount, options.setBuildingsCount, '.buildings-total-label', 'buildingsCount')}
                                onChange={(e) => onChange(options.setBuildingsCount, 'buildingsCount', e)}
                            />
                        </Tooltip>
                        <label htmlFor="unique-buildings-label" className='input-text-label unique-buildings-label'></label>
                        <Tooltip open={open.uniqueBuildings} TransitionProps={{ timeout: 600 }} title={openTooltipText.uniqueBuildings} arrow={true}>
                            <input
                                className='buildings-input number-input unique-buildings-input'
                                type='text'
                                id='unique-buildings-label'
                                value={options.uniqueBuildings}
                                onClick={() => onClick('.unique-buildings-label', '.unique-buildings-input', options.uniqueBuildings, options.setUniqueBuildings)}
                                onBlur={() => onBlur(options.uniqueBuildings, options.setUniqueBuildings, '.unique-buildings-label', 'uniqueBuildings')}
                                onChange={(e) => onChange(options.setUniqueBuildings, 'uniqueBuildings', e)}
                            />
                        </Tooltip>
                        <label htmlFor="unique-apartment-input" className='input-text-label unique-apartment-label'></label>
                        <Tooltip open={open.uniqueApartment} TransitionProps={{ timeout: 600 }} title={openTooltipText.uniqueApartment} arrow={true}>
                            <input
                                className='buildings-input number-input unique-apartment-input'
                                type='text'
                                id='unique-apartment-input'
                                value={options.uniqueApartment}
                                onClick={() => onClick('.unique-apartment-label', '.unique-apartment-input', options.uniqueApartment, options.setUniqueApartment)}
                                onBlur={() => onBlur(options.uniqueApartment, options.setUniqueApartment, '.unique-apartment-label', 'uniqueApartment')}
                                onChange={(e) => onChange(options.setUniqueApartment, 'uniqueApartment', e)}
                            />
                        </Tooltip>
                    </div>
                </div>
                <FacadeInputs
                    buildingComplexity={options.buildingComplexity}
                    setBuildingComplexity={options.setBuildingComplexity}
                    setLoaderBlock={options.setLoaderBlock}
                    complexity={options.complexity}
                    setComplexity={options.setComplexity}
                    setClassBlock={options.setClassBlock}
                />
                <div className="settings-table_item">
                    <div className="settings-table_item-name">360 tours</div>
                    <div className="settings-table_item-input tour-block-360">
                        <label htmlFor="id-tour-ap" className='input-text-label tour-apart-label'></label>
                        <Tooltip open={open.tourApartments} TransitionProps={{ timeout: 600 }} title={openTooltipText.tourApartments} arrow={true}>
                            <input
                                className='tour-input-360 number-input tour-apart-input'
                                type='text'
                                id='id-tour-ap'
                                value={options.tourApartments}
                                onClick={() => onClick('.tour-apart-label', '.tour-apart-input', options.tourApartments, options.setTourApartments)}
                                onBlur={() => onBlur360(options.tourApartments, options.setTourApartments, '.tour-apart-label', 'tourApartments')}
                                onChange={(e) => onChange360(options.setTourApartments, 'tourApartments', e)}
                            />
                        </Tooltip>
                        <label for="id-tour-am" className='input-text-label tour-amen-label'></label>
                        <Tooltip open={open.tourAmenities} TransitionProps={{timeout: 600}}  title={openTooltipText.tourAmenities} arrow={true}>
                            <input
                                className='tour-input-360 number-input tour-amen-input'
                                type='text'
                                id='id-tour-am'
                                value={options.tourAmenities}
                                onClick={() => onClick('.tour-amen-label', '.tour-amen-input', options.tourAmenities, options.setTourAmenities)}
                                onBlur={() => onBlur360(options.tourAmenities, options.setTourAmenities, '.tour-amen-label', 'tourAmenities')}
                                onChange={(e) => onChange360(options.setTourAmenities, 'tourAmenities', e)}
                            />
                        </Tooltip>
                    </div>
                </div>
                 {/***************** Uncommit when Denis add funcionality **********************/}
                {/*<FurnishingInput furnishingComplexity={options.furnishingComplexity} setFurnishingComplexity={options.setFurnishingComplexity}/>*/}
                <EnvironmentInput
                    environmentComplexity={options.environmentComplexity}
                    setEnvironmentComplexity={options.setEnvironmentComplexity}
                    setLoaderBlock={options.setLoaderBlock}
                />
                <div className='actions-block'>
                    <div className='clear-box'>
                        <button className='clear-button reset-button_styles' onClick={clear}>Clear</button>
                    </div>
                    {
                        options.loaderBlock && options.complexity ||
                        <div className='calculate-box'>
                            <button visible={options.isModalVisible} className='calculate-button reset-button_styles'>
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