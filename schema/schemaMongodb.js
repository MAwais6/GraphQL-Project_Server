const { Projects , Clients } = require('../models/index.model');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');

// Client Type 
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Clients.findById(parent.clientId);
            }
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get client by id
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Clients.findById(args.id);
            }
        },
        // get all clients
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Clients.find({});
            }
        },
        // get project by id
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Projects.findById(args.id);
            }
        },
        // get all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Projects.find({});
            }
        }
    }
});


// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve(parent, args) {
                let client = new Clients({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },

    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
