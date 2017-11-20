import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button,Well} from 'react-bootstrap';
import './index.css';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    render() {
        return (
            <Well>
            <div>
                <h3>TODO</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" ref={(input) => this.input = input} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
                <TodoList items={this.state.items} />
            </div>
            </Well>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let newItem = {
            text: this.input.value,
            id: Date.now()
        };
        this.setState((prevState) => ({
            items: [...prevState.items, newItem]
        }));
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

class Test extends React.Component{
    render() {
    return(
        <div>



            <Button>Test</Button>
            <Button bsStyle="primary">Test</Button>
            <Button bsStyle="link">Test</Button>
            <Button bsSize="large">Test</Button>
            <Button active>Test</Button>
            <Button >Test</Button>


        </div>
    );
}
}

