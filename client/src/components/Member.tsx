import React from 'react';

interface IProps {
    name: string;
    deleteMember: (event: React.MouseEvent<HTMLElement>) => void;
}

const Member = ({ name, deleteMember }: IProps) => {
    return <li onClick={deleteMember}>{name} &#10006;</li>;
};

export default Member;
