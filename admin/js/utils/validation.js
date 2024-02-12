export const required = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}


