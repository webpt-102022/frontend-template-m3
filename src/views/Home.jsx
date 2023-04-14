import React, { useState, useEffect } from 'react';
import KnowledgeCard from "../components/KnowledgeCard";
import AddKnowledgeForm from '../components/AddKnowledgeForm';
import SearchInput from '../components/SearchInput';
import knowledgeService from '../services/knowledgeService';
import { useNavigate } from 'react-router-dom';
/*import axios from 'axios';*/


export default function Home() {
  const [ knowledges, setKnowledges ] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const getKnowledges = async () => {
    try {
      //const response = await axios.get('http://localhost:8080/knowledges')
      const response = await knowledgeService.getKnowledges();
      setKnowledges(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getKnowledges()
  }, [])


  const handleSortByTime = () => {
    const sortByTime = [...knowledges].sort((a, b) => a.timeOfActivity - b.timeOfActivity);
    setKnowledges(sortByTime);
  }



  const handleFilterCategory = () => {
    const filteredKnowledges = knowledges.filter(elem => elem.category === 'Music' /* || === 'Cooking' || === 'Health' || === 'Sport' || === 'Crafts' || === 'Circus' || === 'Languages' || === 'Animals' || === 'Others' */ );
    setKnowledges(filteredKnowledges);
  }


const handleAddKnowledge = async (newKnowledgeData) => {
  try {
    const newKnowledge = await knowledgeService.createKnowledge(newKnowledgeData);
    //const newKnowledge = await axios.post('http://localhost:8080/knowledges/${knowledgeId}', newKnowledgeData);
    navigate(`/knowledges/${newKnowledge._id}`)
  } catch (error) {
    console.error(error)
  }
  // Before integration with backend
  // const knowledgeWithId = { ...newKnowledgeData, _id: knowledges.length + 1 }
  // setKnowledges([...knowledges, knowledgeWithId]);
}

const handleShowKnowledge = () => {
  setShowForm(prev => !prev)
}

const handleSearch = (value) => {
  console.log('Search', value)
  setSearchValue(value);
}

const handleDelete = async (knowledgeId) => {
  try {
    //const deletedKnowledge = await axios.delete(`http://localhost:8080/knowledges/${knowledgeId}`);
    const deletedKnowledge = await knowledgeService.deleteKnowledge(knowledgeId);
    console.log(deletedKnowledge);
  } catch (error) {
    console.error(error)
  } finally {
    getKnowledges()
  }
  // const cleanKnowledges = [...knowledges].filter(elem => elem._id !== knowledgeId)
  // setKnowledges(cleanKnowledges);
}

  return (
    <>
      <h1>Welcome to CoBrain</h1>
      {loading && <p>Loading...</p>}
      {!loading &&
        (<div className="app">
          <div className="search_container">
            <SearchInput handleSearchValue={handleSearch} />
          </div>
          <div className="action_container">
            <button className="btn" onClick={handleSortByTime}>Sort by Time</button>
            <button className="btn" onClick={handleFilterCategory}>Show only Music</button>
            <button className="btn" onClick={handleShowKnowledge}>{showForm ? 'public' : '+'}</button>
          </div>
          {showForm && <AddKnowledgeForm handleAddKnowledge={handleAddKnowledge} />}
          <div className="card_container">
              {knowledges.filter(elem => elem.title.toLowerCase().includes(searchValue.toLowerCase()) 
              || elem.category.toLowerCase().includes(searchValue.toLowerCase()) 
              || elem.location.toLowerCase().includes(searchValue.toLowerCase())
                )
              .map(elem => {
                return <KnowledgeCard key={elem._id} knowledge={elem} handleDelete={handleDelete} />
            })}
          </div>
        </div>)}
    </>
  );
} 
