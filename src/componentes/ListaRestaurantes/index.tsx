import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

interface IParametrosBusca {
  preventDefault(): unknown;
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')


  useEffect(() => {
    carregarDados('http://0.0.0.0:8000/api/v1/restaurantes/')
  }, [])

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscar = (evento: IParametrosBusca) => {
    evento.preventDefault();
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados('http://0.0.0.0:8000/api/v1/restaurantes/', opcoes)
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} placeholder="Digite sua busca..." />
      </div>
      <div>
        <label htmlFor="select-ordernacao">Ordenar por:</label>
        <select name="select-ordernacao" id="select-ordernacao" value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}
        >
          <option value="">Padrão</option>
          <option value="id">ID</option>
          <option value="nome">Nome</option>
        </select>
      </div>
      <button type="submit">Buscar</button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    <button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Página Anterior</button>
    <button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>
  </section>)
}

export default ListaRestaurantes