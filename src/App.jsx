import QueryProvider from './api/queryClient';
import PlantFinder from './components/PlantFinder';
import './App.css';

function App() {
  return (
    <QueryProvider>
      <div className="app">
        <header className="app-header">
          <h1>Plant Finder</h1>
        </header>
        <PlantFinder />
      </div>
    </QueryProvider>
  );
}

export default App;
