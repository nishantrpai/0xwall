import { ethers } from "ethers";
import Head from "next/head";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "util/index";
import DashboardLayout from "layouts/dashboard";

export default function Upgrade({ address, token }) {
  const config = useMemo(
    () => ({
      headers: {
        Authorization: token,
      },
    }),
    [token]
  );

  const { data: service = {}, error } = useSWR(
    [`/api/service`, config],
    fetcher
  );
  let {
    linksUsed,
    accountInfo = { writer_account: address, service_tier: 10 },
    rate = { price: 0 },
  } = service;

  const [linksToBuy, setLinksToBuy] = useState(0);

  const upgradeTier = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: rate.maintainer_account,
        value: ethers.utils.parseEther(`${linksToBuy * rate?.price}`),
      });
      const receipt = await tx.wait();
      if (receipt) {
        let response = await fetch(`/api/service`, {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: JSON.stringify({
            linksToBuy,
            hash: receipt.blockHash,
          }),
        });
        let { success } = await response.json();
        if (success) {
          console.log("Upgraded");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="flex flex-col px-2 py-4">
          <h1 className="text-4xl text-gray-700 font-bold">Upgrade</h1>
          <p className="text-gray-400 mt-2">
            If you run out of links you can buy more links
          </p>
        </div>
        <div className="flex flex-col px-2 py-1 pb-4 relative bg-white rounded-md shadow-sm">
          <div className="flex flex-row-reverse mt-8">
            <span className="text-sm font-normal text-right flex-1 text-gray-400">
              ALLOWED&nbsp;
            </span>
          </div>
          <div className="w-full flex relative font-bold rounded-md">
            <span className="p-2 px-4 bg-red-100 text-end rounded-md mt-4 w-full">
              {accountInfo?.service_tier}{" "}
            </span>
            <span
              className="float-left absolute p-2 px-4 bg-blue-200 text-end rounded-md mt-4 shadow-sm shadow-indigo-100"
              style={{
                width: `${(linksUsed / accountInfo?.service_tier) * 100}%`,
              }}
            >
              {linksUsed}
            </span>
          </div>

          <label className="text-sm font-bold mt-4">Links to buy</label>
          <input
            type="number"
            className="p-1 px-2 bg-gray-100 w-full border rounded-md text-sm focus:bg-white mt-4"
            placeholder="Enter the number of links you wish to buy"
            name="linksToBuy"
            defaultValue={linksToBuy}
            onChange={(e) => setLinksToBuy(e.target.value)}
          ></input>
          {/* <label>{linkPrice?.OneLinkPrice}</label> */}

          <span className="text-sm font-bold mt-4 text-gray-500">
            PRICE: {linksToBuy * parseFloat(rate?.price)}Ξ
          </span>
          <button
            className={`${linksToBuy ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-300' } max-w-max m-auto p-2 px-4 rounded-md font-bold mt-4`}
            onClick={upgradeTier}
          >
            Upgrade
          </button>
        </div>
      </main>
    </div>
  );
}

Upgrade.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
