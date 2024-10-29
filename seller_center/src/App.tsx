import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="ml-10 my-10 flex-col items-center justify-center space-y-8 ">
      <Button variant="contained">Hello world !!!</Button>
      <h1>icon Demo...</h1>
      <AccessAlarm />

      <ThreeDRotation />
      <h1>Custom Icon với Tailwind CSS</h1>
      <ThreeDRotation className="text-red-500" />
    </div>
  );
}

export default App;
