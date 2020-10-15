import React, {useState} from 'react';

export function useDataFromStorage(key, initial) {
    const keyArray = ['Platform amount', 'Building total', 'Unique buildings', 'Unique apt.', 'Apt. tours',
        'Amenities tours', 'Environment Complexity', "Building Complexity", 'Furnishing Complexity', 'Visualizer Salary Inhouse',
        'Visualizer Salary Outsource', 'Designer Salary Inhouse', 'Designer Salary Outsource', 'Modeler Salary Inhouse', 'Modeler Salary Outsource',
        'Developer Salary Inhouse', 'Developer Salary Outsource'];

    const dataArr = [];

    keyArray.map( (key) => {
        const dataStorage = localStorage.getItem(key);
        return dataArr.push(dataStorage);
    })

    let data = {};
    for (let i = 0; i <= keyArray.length; i++) {
        for (let k = 0; k <= dataArr.length; k++) {
            console.log(dataArr[k]);
            data[keyArray[i]] = dataArr[k];
        }
    }

        console.log(data)
        return [data];
}