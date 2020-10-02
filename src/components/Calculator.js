import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import apiKeys from './apiKeys'

function Calculator(props) {
    const { options } = props;

    const openModal = (e) => {
        e.preventDefault();
        document.querySelector('.calculator-table').nextElementSibling.style.display = 'block';
        options.setIsModalVisible(true);
    }

    const calculateDays = (opt) => {
        switch (opt) {
            case '360 apt. tours':
                return isNaN(options.tourApartments) ? 0 : options.tourApartments*5;
            case '360 amenities tours':
                return isNaN(options.tourAmenities) ? 0 : options.tourAmenities*10;
            case 'vantage panoramas':
                return isNaN(options.buildingsCount) ? 0 : options.buildingsCount*3;
            case 'total visualisation':
                return handleVisDaysTotal();
            case '2d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt(options.uniqueApartment/3);
            case '3d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt(options.uniqueApartment/3);
            case 'buildings':
               return handleBuildingsModeling();
            case 'environment':
                return 5+(handleEnvironmentComplexity()*5);
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
                return Math.ceil(handleProjectTotal()/30);
        }
    }

    const calculateCost = (opt) => {
        switch(opt) {
            case '360 apt. tours':
                return handleOutsource360Ap();
            case '360 amenities tours':
                return handleOutsource360Am();
            case 'vantage panoramas':
                return isNaN(options.buildingsCount) ? 0 : parseInt((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22));
            case 'total visualisation':
                return  handleVisCostTotal();
            case '2d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt((parseInt(options.uniqueApartment/3))*(options.designerSalaryInhouse/22));
            case '3d-plan':
                return isNaN(options.uniqueApartment) ? 0 : parseInt((parseInt(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22));
            case 'buildings':
                return handleOutsourceBuildings();
            case 'environment':
                return handleOutsource360Environment();
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
                return options.developerSalaryInhouse === "" ? 0 : handleProjectTotalCost();
        }
    }

    const handleOutsource = (e) => {
        e.target.checked === true
            ? options.setIsOutSource({...options.isOutsource, [e.target.value]: 1})
            : options.setIsOutSource({...options.isOutsource, [e.target.value]: 0})
    }

    const handleOutsource360Ap = () => {
        if (options.isOutsource['360-tours count - apartments'] === 1) {
            return isNaN(options.tourApartments) ? 0 : parseInt((options.tourApartments*5)*(options.visualizerSalaryOutsource/22));
        } else {
            return isNaN(options.tourApartments) ? 0 : parseInt((options.tourApartments*5)*(options.visualizerSalaryInhouse/22))
        }
    }

    const handleOutsource360Am = () => {
        if (options.isOutsource["360-tours count - amenities"] === 1) {
            return isNaN(options.tourAmenities) ? 0 : parseInt((options.tourAmenities*10)*(options.visualizerSalaryOutsource/22));
        } else {
            return isNaN(options.tourAmenities) ? 0 : parseInt((options.tourAmenities*10)*(options.visualizerSalaryInhouse/22));
        }
    }

    const handleOutsourceBuildings = () => {
        if (options.isOutsource['Building count'] === 1) {
            return parseInt((handleBuildingsModeling())*(options.modelerSalaryOutsource/22));;
        } else {
            return parseInt((handleBuildingsModeling())*(options.modelerSalaryInhouse/22));
        }
    }

    const handleOutsource360Environment = () => {
        if (options.isOutsource['Environment complexity'] === 1) {
            return parseInt((5+(handleEnvironmentComplexity()*5))*(options.modelerSalaryOutsource/22));
        } else {
            return parseInt((5+(handleEnvironmentComplexity()*5))*(options.modelerSalaryInhouse/22));
        }
    }

    const handleBuildingsModeling = () => {
        const buildCount = isNaN(options.buildingsCount) ? 0 : options.buildingsCount;
        const uniqBuild = isNaN(options.uniqueBuildings) ? 0 : options.uniqueBuildings;

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

    const handleEnvironmentComplexity = () => {
        if (options.environmentComplexity === 'Rural landscape') {
            return 1;
        } else if (options.environmentComplexity === 'Low town') {
            return 2;
        } else if (options.environmentComplexity === 'Dense city') {
            return 3;
        }
    }

    const handleBuildingsComplexity = () => {
        if (options.buildingComplexity === 'Simple geometrical shape') {
            return 1;
        } else if (options.buildingComplexity === 'Moderately complex exterior') {
            return 1.5;
        } else if (options.buildingComplexity === 'Baroque edifice') {
            return 2;
        }
    }


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
        const tourAp = isNaN(options.tourApartments) ? 0 : options.tourApartments;
        const tourAm =  isNaN(options.tourAmenities) ? 0 : options.tourAmenities;
        const buildTotal = isNaN(options.buildingsCount) ? 0 : options.buildingsCount;
        const total = (tourAp*5)+(tourAm*10)+(buildTotal*3);

        return total;
    }

    const handleModDaysTotal = () => {
        const uniqAp = isNaN(options.uniqueApartment) ? 0 : options.uniqueApartment;
        const buildModFunc = handleBuildingsModeling();
        const envCompxFunc = handleEnvironmentComplexity();
        const buildMod = isNaN(buildModFunc) ? 0 : buildModFunc;
        const envCompx = isNaN(envCompxFunc) ? 0 : envCompxFunc;

        const total = parseInt(uniqAp/3) +  parseInt(uniqAp/3) + buildMod + (5+(envCompx*5));
        return total;
    }

    const handleVisCostTotal = () => { // -------------------------------------------------change when oursource
        return (
            parseInt((options.tourApartments*5)*(options.visualizerSalaryInhouse/22))
            +parseInt((options.tourAmenities*10)*(options.visualizerSalaryInhouse/22))
            +parseInt((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22))
        )
    }

    const handleModCostTotal = () => { // -------------------------------------------------change when oursource
        return (
            parseInt((parseInt(options.uniqueApartment/3))*(options.designerSalaryInhouse/22))
            +parseInt((parseInt(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22))
            +parseInt((handleBuildingsModeling())*(options.modelerSalaryInhouse/22))
            +parseInt((5+(handleEnvironmentComplexity()*5))*(options.modelerSalaryInhouse/22))
        )
    }

    const handleDevCostTotal = () => { // -------------------------------------------------change when oursource
       return (Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22)))*3;
    }

    const handleProjectTotalCost = () => {
        return (
            (handleVisCostTotal()+handleModCostTotal()+handleDevCostTotal())*1.5
        )
    }

    // const submit = (e) => {
    //     e.preventDefault()
    //     const {
    //         REACT_APP_EMAILJS_RECEIVER: receiverEmail,
    //         REACT_APP_EMAILJS_TEMPLATEID: template,
    //         REACT_APP_EMAILJS_USERID: user
    //     } = env
    //
    //     sendFeedback(
    //         template,
    //         senderEmail,
    //         receiverEmail,
    //         feedback,
    //         user
    //     )
    //
    //     this.setState({
    //         formSubmitted: true
    //     })
    // }
    //
    // const sendFeedback = (templateId, senderEmail, receiverEmail, feedback, user) => {
    //     window.emailjs.send(
    //         'default_service', // default email provider in your EmailJS account
    //         templateId,
    //         {
    //             senderEmail,
    //             receiverEmail,
    //             feedback
    //         },
    //         user
    //     )
    //         .then(res => {
    //             this.setState({ formEmailSent: true })
    //         })
    //         // Handle errors here however you like, or use a React error boundary
    //         .catch(err => console.error('Failed to send feedback. Error: ', err))
    // }

    return (
        <form className='calculator-table column none'>
            <span className='arrow-square calc'></span>
            <div className='calculator-table_title total-block'>
                <div className='total-days-box'>
                    <div className="calculator-table_item month-text-int">{calculateDays('total month')}
                        <span className='month-text'> months</span>
                    </div>
                    <div className="calculator-days-amount">({calculateDays('total days')} work days)</div>
                </div>
                <div className='total-price-box'>
                    <div className="calculator-table_item total-cost">${calculateCost('total cost')}</div>
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
                    <input className='outsource-input' type='checkbox' value={'360-tours count - apartments'} id='id-outsource-apt_tour' name='outsource-name' onChange={handleOutsource}/>
                    <label htmlFor='id-outsource-apt_tour' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">360 amenities tours</div>
                <div className="calculator-table_item days">{calculateDays('360 amenities tours')} days</div>
                <div className="calculator-table_item cost">${calculateCost('360 amenities tours')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'360-tours count - amenities'} id='id-outsource-am_tour' name='outsource-name' onChange={handleOutsource}/>
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
                    <input className='outsource-input' type='checkbox' value={'Building count'} id='id-outsource-build' name='outsource-name' onChange={handleOutsource}/>
                    <label htmlFor='id-outsource-build' className='outsource-input-label outsource-label'/>
                </div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">environment</div>
                <div className="calculator-table_item days">{calculateDays('environment')} days</div>
                <div className="calculator-table_item cost">${calculateCost('environment')}</div>
                <div className="calculator-table_item outsource">
                    <input className='outsource-input' type='checkbox' value={'Environment complexity'}  id='id-outsource-envinr' name='outsource-name' onChange={handleOutsource}/>
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
                    <button className='adjust-salary-button reset-button_styles' visible={options.isModalVisible} onClick={openModal}>ADJUST SALARIES</button>
                </div>
                <div className='save-box calculate-box'>
                    <button className='save-button calculate-button reset-button_styles'>
                        <span>SAVE</span>
                    </button>
                </div>
            </div>
        </form>

      );
}

export default Calculator;