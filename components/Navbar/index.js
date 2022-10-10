import Head from "next/head";
import { humanizeWallet } from "util/index";

export default function Navbar({ title = "0xwall", address }) {
  return (
    <div className="flex justify-between items-center mt-4 py-2 sm:px-2">
      <Head>
        <title>{title}</title>
        <meta name="title" content="0xwall" />
        <meta
          name="description"
          content="Web3 Paywall any link you want with few clicks. No KYC, no deposit,  no documents, no charges on any transaction."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://0xwall.app/" />
        <meta property="og:title" content="0xwall" />
        <meta
          property="og:description"
          content="Web3 Paywall any link you want with few clicks. No KYC, no deposit,  no documents, no charges on any transaction."
        />
        <meta property="og:image" content="https://0xwall.app/og.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://0xwall.app/" />
        <meta property="twitter:title" content="0xwall" />
        <meta
          property="twitter:description"
          content="Web3 Paywall any link you want with few clicks. No KYC, no deposit,  no documents, no charges on any transaction."
        />
        <meta property="twitter:image" content="https://0xwall.app/og.png" />
        <link rel="icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <a href="https://0xwall.app">
        <img
          src="/favicon2.jpeg"
          className="w-10 rounded-md cursor-pointer border"
        />
      </a>
      {address && (
        <span className="text-sm p-2 px-4 bg-gray-100 text-slate-500 truncate text-ellipsis rounded-full">
          {humanizeWallet(address)}
        </span>
      )}
    </div>
  );
}
