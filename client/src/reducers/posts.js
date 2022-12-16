// a reducers is a function that accepts the state and the action then based on the action type, 
// you can execute some logic
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return posts;
        default:
            return posts;
    }
}