import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"; // may cause issues, let intellisense change if doesnt work
import { useMemo } from "react";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Payments from "scenes/payments";
import Transactions from "scenes/transactions";
import Invoices from "scenes/invoices";
import Members from "scenes/members";
import Events from "scenes/events";
import Communication from "scenes/communication";
import Reports from "scenes/reports";
import Collections from "scenes/collections";
import Login from "scenes/login";
import PersistLogin from "state/auth/PersistLogin";
import Prefetch from "state/auth/Prefetch";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PersistLogin />}>
              <Route element={<Prefetch />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/communication" element={<Communication />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/collections" element={<Collections />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
