import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null); 

  // Estado para guardar o usuário VÁLIDO (padrão ou cadastrado)
  const [validUser, setValidUser] = useState({ 
    username: 'teste@email.com', 
    password: '123456' 
  }); 

  // Efeito que checa o Local Storage ao carregar a aplicação
  useEffect(() => {
    // Busca a sessão de login
    const stored = localStorage.getItem("skills_user") || sessionStorage.getItem("skills_user");
    if (stored) setUser(JSON.parse(stored));
    
    // Busca o usuário VÁLIDO (se houve cadastro)
    const storedValidUser = localStorage.getItem("skills_valid_user");
    if (storedValidUser) setValidUser(JSON.parse(storedValidUser));

  }, []);

  // Função para REGISTRAR o novo usuário válido
  function register(username, password) {
      const newUser = { username, password };
      setValidUser(newUser);
      // Armazena o NOVO usuário válido para que persista
      localStorage.setItem("skills_valid_user", JSON.stringify(newUser));
      return true;
  }

  // Função de LOGIN (AGORA USA O validUser)
  function login(username, password, remember) {
      
      // 1. VERIFICAÇÃO com base no usuário válido atual
      if (username !== validUser.username || password !== validUser.password) {
          console.error("Login falhou: Credenciais inválidas.");
          return false;
      }
      
      // 2. SUCESSO NO LOGIN
      const userObj = { username, role: 'user' }; 
      setUser(userObj);
      
      // Armazena a sessão (quem está logado)
      if (remember) localStorage.setItem("skills_user", JSON.stringify(userObj));
      else sessionStorage.setItem("skills_user", JSON.stringify(userObj));
      
      navigate("/home");
      return true;
  }
  
  function logout() {
      setUser(null);
      localStorage.removeItem("skills_user");
      sessionStorage.removeItem("skills_user");
      navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;