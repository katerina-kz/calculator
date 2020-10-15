import React, {useState} from 'react';

export function useLocalStorage(key, initial) {
    const [data, setData] = useState(() => {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initial;
            } catch
                (error) {
                return initial;
            }
        })
    ;

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(data) : value;
            setData(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [data, setValue];
}