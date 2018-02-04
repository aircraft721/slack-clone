export default `
    type User {
        id: Int!
        email: String!
        username: String!
        teams: [Team!]!
    }
`;