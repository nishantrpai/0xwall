import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import { fetcher, humanizeWallet } from "util/index";
import Image from "next/image";
import DashboardLayout from "layouts/dashboard";
import { FiExternalLink } from "react-icons/fi";
import { AreaChart, Area } from "recharts";

export default function Readers({ address, token }) {
  const config = useMemo(
    () => ({
      headers: {
        Authorization: token,
      },
    }),
    [token]
  );

  const { data: readers = {}, error } = useSWR(
    [`/api/reader`, config],
    fetcher
  );


  return (
    <div className="container">
      <main>
        <div className="flex flex-col px-2 py-4">
          <h1 className="text-4xl text-gray-700 font-bold">Readers</h1>
          <p className="text-gray-400 mt-2">List of readers</p>
        </div>

        {Object.keys(readers).map((id, index) => (
          <div
            className="bg-white px-4 py-2 w-full rounded-md shad"
            key={index}
          >
            <div class="flex flex-col">
              <span className="tex-md font-bold">{readers[id]?.name}</span>
              <span className="text-sm text-gray-400">
                {readers[id]?.domain}
              </span>
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="m-auto ml-0 p-4">
                    <AreaChart
                      width={700}
                      height={100}
                      data={readers[id]?.txDates}
                    >
                      {/* <YAxis />
                      <XAxis dataKey="name" /> */}
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />

                      {/* <Line type="monotone" dataKey="uv" stroke="#8884d8" /> */}
                    </AreaChart>
                  </div>

                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead class="border-b">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Account
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            TX
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {readers[id]?.txs?.map((txInfo, index) => (
                          <tr class="">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {humanizeWallet(txInfo.account)}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <a
                                className="flex gap-2 items-center"
                                href={`https://etherscan.io/tx/${txInfo.tx}`}
                                target="_blank"
                              >
                                {humanizeWallet(txInfo.tx)} <FiExternalLink />
                              </a>
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {txInfo.value} Ξ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {Object.keys(readers).length == 0 && (
          <div className="flex flex-col px-16">
            <Image
              src="/undraw_empty_street_re_atjq.svg"
              style={{ opacity: "0.9" }}
              className="border"
              width="50px"
              height="30px"
              layout="responsive"
            />
            <span className="text-gray-400 text-center font-bold">
              No readers so far
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

Readers.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
