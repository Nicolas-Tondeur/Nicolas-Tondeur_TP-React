import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
