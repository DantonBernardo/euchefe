import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Receita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar receitas da API
        const response = await fetch('/api/receitas.json');
        const data = await response.json();
        const receitasApi = data._list || [];

        // Carregar receitas do Local Storage
        const receitasLocalStorage = JSON.parse(localStorage.getItem('receitas')) || [];

        // Mesclar receitas da API com as do Local Storage
        const todasReceitas = [...receitasApi, ...receitasLocalStorage];

        // Encontrar a receita pelo ID
        const receitaEncontrada = todasReceitas.find((item) => item.id === parseInt(id));
        setReceita(receitaEncontrada);
      } catch (error) {
        console.error('Erro ao carregar as receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!receita) {
    return <div>Receita não encontrada.</div>;
  }

  return (
    <div>
      <Header />
      <div className="receita-container">
        <div className="receita-card">
          <h1 className="receita-titulo">{receita.titulo}</h1>
          <ul className="receita-ingredientes">
            <h2>Ingredientes:</h2>
            {receita.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
          <div className="receita-modo-preparo">
            <h2>Modo de Preparo:</h2>
            <ul>
              {receita.modoPreparo.map((passo, index) => (
                <li key={index}>{passo}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}