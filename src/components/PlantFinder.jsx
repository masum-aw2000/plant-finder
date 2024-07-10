import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPlants = async () => {
  const apiKey = 'sk-fptx6591db5a4df6f3616'; // Ensure your API key is correct
  const response = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}`);
  return response.data;
};

const PlantFinder = () => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false); // Track if user has searched
  const { data, isLoading, error } = useQuery({
    queryKey: 'plants',
    queryFn: fetchPlants,
  });

  const handleSearch = () => {
    setSearched(true);
  };

  const filteredPlants = data?.data.filter(plant => plant.common_name.toLowerCase().includes(query.toLowerCase())) || [];

  // Filter for closer matches if no exact match found
  const closerMatches = data?.data.filter(plant => plant.common_name.toLowerCase().startsWith(query.toLowerCase())) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a plant"
      />
      <button onClick={handleSearch}>Search</button>

      {searched && (
        <div>
          {filteredPlants.length > 0 ? (
            <ul>
              {filteredPlants.map((plant) => (
                <li key={plant.id}>
                  <h3>{plant.common_name}</h3>
                  {plant.scientific_name && (
                    <p><strong>Scientific Name:</strong> {plant.scientific_name.join(', ')}</p>
                  )}
                  {plant.other_name && (
                    <p><strong>Other Names:</strong> {plant.other_name.join(', ')}</p>
                  )}
                  <p><strong>Cycle:</strong> {plant.cycle}</p>
                  <p><strong>Watering:</strong> {plant.watering}</p>
                  {plant.sunlight.length > 0 && (
                    <p><strong>Sunlight:</strong> {plant.sunlight.join(', ')}</p>
                  )}
                  {plant.default_image && (
                    <img src={plant.default_image.thumbnail} alt={plant.common_name} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>No exact matches found. Showing closer matches:</p>
              <ul>
                {closerMatches.map((plant) => (
                  <li key={plant.id}>
                    <h3>{plant.common_name}</h3>
                    {plant.scientific_name && (
                      <p><strong>Scientific Name:</strong> {plant.scientific_name.join(', ')}</p>
                    )}
                    {plant.other_name && (
                      <p><strong>Other Names:</strong> {plant.other_name.join(', ')}</p>
                    )}
                    <p><strong>Cycle:</strong> {plant.cycle}</p>
                    <p><strong>Watering:</strong> {plant.watering}</p>
                    {plant.sunlight.length > 0 && (
                      <p><strong>Sunlight:</strong> {plant.sunlight.join(', ')}</p>
                    )}
                    {plant.default_image && (
                      <img src={plant.default_image.thumbnail} alt={plant.common_name} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantFinder;
