import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button,ListGroup,ListGroupItem,Checkbox,FormControl} from 'react-bootstrap';
import './index.css';
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            isAllChecked: false
        }
    }
    addTodo(item) {
        this.state.todos.push(item)
        this.setState({todos: this.state.todos});
    }
    changeTodoState(index, isDone, isChangeAll=false){
        if(isChangeAll){
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            });
        }else{
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
    }
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked,
        });
    }
    clearDone(){
        let todos = this.state.todos.filter(todo => !todo.isDone)
        this.setState({
            todos : todos
        })
    }
    deleteTodo(index) {
        this.state.todos.splice(index,1)
        this.setState({todos: this.state.todos})
    }
    render(){
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        }
        return (
            <div className="todo-wrapper">
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
                <TodoFooter {...info} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)}/>
            </div>
        )
    }
}

class TodoHeader extends React.Component {
    handlerKeyUp(e) {
        if(e.keyCode === 13) {
            let value = e.target.value;
            if(!value) return false;
            let date = new Date().Format("yyyy-MM-dd hh:mm")
            let newTodoItem = {
                text: value,
                isDone: false,
                time: date
            };
            e.target.value = '';
            this.props.addTodo(newTodoItem)
        }
    }
    componentWillMount() {
        //日期格式化
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
    render(){
        return (
            <div className="todo-header">
                <h1 className="todo-title">React-Todos</h1>
                <FormControl
                    bsSize={"lg"}
                    type="text"
                    autoFocus ref="input"
                    onKeyUp={this.handlerKeyUp.bind(this)}
                    placeholder="Enter something"
                />
            </div>
        )
    }
}

class TodoMain extends React.Component {
    render(){
        if(this.props.todos.length === 0) {
            return (
                <div className="todo-empty">Nothing to do now</div>
            )
        } else {
            return (
                <ListGroup className="todo-main">
                    {
                        this.props.todos.map((todo,index) => {
                            //{...this.props} 用来传递TodoMain的todos属性和delete、change方法。
                            return <TodoItem text={todo.text} isDone={todo.isDone} time={todo.time} index={index} {...this.props} key={index}/>
                        })
                    }
                </ListGroup>
            )
        }
    }
}

class TodoItem extends React.Component {
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }
    handlerDelete() {
        this.props.deleteTodo(this.props.index)
    }
    handlerMouseIn () {
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block'
    }
    handlerMouseOut () {
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none'
    }
    render() {
        //let className = this.props.isDone?'task-done':''
        return (
            <ListGroupItem bsStyle="info" onMouseOver={this.handlerMouseIn.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                <span className="time">{this.props.time}</span>
                <Checkbox checked={this.props.isDone} onChange={this.handlerChange.bind(this)}>
                    {this.props.text}
                    <Button ref="delButton" bsStyle="danger" bsSize="sm" onClick={this.handlerDelete.bind(this)}>Delete</Button>
                </Checkbox>

            </ListGroupItem>
        )
    }
}

class TodoFooter extends React.Component{
    deleteAll(){
        this.props.clearDone()
    }
    changeAll(e){
        this.props.changeTodoState(null,e.target.checked,true)
    }
    render(){
        let minus = this.props.todoCount - this.props.todoDoneCount
        return (
            <div className="todo-footer">
                <Checkbox checked={this.props.isAllChecked} onChange={this.changeAll.bind(this)}>Select All</Checkbox>
                <span className="item-left">Remain {minus} uncompleted</span>
                <Button bsStyle="danger" bsSize="sm" onClick={this.deleteAll.bind(this)}>Clear the Selected</Button>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))