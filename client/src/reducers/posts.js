// a reducers is a function that accepts the state and the action then based on the action type, 
// you can execute some logic
export default (posts = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); // if-else statement
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}