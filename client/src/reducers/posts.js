// a reducers is a function that accepts the state and the action then based on the action type, 
// you can execute some logic
export default (posts = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload);
        case 'UPDATE': //both the update and like cases are goint to do the same thing
        case 'LIKE':
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // if-else statement
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}