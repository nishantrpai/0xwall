import Head from "next/head";
import HomeLayout from "layouts/home";
import { FiCheck } from "react-icons/fi";

export default function Home() {
  return (
    <div className="container">
      <main>
        <div className="grid">
          <p className="text-3xl font-mono py-4">0xwall</p>
          <a className="mt-4">
            <h2 className="font-bold text-gray-800">Get paid in ETH</h2>
            <p className="text-gray-500 mt-2">
              🦊 Paywall any link of your website with few clicks.
            </p>
            <p className="text-gray-500 mt-4 flex items-center gap-2 text-sm">
              {" "}
              <span className="text-md text-green-500">
                <FiCheck />
              </span>{" "}
              Open Source{" "}
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
              {" "}
              <span className="text-md text-green-500">
                <FiCheck />
              </span>{" "}
              10 free links{" "}
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
              {" "}
              <span className="text-md text-green-500">
                <FiCheck />
              </span>{" "}
              Gate links by transaction{" "}
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
              {" "}
              <span className="text-md text-green-500">
                <FiCheck />
              </span>{" "}
              Gate links by token{" "}
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="https://github.com/nishantrpai/0xwall"
                target="_blank"
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-800"
              >
                Source Code
              </a>
              <a
                href="/login"
                target="_blank"
                className="px-4 py-2 rounded-md bg-blue-100 text-blue-800"
              >
                Dashboard &rarr;
              </a>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
