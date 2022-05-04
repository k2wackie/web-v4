import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bulletin from "./pages/Bulletin";
import Auth from "./hoc/Auth";

export const BulletinStateContext = React.createContext();
export const BulletinDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET": {
      return action.data;
    }
    case "CREATE": {
      fetch(
        action.data.isEdit ? "/api/bulletin/update" : "/api/bulletin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.data),
        }
      );
      return [];
    }
    case "DELETE": {
      fetch("/api/bulletin/delete/" + action.data, {
        method: "DELETE",
      }).catch((err) => console.log(err));
      return [];
    }
    default:
      return [];
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  //GET DATA
  useEffect(() => {
    fetch("/api/bulletin/read")
      .then((res) => res.json())
      .then((newData) => {
        console.log(newData);
        dispatch({ type: "GET", data: newData.data });
      })
      .catch((err) => console.log(err));
  }, []);

  // CREATE || EDIT
  const onCreateEdit = (author, content, _id, isEdit) => {
    const req = {
      _id: _id,
      author: author,
      content: content,
      isEdit: isEdit,
    };
    dispatch({ type: "CREATE", data: req });
  };

  //DELETE
  const onRemove = (_id) => {
    dispatch({ type: "DELETE", data: _id });
  };

  const AuthHomePage = Auth(Home, null);
  const AuthBulletinPage = Auth(Bulletin, true);
  const AuthNewPage = Auth(New, null);
  const AuthEditPage = Auth(Edit, true);
  const AuthLoginPage = Auth(Login, false);

  return (
    <BulletinStateContext.Provider value={data}>
      <BulletinDispatchContext.Provider value={{ onCreateEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<AuthHomePage />} />
              <Route path="/bulletin" element={<AuthBulletinPage />} />
              <Route path="/new" element={<AuthNewPage />} />
              <Route path="/edit/:id" element={<AuthEditPage />} />
              <Route path="/bulletin/edit/:id" element={<AuthEditPage />} />
              <Route path="/login" element={<AuthLoginPage />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BulletinDispatchContext.Provider>
    </BulletinStateContext.Provider>
  );
}

export default App;
