// let data = [{item: 'Get Milk'}, {item: 'Walk dog',},{ item: 'Kick some coding ass'}];
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connection to database mongodb
mongoose.connect('mongodb+srv://root:root@clustertodo-ohuuo.mongodb.net/test?retryWrites=true&w=majority');

// Create a schema- This like a blue print
let todoSchema = new mongoose.Schema({
    item : String
});

// Create Model
let Todo = mongoose.model('Todo', todoSchema);

// Use body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // Get data from mongodb and pass to views
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todoList', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser,function(req, res){
        // Get data from view and save data into mongodb
        let newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, ' ') }).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
}