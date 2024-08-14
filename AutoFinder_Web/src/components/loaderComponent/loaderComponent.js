import ReactLoading from "react-loading";
import "./loaderComponent.scss"
const LoaderComponent = () => {
  return (
    <div className="LoaderComponent" >
      <ReactLoading
        type={"bars"}
        color={"#cd0100"}
        height={"70px"}
        width={"70px"}
      />
      <h1>Loading Please Wait</h1>
      <p>If There is error in loading please Navigate to Home: <a href="/">Home</a> </p>
    </div>
  );
};

export default LoaderComponent;
