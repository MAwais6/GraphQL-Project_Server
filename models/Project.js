module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const ProjectSchema = new Schema({
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
        },
    });

    const Project = mongoose.model('Project', ProjectSchema);
    return Project;
}
