import Navbar from "components/Navbar";
import TabItem from "components/TabItem";
import { FiBarChart, FiLink, FiSettings } from "react-icons/fi";
import useMetaMask from "hooks/metamask";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const { account: address, token } = useMetaMask();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <div className="container">
      <Navbar address={address} />
      <div className="flex gap-4 mt-2 border-b-2 py-2">
        <TabItem name="Readers" icon={<FiBarChart />} link="/dashboard" />
        <TabItem name="Links" icon={<FiLink />} link="/dashboard/links" />
        <TabItem
          name="Upgrade"
          icon={<FiSettings />}
          link="/dashboard/upgrade"
        />
      </div>
      <div className="py-4 bg-gray-100">
        {React.cloneElement(children, { address, token })}
      </div>
    </div>
  );
}
