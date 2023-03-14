
import './App.css';
import UploadCSV from './UploadCSV';
import SearchResults from './GenerateReport';

function App() {
  return (
    <div className="App">

      <UploadCSV />
      
      <SearchResults />
    </div>
  );
}

export default App;
