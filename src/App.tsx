import PageRoute from "./Context/PageRoute";
import AnimatedCursor from "react-animated-cursor";

function App() {
  return (
    <>
      <AnimatedCursor
        innerSize={15}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#ff0054",
        }}
        outerStyle={{
          border: "3px solid #ffff3f",
        }}
      />
      <PageRoute />
    </>
  );
}

export default App;
