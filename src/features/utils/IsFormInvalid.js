export const IsFormInvalid = (error) => {
    if (Object.keys(error).length > 0) return true;
    return false;
};
