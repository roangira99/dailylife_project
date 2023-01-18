import jwt, { decode } from 'jasonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.auhorization.split(" ")[1]; // checking whether a user's token is valid
        const isCustomAuth = token.length < 500;

        let decodeData;// Data we want to get from the token itself

        if(token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');

            req.userId = decodeData?.id;
        } else {
            decodeData = jwt.decode(token);

            req.userId = decodeData?.sub;
        }

        next(); // next is used for any kind of action that happens before something
        // In this case the user will be allowed to perfrom an action such as liking 
        // a post only after their credentials are verified
    } catch (error) {
        console.log(error);
    }
}

export default auth;