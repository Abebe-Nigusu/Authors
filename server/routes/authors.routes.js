const AuthorController = require("../controllers/authors.controller")

module.exports = (app)=>{
    app.get("/api/testing", AuthorController.apiTest)
    app.get("/api/authors", AuthorController.allAuthors)
    app.get("/api/authors/:id", AuthorController.oneAuthor)
    app.post("/api/authors/new", AuthorController.createAuthor)
    app.put("/api/authors/update/:id", AuthorController.updateAuthor)
    app.delete("/api/authors/delete/:id", AuthorController.deleteAuthor)
}
