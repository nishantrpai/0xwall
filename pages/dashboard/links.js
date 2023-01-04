import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher, parseDomain, parseLink } from "util/index";
import Image from "next/image";
import DashboardLayout from "layouts/dashboard";
import {
  FiChevronDown,
  FiEdit,
  FiExternalLink,
  FiPlus,
  FiTrash,
  FiX,
} from "react-icons/fi";
import Modal from "components/Modal";
import {
  domainPattern,
  linkPattern,
  urlPattern,
  validateFormData,
  validateValue,
} from "util/validate";
import { useRouter } from "next/router";

export default function Dashboard({ address, token }) {
  const router = useRouter();
  const [customtx, setCustomTx] = useState(false);
  const [loading, setLoading] = useState(false);

  const writerAccount = address?.toLowerCase();

  const config = useMemo(
    () => ({
      headers: {
        Authorization: token,
      },
    }),
    [token]
  );

  const { data: tiers = [], mutate } = useSWR([`/api/tier`, config], fetcher);

  const { data: service = {}, mutate: servicemutate } = useSWR(
    [`/api/service`, config],
    fetcher
  );
  let { linksUsed, accountInfo } = service;

  const [formState, setFormState] = useState("");

  const initTierData = (address) => {
    return {
      writer_account: address?.toLowerCase(),
      name: "",
      domain: "",
      type: "tx",
      price: "",
      contract_addr: "",
      token_balance: 1,
      tx_period: "",
      link: "",
      links: [],
    };
  };

  const [tierData, setTierData] = useState({
    id: "",
    writer_account: "",
    name: "",
    domain: "",
    type: "",
    price: "",
    contract_addr: "",
    link: "",
    token_balance: 1,
    tx_period: "",
    mint_link: "",
    links: [],
  });

  const [formStateErrors, setFormStateErrors] = useState(false);

  const handleTierUpdate = (e) => {
    let { name, value } = e.target;
    let isValidValue = validateValue(name, value);
    if (!isValidValue) {
      if (!e.target.className.includes("outline-rose-500")) {
        e.target.className += " outline-rose-500";
      }
      setFormStateErrors(true);
    } else {
      e.target.className = e.target.className.replace(" outline-rose-500", "");
      setFormStateErrors(false);
    }

    if (name == "links") {
      value = value.split("\n");
    }

    if (name == "domain") {
      value = parseDomain(value);
    }

    if (name == "mint_link") {
      value = parseLink(value);
    }

    setTierData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteTierData = async (tier_id) => {
    let response = await fetch(`/api/tier?tier=${tier_id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    let { success } = await response.json();
    setLoading(false);
    if (success) {
      setFormState("");
      mutate();
      servicemutate();
      delete tiers[tier_id];
    }
  };

  const updateTiersAndLinks = async (tierData) => {
    if (formState == "edit") {
      let tiersData = JSON.parse(JSON.stringify(tiers));
      Object.keys(tiersData).map((tier) => {
        if (tierData.id == tier) tiersData[tier] = tierData;
      });
      let response = await fetch("/api/tier", {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ tier: { ...tierData }, tiers: tiersData }),
      });
      await response.json();
      setLoading(false);
      setFormState("");
      mutate();
      servicemutate();
    }

    if (formState == "add") {
      let response = await fetch("/api/tier", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ tier: { ...tierData }, tiers }),
      });
      await response.json();
      setLoading(false);
      setFormState("");
      mutate();
      servicemutate();
    }
  };

  const addLink = async () => {
    let { links, link } = { ...tierData };
    if (linkPattern.test(link) || urlPattern.test(link)) {
      links.push(parseLink(link));
      setTierData((prevState) => ({
        ...prevState,
        links,
        domain: parseDomain(link),
        link: "",
      }));
    }
  };

  return (
    <div className="container">
      <main>
        {/* Switch account option */}
        <div className="flex flex-col px-2 py-4">
          <h1 className="text-4xl text-gray-700 font-bold">Links</h1>
          <p className="text-gray-400 mt-2">
            List of links you want to paywall.
          </p>
        </div>
        <button
          className="flex items-center gap-1 float-right text-sm px-2 py-1 text-gray-800 rounded-md bg-white shadow-sm shadow-gray-200 hover:shadow-none"
          onClick={() => {
            setFormState("add");
            setTierData(initTierData(address));
          }}
        >
          <FiPlus />
          Add Tier
        </button>
        <div className="grid mt-14">
          {accountInfo?.service_tier - linksUsed <= 3 && (
            <span className="text-sm bg-yellow-100 text-yellow-800 p-2">
              Used {linksUsed}/{accountInfo?.service_tier} links. To add more
              links you can{" "}
              <a
                className="underline"
                onClick={() => {
                  router.push("/dashboard/upgrade");
                }}
              >
                upgrade
              </a>
              .
            </span>
          )}
          {Object.keys(tiers).map((tier, index) => (
            <div className="rounded-md p-2 px-2 bg-white mt-4" key={tier}>
              <div className="float-right flex gap-4 py-2 items-center">
                <button
                  className="tier-edit"
                  onClick={() => {
                    setTierData(JSON.parse(JSON.stringify(tiers[tier])));
                    setFormState("edit");
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="tier-delete"
                  onClick={() => {
                    // deleteTierData(tier);
                    setTierData(JSON.parse(JSON.stringify(tiers[tier])));
                    setFormState("delete");
                  }}
                >
                  <FiTrash />
                </button>
              </div>
              <div className="flex items-center gap-2 tier-name text-xl">
                <h3>{tiers[tier].name}</h3>
              </div>
              <span className="tier-domain text-xs h-max text-gray-400 rounded-lg">
                {tiers[tier].domain}
              </span>

              <div className="tier-links mt-2 flex flex-col gap-2">
                {tiers[tier]?.links?.map((tierLink, index) => (
                  <a
                    className="flex gap-2 items-center tier-link text-sm text-gray-500 hover:text-gray-800"
                    key={index}
                    href={`https://${tierLink}`}
                    target="_blank"
                  >
                    <FiExternalLink />
                    {tierLink}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(tiers).length == 0 && (
            <div className="flex flex-col px-16">
              <Image
                src="/undraw_Image_upload_re_w7pm.png"
                style={{ opacity: "0.9" }}
                className="border"
                width="50px"
                height="30px"
                layout="responsive"
              />
              <span className="text-gray-400 mt-8 text-center font-bold">
                Add links you want to paywall using "+ Add Tier"
              </span>
            </div>
          )}

          {(formState == "edit" || formState == "add") && (
            <Modal>
              <div className="flex flex-col w-full p-4">
                <h2 className="text-2xl mb-4 font-bold">
                  {formState == "edit" ? `Edit` : `Add`} Tier
                </h2>
                <label className="text-sm font-bold">Links</label>
                <div className="flex flex-col gap-2 mt-2">
                  {tierData.links.map((link, index) => (
                    <div className="flex justify-between items-center text-sm p-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                      <span>{link}</span>
                      <FiX
                        className="cursor-pointer text-gray-800"
                        onClick={() => {
                          let { links } = tierData;
                          links = links.filter((l) => l !== link);
                          setTierData((prevState) => ({
                            ...prevState,
                            links,
                          }));
                        }}
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <input
                      className="p-1 px-2 bg-gray-100 w-full border rounded-md text-sm focus:bg-white"
                      placeholder="Enter the link you want to paywall for e.g., test.com/1"
                      name="link"
                      onChange={handleTierUpdate}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addLink();
                        }
                      }}
                      value={tierData.link}
                    />
                    <button
                      className="flex px-2 py-2 min-w-max items-center gap-1 text-sm bg-blue-100 text-blue-800 rounded-md"
                      onClick={addLink}
                    >
                      <FiPlus /> Add Link
                    </button>
                  </div>
                </div>
                {/* <textarea
                  name="links"
                  onChange={handleTierUpdate}
                  defaultValue={tierData.links.join("\n")}
                /> */}

                <label className="text-sm font-bold mt-4">Name</label>
                <input
                  className="p-1 px-2 mt-2 w-full border rounded-md text-sm bg-gray-100 focus:bg-white"
                  placeholder="Enter the name for tier"
                  name="name"
                  onChange={handleTierUpdate}
                  defaultValue={tierData.name}
                />
                <label className="text-sm font-bold mt-4">Domain</label>
                <input
                  name="domain"
                  className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                  placeholder="Enter the domain you want to paywall for e.g., test.com"
                  onChange={handleTierUpdate}
                  value={tierData.domain}
                />
                <label className="text-sm font-bold mt-4">Type</label>
                <div className="relative inline-flex text-sm">
                  <FiChevronDown className="w-4 h-4 absolute top-1 right-0 m-4 mr-2 text-gray-400 pointer-events-none" />
                  <select
                    className="w-full mt-2 rounded-md text-sm text-gray-600 p-2 bg-white hover:border-gray-400 outline-none appearance-none bg-gray-100 focus:bg-white border"
                    onChange={handleTierUpdate}
                    defaultValue={tierData.type}
                    name="type"
                  >
                    <option value={"tx"}>Transaction</option>
                    <option value={"token"}>Token</option>
                  </select>
                </div>

                {tierData.type == "tx" && (
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mt-4">Validity</label>
                    <div className="relative inline-flex text-sm">
                      <input
                        name="tx_period"
                        list="validity"
                        autoComplete="off"
                        className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                        placeholder="Enter the validity period (days). Leave empty for lifetime validity."
                        onChange={handleTierUpdate}
                        defaultValue={tierData.tx_period}
                      />
                      <datalist
                        id="validity"
                        onChange={handleTierUpdate}
                        defaultValue={tierData.tx_period}
                        name="tx_period"
                      >
                        <option value={30}>Month</option>
                        <option value={365}>Year</option>
                      </datalist>
                    </div>

                    <label className="text-sm font-bold mt-4">Price (Ξ)</label>
                    <input
                      name="price"
                      className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                      placeholder="Enter the price in Ξ for e.g., 0.001"
                      onChange={handleTierUpdate}
                      defaultValue={tierData.price}
                    />
                  </div>
                )}
                {tierData.type == "token" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold mt-4">
                      Contract Address
                    </label>
                    <input
                      name="contract_addr"
                      className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                      placeholder="Enter the contract address for e.g., 0x3EF61d25b2Bf303DE52efdd5e50698BED8f9eB8d"
                      onChange={handleTierUpdate}
                      defaultValue={tierData.contract_addr}
                    />
                    <label className="text-sm font-bold mt-4">
                      Token Balance
                    </label>
                    <input
                      name="token_balance"
                      type="number"
                      className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                      placeholder="Enter the minimum balance to access this link"
                      onChange={handleTierUpdate}
                      defaultValue={tierData.token_balance}
                    />
                    <label className="text-sm font-bold mt-4">
                      Collection Link
                    </label>
                    <input
                      name="mint_link"
                      className="p-1 px-2 bg-gray-100 mt-2 w-full border rounded-md text-sm focus:bg-white"
                      placeholder="Enter the link to the collection/token for e.g., https://opensea.io/collection/netvvork"
                      onChange={handleTierUpdate}
                      defaultValue={tierData.mint_link}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-row-reverse w-full gap-4 mt-4 rounded-b-lg p-2">
                {
                  <button
                    className={`p-4 py-2 text-sm ${
                      validateFormData(tierData) && !formStateErrors
                        ? "opacity-100"
                        : "opacity-50"
                    } bg-green-100 text-green-800 rounded-md font-bold`}
                    onClick={() => {
                      if (
                        !loading &&
                        validateFormData(tierData) &&
                        !formStateErrors
                      ) {
                        setLoading(true);
                        updateTiersAndLinks(tierData);
                      }
                    }}
                  >
                    {!loading ? (
                      `${formState == "edit" ? `Save` : `Add`} Tier`
                    ) : (
                      <span className="flex gap-1 items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-800"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {`${formState == "edit" ? `Saving` : `Adding`} Tier`}
                      </span>
                    )}
                  </button>
                }
                <button
                  className="p-4 py-2 text-sm bg-gray-100 text-gray-500 rounded-md"
                  onClick={() => {
                    setLoading(false);
                    setFormState("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
          {formState == "delete" && (
            <Modal>
              <div className="flex flex-col w-full p-4">
                <h2 className="text-xl font-bold">
                  Are you sure you want to delete this tier?
                </h2>
                <p className="text-sm text-red-500 mt-2">
                  This will remove paywall from following links.{" "}
                </p>
                <ul className="mt-2 list-disc">
                  {tierData.links.map((link, index) => (
                    <li className="flex items-center text-sm p-2 py-1 text-gray-500 rounded-md">
                      {link}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-row-reverse w-full gap-4 mt-8 rounded-b-lg p-2">
                  <button
                    className="p-4 py-2 text-sm bg-red-100 text-red-800 rounded-md font-bold"
                    onClick={() => {
                      setLoading(true);
                      deleteTierData(tierData.id);
                    }}
                  >
                    {!loading ? (
                      `Delete`
                    ) : (
                      <span className="flex gap-1 items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-800"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {`Deleting Tier`}
                      </span>
                    )}
                  </button>
                  <button
                    className="p-4 py-2 text-sm font-bold bg-gray-100 text-gray-500 rounded-md"
                    onClick={() => {
                      setFormState("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </main>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
