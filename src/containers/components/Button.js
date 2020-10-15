import React, {useState} from 'react';

function Button(props) {
    const {options, open, setOpen, onClick} = props;

    // const [open, setOpen] = useState({
    //     'buildingsCount': false,
    //     'uniqueBuildings': false,
    //     'uniqueApartment': false,
    //     'tourApartments': false,
    //     'tourAmenities': false,
    //     'platform': false,
    // })

    // const onClick = () => {
    //     // debugger
    //     // debugger
    //     if (options.platformInput === 0) setOpen({...open, platform: true});
    //     if (!options.buildingsCount) setOpen({...open, buildingsCount: true});
    //     if (!options.buildingsCount) {
    //         setOpen({...open, buildingsCount: true});
    //     }
    //     if (!options.uniqueApartment) setOpen({...open, uniqueApartment: true});
    // }

    return (
        <button className='calculate-button reset-button_styles' onClick={onClick}>
            <span>Calculate</span>
        </button>
    );
}

export default Button;