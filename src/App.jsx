import EthereumAccountInfo from "./components/EtherAccountInfo";
import { GlobeDemo } from "./components/GlobdDemo";
import { Navbar } from "./components/Navbar";
import SeedPhrases from "./components/SeedPhrases";
import SolanaAccountInfo from "./components/SolanaAccountInfo";
import Thememode from "./components/ThemeMode";




function App() {


  return (
    < div className="">
    

   

    <Navbar/>
    
 
    <SeedPhrases/>
    <SolanaAccountInfo/>
    <EthereumAccountInfo/>
    <GlobeDemo/>
    
    
    
    </div>
  );
}

export default App;