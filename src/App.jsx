import { useState } from "react"
import Minimal from "./templates/Minimal"
import Glass from "./templates/Glass"
import Split from "./templates/Split"
import Dark from "./templates/Dark"
import Gradient from "./templates/Gradient"

export default function App() {
  const [view, setView] = useState("minimal")

  return (
    <>
      <div className="fixed top-4 left-4 space-x-2 z-50 flex flex-wrap gap-2">
        <button onClick={() => setView("minimal")} className="px-3 py-1 bg-black text-white rounded">Minimal</button>
        <button onClick={() => setView("glass")} className="px-3 py-1 bg-black text-white rounded">Glass</button>
        <button onClick={() => setView("split")} className="px-3 py-1 bg-black text-white rounded">Split</button>
        <button onClick={() => setView("dark")} className="px-3 py-1 bg-black text-white rounded">Dark</button>
        <button onClick={() => setView("gradient")} className="px-3 py-1 bg-black text-white rounded">Gradient</button>
      </div>

      {view === "minimal" && <Minimal />}
      {view === "glass" && <Glass />}
      {view === "split" && <Split />}
      {view === "dark" && <Dark />}
      {view === "gradient" && <Gradient />}
    </>
  )
}