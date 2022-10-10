export default function Modal({ children }) {
  return (
    <div
      id="default-modal"
      data-modal-show="true"
      aria-hidden="true"
      style={{ background: "rgba(0,0,0,0.75)" }}
      className="overflow-x-hidden overflow-y-auto h-screen fixed top-0 left-0 w-full z-50 justify-center items-center"
    >
      <div className="relative top-20 m-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow relative">
          <div className="flex flex-col items-start justify-between">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
