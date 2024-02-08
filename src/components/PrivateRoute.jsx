import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

function PrivateRout() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <Outlet />;
}

export default PrivateRout;
