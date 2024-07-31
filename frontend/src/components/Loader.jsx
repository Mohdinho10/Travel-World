import PropagateLoader from "react-spinners/PropagateLoader";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        height: "h-full",
        width: "w-full",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PropagateLoader color="#ff7e01" />
    </div>
  );
}

export default Loader;
