import Head from "next/head";
import HomeLayout from "layouts/home";
import { FiCheck } from "react-icons/fi";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container">
      <main>
        <div className="grid">
          <p className="text-3xl font-mono py-4">0xwall</p>
          <div className="mt-4">
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
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-gray-800">How it works</h3>
            <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
              1. Add link in dashboard
            </p>
            <p className="flex flex-col text-gray-500 mt-2 flex gap-2 text-sm">
              2. Add script on your website in the {`<head>`} tag
              <span className="flex flex-col text-gray-500 mt-2 mb-2 flex gap-2 bg-gray-100 text-xs max-w-max px-2 py-2 rounded-md">
                {`<script src="https://0xwall.app/api/extension" defer></script>`}
              </span>
            </p>
            <p className="flex flex-col text-gray-500 mt-2 flex gap-2 text-sm">
              3. That's it, you should see a paywall on that link.
            </p>

            <p className="text-gray-500 mt-4 flex gap-2 text-xs">
              Stack specific instructions in
              <a
                className="text-blue-500"
                target="_blank"
                href="https://github.com/nishantrpai/0xwall#how-to-use"
              >
                README.md
              </a>
            </p>
          </div>
          <div className="mt-8 flex">
            {/* discord svg */}
            <a
              href="https://discord.com/invite/5df8q45ajg"
              target="_blank"
              className="text-gray-400 hover:text-indigo-500"
            >
              <FaDiscord />
            </a>
            <a
              href="https://twitter.com/_0xwall"
              target="_blank"
              className="text-gray-400 hover:text-blue-500 ml-2"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
