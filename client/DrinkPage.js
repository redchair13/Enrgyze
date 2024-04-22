import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DrinkPage() {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    axios.get('/drinks/${id}')
      .then(response => {
        setDrink(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  
  return (
    <div>
      <h1>{drink.name}</h1>
      <p>{drink.description}</p>
      {/* display images, reviews, and comments here */}
    </div>
  );
}

export default DrinkPage
