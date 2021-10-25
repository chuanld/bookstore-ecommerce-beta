import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ActivationEmail() {
  const { activationtoken } = useParams();
  useEffect(() => {
    if (activationtoken) {
      const activationEmail = async () => {
        try {
          await axios.post("/user/activation", { activationtoken });

          localStorage.setItem("firstLogin", true);
          window.location.href = "/";
        } catch (err) {
          return err.response.data.msg;
        }
      };
      activationEmail();
    }
  }, [activationtoken]);

  return <div className="active_page"></div>;
}
