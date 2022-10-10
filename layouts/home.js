import Navbar from "components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      <div className="flex justify-center py-4">{children}</div>
    </div>
  );
}
