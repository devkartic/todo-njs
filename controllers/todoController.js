let data = [{item: 'Get Milk'}, {item: 'Walk dog',},{ item: 'Kick some coding ass'}];
var bodyParser = require('body-parser');
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