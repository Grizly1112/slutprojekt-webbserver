import jwt_decode from "jwt-decode"


export const Auth = async(data) => {
    console.log(data)
    localStorage.setItem('user', JSON.stringify({... data}));
}

export const checkAuthLevel = async (token, authLevel) => {
    if(!token) return false;
    let exdired = false;

    var exp;
    const data = await jwt_decode(token)    
    console.log(data.exp)
    try {
        exp = data.exp * 1000 >= Date.now();
    } catch(err) {
        console.log(err)
    }
    return(data.authLevel >= authLevel && exp);

}