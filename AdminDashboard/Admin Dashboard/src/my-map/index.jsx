import dynamic from "next/dynamic";
import HeatMap from "./Heatmap";
const Heatmap = dynamic(()=>import('./Heatmap'),{
    ssr:false
});

export default Heatmap