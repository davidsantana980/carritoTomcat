export default async function VerificaSesion(){
    return await fetch('http://localhost:8080/api/login', {
        method: 'GET',
        credentials:"include",
    })
    .then(async response => {
        let res = await response.json();
        return {
            ok : response.ok,
            ...res
        }
    })
    .then(res =>{
        return res;
    })
    .catch(err => {
        console.log(err);
    })

}