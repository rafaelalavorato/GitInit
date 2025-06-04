import { useState } from "react";
import styles from './styles.module.css';
import background from '../../assets/github-logo.svg';
import ItemList from "../Item-list";

const Conteudo = () => {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({ avatar_url, name, bio, login });
    

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
      setRepos(newRepos)
      }
    }
  };
  
  return (
    <div className={styles.conteudo}>
      <img src={background} className={styles.background} alt="background app" />
      <div className={styles.info}>
        <div>
          <input name="usuario" value={user} onChange={event => setUser(event.target.value)} 
          placeholder="username" />
          <button onClick={handleGetData}>Buscar</button>
        </div>
        {currentUser?.name ? (<>
          <div className={styles.perfil}>
            <img src={currentUser.avatar_url} className={styles.profile} alt="imagem de perfil"/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          </>
        ): null}
        {repos?.length ? (
          <div>
            <h4 className={styles.repositorio}>Repositórios</h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
          </div>
        ): null}
      </div> 
    </div>
  )
}

export default Conteudo;