import React, {useState, useEffect} from 'react';
import api from './services/api'; 
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
   
  useEffect(() => {
    api.get('/repositories').then(response => {
        //console.log(response);
        setRepositories(response.data); 
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`Novo ${Date.now()}`
    });

    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    const lIndex = repositories.findIndex(repository => repository.id === id);
    const response = await api.delete('repositories/'+id);
    const code = response.status;
    if (code == 204){
      console.log('Exclui - '+id);
      repositories.splice(lIndex,1);
      setRepositories([...repositories]);          
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(obj => <li key={obj.id} > 
            {obj.title}
            <button onClick={() => handleRemoveRepository(obj.id)}>
            Remover
            </button>
          </li>)}  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
