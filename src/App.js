import { useReducer } from "react";
 
// Styles
import "./App.scss";

const reducer = (state, action) => {
  //write your logic here
  switch(action.type){
    case 'move-student':
      const {student, fromClassroom} = action.payload;
      const otherClassroom = fromClassroom === 'a'? 'b':'a';
      const updateFromClassroom = state[fromClassroom].filter((s) => s !== student);
      const updateOtherClassroom = [...state[otherClassroom], student];

      return{
        ...state,
        [fromClassroom]: updateFromClassroom,
        [otherClassroom]: updateOtherClassroom
      };
      default: return state;
  }
};

const initialState = {
  a: [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Luke" },
    { id: 4, name: "Maria" },
  ],
  b: [],
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Create a handler and attach it to the buttons to trigger the reducer
const handleMoveStudent = (student, fromClassroom) =>{
  dispatch({
    type: "move-student",
    payload: {
      student,
      fromClassroom,
    }
  })
}
  return (
    <div className="wrapper">
      <div data-testid="classrom-A">

        <h2>Classroom A</h2>

        {state.a.map((student) => (

          <div data-testid={student.name} key={student.id} className="student">
            <span>{student.name}</span>
            <button onClick={()=> handleMoveStudent(student,'a')  }>Move to B</button>
          </div>
        ))}
      </div>

      <div data-testid="classrom-B">

        <h2>Classroom B</h2>

        {state.b.map((student) => (
          <div data-testid={student.name} key={student.id} className="student">
            <span>{student.name}</span>
            <button>Move to A</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
