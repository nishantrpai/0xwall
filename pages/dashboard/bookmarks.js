import { useMemo } from "react";
import useSWR from "swr";
import { fetcher, humanizeWallet } from "util/index";
import Image from "next/image";
import DashboardLayout from "layouts/dashboard";
import {
  FiExternalLink,
} from "react-icons/fi";

export default function Dashboard({ address, token }) {
  const writerAccount = address?.toLowerCase();

  const config = useMemo(
    () => ({
      headers: {
        Authorization: token,
      },
    }),
    [token]
  );

  const { data: products = [] } = useSWR([`/api/tx?reader_account=${writerAccount}&source=dashboard`, config], fetcher);

  return (
    <div className="container">
      <main>
        {/* Switch account option */}
        <div className="flex flex-col px-2 py-4">
          <h1 className="text-4xl text-gray-700 font-bold">Bookmarks</h1>
          <p className="text-gray-400 mt-2">
            List of links you unlocked.
          </p>
        </div>
        <div className="grid mt-4">
          {products.map((product, index) => (
            <div className="rounded-md p-2 px-2 bg-white mt-4" key={index}>
              <div className="flex items-center gap-2 tier-name text-md">
                <h3><a href={`https://${product["tier"].domain}`} target="_blank">{product["tier"].domain}</a></h3>
              </div>
              <a href={`https://etherscan.io/tx/${product.tx}`} target="_blank" className="text-xs text-gray-400 underline">{humanizeWallet(product.tx)}</a>
              <div className="tier-links mt-2 flex flex-col gap-2">
                {product["tier"]?.links?.map((tierLink, index) => (
                  <a
                    className="flex gap-2 items-center tier-link text-sm text-gray-500 hover:text-blue-800"
                    key={index}
                    href={`https://${tierLink.link}`}
                    target="_blank"
                  >
                    <FiExternalLink />
                    {tierLink.link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(products).length == 0 && (
            <div className="flex flex-col px-16">
              <Image
                src="/undraw_empty_street_re_atjq.svg"
                style={{ opacity: "0.9" }}
                className="border"
                width="50px"
                height="30px"
                layout="responsive"
              />
              <span className="text-gray-400 mt-8 text-center font-bold">
                No bookmarks so far
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
