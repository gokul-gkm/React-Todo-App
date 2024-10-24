import React, {useState} from 'react'

const EditTodoForm = ({editTodo,task}) => {
    const [value, setValue] = useState(task.task);
    const [error, setError] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() === "") {
            setError("Task cannot be empty");
            return;
        }
        editTodo(value, task.id);
        setValue("")
    }
  return (
    <div>
      <form className='TodoForm' onSubmit={handleSubmit}>
              <input type="text"
                  className='todo-input'
                  value={value}
                  required
                  placeholder='Update Task ' onChange={(e) => {
                      setValue(e.target.value)
                      setError("")
                   }} />
              <button
                  type='submit'
                  className='btn btn-background-slide'>
                  Update
              </button>
              {error && <p className='error-message'>{error}</p> }
          </form>
         
    </div>
  )
}

export default EditTodoForm
