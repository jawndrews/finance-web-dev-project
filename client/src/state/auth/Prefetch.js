import { store } from "../../index.js";
import { api } from "../api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const users = store.dispatch(api.endpoints.getUsers.initiate());
    const payments = store.dispatch(api.endpoints.getPayments.initiate());
    const invoices = store.dispatch(api.endpoints.getInvoices.initiate());

    return () => {
      console.log("unsubscribing");
      users.unsubscribe();
      payments.unsubscribe();
      invoices.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
