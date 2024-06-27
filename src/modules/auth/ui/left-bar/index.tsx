
const LeftBar = () => {
    return (
        <div className="h-full w-6 bg-green-600 px-8  flex flex-column  justify-content-center">
        <div className="w-full  font-medium text-4xl font-bold px-4 py-4">
          <span className="text-white">GROWZ</span>
        </div>
        <h2 className="text-white font-medium text-6xl font-bold  px-4 m-0">
          Your place to work <br /> Plan. Create. Control.
        </h2>
        <img
          className="w-full"
          style={{ maxWidth: "600px" }}
          width={500}
          src="/marketing-campaign-1-97.svg"
        />
      </div>
    );
}

export default LeftBar;
