// src/pages/Home.jsx (VERSÃO DE DESIGN CIANO APRIMORADA)

import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; 

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  const [skills, setSkills] = useState([
    { id: 1, name: 'React', level: 'Intermediário' },
    { id: 2, name: 'JavaScript', level: 'Avançado' },
  ]);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Básico'); 
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  function handleAddSkill(e) {
    e.preventDefault();
    if (newSkillName.trim() === '') return;

    if (isEditing) {
      setSkills(skills.map(skill =>
        skill.id === editingId 
        ? { ...skill, name: newSkillName, level: newSkillLevel } 
        : skill
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newSkill = {
        id: Date.now(), 
        name: newSkillName,
        level: newSkillLevel,
      };
      setSkills([...skills, newSkill]);
    }

    setNewSkillName('');
    setNewSkillLevel('Básico');
  }

  function handleDeleteSkill(id) {
    setSkills(skills.filter(skill => skill.id !== id));
  }

  function handleStartEdit(skill) {
    setIsEditing(true);
    setEditingId(skill.id);
    setNewSkillName(skill.name);
    setNewSkillLevel(skill.level);
  }

  // Função auxiliar para cor do nível
  const getLevelColor = (level) => {
    switch (level) {
      case 'Avançado': return 'var(--primary-cyan)'; 
      case 'Intermediário': return 'var(--accent-orange)'; 
      default: return 'var(--text-light)'; 
    }
  };


  // --- JSX COM DESIGN VIBRANTE ---

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* HEADER PRINCIPAL */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px', 
        paddingBottom: '20px', 
        borderBottom: '2px solid var(--primary-cyan)' 
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5em' }}>Skills Manager ⚡</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                Olá, {user.username.split('@')[0] || 'Usuário'}
            </span>
            <button onClick={logout} style={{ 
                padding: '12px 25px', 
                backgroundColor: 'var(--danger-red)', 
                color: 'white', 
                borderRadius: '8px',
                fontWeight: 'bold' 
            }}>
              SAIR
            </button>
        </div>
      </header>
      
      
      {/* CONTEÚDO PRINCIPAL: FORMULÁRIO E LISTA LADO A LADO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '40px' }}>
        
        {/* LADO ESQUERDO: FORMULÁRIO DE ADIÇÃO/EDIÇÃO */}
        <section style={{ 
          backgroundColor: 'var(--bg-card)', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
          height: 'fit-content'
        }}>
          <h3 style={{ color: isEditing ? 'var(--accent-orange)' : 'var(--primary-cyan)', marginBottom: '30px' }}>
            {isEditing ? '✏️ EDITAR SKILL' : '➕ ADICIONAR NOVA SKILL'}
          </h3>
          <form onSubmit={handleAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Nome da Skill</label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Nível</label>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
              >
                <option value="Básico">Básico</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button 
                type="submit" 
                style={{ 
                    padding: '12px 20px', 
                    backgroundColor: isEditing ? 'var(--accent-orange)' : 'var(--primary-cyan)', 
                    color: isEditing ? 'black' : 'var(--bg-dark)', 
                    flexGrow: 1
                }}
              >
                {isEditing ? '💾 SALVAR EDIÇÃO' : '✅ ADICIONAR'}
              </button>
              
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setNewSkillName(''); setNewSkillLevel('Básico'); setEditingId(null); }}
                  style={{ 
                    padding: '12px 20px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                  }}
                >
                  ❌ CANCELAR
                </button>
              )}
            </div>

          </form>
        </section>

        {/* LADO DIREITO: LISTAGEM DAS SKILLS */}
        <section>
          <h3 style={{ marginBottom: '25px' }}>SKILLS CADASTRADAS ({skills.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {skills.length === 0 && <p style={{ color: '#6c757d' }}>Nenhuma skill cadastrada. Adicione uma nova no painel ao lado.</p>}
            {skills.map(skill => (
              <li 
                key={skill.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '18px 25px', 
                  marginBottom: '15px',
                  backgroundColor: 'var(--bg-card)', 
                  borderLeft: `5px solid ${getLevelColor(skill.level)}`, 
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  animation: 'slideIn 0.5s ease-out'
                }}
              >
                {/* Nome e Nível da Skill */}
                <span>
                  <strong style={{ fontSize: '1.2em', color: 'white' }}>{skill.name}</strong> 
                  <span style={{ 
                    marginLeft: '15px', 
                    padding: '5px 10px', 
                    borderRadius: '15px', 
                    backgroundColor: getLevelColor(skill.level), 
                    color: skill.level === 'Intermediário' ? 'black' : 'white', 
                    fontSize: '0.9em',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {skill.level}
                  </span>
                </span>
                
                 {/* Botões de Ação */}
                <div>
                  <button 
                    onClick={() => handleStartEdit(skill)}
                    style={{ 
                      backgroundColor: 'var(--accent-orange)', 
                      color: 'black', 
                      marginRight: '10px',
                    }}
                  >
                    EDITAR
                  </button>
                  {/* 💥 CORREÇÃO DEFINITIVA AQUI: O texto é "EXCLUIR" */}
                  <button 
                    onClick={() => handleDeleteSkill(skill.id)}
                    style={{ 
                      backgroundColor: 'var(--danger-red)', 
                      color: 'white', 
                    }}
                  >
                    EXCLUIR
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}