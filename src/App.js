import { useMemo } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import { random } from "lodash";

import Jobs from "./components/Jobs";
import store from "./store";

const generateBlobRadius = () => {
  const percentage1 = random(25, 75);
  const percentage2 = random(25, 75);
  const percentage3 = random(25, 75);
  const percentage4 = random(25, 75);
  const percentage11 = 100 - percentage1;
  const percentage21 = 100 - percentage2;
  const percentage31 = 100 - percentage3;
  const percentage41 = 100 - percentage4;
  return `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
};

const App = () => {
  const blobRadius = useMemo(() => generateBlobRadius(), []);

  return (
    <Provider store={store}>
      <Box className="App">
        <Box
          sx={{
            width: 800,
            height: 800,
            background: "#eef1f1",
            position: "absolute",
            top: -200,
            left: -200,
            zIndex: -1,
            borderRadius: blobRadius,
          }}
        />
        <Jobs />
      </Box>
    </Provider>
  );
};

export default App;
