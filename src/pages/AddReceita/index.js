import React, { useState } from 'react';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AddReceita() {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [passos, setPassos] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState('');
  const [novoPasso, setNovoPasso] = useState('');

  // Função para adicionar ingrediente
  const adicionarIngrediente = () => {
    if (novoIngrediente.trim() !== '') {
      setIngredientes([...ingredientes, novoIngrediente]);
      setNovoIngrediente('');
    }
  };

  // Função para adicionar passo
  const adicionarPasso = () => {
    if (novoPasso.trim() !== '') {
      setPassos([...passos, novoPasso]);
      setNovoPasso('');
    }
  };

  // Função para adicionar receita
  const adicionarReceita = () => {
    if (nome.trim() !== '' && ingredientes.length > 0 && passos.length > 0) {
      const receita = {
        id: new Date().getTime(), // Gerar um ID único baseado no timestamp
        titulo: nome,
        ingredientes,
        modoPreparo: passos,
      };

      // Carregar receitas do Local Storage
      const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
      receitas.push(receita);

      // Salvar receitas no Local Storage
      localStorage.setItem('receitas', JSON.stringify(receitas));

      // Limpar os campos
      setNome('');
      setIngredientes([]);
      setPassos([]);
    } else {
      alert('Preencha todos os campos e adicione pelo menos um ingrediente e um passo.');
    }
  };

  return (
    <div id="addreceita">
      {console.log()}
      <Header />
      <div id="main">
        <label>Insira o nome da receita:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da receita"
        />
        <label>Insira os ingredientes:</label>
        <input
          type="text"
          value={novoIngrediente}
          onChange={(e) => setNovoIngrediente(e.target.value)}
          placeholder="Ingrediente"
        />
        <button onClick={adicionarIngrediente}>
          Adicionar Ingrediente
        </button>
        <ul>
          {ingredientes.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>
          ))}
        </ul>
        <label>Insira os passos para preparar:</label>
        <input
          type="text"
          value={novoPasso}
          onChange={(e) => setNovoPasso(e.target.value)}
          placeholder="Passo"
        />
        <button onClick={adicionarPasso}>
          Adicionar Passo
        </button>
        <ul>
          {passos.map((passo, index) => (
            <li key={index}>{passo}</li>
          ))}
        </ul>
        <button onClick={adicionarReceita}>
          Adicionar Receita
        </button>
      </div>
      <Footer />
    </div>
  );
}
