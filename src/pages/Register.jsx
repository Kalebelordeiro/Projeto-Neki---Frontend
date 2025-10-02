import { useState, useContext } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'; 

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); 
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  
  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return; 
    }
    
    setError(''); 
    
    register(email, password); 

    alert(`Cadastro de ${name} realizado com sucesso! O novo usuário válido é: ${email}. Redirecionando para o Login.`);
    navigate('/'); 
  }

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Novo Usuário</h1>
      
      {error && <p style={{ color: 'var(--danger-red)', border: '1px solid var(--danger-red)', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
        {/* Campos com espaçamento melhorado */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Nome Completo</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Botão de Cadastrar */}
        <button 
          type="submit" 
          style={{ 
            backgroundColor: 'var(--primary-cyan)', 
            color: 'var(--bg-dark)', 
            width: '100%',
            marginTop: '25px',
          }}
        >
          CRIAR CONTA
        </button>
      </form>
      
      <p style={{ marginTop: '30px', textAlign: 'center' }}>
        Já tem conta? <Link to="/">Voltar para Login</Link>
      </p>
    </div>
  );
}