import React, {useEffect, useState} from 'react';
import ProjectFeaturesInputs from "./ProjectFeaturesInputs";
import './styles.css';
import '../fonts/fonts.css'
import Calculator from "./Calculator";
import SalaryInputs from "./SalaryInputs";

function MainTable() {

    // project
    const [projectName, setProjectName] = useState('');
    const [platform, setPlatform] = useState({
        "1": 0,
        "2": 0,
        "3": 0
    });
    const [platformInput, setPlatformInput] = useState(0);
    const [buildingsCount, setBuildingsCount] = useState('Building total');
    const [uniqueBuildings, setUniqueBuildings] = useState('Unique buildings');
    const [uniqueApartment, setUniqueApartment] = useState('Unique apt.');
    const [tourApartments, setTourApartments] = useState('Apt. tours');
    const [tourAmenities, setTourAmenities] = useState('Amenities tours');
    const [environmentComplexity, setEnvironmentComplexity] = useState('Rural landscape');
    const [buildingComplexity, setBuildingComplexity] = useState("Simple geometrical shape");
    const [furnishingComplexity, setFurnishingComplexity] = useState('Min');

    // salary
    const [visualizerSalaryInhouse, setVisualizerSalaryInhouse] = useState('');
    const [visualizerSalaryOutsourse, setVisualizerSalaryOutsourse] = useState('');
    const [designerSalaryInhouse, setDesignerSalaryInhouse] = useState('');
    const [designerSalaryOutsourse, setDesignerSalaryOutsourse] = useState('');
    const [modelerSalaryInhouse, setModelerSalaryInhouse] = useState('');
    const [modelerSalaryOutsourse, setModelerSalaryOutsourse] = useState('');
    const [developerSalaryInhouse, setDeveloperSalaryInhouse] = useState('');
    const [developerSalaryOutsourse, setDeveloperSalaryOutsourse] = useState('');

    const [loaderBlock, setLoaderBlock] = useState(true);
    const [projectFeaturesBlock, setProjectFeaturesBlock] = useState(true);
    const [calculateBlock, setCalculateBlock] = useState(false);
    const [salaryBlock, setSalaryBlock] = useState(false);

    useEffect(() => {
        let evnArray = Object.values(platform);
        let output = 0;
        evnArray.forEach(el => setPlatformInput(output += el));
    }, [platform])

    const clickCalculate = () => {
        setProjectFeaturesBlock(false);
        setCalculateBlock(true);
    };

    const clearProjectInputs = () => {
        setProjectName('');
        setPlatform({
            "1": 0,
            "2": 0,
            "3": 0
        });
        setPlatformInput(0);
        setBuildingsCount('Building total');
        setUniqueBuildings('Unique buildings');
        setUniqueApartment('Unique apt.');
        setTourApartments('Apt. tours');
        setTourAmenities('Amenities tours');
        setEnvironmentComplexity('Rural landscape');
        setBuildingComplexity("Simple geometrical shape");
        setFurnishingComplexity('Min');
    }


    return (
        <>

            <div className='table-root'>
                {
                    loaderBlock &&
                    <div className="loader-block">
                        <div className='loader-title'></div>
                        <h3 className='loader-subtitle'>calculator</h3>
                        <div className="loader-arrow"
                             style={{
                                 display: "none"
                             }}>
                        </div>
                    </div>
                }
                {
                    projectFeaturesBlock &&
                    <ProjectFeaturesInputs options = {{
                        projectName,
                        platform,
                        setProjectName,
                        buildingsCount,
                        buildingComplexity,
                        uniqueApartment,
                        uniqueBuildings,
                        tourAmenities,
                        tourApartments,
                        environmentComplexity,
                        furnishingComplexity,
                        // environmentComplexityInput,
                        platformInput,
                        // buildingComplexityInput,
                        // setBuildingComplexityInput,
                        setPlatformInput,
                        setFurnishingComplexity,
                        // setEnvironmentComplexityInput,
                        setPlatform,
                        setBuildingsCount,
                        setBuildingComplexity,
                        setUniqueBuildings,
                        setUniqueApartment,
                        setTourAmenities,
                        setTourApartments,
                        setEnvironmentComplexity,}}
                        click={clickCalculate}
                        clear={clearProjectInputs}
                    />
                }
                {   calculateBlock &&
                    <Calculator options = {{
                        projectName,
                        platform,
                        buildingsCount,
                        buildingComplexity,
                        uniqueApartment,
                        uniqueBuildings,
                        tourAmenities,
                        tourApartments,
                        platformInput,
                        environmentComplexity,
                        designerSalaryInhouse,
                        designerSalaryOutsourse,
                        visualizerSalaryInhouse,
                        visualizerSalaryOutsourse,
                        modelerSalaryInhouse,
                        modelerSalaryOutsourse,
                        developerSalaryInhouse,
                        developerSalaryOutsourse,
                    }}/>
                }
                {
                    salaryBlock &&
                    <SalaryInputs options = {{
                    visualizerSalaryInhouse,
                    visualizerSalaryOutsourse,
                    designerSalaryInhouse,
                    designerSalaryOutsourse,
                    modelerSalaryInhouse,
                    modelerSalaryOutsourse,
                    developerSalaryInhouse,
                    developerSalaryOutsourse,
                    setVisualizerSalaryInhouse,
                    setVisualizerSalaryOutsourse,
                    setDesignerSalaryInhouse,
                    setDesignerSalaryOutsourse,
                    setModelerSalaryInhouse,
                    setModelerSalaryOutsourse,
                    setDeveloperSalaryInhouse,
                    setDeveloperSalaryOutsourse
                }}/>
                }
            </div>
        </>
    );
}

export default MainTable;