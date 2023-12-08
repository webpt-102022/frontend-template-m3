import React, { useState, useEffect } from 'react';
import KnowledgeCard from "../components/KnowledgeCard";
import AddKnowledgeForm from '../components/AddKnowledgeForm';
import SearchInput from '../components/SearchInput';
import knowledgeService from '../services/knowledgeService';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [knowledges, setKnowledges] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getKnowledges = async () => {
    try {
      const response = await knowledgeService.getKnowledges();
      setKnowledges(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKnowledges();
  }, []);

  const handleSortByTime = () => {
    const sortByTime = [...knowledges].sort((a, b) => a.timeOfActivity - b.timeOfActivity);
    setKnowledges(sortByTime);
    setShowForm(false);
  };

  const handleFilterCategory = (category) => {
    const filteredKnowledges = category
      ? knowledges.filter((elem) => elem.category === category)
      : [...knowledges];
    setKnowledges(filteredKnowledges);
    setShowForm(false);
  };



  const handleAddKnowledge = async (newKnowledgeData) => {
    try {
      const newKnowledge = await knowledgeService.createKnowledge(newKnowledgeData);
      navigate(`/knowledges/${newKnowledge._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowKnowledge = () => {
    setShowForm((prev) => !prev);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleDelete = async (knowledgeId) => {
    try {
      const deletedKnowledge = await knowledgeService.deleteKnowledge(knowledgeId);
      console.log(deletedKnowledge);
    } catch (error) {
      console.error(error);
    } finally {
      getKnowledges();
    }
  };

  // Funciones específicas para cada categoría
  const handleFilterMusic = () => handleFilterCategory('Music');


  
 
 

  const handleFilterAnimals = () => handleFilterCategory('Animals');
 

  // Puedes agregar más funciones según sea necesario para cada categoría...

  return (
    <>
      <h1>Welcome to CoBrain</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="app">
          <div className="search_container">
            <SearchInput handleSearchValue={handleSearch} />
          </div>

          <div className="action_container">
            <button className="btn" onClick={handleSortByTime}>
              Time
            </button>
            <button className="btn" onClick={handleFilterMusic}>
              Music
            </button>
            <button className="btn" onClick={handleFilterAnimals}>
              Animals
            </button>
            
            {/* Agrega botones adicionales para otras categorías según sea necesario */}
            <button className="btn" onClick={handleShowKnowledge}>
              {showForm ? 'x' : '+'}
            </button>
          </div>

          {showForm && <AddKnowledgeForm handleAddKnowledge={handleAddKnowledge} />}
          <div className="card_container">
            {knowledges
              .filter(
                (elem) =>
                  elem.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                  elem.category.toLowerCase().includes(searchValue.toLowerCase()) ||
                  elem.location.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((elem) => (
                <KnowledgeCard
                  key={elem._id}
                  knowledge={elem}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
