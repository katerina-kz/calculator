import React, {useEffect} from 'react';

function FacadeInputs(props) {
    const {buildingComplexity, setBuildingComplexity, setLoaderBlock, setComplexity, complexity, setClassBlock} = props;

    const onChangeBuildingComplexity = (e) => setBuildingComplexity(e.target.value);

    const handleClick = (className) => {
        setLoaderBlock(false);
        setComplexity(true);
        setClassBlock(className);
    }

    return (
        <div className="settings-table_item">
            <div className="settings-table_item-name">Facade complexity</div>
            <div className="settings-table_item-input general-input-block facade-complexity-block">
                <div className='general-input-div facade-complexity-div facade-complexity-div_left'>
                    <span className='line'></span>
                    <input className='general-input facade-complexity-input facade-complexity-input_left' type="radio"
                           id="facade-complexity-easy" name="facade-complexity" value="Simple geometrical shape"
                           onChange={onChangeBuildingComplexity}
                           checked={buildingComplexity === "Simple geometrical shape"}
                            onClick={() => handleClick}/>
                    <label className='general-label facade-complexity-label facade-complexity-label_left'
                           htmlFor="facade-complexity-easy" onClick={() => handleClick('simple')}>Simple geometrical shape</label>
                </div>
                <div className='general-input-div facade-complexity-div facade-complexity-div_center'>
                    <span className='line line-center'></span>
                    <input className='general-input facade-complexity-input facade-complexity-input_center' type="radio"
                           id="facade-complexity-mid" name="facade-complexity" value="Moderately complex exterior"
                           onChange={onChangeBuildingComplexity}
                           checked={buildingComplexity === "Moderately complex exterior"}
                            />
                    <label className='general-label facade-complexity-label facade-complexity-label_center'
                           htmlFor="facade-complexity-mid" onClick={() => handleClick('middle')}>Moderately complex exterior</label>
                </div>
                <div className='general-input-div facade-complexity-div facade-complexity-div_right'>
                    <input className='general-input facade-complexity-input facade-complexity-input_right' type="radio"
                           id="facade-complexity-max" name="facade-complexity" value="Baroque edifice"
                           onChange={onChangeBuildingComplexity}
                           checked={buildingComplexity === "Baroque edifice"}
                           onClick={() => handleClick}/>
                    <label className='general-label facade-complexity-label facade-complexity-label_right'
                           htmlFor="facade-complexity-max" onClick={() => handleClick('max')}>Baroque edifice</label>
                </div>
            </div>
        </div>
    );
}

export default FacadeInputs;