// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"; // 👈 Importação nomeada

/* Este componente verifica se o usuário está logado. 
  Se estiver, mostra o conteúdo (children). 
  Se não, redireciona para a rota / (Login).
*/
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    // Se não houver usuário logado, redireciona para a página de Login
    return <Navigate to="/" replace />;
  }
  
  // Se houver usuário, exibe o componente filho (neste caso, a Home)
  return children;
}