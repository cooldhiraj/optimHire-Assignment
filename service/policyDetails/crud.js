module.exports.insert = async (body, Model) => {
    console.log(Model)
    return Model.create(body);
}