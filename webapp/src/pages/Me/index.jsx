import React from "react";
import { useAuth } from "../../contexts/Auth";
import User from "../../components/User";

export default function Me() {
  const { user } = useAuth();

  return <User user={user} />;
}
