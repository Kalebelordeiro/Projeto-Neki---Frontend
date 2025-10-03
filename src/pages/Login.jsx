import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'; 

export default function Login() {
  const { login } = useContext(AuthContext); 
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false); 

  function handleSubmit(event) {
    event.preventDefault(); 
    setLoginError(false);
    
    const success = login(email, password, remember); 
    
    if (!success) {
        setLoginError(true);
    }
  }

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Acesso ao Painel</h1>
      
      {loginError && (
          <p style={{ color: 'var(--danger-red)', border: '1px solid var(--danger-red)', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
              Credenciais inválidas. Use o último usuário cadastrado.
          </p>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Campo Email de Login */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        {/* Campo de Senha com Visualizar */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          
          {/* Botão para alternar a visibilidade */}
          <button
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            style={{
                position: 'absolute',
                right: '10px',
                top: '66%', 
                transform: 'translateY(-50%)',
                padding: '5px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                color: 'var(--text-light)', 
                width: 'auto' 
            }}
          >
            {showPassword ? '🙈' : '👁️'} 
          </button>
        </div>
        
        {/* Checkbox "Lembrar senha" */}
        <div style={{ margin: '15px 0' }}>
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)} 
          />
          <label htmlFor="remember" style={{ marginLeft: '10px' }}>Lembrar Senha</label>
        </div>

        {/* Botão de Entrar */}
        <button 
          type="submit" 
          style={{ 
            backgroundColor: 'var(--primary-cyan)', 
            color: 'var(--bg-dark)', 
            width: '100%',
            marginTop: '25px',
          }}
        >
          ACESSAR CONTA
        </button>
      </form>

      {/* Link para a tela de cadastro */}
      <p style={{ marginTop: '30px', textAlign: 'center' }}>
        Não tem conta? <Link to="/register">Crie uma agora</Link>
      </p>
    </div>
  );
}