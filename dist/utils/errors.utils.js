"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputErrors = void 0;
const inputErrors = (err) => {
    let errorName = '';
    // We check if member is already selected
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('name'))
        errorName = 'Cet/Cette Argonaute fait déjà parti du voyage !';
    // We check if member !empty
    if (errorName === '') {
        errorName = 'Veuillez saisir un nom valide !';
    }
    return errorName;
};
exports.inputErrors = inputErrors;
