import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Style.scss";

//Components
import { QueryClient, QueryClientProvider } from "react-query";
import Info from "./Pages/Info";
import Lunch from "./Pages/Lunch";
import TimeTable from "./Pages/TimeTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" Component={TimeTable} />
        <Route path="/lunch" Component={Lunch} />
        <Route path="/info" Component={Info} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
