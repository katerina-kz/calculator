import React, {useEffect, useState, useRef} from 'react';
import SaveModal from "./components/modals/SaveModal";
import {useLocalStorage} from "./hooks/useLocalStorage";
import SuccessModal from "./components/modals/SuccessModal";

function Calculator(props) {
    const { options } = props;
    const [email, setEmail] = useLocalStorage('email','');
    const [saveBlock, setSaveBlock] = useState(true);
    const [ isSaveModalVisible, setIsSaveModalVisible ] = useState(false);
    const [emailTooltip, setEmailTooltip] = useState(false);
    const [isSuccessEmail, setIsSuccessEmail] = useState(false);

    const openModalCalc = (e) => {
        e.preventDefault();
        document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
        document.querySelector('.calculator-table').nextElementSibling.style.position = 'absolute';
        options.setIsCalcModalVisible(true);
    };

    const openModalSave = (e) => {
        e.preventDefault();
        if (options.isSaveDisabled) {
            return;
        } else {
            document.querySelector('.actions-calc_block').nextElementSibling.style.display = 'block';
            document.querySelector('.calculator-table').nextElementSibling.style.position = 'absolute';
            setIsSaveModalVisible(true);
        }
    };

    const closeModal = () => {
        document.querySelector('.actions-calc_block').nextElementSibling.style.display = 'none';
        setIsSaveModalVisible(false);
    };


    const calculateDays = (opt) => {
        switch (opt) {
            case '360 apt. tours':
                return handle360ApDays();
            case '360 amenities tours':
                return handle360AmDays();
            case 'vantage panoramas':
                return isNaN(options.buildingsCount) ? 0 : options.buildingsCount*3;
            case 'total visualisation':
                return handleVisDaysTotal();
            case '2d-plan':
                return isNaN(options.uniqueApartment) ? 0 : Math.ceil(options.uniqueApartment/3);
            case '3d-plan':
                return isNaN(options.uniqueApartment) ? 0 : Math.ceil(options.uniqueApartment/3);
            case 'buildings':
               return handleBuildingsModeling();
            case 'environment':
                return handleEnvironmentComplexity();
            case 'total modeling':
                return handleModDaysTotal();
            case 'initial':
                return options.platformInput*5;
            case 'internal testing':
                return options.platformInput*5;
            case 'acceptance testing':
                return options.platformInput*5;
            case 'total development':
                return (options.platformInput*5)+(options.platformInput*5)+(options.platformInput*5);
            case 'total days':
                return handleProjectTotal();
            case 'total month':
                return Math.ceil((handleProjectTotal()/22) * 2) / 2;
        }
    }

    const calculateCost = (opt) => {
        switch(opt) {
            case '360 apt. tours':
                return handle360ApCost();
            case '360 amenities tours':
                return handle360AmCost();
            case 'vantage panoramas':
                return isNaN(options.buildingsCount) ? 0 : parseInt((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22));
            case 'total visualisation':
                return  handleVisCostTotal();
            case '2d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt(( Math.ceil(options.uniqueApartment/3))*(options.designerSalaryInhouse/22));
            case '3d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt(( Math.ceil(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22));
            case 'buildings':
                return handleBuildingsCost();
            case 'environment':
                return handle360EnvironmentCost();
            case 'total modeling':
                return handleModCostTotal();
            case 'initial':
                return Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22));
            case 'internal testing':
                return Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22));
            case 'acceptance testing':
                return Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22));
            case 'total development':
                return handleDevCostTotal();
            case 'total cost':
                return options.developerSalaryInhouse === "" ? 0 : totalSum === prevTotalSum ? totalSum : handleProjectTotalCost();
        }
    };

    const handleOutsource = (e) => {
         if (options.visualizerSalaryOutsource === '' && e.currentTarget.id === 'id-outsource-apt_tour') {
            setTimeout(() => {
                options.setIsOutsourceFill({...options.isOutsourceFill, visualizer: true});
            }, 300);
            document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
            options.setIsCalcModalVisible(true);
        } else if (options.visualizerSalaryOutsource === '' && e.currentTarget.id === 'id-outsource-am_tour') {
            setTimeout(() => {
                options.setIsOutsourceFill({...options.isOutsourceFill, visualizer: true});
            }, 300);
            document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
            options.setIsCalcModalVisible(true);
         } else if (options.modelerSalaryOutsource === '' && e.currentTarget.id === 'id-outsource-build') {
             setTimeout(() => {
                 options.setIsOutsourceFill({...options.isOutsourceFill, modelerForBuild: true});
             }, 300);
             document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
             options.setIsCalcModalVisible(true);
        } else if (options.modelerForEnvSalaryOutsource === '' && e.currentTarget.id === 'id-outsource-envinr') {
            setTimeout(() => {
                options.setIsOutsourceFill({...options.isOutsourceFill, modelerForEnv: true});
            }, 300);
            document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
            options.setIsCalcModalVisible(true);
        } else {
            e.target.checked === true
                ? options.setIsOutSource({...options.isOutsource, [e.target.value]: 1})
                : options.setIsOutSource({...options.isOutsource, [e.target.value]: 0})
        }
    };
    const handle360ApDays = () => {
        if (options.isOutsource['360-tours count - apartments'] === 1) {
            return 0;
        } else {
            return isNaN(options.tourApartments) ? 0 : options.tourApartments*5;
        }
    }

    const handle360ApCost = () => {
        if (options.isOutsource['360-tours count - apartments'] === 1) {
            return parseInt(options.visualizerSalaryOutsource*options.tourApartments);
            // return isNaN(options.tourApartments) ? 0 : parseInt((options.tourApartments*5)*(options.visualizerSalaryOutsource/22)); // TODO  this is counting by Denis
        } else {
            return isNaN(options.tourApartments) ? 0 : parseInt((options.tourApartments*5)*(options.visualizerSalaryInhouse/22))
        }
    }

    const handle360AmDays = () => {
        if (options.isOutsource["360-tours count - amenities"] === 1)  {
            return 0;
        } else {
            return isNaN(options.tourAmenities) ? 0 : options.tourAmenities*10;
        }
    }

    const handle360AmCost = () => {
        if (options.isOutsource["360-tours count - amenities"] === 1) {
            return parseInt(options.visualizerSalaryOutsource*options.tourAmenities);
            // return isNaN(options.tourAmenities) ? 0 : parseInt((options.tourAmenities*10)*(options.visualizerSalaryOutsource/22)); // TODO this is counting by Denis
        } else {
            return isNaN(options.tourAmenities) ? 0 : parseInt((options.tourAmenities*10)*(options.visualizerSalaryInhouse/22));
        }
    }

    const handleBuildingsCost = () => {
        if (options.isOutsource['Building count'] === 1) {
            // return parseInt((handleBuildingsModeling())*(options.modelerSalaryOutsource/22)); //  TODO this is counting by Denis
            return parseInt(options.modelerSalaryOutsource*options.buildingsCount);
        } else {
            return parseInt((handleBuildingsModeling())*(options.modelerSalaryInhouse/22));
        }
    }

    const handle360EnvironmentCost = () => {
        if (options.isOutsource['Environment complexity'] === 1) {
            // return parseInt(handleEnvironmentComplexity()*(options.modelerSalaryOutsource/22)); // TODO this is counting by Denis
            return (options.modelerForEnvSalaryOutsource === '') ? 0 : parseInt(options.modelerForEnvSalaryOutsource);
        } else {
            return parseInt(handleEnvironmentComplexity()*(options.modelerSalaryInhouse/22));
        }
    }

    const handleBuildingsModeling = () => {
        const buildCount = isNaN(options.buildingsCount) ? 0 : options.buildingsCount;
        const uniqBuild = isNaN(options.uniqueBuildings) ? 0 : options.uniqueBuildings;

        if (options.isOutsource['Building count'] === 1) {
            return 0;
        } else {
            if (options.platformInput === 1) {
                return (2*5*buildCount*handleBuildingsComplexity()*(Math.ceil(uniqBuild)));
            } else if (options.platformInput === 2) {
                return (3*5*buildCount*handleBuildingsComplexity()*(Math.ceil(uniqBuild)));
            } else if (options.platformInput === 3) {
                return (4*5*buildCount*handleBuildingsComplexity()*(Math.ceil(uniqBuild)));
            } else {
                return 0;
            }
        }

    }

    const handleEnvironmentComplexity = () => {
        if (options.platformInput === 0) {
            return 0;
        } else {
            if (options.isOutsource['Environment complexity'] === 1) {
                return 0;
            } else {
                if (options.environmentComplexity === 'Rural landscape') {
                    return 5+1*5;
                } else if (options.environmentComplexity === 'Low town') {
                    return 5+2*5;
                } else if (options.environmentComplexity === 'Dense city') {
                    return 5+3*5;
                }
            }
        }
    };

    const handleBuildingsComplexity = () => {
        if (options.buildingComplexity === 'Simple geometrical shape') {
            return 1;
        } else if (options.buildingComplexity === 'Moderately complex exterior') {
            return 2;
        } else if (options.buildingComplexity === 'Baroque edifice') {
            return 3;
        }
    };


    const handleProjectTotal = () => {
        const platfInp = isNaN(options.platformInput) ? 0 : options.platformInput;

        options.setTotalDays(handleVisDaysTotal()+handleModDaysTotal()+(platfInp*5)*3);
        return (
            handleVisDaysTotal()+
            handleModDaysTotal()+
            (platfInp*5)*3
        )
    }

    const handleVisDaysTotal = () => {
        const tourAp = handle360ApDays();
        const tourAm =  handle360AmDays();
        const buildTotal = isNaN(options.buildingsCount) ? 0 : options.buildingsCount*3;
        const total = tourAp+tourAm+buildTotal;

        return total;
    }

    const handleModDaysTotal = () => {
        const uniqAp2d = isNaN(options.uniqueApartment) ? 0 : Math.ceil(options.uniqueApartment/3);
        const uniqAp3d = isNaN(options.uniqueApartment) ? 0 : Math.ceil(options.uniqueApartment/3);
        const buildModFunc = handleBuildingsModeling();
        const envCompxFunc = handleEnvironmentComplexity();
        const buildMod = isNaN(buildModFunc) ? 0 : buildModFunc;
        const envCompx = isNaN(envCompxFunc) ? 0 : envCompxFunc;

        const total = uniqAp2d + uniqAp3d + buildMod + envCompx;
        return total;
    }

    const handleVisCostTotal = () => {
        const build = isNaN(options.buildingsCount) ? 0 : parseInt((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22));
        return (
            handle360ApCost()
            +handle360AmCost()
            +build
        )
    }

    const handleModCostTotal = () => {
        const build =  handleBuildingsCost();
        const env = handle360EnvironmentCost();
        const des = isNaN(options.uniqueApartment) ? 0 : parseInt((Math.ceil(options.uniqueApartment/3))*(options.designerSalaryInhouse/22));
        const mod = isNaN(options.uniqueApartment) ? 0 : parseInt((Math.ceil(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22));
        return (
            build+env+des+mod
        )
    };

    const handleDevCostTotal = () => {
       return (Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22)))*3;
    };

    // func for running digits
    const easeOutQuart = (t, b, c, d) => {
        return -c * (( t = t / d - 1) * t * t * t - 1) + b;
    };

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    }

    const totalSum = (handleVisCostTotal()+handleModCostTotal()+handleDevCostTotal())*1.5;
    const prevTotalSum = usePrevious(totalSum);

    const handleProjectTotalCost = () => {
        const time = {
                total: 2000,
                start: performance.now()
            };
            const tick = now => {
                const elapsed = now - time.start,
                    progress = easeOutQuart(elapsed, 0, 1, time.total);

                document.querySelectorAll('.total-cost').forEach(s => s.textContent = Math.round(progress * totalSum).toLocaleString())
                if (elapsed < time.total) {
                    return window.requestAnimationFrame(tick)
                }
            };
            window.requestAnimationFrame(tick);
    };

    useEffect(() => {
            if (parseInt(options.uniqueBuildings) > parseInt(options.buildingsCount)) {
               options.setIsSaveDisabled(true);
            } else {
                options.setIsSaveDisabled(false);
            }
    }, [options.uniqueBuildings, options.buildingsCount]);

    const data = {
        projectName: options.projectName,
        Platforms: options.platformInput, //  --------------------------------------- change!!!!!!!!
        'Buildings total': options.buildingsCount,
        'Unique buildings': options.uniqueBuildings,
        'Unique apartments': options.uniqueApartment,
        'Facade complexity': options.buildingComplexity,
        '360 apt tours': options.tourApartments,
        '360 amenities tours': options.tourAmenities,
        'Environment complexity': options.environmentComplexity,
        Visualization: {
            days: {
                '360 apt. tours': calculateDays('360 apt. tours'),
                '360 amenities tours': calculateDays('360 amenities tours'),
                'vantage panoramas': calculateDays('vantage panoramas'),
                'total visualisation': calculateDays('total visualisation'),
            },
            costs: {
                '360 apt. tours': calculateCost('360 apt. tours'),
                '360 amenities tours': calculateCost('360 amenities tours'),
                'vantage panoramas': calculateCost('vantage panoramas'),
                'total visualisation': calculateCost('total visualisation')
            },
        },
        Modeling: {
            days: {
                '2d-plan': calculateDays('2d-plan'),
                '3d-plan': calculateDays('3d-plan'),
                'buildings': calculateDays('buildings'),
                'environment': calculateDays( 'environment'),
                'total modeling': calculateDays('total modeling'),
            },
            costs: {
                '2d-plan': calculateCost('2d-plan'),
                '3d-plan': calculateCost('3d-plan'),
                'buildings': calculateCost('buildings'),
                'environment': calculateCost( 'environment'),
                'total modeling': calculateCost('total modeling'),
            }
        },
        Development: {
            days: {
                'initial': calculateDays('initial'),
                'internal testing': calculateDays('internal testing'),
                'acceptance testing': calculateDays('acceptance testing'),
                'total development': calculateDays('total development'),
            },
            costs: {
                'initial': calculateCost('initial'),
                'internal testing': calculateCost('internal testing'),
                'acceptance testing': calculateCost('acceptance testing'),
                'total development': calculateCost('total development'),
            },
        },
        Total: {
            'days': calculateDays('total days'),
            'costs': calculateCost('total cost'),
            'month': calculateDays('total month'),
        },
        Email: email,
    };


    function sendMail (data, e) {
        e.preventDefault();
        const regExp = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
        if (!regExp.test(email)) {
            setEmailTooltip(true);
        } else {
            let htmlEx = document.createElement('div').innerHTML = data;
            let dataPost = new FormData();
            dataPost.append("html", JSON.stringify(htmlEx));
            fetch('mail.php', {
                method: 'POST',
                body: dataPost,
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (res) {
                    console.log(res)
                })

            closeModal();
            setIsSuccessEmail(true);
        }
    };

    return (
        <form className='calculator-table column none'>
            <div className='wrapper'>
            <span className='arrow-square calc'></span>
            <div className='calculator-table_title total-block'>
                <div className='total-days-box'>
                    <div className="calculator-table_item month-text-int">{calculateDays('total month')}
                        <span className='month-text'> months</span>
                    </div>
                    <div className="calculator-days-amount">({calculateDays('total days')} work days)</div>
                </div>
                <div className='total-price-box'>
                    <span className='total-cost-dollar'>$</span><div className="calculator-table_item total-cost">{calculateCost('total cost')}</div>
                </div>
            </div>

            {/*****************temporary unavailable****************/}
            {/*<div className="calculator-table_row">*/}
            {/*    <div className="calculator-table_item-title">Project name</div>*/}
            {/*    <div className="calculator-table_item">{options.projectName}</div>*/}
            {/*</div>*/}


            <div className="calculator-table_row calculator-table_block">
                <div className="calculator-table_item-title">Visualisation</div>
            </div>
            <div className="calculator-table_row first-row">
                <div className="calculator-table_item effort">360 apt. tours</div>
                <div className="calculator-table_item days">{calculateDays('360 apt. tours')} days</div>
                <div className="calculator-table_item cost">${calculateCost('360 apt. tours')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'360-tours count - apartments'} id='id-outsource-apt_tour' name='outsource-name' onChange={(e) => handleOutsource(e, options.visualizerSalaryOutsource, 'visualizer')}/>
                    <label htmlFor='id-outsource-apt_tour' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">360 amenities tours</div>
                <div className="calculator-table_item days">{calculateDays('360 amenities tours')} days</div>
                <div className="calculator-table_item cost">${calculateCost('360 amenities tours')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'360-tours count - amenities'} id='id-outsource-am_tour' name='outsource-name' onChange={(e) => handleOutsource(e, options.visualizerSalaryOutsource, 'visualizer')}/>
                    <label htmlFor='id-outsource-am_tour' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">vantage panoramas</div>
                <div className="calculator-table_item days">{calculateDays('vantage panoramas')} days</div>
                <div className="calculator-table_item cost">${calculateCost('vantage panoramas')}</div>
                {/*<div className="calculator-table_item outsource">*/}
                {/*    <input className='outsource-input' type='checkbox' value={'3'} id='id-outsource-panoram' name='outsource-name' onChange={handleOutsource}/>*/}
                {/*    <label htmlFor='id-outsource-panoram' className='outsource-input-label outsource-label'/>*/}

                {/*</div>*/}
            </div>
            <div className="calculator-table_row total-row">
                <div className="calculator-table_item effort total"></div>
                <div className="calculator-table_item days">{calculateDays('total visualisation')} days</div>
                <div className="calculator-table_item cost">${calculateCost('total visualisation')}</div>
            </div>
            <div className="calculator-table_row calculator-table_block">
                <div className="calculator-table_item-title">Modeling</div>
            </div>
            <div className="calculator-table_row first-row">
                <div className="calculator-table_item effort">2D plans</div>
                <div className="calculator-table_item days">{calculateDays('2d-plan')} days</div>
                <div className="calculator-table_item cost">${calculateCost('2d-plan')}</div>
                {/*<div className="calculator-table_item outsource">*/}
                {/*    <input className='outsource-input' type='checkbox' value={'4'} id='id-outsource-2d-plan' name='outsource-name' onChange={handleOutsource}/>*/}
                {/*    <label htmlFor='id-outsource-2d-plan' className='outsource-input-label outsource-label'/>*/}
                {/*</div>*/}
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">3D plans</div>
                <div className="calculator-table_item days">{calculateDays('3d-plan')} days</div>
                <div className="calculator-table_item cost">${calculateCost('3d-plan')}</div>
                {/*<div className="calculator-table_item outsource">*/}
                {/*    <input className='outsource-input' type='checkbox' value={'5'} id='id-outsource-3d-plan' name='outsource-name' onChange={handleOutsource}/>*/}
                {/*    <label htmlFor='id-outsource-3d-plan' className='outsource-input-label outsource-label'/>*/}
                {/*</div>*/}
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">building(s)</div>
                <div className="calculator-table_item days">{calculateDays('buildings')} days</div>
                <div className="calculator-table_item cost">${calculateCost('buildings')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'Building count'} id='id-outsource-build' name='outsource-name' onChange={(e) => handleOutsource(e, options.modelerSalaryOutsource, 'modelerForBuild')}/>
                    <label htmlFor='id-outsource-build' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">environment</div>
                <div className="calculator-table_item days">{calculateDays('environment')} days</div>
                <div className="calculator-table_item cost">${calculateCost('environment')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'Environment complexity'}  id='id-outsource-envinr' name='outsource-name' onChange={(e) => handleOutsource(e, options.modelerForEnvSalaryOutsource, 'modelerForEnv')}/>
                    <label htmlFor='id-outsource-envinr' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row total-row">
                <div className="calculator-table_item effort total"></div>
                <div className="calculator-table_item days">{calculateDays('total modeling')} days</div>
                <div className="calculator-table_item cost">${calculateCost('total modeling')}</div>
            </div>
            <div className="calculator-table_row calculator-table_block">
                <div className="calculator-table_item-title">Development</div>
            </div>
            <div className="calculator-table_row first-row">
                <div className="calculator-table_item effort">initial</div>
                <div className="calculator-table_item days">{calculateDays('initial')} days</div>
                <div className="calculator-table_item cost">${calculateCost('initial')}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">internal testing</div>
                <div className="calculator-table_item days">{calculateDays('internal testing')} days</div>
                <div className="calculator-table_item cost">${calculateCost('internal testing')}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">acceptance testing</div>
                <div className="calculator-table_item days">{calculateDays('acceptance testing')} days</div>
                <div className="calculator-table_item cost">${calculateCost('acceptance testing')}</div>
            </div>
            <div className="calculator-table_row total-row">
                <div className="calculator-table_item effort total"></div>
                <div className="calculator-table_item days">{calculateDays('total development')} days</div>
                <div className="calculator-table_item cost">${calculateCost('total development')}</div>
            </div>
            <div className='actions-calc_block'>
                <div className='adjust-salary_box'>
                    <button className='adjust-salary-button reset-button_styles' visible={options.isModalVisible} onClick={openModalCalc}>ADJUST SALARIES</button>
                </div>
                <div className='save-box calculate-box'>
                    <button onClick={openModalSave} className='save-button calculate-button reset-button_styles'>
                        <span>SAVE</span>
                    </button>
                </div>
            </div>
            {
                saveBlock &&
                <SaveModal options = {{
                    isSaveModalVisible,
                    setIsSaveModalVisible,
                    email,
                    setEmail,
                    emailTooltip,
                    setEmailTooltip,
                }}
                name={options.projectName}
                setName={options.setProjectName}
                click={(e) => sendMail(data, e)}
                close={closeModal}
                />
            }
                {
                    isSuccessEmail &&
                    <SuccessModal options={{isSuccessEmail, setIsSuccessEmail}}/>
                }
            </div>
        </form>
      );
}

export default Calculator;