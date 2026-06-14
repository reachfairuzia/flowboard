import {Routes, Route, NavLink, useLocation} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const navClass = ({isActive}: {isActive: boolean}) =>
    `block border-l-4 rounded-lg px-3 py-2 transition ${
      isActive 
      ? "border-slate-900 bg-slate-200 text-slate-900 font-semibold"
      : "border-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      {!isLandingPage &&(
         <aside className="bg-[#f7f8f3] p-4 lg:p-6 shadow-md lg:min-h-screen lg:w-64 lg:shrink-0">
          <NavLink to="/" className="block border-b border-slate-200 px-3 pb-4 text-2xl font-bold text-slate-900">
            FlowBoard
          </NavLink>

          <p className="mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
        </p>

          <nav className="mt-2 flex flex-wrap gap-3 text-sm lg:flex-col">
            <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
            <NavLink to="/projects" className={navClass}>Projects</NavLink>
            <NavLink to="/users" className={navClass}>Users</NavLink>
            <NavLink to="/profile" className={navClass}>Profile</NavLink>
          </nav>
        </aside>
      )}
      

      <main 
        className={`${isLandingPage ? "w-full" : "w-full min-w-0 flex-1 bg-[#f7f8f3] p-4 lg:p-6"}`}>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;