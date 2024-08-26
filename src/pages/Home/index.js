import React, { useState, useEffect } from "react";
import '../Home/style.css';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_path = '/api/receitas.json';

    const loadData = async () => {
      try {
        const response = await fetch(api_path);
        const data = await response.json();
        const receitasJson = data._list || [];

        const receitasLocalStorage = JSON.parse(localStorage.getItem('receitas')) || [];

        const todasReceitas = [...receitasJson, ...receitasLocalStorage];

        setReceitas(todasReceitas);
      } catch (error) {
        console.error('Erro ao carregar as receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setReceitas([]);
  };

  if (loading) return <div>Carregando...</div>;

  console.log(receitas)
  return (
    <div>
      <Header />
      <div className="container">
        {
          receitas.map((item) => (
            <div key={item.id} className="card">
              <Link to={`/Receita/${item.id}`}>
                <strong className="titulo">{item.titulo}</strong>
                <ul className="ingredientes">
                  {item.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
                </ul>
              </Link>
            </div>
          ))
        }
      </div>
      <Footer />
      <button onClick={clearLocalStorage}>Limpar Local Storage</button>
    </div>
  );
}
