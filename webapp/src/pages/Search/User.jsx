import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../../components/User";
import { useAuth } from "../../contexts/Auth";
import { requestAuthApi } from "../../requestApi";

export default function Me() {
  const { user } = useAuth();

  const location = useLocation();
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let username = location.pathname.split("/")[2];
    const getPerson = async () => {
      try {
        const response = await requestAuthApi.get(
          `/profile?username=${username}`,
          {
            headers: { "x-access-token": user.token },
          }
        );
        setPerson(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getPerson();
  }, [location, user]);

  return <> {!loading ? <User user={person} id={user._id} /> : null} </>;
}
