import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import TableIndex from "./components/Table.Index";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TableIndex />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Admin />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
