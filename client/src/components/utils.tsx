// import axios from 'axios';

export const isEmpty = (value: any) => {
    // Return true si c'est vide
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

// export const requete = async (type: any, id?: string, data?: string ) => {
//     await axios({
//         method: type,
//         url: `${process.env.REACT_APP_API_URL}/api/member/${id}`,
//         withCredentials: true,
//     })
//         .then((res) => setMembers(res.data))
//         .catch((err) => console.log(err));
// };
