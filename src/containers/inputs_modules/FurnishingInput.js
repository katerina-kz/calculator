import React from 'react';

function FurnishingInput(props) {
    const {furnishingComplexity, setFurnishingComplexity} = props;

    const onChangeFurnishingComplexity = (e) => setFurnishingComplexity(e.target.value);
    return (
        <div className="settings-table_item">
        <div className="settings-table_item-name">Furnishing complexity</div>
        <div className="settings-table_item-input general-input-block furnishing-complexity-block">
            <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_left'>
                <span className='line line-furnishing'></span>
                <input
                    className='general-input furnishing-complexity-input furnishing-complexity-input_left'
                    type="radio" id="furnishing-complexity-min" name="furnishing-complexity" value="Min"
                    onChange={onChangeFurnishingComplexity}
                    checked={furnishingComplexity === "Min"}/>
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
                    checked={furnishingComplexity === "Mid"}/>
                <label
                    className='general-label furnishing-complexity-label furnishing-complexity-label_center'
                    htmlFor="furnishing-complexity-mid">Mid</label>
            </div>
            <div className='general-input-div furnishing-complexity-div furnishing-complexity-div_right'>
                <input
                    className='general-input furnishing-complexity-input furnishing-complexity-input_right'
                    type="radio" id="furnishing-complexity-max" name="furnishing-complexity" value="Max"
                    onChange={onChangeFurnishingComplexity}
                    checked={furnishingComplexity === "Max"}/>
                <label
                    className='general-label furnishing-complexity-label furnishing-complexity-label_right'
                    htmlFor="furnishing-complexity-max">Max</label>
            </div>
        </div>
    </div>
    );
}

export default FurnishingInput;