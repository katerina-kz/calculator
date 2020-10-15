import React, {useState} from 'react';

export function useGlobalObject(key, initial) {

    // const [data, setData] = useState(key, initial);

    const global = {};

    const [data, setData] = useState(() => {
                return global.key = initial;
        })
    ;

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(data) : value;
            setData(valueToStore);
            // window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(global);

    return [data, setValue];
}