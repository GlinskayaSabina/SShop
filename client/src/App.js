import React, { useContext, createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
export const MyContext = createContext(null);

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState(null);
  const [wsMessages, setWsMessages] = useState([]);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const log = (message) => {
    setWsMessages((prev) => [...prev, message]);
  };
  useEffect(() => {
    console.log("hello");
    if (!ws) {
      const socket = new WebSocket("ws://localhost:4000");

      socket.onopen = () => {
        console.info("connected to ws://localhost:4000");
      };

      socket.onmessage = (event) => {
        log(event.data);
      };
      setWs(socket);
    }
  }, [ws]);
  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={{ wsMessages }}>
        <NavBar />
        <AppRouter />
      </MyContext.Provider>
    </BrowserRouter>
  );
});

export default App;
