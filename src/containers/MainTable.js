import React, {useEffect, useState} from 'react';
import ProjectFeaturesInputs from "./ProjectFeaturesInputs";
import '../styles/styles.css';
import '../fonts/fonts.css';
import '../styles/scss/style.scss';
import Calculator from "./Calculator";
import SalaryInputs from "./SalaryInputs";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDataFromStorage } from "./hooks/useDataFromStorage";
import { useGlobalObject } from "./hooks/useGlobalObject";

function MainTable() {

    // project
    const [projectName, setProjectName] = useState('');
    const [platform, setPlatform] = useLocalStorage('platform', {
        "1": 0,
        "2": 0,
        "3": 0
    });
    const [platformInput, setPlatformInput] = useState( 0);
    const [buildingsCount, setBuildingsCount] = useLocalStorage('Building total', '');
    const [uniqueBuildings, setUniqueBuildings] = useLocalStorage('Unique buildings', '');
    const [uniqueApartment, setUniqueApartment] = useLocalStorage('Unique apt.','');
    const [tourApartments, setTourApartments] = useLocalStorage('Apt. tours', '');
    const [tourAmenities, setTourAmenities] = useLocalStorage('Amenities tours', '');
    const [environmentComplexity, setEnvironmentComplexity] = useLocalStorage('Environment Complexity', 'Rural landscape');
    const [buildingComplexity, setBuildingComplexity] = useLocalStorage("Building Complexity", "Simple geometrical shape");
    // const [furnishingComplexity, setFurnishingComplexity] = useLocalStorage('Furnishing Complexity', 'Min');

    // salary
    const [visualizerSalaryInhouse, setVisualizerSalaryInhouse] = useLocalStorage('Visualizer Salary Inhouse', '');
    const [visualizerSalaryOutsource, setVisualizerSalaryOutsource] = useLocalStorage('Visualizer Salary Outsource', '');
    const [designerSalaryInhouse, setDesignerSalaryInhouse] = useLocalStorage('Designer Salary Inhouse', '');
    const [designerSalaryOutsource, setDesignerSalaryOutsource] = useLocalStorage('Designer Salary Outsource', '');
    const [modelerSalaryInhouse, setModelerSalaryInhouse] = useLocalStorage('Modeler Salary Inhouse', '');
    const [modelerSalaryOutsource, setModelerSalaryOutsource] = useLocalStorage('Modeler Salary Outsource', '');
    const [modelerForEnvSalaryOutsource, setModelerForEnvSalaryOutsource] = useLocalStorage('Modeler for Environment Salary Outsource', '');
    const [developerSalaryInhouse, setDeveloperSalaryInhouse] = useLocalStorage('Developer Salary Inhouse', '');
    const [developerSalaryOutsource, setDeveloperSalaryOutsource] = useLocalStorage('Developer Salary Outsource', '');

    const [loaderBlock, setLoaderBlock] = useState(true);
    const [complexity, setComplexity] = useState(false);
    const [projectFeaturesBlock, setProjectFeaturesBlock] = useState(false);
    const [calculateBlock, setCalculateBlock] = useState(true);
    const [salaryBlock, setSalaryBlock] = useState(true);
    const [totalDays, setTotalDays] = useState(0);
    const [isOutsource, setIsOutSource] = useState({
        "Building count": 0,
        "360-tours count - apartments": 0,
        "360-tours count - amenities": 0,
        "Environment complexity": 0,
    });
    const [classBlock, setClassBlock] = useState('');

    // ----- Modal popup -------//

    const [ isCalcModalVisible, setIsCalcModalVisible ] = useState(false);
    const [isOutsourceFill, setIsOutsourceFill] = useState({
        designer: false,
        modelerForEnv: false,
        modelerForBuild: false,
        visualizer: false
    });

    // --------------------------- loader loading --------------------------- //

    useEffect(() => {
        let evnArray = Object.values(platform);
        let output = 0;
        evnArray.forEach(el => output += el);
        setPlatformInput(output);
    }, [platform])

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.loader-arrow').classList.add('block');
        }, 300);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.loader-block').classList.add('transition-left');
        }, 800);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.loader-block').classList.remove('transition-left');
            document.querySelector('.table-root').classList.add('table-root_grid');
        }, 1500);

    }, []);

    useEffect(() => {
        setTimeout(() => {
            setProjectFeaturesBlock(true);
        }, 1800);

    }, [projectFeaturesBlock]);

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.setting-table').classList.add('block');
        }, 2000);

    }, []);

    const clearProjectInputs = () => {
        setProjectName('');
        setPlatform({
            "1": 0,
            "2": 0,
            "3": 0
        });
        setPlatformInput(0);
        setBuildingsCount('');
        setUniqueBuildings('');
        setUniqueApartment('');
        setTourApartments('');
        setTourAmenities('');
        setEnvironmentComplexity('Rural landscape');
        setBuildingComplexity("Simple geometrical shape");
        // setFurnishingComplexity('');
        document.querySelector('.unique-buildings-label').classList.remove('top');
        document.querySelector('.unique-apartment-label').classList.remove('top');
        document.querySelector('.buildings-total-label').classList.remove('top');
        document.querySelector('.tour-amen-label').classList.remove('top');
        document.querySelector('.tour-apart-label').classList.remove('top');
    }

    useEffect(() => {
        if (document.querySelector('.complexity-examples') !== null) {
            document.querySelector('.complexity-examples').classList.remove('middle', 'max', 'simple');
            document.querySelector('.complexity-examples').classList.add(classBlock);
        }
    }, [classBlock]);

    return (
        <>
            <div className='table-root'>
                {
                    loaderBlock &&
                    <div className="loader-block">
                        <span className='arrow-square loader'></span>
                        <div className='loader-title'></div>
                        <h3 className='loader-subtitle'>calculator</h3>
                        <div className="loader-arrow"></div>
                    </div>
                }
                {
                    complexity &&
                    <div className='complexity-examples'></div>
                }
                {
                    projectFeaturesBlock &&
                    <ProjectFeaturesInputs options={{
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
                        // furnishingComplexity,
                        platformInput,
                        setPlatformInput,
                        // setFurnishingComplexity,
                        setPlatform,
                        setBuildingsCount,
                        setBuildingComplexity,
                        setUniqueBuildings,
                        setUniqueApartment,
                        setTourAmenities,
                        setTourApartments,
                        setEnvironmentComplexity,
                        loaderBlock,
                        complexity,
                        setComplexity,
                        totalDays,
                        setTotalDays,
                        setLoaderBlock,
                        designerSalaryInhouse,
                        visualizerSalaryInhouse,
                        modelerSalaryInhouse,
                        developerSalaryInhouse,
                        modelerForEnvSalaryOutsource,
                        setIsCalcModalVisible,
                        setClassBlock,
                    }}
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
                        designerSalaryOutsource,
                        visualizerSalaryInhouse,
                        visualizerSalaryOutsource,
                        modelerSalaryInhouse,
                        modelerSalaryOutsource,
                        modelerForEnvSalaryOutsource,
                        setModelerForEnvSalaryOutsource,
                        developerSalaryInhouse,
                        developerSalaryOutsource,
                        isCalcModalVisible,
                        setIsCalcModalVisible,
                        totalDays,
                        setTotalDays,
                        isOutsource,
                        setIsOutSource,
                        isOutsourceFill, 
                        setIsOutsourceFill
                    }}/>
                }
                {
                    salaryBlock &&
                    <SalaryInputs options = {{
                        visualizerSalaryInhouse,
                        visualizerSalaryOutsource,
                        designerSalaryInhouse,
                        designerSalaryOutsource,
                        modelerSalaryInhouse,
                        modelerSalaryOutsource,
                        modelerForEnvSalaryOutsource,
                        setModelerForEnvSalaryOutsource,
                        developerSalaryInhouse,
                        developerSalaryOutsource,
                        setVisualizerSalaryInhouse,
                        setVisualizerSalaryOutsource,
                        setDesignerSalaryInhouse,
                        setDesignerSalaryOutsource,
                        setModelerSalaryInhouse,
                        setModelerSalaryOutsource,
                        setDeveloperSalaryInhouse,
                        setDeveloperSalaryOutsource,
                        isCalcModalVisible,
                        setIsCalcModalVisible,
                        isOutsource,
                        setIsOutSource,
                        isOutsourceFill, 
                        setIsOutsourceFill
                }}/>
                }
            </div>
        </>
    );
}

export default MainTable;