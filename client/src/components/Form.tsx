import React from 'react';

interface IProps {
    handleSubmit: any;
    name: any | String;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ handleSubmit, name, setName }: IProps) => {
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                {/* <br /> */}
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="name">Nom de l'Argonaute</label>

                <button type="submit">Ajouter</button>
            </form>
        </>
    );
};

export default Form;
