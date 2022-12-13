import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const ls = localStorage;
  const saveData = (newTodos) => {
    ls.setItem("todos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (ls.getItem("todos")) {
      setTodos(JSON.parse(ls.getItem("todos")));
    }
  }, []);

  const addTodo = () => {
    if (todo.trim()) {
      let updatedTodoList = [...todos, { todo: todo.trim(), id: Date.now() }];
      setTodos(updatedTodoList);
      setTodo("");
      saveData(updatedTodoList);
    }
  };

  const deleteTodo = (id) => {
    let updatedTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodoList);
    saveData(updatedTodoList);
  };

  return (
    <div>
      <h2 style={{color: "blue", padding: "2%"}}>ToDoList</h2>

      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="new todo"
                aria-label="new todo"
                aria-describedby="basic-addon2"
                className="mx-auto"
                style={{ width: "60vw" }}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button variant="primary" id="button-addon2" onClick={addTodo}>
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item className="mx-auto" variant="info"
          style={{ width: "40vw" }}>
            {todo.todo}
            <Button
              variant="danger"
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "1vw" }}
              
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
