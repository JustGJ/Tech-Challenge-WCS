import React from 'react';

interface IProps {
    alertSuccess: string;
    alertError: string;
}

const AlertResult = ({ alertSuccess, alertError }: IProps) => {
    let style = 'message__alert';
    let content = '';

    if (alertSuccess) {
        style += ' message__alert--success';
        content = alertSuccess;
    } else {
        style += ' message__alert--error';
        content = alertError;
    }

    return <span className={style}>{content}</span>;
};

export default AlertResult;
