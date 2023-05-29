export function FindInputError(error, name) {
    const inputError = {};

    const objError = Object.keys(error);

    const errorFilter = objError.filter((key) => key.includes(name));

    inputError = errorFilter.reduce((current, key) => {
        return Object.assign(current, { error: error[key] });
    }, {});

    return inputError;
}
