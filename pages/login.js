import { FiGitlab } from "react-icons/fi";
import LoginLayout from "layouts/login";

export default function Login({ address, connect }) {
  return (
    <>
      <div className="flex flex-col border mt-20 p-8 rounded-md shadow-lg shadow-blue-100">
        <span className="text-6xl font-bold mb-8 text-center mb-8">Login</span>
        <button
          className="flex gap-2 items-center bg-green-100 w-full text-green-800 font-bold px-4 py-2 rounded-md text-md"
          onClick={connect}
        >
          <FiGitlab /> Connect Wallet
        </button>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
