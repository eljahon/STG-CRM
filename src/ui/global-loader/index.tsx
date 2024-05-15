export default function GlobalLoader() {
  return (
    <div
      className="h-screen w-screen flex fixed top-0 left-0 	justify-content-center align-items-center bg-green-300"
      style={{ zIndex: 10000 }}
    >
      <div className="text-center">
        <i
          className="pi pi-spin pi-spinner-dotted text-white"
          style={{ fontSize: "3rem" }}
        ></i>
        <p className="text-5xl m-0 text-white">GROWZ</p>
      </div>
    </div>
  );
}
