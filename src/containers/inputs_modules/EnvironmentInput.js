import React from 'react';

function EnvironmentInput(props) {
    const { environmentComplexity, setEnvironmentComplexity, setLoaderBlock, setComplexity, setClassBlock} = props;
    const onChangeEnvironmentComplexity = (e) =>  setEnvironmentComplexity(e.target.value);

    const handleClick = (className) => {
        if (document.querySelector('.calculator-table').classList.contains('none')) {
            setLoaderBlock(false);
            setComplexity(true);
            setClassBlock(className);
        }
    };

    return (
        <div className="settings-table_item">
            <div className="settings-table_item-name">Environment complexity</div>
            <div className="settings-table_item-input general-input-block environment-complexity-block">
                <div className='general-input-div environment-complexity-div environment-complexity-div_left'>
                    <span className='line line-environment'></span>
                    <input
                        className='general-input environment-complexity-input environment-complexity-input_left'
                        type="radio" id="environment-complexity-min" name="environment-complexity" value="Rural landscape"
                        onChange={onChangeEnvironmentComplexity}
                        checked={environmentComplexity === "Rural landscape"}/>
                    <label
                        className='general-label environment-complexity-label environment-complexity-label_left'
                        htmlFor="environment-complexity-min" onClick={() => handleClick('easy-env')}>Rural landscape</label>
                </div>
                <div className='general-input-div environment-complexity-div environment-complexity-div_center'>
                    <span className='line line-center line-environment'></span>
                    <input
                        className='general-input environment-complexity-input environment-complexity-input_center'
                        type="radio" id="environment-complexity-mid" name="environment-complexity" value="Low town"
                        onChange={onChangeEnvironmentComplexity}
                        checked={environmentComplexity === "Low town"}/>
                    <label
                        className='general-label environment-complexity-label environment-complexity-label_center'
                        htmlFor="environment-complexity-mid" onClick={() => handleClick('normal-env')}>Low town</label>
                </div>
                <div className='general-input-div environment-complexity-div environment-complexity-div_right'>
                    <input
                        className='general-input environment-complexity-input environment-complexity-input_right'
                        type="radio" id="environment-complexity-max" name="environment-complexity" value="Dense city"
                        onChange={onChangeEnvironmentComplexity}
                        checked={environmentComplexity === "Dense city"}/>
                    <label
                        className='general-label environment-complexity-label environment-complexity-label_right'
                        htmlFor="environment-complexity-max" onClick={() => handleClick('hardcore-env')}>Dense city</label>
                </div>
            </div>
        </div>
    );
}

export default EnvironmentInput;