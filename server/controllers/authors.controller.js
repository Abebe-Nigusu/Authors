const Author = require("../models/authors.model")
//option2:
//const {Author} = require("../models/author.model")

module.exports.apiTest = (req, res) => {
     res.json({message: "server is working!"})
}

module.exports.allAuthors = (req, res) => {
    Author.find()
        .then(authorList=> res.json(authorList))
        .catch(err=>res.status(400).json(err))
}

module.exports.oneAuthor = (req, res) => {
    const paramsId = req.params.id
    Author.findOne({ _id: paramsId })
        .then(oneAuthor => res.json(oneAuthor))
        .catch(err=>res.status(400).json(err))
}

module.exports.createAuthor = (req, res) => {
    const newAuthor = req.body
    Author.create(newAuthor)
    .then(addedAuthor=> res.json(addedAuthor))
    .catch(err=>res.status(400).json(err))
}

module.exports.updateAuthor = (req, res) => {
    Author.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true, runValidators: true} 
    )
    .then(updatedAuthor=> res.json(updatedAuthor))
    .catch(err=>res.status(400).json(err))
}


module.exports.deleteAuthor = (req, res) => {
    
    Author.deleteOne({ _id: req.params.id })
    .then(message=> res.json(message))
    .catch(err=>res.status(400).json(err))
    
}