import React, { useState, useEffect } from 'react';

function Calculator(props) {
    const { options } = props;

    const handleBuildingsModeling = () => {

        if (options.platformInput === 1) {
            return (2*5*(options.buildingsCount)*handleBuildingsComplexity()*(Math.ceil(options.uniqueBuildings)));
        } else if (options.platformInput === 2) {
            return (3*5*(options.buildingsCount)*handleBuildingsComplexity()*(Math.ceil(options.uniqueBuildings)));
        } else if (options.platformInput === 3) {
            return (4*5*(options.buildingsCount)*handleBuildingsComplexity()*(Math.ceil(options.uniqueBuildings)));
        } else {
            return 0;
        }
    }

    const handleEnviromentComplexity = () => {
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
        return (
            ((options.tourApartments*5)+(options.tourAmenities*10)+(options.buildingsCount*3))+(Math.ceil(options.uniqueApartment/3))+(Math.ceil(options.uniqueApartment/3))+
            (handleBuildingsModeling()+(5+(handleEnviromentComplexity()*5)))+
            (options.platformInput*5)+(options.platformInput*5)+(options.platformInput*5)
        )
    }

    const handleVisCostTotal = () => {
        return (
            Math.ceil((options.tourApartments*5)*(options.visualizerSalaryInhouse/22))
            +Math.ceil((options.tourAmenities*10)*(options.visualizerSalaryInhouse/22))
            +Math.ceil((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22))
        )
    }

    const handleModCostTotal = () => {
        return (
            Math.ceil((Math.ceil(options.uniqueApartment/3))*(options.designerSalaryInhouse/22))
            +Math.ceil((Math.ceil(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22))
            +Math.ceil((handleBuildingsModeling())*(options.modelerSalaryInhouse/22))
            +Math.ceil((5+(handleEnviromentComplexity()*5))*(options.modelerSalaryInhouse/22))
        )
    }

    const handleDevCostTotal = () => {
        return (
            (Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22)))*3
        )
    }

    const handleProjectTotalCost = () => {
        return (
            (handleVisCostTotal()+handleModCostTotal()+handleDevCostTotal())*1.5
        )
    }

    return (
        <div className='calculator-table column'>
            <div className='calculator-table_title column-title'>
                Calculation
            </div>
            <div className='calculator-table_block_title block-title'>
                <div className="calculator-table_name">Effort (work days)</div>
                <div className="calculator-table_check">Costs</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item-title">Project name</div>
                <div className="calculator-table_item">{options.projectName}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item-title">Visualizer:</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">360-tours - apartments</div>
                <div className="calculator-table_item">{options.tourApartments*5}</div>
                <div className="calculator-table_item">{Math.ceil((options.tourApartments*5)*(options.visualizerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">360-tours - amenities</div>
                <div className="calculator-table_item">{options.tourAmenities*10}</div>
                <div className="calculator-table_item">{Math.ceil((options.tourAmenities*10)*(options.visualizerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Vantage panoramas</div>
                <div className="calculator-table_item">{options.buildingsCount*3}</div>
                <div className="calculator-table_item">{Math.ceil((options.buildingsCount*3)*(options.visualizerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Total:</div>
                <div className="calculator-table_item">{(options.tourApartments*5)+(options.tourAmenities*10)+(options.buildingsCount*3)}</div>
                <div className="calculator-table_item">{handleVisCostTotal()}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item-title">Modeling:</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">2D plans</div>
                <div className="calculator-table_item">{Math.ceil(options.uniqueApartment/3)}</div>
                <div className="calculator-table_item">{Math.ceil((Math.ceil(options.uniqueApartment/3))*(options.designerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">3D plans</div>
                <div className="calculator-table_item">{Math.ceil((options.uniqueApartment/3))}</div>
                <div className="calculator-table_item">{Math.ceil((Math.ceil(options.uniqueApartment/3))*(options.modelerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Building(s)</div>
                <div className="calculator-table_item">{handleBuildingsModeling()}</div>
                <div className="calculator-table_item">{Math.ceil((handleBuildingsModeling())*(options.modelerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Environment</div>
                <div className="calculator-table_item">{5+(handleEnviromentComplexity()*5)}</div>
                <div className="calculator-table_item">{Math.ceil((5+(handleEnviromentComplexity()*5))*(options.modelerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Total</div>
                <div className="calculator-table_item">{(Math.ceil(options.uniqueApartment/3))+(Math.ceil(options.uniqueApartment/3))+(handleBuildingsModeling()+(5+(handleEnviromentComplexity()*5)))}</div>
                <div className="calculator-table_item">{handleModCostTotal()}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item-title">Development:</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Initial</div>
                <div className="calculator-table_item">{options.platformInput*5}</div>
                <div className="calculator-table_item">{Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Internal testing</div>
                <div className="calculator-table_item">{options.platformInput*5}</div>
                <div className="calculator-table_item">{Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Acceptance testing</div>
                <div className="calculator-table_item">{options.platformInput*5}</div>
                <div className="calculator-table_item">{Math.ceil((options.platformInput*5)*(options.developerSalaryInhouse/22))}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Total</div>
                <div className="calculator-table_item">{(options.platformInput*5)+(options.platformInput*5)+(options.platformInput*5)}</div>
                <div className="calculator-table_item">{handleDevCostTotal()}</div>
            </div>
            <div className="calculator-table_row">
                <div className="calculator-table_item effort">Project total</div>
                <div className="calculator-table_item">{handleProjectTotal()}</div>
                <div className="calculator-table_item">{handleProjectTotalCost()}</div>
            </div>
        </div>
      );
}

export default Calculator;