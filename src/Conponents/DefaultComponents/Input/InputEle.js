import React, { useState } from 'react';
import { FindInputError } from '../../../features/utils';
import { current } from '@reduxjs/toolkit';

function InputEle({
    lable,
    type,
    id,
    className,
    errors,
    placeholder,
    validation,
    name,
    onChange,
    onBlur,
    ...passprops
}) {
    const [errorMessage, setErrorMessage] = useState(false);

    // const inputError = FindInputError(errors, name);

    const fintError = (errors) => {
        const inputError = Object.keys(errors).filter((key) => key.includes(name));
        // .reduce((current, key) => {
        //     Object.assign(current, { error: errors[key] });
        // }, {});

        return inputError;
    };

    console.log(fintError(errors));

    const _props = {
        onBlur,
        onChange,
        ...passprops,
    };

    return (
        <div className="Wrapper">
            <input id={id} type={type} name={name} placeholder={placeholder} {..._props} />
            {/* {errorMessage && <InputError message={Error} />} */}
        </div>
    );
}

const InputError = ({ message }) => {
    return <span>{message}</span>;
};

export default InputEle;
