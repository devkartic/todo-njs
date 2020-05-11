let data = [{item: 'Get Milk'}, {item: 'Walk dog',},{ item: 'Kick some coding ass'}];
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connection to database mongodb
mongoose.connect('mongodb+srv://root:root@clustertodo-ohuuo.mongodb.net/test?retryWrites=true&w=majority');

// Create a schema- This like a blue print
let todoSchema = new mongoose.Schema({
    item : String
});

// Create Model
let Todo = mongoose.model('Todo', todoSchema)

// Save data with exception and success message
let itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

// Use body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        res.render('todoList', {todos: data});
    });

    app.post('/todo', urlencodedParser,function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function name(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
}