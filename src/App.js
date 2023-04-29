import React,{useState,useEffect} from "react";
import './App.css';
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage,setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfTotalPages = Math.ceil(todos.length/todosPerPage);

  const pages = [...Array(numberOfTotalPages+1).keys()].slice(1);

  console.log(pages);
  
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const visiblePages = todos.slice(indexOfFirstTodo,indexOfLastTodo);

  const prevHandler = () =>{
    if(currentPage!==1)
    {
      setCurrentPage(currentPage-1);
    }    
  };
  const nextHandler = () => {
    if(currentPage!==numberOfTotalPages)
    {
      setCurrentPage(currentPage+1);
    }
  };

  const selectPageHandler = (e) => {
    console.log("selectPageHandler = "+e.target.value);
    setTodosPerPage(e.target.value);
  }

  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((result)=>{
      setTodos(result.data);
    })
  },[]);

  return (
    <div>
      <select onChange={selectPageHandler}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      <h5>
        <span onClick={prevHandler}>Prev | </span>
        {pages.map((page)=>{
        return <span key={page} onClick={()=>{setCurrentPage(page);}} className={`${(currentPage===page) ?"active":""}`} >{`${page} | `}</span>
      })} 
       <span onClick={nextHandler}>Next</span>
      </h5> 
      {
      visiblePages.map((todo)=>{
          return <p key ={todo.id}>{todo.title}</p>
      })
      }
     </div>  
  );
}

export default App;