import axios from 'axios';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
const URL = 'https://api.thecatapi.com/v1/images/search';
function CatImage() {
  const [catData, setCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getCat() {
    setIsLoading(true); // состояние загрузки

    try {
      const response = await axios(URL);
      const datacat = response.data;
      setCatData(datacat);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false); //чистка после  запроса
    }
  }
//   console.log(catData);
  useEffect(() => {
    let isMonted = true;
    if (isMonted) {
      getCat();
    }
    return () => {
      isMonted = false;
      setCatData([]);
    };
  }, []);
  function handleClick() {
    if (!isLoading) {
      getCat();
    } // не выполняем новый запрос до выполнения предыдущего
  }
  return (
    <div className={styles.catContainer}>
      <h1>Random Cat Image</h1>
      {catData.map(cat => (
        <img key={cat.id} src={cat.url} alt="Cat" className={styles.catImage} />
      ))}
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load New Image'}
      </button>
    </div>
  );
}
export default CatImage;
