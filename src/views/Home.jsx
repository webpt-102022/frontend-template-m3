import React, { useState, useEffect } from 'react';
import KnowledgeCard from "../components/KnowledgeCard";
import AddKnowledgeForm from '../components/AddKnowledgeForm';
import SearchInput from '../components/SearchInput';
import knowledgeService from '../services/knowledgeService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Home() {
  const [ knowledges, setKnowledges ] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();




  return (
    <div>
      <h1>Home coBrain</h1>
    </div>
  )
}
