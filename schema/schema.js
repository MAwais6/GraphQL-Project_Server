const {projects, clients} = require('../Data/sampleData');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});


// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLInt },
        clientId: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId);
            }
        }
    })
});


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get client by id
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        },
        // get all clients
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients;
            }
        },
        // get project by id
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        // get all projects
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});