import Navbar from "components/Navbar";
import useMetaMask from "hooks/metamask";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const { connect, isActive, account: address, token } = useMetaMask();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);

  return (
    <div className="container">
      <Navbar address={isActive ? address : ""} />
      <div className="flex justify-center py-4">
        {React.cloneElement(children, { address, connect })}
      </div>
    </div>
  );
}
