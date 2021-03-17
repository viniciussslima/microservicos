import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useLocation } from "react-router-dom";

import User from "../../components/User";

export default function Me() {
  const { user } = useAuth();

  const location = useLocation();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let username = location.pathname.split("/")[2];
    let newIndex = user.people.findIndex(
      (person) => person.username === username
    );
    setIndex(newIndex);
  }, [location, user]);

  return <User user={user.people[index]} id={user.user._id} />;
}
