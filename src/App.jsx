import React, { useState, useEffect } from 'react';
import { chapters, bigProjects, tips } from './data/curriculum';
import { instructor, extraExercises, extraLabs, practiceTests } from './data/extras';

// ─── COLOR UTILS ────────────────────────────────────────────────────────────
const hexToRgb = hex => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};

// ─── SYNTAX HIGHLIGHTER (lightweight) ───────────────────────────────────────
const CodeBlock = ({ code, lang = 'python' }) => {
  const [copied, setCopied] = useState(false);
  
  const highlight = (code) => {
    const keywords = ['def','class','return','if','elif','else','for','while','in',
      'not','and','or','import','from','as','with','try','except','finally','raise',
      'pass','break','continue','lambda','yield','global','nonlocal','True','False',
      'None','self','super','print','len','range','type','isinstance','property',
      'staticmethod','classmethod','abstractmethod'];
    
    let lines = code.split('\n');
    return lines.map((line, i) => {
      // Comments
      if (line.trim().startsWith('#')) {
        return <div key={i} className="code-line"><span style={{color:'#6272a4',fontStyle:'italic'}}>{line}</span></div>;
      }
      
      // Simple tokenizer
      let parts = [];
      let remaining = line;
      let key = 0;
      
      // Strings
      remaining = remaining.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g, 
        (m) => `<STR>${m}</STR>`);
      
      // Keywords
      keywords.forEach(kw => {
        remaining = remaining.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<KW>${kw}</KW>`);
      });
      
      // Numbers
      remaining = remaining.replace(/\b(\d+\.?\d*)\b/g, '<NUM>$1</NUM>');
      
      // Decorators
      remaining = remaining.replace(/(@\w+)/g, '<DEC>$1</DEC>');
      
      // Functions
      remaining = remaining.replace(/\b([a-z_]\w*)\s*(?=\()/g, '<FN>$1</FN>');
      
      // Parse back
      const tokenize = (s) => {
        const tokens = [];
        const regex = /<(STR|KW|NUM|DEC|FN)>(.*?)<\/\1>/g;
        let lastIdx = 0, m;
        while ((m = regex.exec(s)) !== null) {
          if (m.index > lastIdx) tokens.push({type:'text', val: s.slice(lastIdx, m.index)});
          tokens.push({type: m[1], val: m[2]});
          lastIdx = regex.lastIndex;
        }
        if (lastIdx < s.length) tokens.push({type:'text', val: s.slice(lastIdx)});
        return tokens;
      };
      
      const colorMap = {
        KW: '#ff79c6',
        STR: '#f1fa8c',
        NUM: '#bd93f9',
        DEC: '#50fa7b',
        FN:  '#8be9fd',
        text: '#f8f8f2',
      };
      
      return (
        <div key={i} className="code-line" style={{display:'flex',gap:0}}>
          <span style={{color:'#44475a',userSelect:'none',minWidth:'2.5rem',textAlign:'right',paddingRight:'1rem'}}>{i+1}</span>
          <span>
            {tokenize(remaining).map((t, j) => (
              <span key={j} style={{color: colorMap[t.type] || '#f8f8f2'}}>{t.val}</span>
            ))}
          </span>
        </div>
      );
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{position:'relative', borderRadius:'12px', overflow:'hidden', 
                  border:'1px solid rgba(255,255,255,0.1)', marginBottom:'1.5rem'}}>
      <div style={{background:'#282a36', padding:'0.5rem 1rem', display:'flex',
                    justifyContent:'space-between', alignItems:'center',
                    borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display:'flex', gap:'6px'}}>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f56'}}/>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#ffbd2e'}}/>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#27c93f'}}/>
        </div>
        <span style={{color:'#6272a4', fontSize:'0.75rem', fontFamily:'JetBrains Mono'}}>python</span>
        <button onClick={copyCode} style={{
          background: copied ? '#50fa7b22' : 'transparent',
          border: '1px solid ' + (copied ? '#50fa7b' : '#44475a'),
          color: copied ? '#50fa7b' : '#6272a4',
          borderRadius:'6px', padding:'2px 10px', cursor:'pointer',
          fontSize:'0.75rem', fontFamily:'JetBrains Mono', transition:'all 0.2s'
        }}>
          {copied ? '✓ Đã sao chép' : '⎘ Copy'}
        </button>
      </div>
      <div style={{background:'#1e1f2e', padding:'1.2rem 0.5rem', 
                    overflowX:'auto', fontFamily:'JetBrains Mono', 
                    fontSize:'0.82rem', lineHeight:'1.7'}}>
        {highlight(code)}
      </div>
    </div>
  );
};

// ─── MARKDOWN RENDERER (simple) ─────────────────────────────────────────────
const MarkdownBlock = ({ content }) => {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{color:'#f1fa8c',fontFamily:'Be Vietnam Pro',fontWeight:700,
        fontSize:'1.4rem',marginTop:'1.5rem',marginBottom:'0.5rem',
        borderBottom:'1px solid rgba(241,250,140,0.2)',paddingBottom:'0.3rem'}}>
        {line.slice(3)}
      </h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} style={{color:'#8be9fd',fontFamily:'Be Vietnam Pro',fontWeight:600,
        fontSize:'1.1rem',marginTop:'1.2rem',marginBottom:'0.4rem'}}>
        {line.slice(4)}
      </h3>);
    } else if (line.startsWith('```')) {
      let codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(<CodeBlock key={i} code={codeLines.join('\n')} />);
    } else if (line.startsWith('| ')) {
      // Table
      let tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const rows = tableLines.slice(2).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
      const fmtCell = (cell) => cell.replace(/`([^`]+)`/g, function(m,cc){ return '<code style="background:rgba(255,255,255,0.1);padding:1px 6px;border-radius:4px;font-family:JetBrains Mono;font-size:0.78rem;color:#50fa7b">'+cc+'</code>'; });
      elements.push(
        <div key={'t'+i} style={{overflowX:'auto',marginBottom:'1rem'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontFamily:'Quicksand',fontSize:'0.82rem'}}>
            <thead>
              <tr>{headers.map((h,j) => <th key={j} style={{
                background:'rgba(139,233,253,0.1)', color:'#8be9fd',
                padding:'8px 12px', textAlign:'left',
                border:'1px solid rgba(255,255,255,0.08)'}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{background: ri%2===0?'transparent':'rgba(255,255,255,0.02)'}}>
                  {row.map((cell, ci) => <td key={ci} style={{
                    padding:'7px 12px', color:'#f8f8f2',
                    border:'1px solid rgba(255,255,255,0.06)',
                    verticalAlign:'top'}}
                    dangerouslySetInnerHTML={{__html: fmtCell(cell)}}
                  />)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{color:'#f8f8f2',marginBottom:'0.3rem',paddingLeft:'0.5rem'}}
          dangerouslySetInnerHTML={{__html: line.slice(2)
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ff79c6">$1</strong>')
            .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 6px;border-radius:4px;font-family:JetBrains Mono;font-size:0.82rem;color:#50fa7b">$1</code>')
          }}
        />
      );
    } else if (line.trim()) {
      elements.push(
        <p key={i} style={{color:'#e2e2e2',lineHeight:'1.7',marginBottom:'0.5rem'}}
          dangerouslySetInnerHTML={{__html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ff79c6">$1</strong>')
            .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 6px;border-radius:4px;font-family:JetBrains Mono;font-size:0.82rem;color:#50fa7b">$1</code>')
          }}
        />
      );
    } else {
      elements.push(<br key={i} />);
    }
    i++;
  }
  
  return <div style={{lineHeight:'1.8'}}>{elements}</div>;
};

// ─── TOPIC DETAIL PAGE ───────────────────────────────────────────────────────
const TopicPage = ({ chapter, topic, onBack, onShowExtra, hasExtra }) => {
  const [tab, setTab] = useState('theory');
  
  const tabs = [
    { id:'theory', label:' Lý thuyết' },
    { id:'code', label:' Code mẫu' },
    { id:'exercises', label:' Bài tập' },
    { id:'lab', label:' Lab' },
  ];
  
  return (
    <div>
      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg, ${chapter.dark}, rgba(${hexToRgb(chapter.color)},0.15))`,
        padding:'2rem', borderRadius:'16px', marginBottom:'2rem',
        border:`1px solid rgba(${hexToRgb(chapter.color)},0.2)`
      }}>
        <div style={{fontSize:'3rem',marginBottom:'0.5rem'}}>{topic.icon}</div>
        <h1 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'2rem',margin:0}}>
          {topic.title}
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',margin:'0.5rem 0 0',fontFamily:'Quicksand',fontSize:'0.85rem'}}>
          {chapter.emoji} {chapter.title} — {chapter.subtitle}
        </p>
      </div>
      
      {/* Tabs - scrollable on mobile */}
      <div style={{display:'flex', gap:'0.5rem', marginBottom:'1.5rem', flexWrap:'nowrap', overflowX:'auto', paddingBottom:'4px', WebkitOverflowScrolling:'touch'}}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:'0.6rem 1.2rem', borderRadius:'8px', flexShrink:0,
            border: `1px solid ${tab===t.id ? chapter.color : 'rgba(255,255,255,0.1)'}`,
            background: tab===t.id ? `rgba(${hexToRgb(chapter.color)},0.15)` : 'rgba(255,255,255,0.03)',
            color: tab===t.id ? chapter.color : '#888',
            fontFamily:'Be Vietnam Pro', fontWeight:600, fontSize:'0.85rem',
            cursor:'pointer', transition:'all 0.2s'
          }}>
            {t.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div style={{background:'rgba(255,255,255,0.02)', borderRadius:'16px',
                    border:'1px solid rgba(255,255,255,0.06)', padding:'2rem'}}>
        
        {tab === 'theory' && <MarkdownBlock content={topic.theory} />}
        
        {tab === 'code' && (
          <div>
            <div style={{marginBottom:'1rem', color:'#6272a4', fontFamily:'Quicksand', fontSize:'0.85rem'}}>
              // Code mẫu — nhấn Copy để sao chép
            </div>
            <CodeBlock code={topic.code} />
          </div>
        )}
        
        {tab === 'exercises' && (
          <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
            {topic.exercises.map((ex, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.03)', borderRadius:'12px',
                border:`1px solid rgba(${hexToRgb(chapter.color)},0.2)`, padding:'1.5rem'
              }}>
                <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.75rem'}}>
                  <div style={{
                    background:`rgba(${hexToRgb(chapter.color)},0.2)`,
                    color: chapter.color, borderRadius:'50%',
                    width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'Be Vietnam Pro', fontWeight:800, fontSize:'0.9rem', flexShrink:0
                  }}>
                    {i+1}
                  </div>
                  <h3 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:700, 
                               margin:0, fontSize:'1rem'}}>
                    {ex.title}
                  </h3>
                </div>
                <p style={{color:'#ccc', lineHeight:'1.6', marginBottom:'0.75rem', 
                            fontFamily:'Quicksand', fontSize:'0.82rem'}}>
                  {ex.desc}
                </p>
                <div style={{
                  background:'rgba(0,0,0,0.3)', borderRadius:'8px', padding:'0.75rem 1rem',
                  borderLeft:`3px solid #f1fa8c`
                }}>
                  <span style={{color:'#f1fa8c', fontSize:'0.78rem', fontFamily:'Quicksand'}}>
                    💡 Gợi ý: {ex.hint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {tab === 'lab' && (
          <div>
            <div style={{
              background:'rgba(255,255,255,0.03)', borderRadius:'12px',
              border:`1px solid rgba(${hexToRgb(chapter.color)},0.3)`, padding:'2rem'
            }}>
              <h2 style={{color: chapter.color, fontFamily:'Be Vietnam Pro', fontWeight:800,
                           fontSize:'1.4rem', marginBottom:'1.5rem'}}>
                 {topic.lab.title}
              </h2>
              <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                {topic.lab.steps.map((step, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'flex-start', gap:'1rem',
                    padding:'0.75rem', background:'rgba(255,255,255,0.03)', borderRadius:'8px'
                  }}>
                    <div style={{
                      background:`rgba(${hexToRgb(chapter.color)},0.2)`,
                      color: chapter.color, borderRadius:'50%',
                      width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'JetBrains Mono', fontWeight:700, fontSize:'0.8rem', flexShrink:0
                    }}>
                      {i+1}
                    </div>
                    <p style={{color:'#e2e2e2', margin:0, lineHeight:'1.5', 
                                fontFamily:'Quicksand', fontSize:'0.83rem'}}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{marginTop:'1.5rem', padding:'1rem', 
                            background:'rgba(80,250,123,0.08)', borderRadius:'8px',
                            border:'1px solid rgba(80,250,123,0.2)'}}>
                <p style={{color:'#50fa7b', fontFamily:'Quicksand', fontSize:'0.82rem', margin:0}}>
                  ✅ Hoàn thành lab này để thực hành toàn bộ kiến thức đã học. 
                  Viết code vào file riêng, test kỹ trước khi nộp.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'1.5rem', flexWrap:'wrap', gap:'0.75rem'}}>
        <button onClick={onBack} style={{
          padding:'0.7rem 1.5rem', borderRadius:'8px',
          background:`rgba(${hexToRgb(chapter.color)},0.15)`,
          border:`1px solid ${chapter.color}`, color: chapter.color,
          fontFamily:'Be Vietnam Pro', fontWeight:700, cursor:'pointer', fontSize:'0.85rem'
        }}>
          ← Quay lại
        </button>
        {hasExtra && (
          <button onClick={onShowExtra} style={{
            padding:'0.7rem 1.5rem', borderRadius:'8px',
            background:'rgba(241,250,140,0.12)',
            border:'1px solid #f1fa8c', color:'#f1fa8c',
            fontFamily:'Be Vietnam Pro', fontWeight:700, cursor:'pointer', fontSize:'0.85rem'
          }}>
             Bài tập bổ sung →
          </button>
        )}
      </div>
    </div>
  );
};

// ─── CHAPTER PAGE ────────────────────────────────────────────────────────────
const ChapterPage = ({ chapter, onSelectTopic }) => {
  return (
    <div>
      {/* Chapter header */}
      <div style={{
        background:`linear-gradient(135deg, ${chapter.dark} 0%, rgba(${hexToRgb(chapter.color)},0.2) 100%)`,
        borderRadius:'20px', padding:'3rem 2.5rem', marginBottom:'2rem',
        border:`1px solid rgba(${hexToRgb(chapter.color)},0.3)`,
        position:'relative', overflow:'hidden'
      }}>
        <div style={{position:'absolute', top:'-20%', right:'-5%', 
                      fontSize:'10rem', opacity:0.07, userSelect:'none'}}>
          {chapter.emoji}
        </div>
        <div style={{fontSize:'3.5rem', marginBottom:'1rem'}}>{chapter.emoji}</div>
        <h1 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:800, 
                     fontSize:'2.5rem', margin:0, letterSpacing:'-0.02em'}}>
          {chapter.title}
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)', fontFamily:'Quicksand', 
                    fontSize:'0.9rem', marginTop:'0.5rem'}}>
          {chapter.subtitle}
        </p>
        <div style={{
          display:'inline-block', marginTop:'1rem', padding:'0.3rem 1rem',
          background:`rgba(${hexToRgb(chapter.color)},0.2)`,
          border:`1px solid ${chapter.color}`, borderRadius:'100px',
          color: chapter.color, fontFamily:'Be Vietnam Pro', fontWeight:600, fontSize:'0.8rem'
        }}>
          {chapter.topics.length} chủ đề
        </div>
      </div>
      
      {/* Topics grid */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(320px,100%), 1fr))', gap:'1rem'}}>
        {chapter.topics.map((topic, ti) => (
          <div key={topic.id}
            onClick={() => onSelectTopic(ti)}
            style={{
              background:'rgba(255,255,255,0.02)', borderRadius:'16px',
              border:`1px solid rgba(${hexToRgb(chapter.color)},0.15)`,
              padding:'1.5rem', cursor:'pointer', transition:'all 0.2s',
              position:'relative', overflow:'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `rgba(${hexToRgb(chapter.color)},0.08)`;
              e.currentTarget.style.borderColor = chapter.color;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = `rgba(${hexToRgb(chapter.color)},0.15)`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{fontSize:'2.5rem', marginBottom:'0.75rem'}}>{topic.icon}</div>
            <h3 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:700, 
                         margin:'0 0 0.5rem', fontSize:'1.1rem'}}>
              {topic.title}
            </h3>
            
            <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'1rem'}}>
              {['Lý thuyết', 'Code mẫu', 'Bài tập', 'Lab'].map(tag => (
                <span key={tag} style={{
                  fontSize:'0.7rem', padding:'2px 8px', borderRadius:'100px',
                  background:`rgba(${hexToRgb(chapter.color)},0.1)`,
                  color: chapter.color, fontFamily:'Quicksand'
                }}>{tag}</span>
              ))}
            </div>
            
            <div style={{
              position:'absolute', bottom:0, right:0, 
              width:60, height:60,
              background:`radial-gradient(circle at bottom right, rgba(${hexToRgb(chapter.color)},0.15), transparent)`,
              borderRadius:'16px'
            }}/>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROJECTS PAGE ───────────────────────────────────────────────────────────
const ProjectsPage = () => {
  const [tab, setTab] = useState('individual');
  
  return (
    <div>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:800, 
                     fontSize:'2.5rem', margin:'0 0 0.5rem'}}>
           Bài tập lớn
        </h1>
        <p style={{color:'#888', fontFamily:'Quicksand', fontSize:'0.85rem'}}>
          Dự án thực tế để rèn luyện kỹ năng toàn diện
        </p>
      </div>
      
      <div style={{display:'flex', gap:'0.5rem', marginBottom:'2rem'}}>
        {[['individual','👤 Cá nhân'],['group','👥 Nhóm']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding:'0.6rem 1.5rem', borderRadius:'8px',
            border:`1px solid ${tab===id ? '#ff79c6' : 'rgba(255,255,255,0.1)'}`,
            background: tab===id ? 'rgba(255,121,198,0.15)' : 'rgba(255,255,255,0.03)',
            color: tab===id ? '#ff79c6' : '#888',
            fontFamily:'Be Vietnam Pro', fontWeight:600, cursor:'pointer', fontSize:'0.85rem'
          }}>{label}</button>
        ))}
      </div>
      
      <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
        {bigProjects[tab].map((proj, i) => (
          <div key={i} style={{
            background:'rgba(255,255,255,0.02)', borderRadius:'16px',
            border:'1px solid rgba(255,121,198,0.2)', padding:'2rem'
          }}>
            <div style={{display:'flex', justifyContent:'space-between', 
                          flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem'}}>
              <h2 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:800, 
                           fontSize:'1.3rem', margin:0}}>
                {proj.title}
              </h2>
              <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
                <span style={{padding:'3px 10px', borderRadius:'100px', fontSize:'0.75rem',
                  background:'rgba(255,184,108,0.15)', color:'#ffb86c', fontFamily:'Quicksand'}}>
                  ⏱ {proj.duration}
                </span>
                <span style={{padding:'3px 10px', borderRadius:'100px', fontSize:'0.75rem',
                  background:'rgba(80,250,123,0.15)', color:'#50fa7b', fontFamily:'Quicksand'}}>
                  {proj.level}
                </span>
                {proj.team && <span style={{padding:'3px 10px', borderRadius:'100px', fontSize:'0.75rem',
                  background:'rgba(189,147,249,0.15)', color:'#bd93f9', fontFamily:'Quicksand'}}>
                  👥 {proj.team}
                </span>}
              </div>
            </div>
            
            <p style={{color:'#ccc', lineHeight:'1.6', marginBottom:'1rem',
                        fontFamily:'Quicksand', fontSize:'0.83rem'}}>
              {proj.desc}
            </p>
            
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(260px,100%), 1fr))', gap:'0.5rem', marginBottom:'1rem'}}>
              {(proj.features || proj.modules).map((f, fi) => (
                <div key={fi} style={{
                  display:'flex', alignItems:'flex-start', gap:'0.5rem',
                  padding:'0.5rem 0.75rem', background:'rgba(255,255,255,0.03)',
                  borderRadius:'8px', fontSize:'0.8rem', fontFamily:'Quicksand', color:'#ddd'
                }}>
                  <span style={{color:'#50fa7b', flexShrink:0}}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            
            <div style={{
              padding:'0.75rem 1rem', background:'rgba(189,147,249,0.1)',
              borderRadius:'8px', border:'1px solid rgba(189,147,249,0.2)'
            }}>
              <span style={{color:'#bd93f9', fontFamily:'Quicksand', fontSize:'0.8rem'}}>
                🔧 Tech stack: {proj.tech}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TIPS PAGE ───────────────────────────────────────────────────────────────
const TipsPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  
  return (
    <div>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:800, 
                     fontSize:'2.5rem', margin:'0 0 0.5rem'}}>
           Tips & Tricks Python
        </h1>
        <p style={{color:'#888', fontFamily:'Quicksand', fontSize:'0.85rem'}}>
          Thủ thuật và mẹo lập trình Python chuyên nghiệp
        </p>
      </div>
      
      {/* Category tabs */}
      <div style={{display:'flex', gap:'0.5rem', marginBottom:'2rem', flexWrap:'wrap'}}>
        {tips.map((cat, i) => (
          <button key={i} onClick={() => setActiveCategory(i)} style={{
            padding:'0.6rem 1rem', borderRadius:'8px',
            border:`1px solid ${activeCategory===i ? '#50fa7b' : 'rgba(255,255,255,0.1)'}`,
            background: activeCategory===i ? 'rgba(80,250,123,0.12)' : 'rgba(255,255,255,0.03)',
            color: activeCategory===i ? '#50fa7b' : '#888',
            fontFamily:'Be Vietnam Pro', fontWeight:600, cursor:'pointer', fontSize:'0.82rem'
          }}>{cat.category}</button>
        ))}
      </div>
      
      {tips[activeCategory] && (
        <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
          {tips[activeCategory].items.map((tip, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.02)', borderRadius:'16px',
              border:'1px solid rgba(80,250,123,0.15)', padding:'1.5rem'
            }}>
              <h3 style={{color:'#f1fa8c', fontFamily:'Be Vietnam Pro', fontWeight:700, 
                           fontSize:'1.05rem', marginBottom:'1rem'}}>
                ⚡ {tip.title}
              </h3>
              <CodeBlock code={tip.code} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
const HomePage = ({ onSelectChapter }) => {
  const stats = [
    { n: '6', label: 'Chương học' },
    { n: '20+', label: 'Chủ đề' },
    { n: '60+', label: 'Bài tập' },
    { n: '∞', label: 'Kiến thức' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        textAlign:'center', padding:'4rem 2rem',
        background:'radial-gradient(ellipse at 50% 0%, rgba(189,147,249,0.15) 0%, transparent 60%)',
        borderRadius:'24px', marginBottom:'3rem',
        border:'1px solid rgba(189,147,249,0.1)', position:'relative', overflow:'hidden'
      }}>
        <div style={{fontSize:'5rem', marginBottom:'1rem', lineHeight:1}}>🐍</div>
        <h1 style={{
          fontFamily:'Be Vietnam Pro', fontWeight:800, fontSize:'3.5rem', 
          margin:'0 0 1rem', letterSpacing:'-0.03em', lineHeight:1.1,
          background:'linear-gradient(135deg, #f1fa8c, #ff79c6, #8be9fd)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
        }}>
          Python Mastery
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)', fontFamily:'Quicksand', 
                    fontSize:'1rem', maxWidth:600, margin:'0 auto 2rem',
                    lineHeight:1.6}}>
          Học Python vui !!!
        </p>
        
        {/* Stats */}
        <div style={{display:'flex', justifyContent:'center', gap:'2rem', 
                      flexWrap:'wrap', marginBottom:'0.5rem'}}>
          {stats.map((s, i) => (
            <div key={i} style={{textAlign:'center'}}>
              <div style={{color:'#f1fa8c', fontFamily:'Be Vietnam Pro', fontWeight:800, fontSize:'2rem'}}>
                {s.n}
              </div>
              <div style={{color:'#666', fontFamily:'Quicksand', fontSize:'0.75rem'}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chapters grid */}
      <h2 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:800, 
                   fontSize:'1.5rem', marginBottom:'1.5rem'}}>
         Nội dung chương trình
      </h2>
      
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap:'1rem', marginBottom:'3rem'}}>
        {chapters.map((ch, ci) => (
          <div key={ch.id} onClick={() => onSelectChapter(ci)}
            style={{
              background:`linear-gradient(135deg, ${ch.dark}, rgba(${hexToRgb(ch.color)},0.1))`,
              borderRadius:'16px', padding:'1.75rem',
              border:`1px solid rgba(${hexToRgb(ch.color)},0.2)`,
              cursor:'pointer', transition:'all 0.2s', position:'relative', overflow:'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = ch.color;
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(${hexToRgb(ch.color)},0.2)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `rgba(${hexToRgb(ch.color)},0.2)`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{position:'absolute',top:'-10%',right:'-5%',fontSize:'6rem',
                          opacity:0.07,userSelect:'none',pointerEvents:'none'}}>
              {ch.emoji}
            </div>
            <div style={{fontSize:'2.5rem', marginBottom:'0.75rem'}}>{ch.emoji}</div>
            <div style={{color: ch.color, fontFamily:'Quicksand', fontSize:'0.7rem',
                          letterSpacing:'0.1em', marginBottom:'0.25rem'}}>
              CHƯƠNG {ch.id}
            </div>
            <h3 style={{color:'white', fontFamily:'Be Vietnam Pro', fontWeight:700, 
                         fontSize:'1.2rem', margin:'0 0 0.25rem'}}>
              {ch.title}
            </h3>
            <p style={{color:'rgba(255,255,255,0.5)', fontFamily:'Quicksand', 
                        fontSize:'0.78rem', margin:'0 0 1rem'}}>
              {ch.subtitle}
            </p>
            <div style={{
              display:'inline-block', padding:'3px 10px',
              background:`rgba(${hexToRgb(ch.color)},0.15)`,
              borderRadius:'100px', color: ch.color,
              fontFamily:'Quicksand', fontSize:'0.72rem'
            }}>
              {ch.topics.length} bài học →
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick links */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(200px,100%),1fr))', gap:'1rem'}}>
        {[
          {id:'projects', emoji:'', title:'Bài tập lớn', desc:'Dự án cá nhân & nhóm', color:'#ff79c6'},
          {id:'tests',    emoji:'', title:'Đề kiểm tra', desc:'3 đề thực hành',        color:'#ffb86c'},
          {id:'tips',     emoji:'', title:'Tips & Tricks',desc:'Thủ thuật chuyên nghiệp',color:'#50fa7b'},
          {id:'instructor',emoji:'',title:'Giảng viên', desc:'Phúc Trần — phuctv@dlu.edu.vn',color:'#63b3ed'},
        ].map(item => (
          <div key={item.id} onClick={() => onSelectChapter(item.id)} style={{
            background:`rgba(${hexToRgb(item.color)},0.08)`, borderRadius:'16px',
            border:`1px solid rgba(${hexToRgb(item.color)},0.2)`, padding:'1.5rem',
            cursor:'pointer', transition:'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background=`rgba(${hexToRgb(item.color)},0.13)`; e.currentTarget.style.borderColor=item.color; }}
          onMouseLeave={e => { e.currentTarget.style.background=`rgba(${hexToRgb(item.color)},0.08)`; e.currentTarget.style.borderColor=`rgba(${hexToRgb(item.color)},0.2)`; }}
          >
            <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{item.emoji}</div>
            <h3 style={{color:item.color,fontFamily:'Be Vietnam Pro',fontWeight:700,margin:'0 0 0.25rem'}}>{item.title}</h3>
            <p style={{color:'#888',fontFamily:'Quicksand',fontSize:'0.78rem',margin:0}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── INSTRUCTOR PAGE ────────────────────────────────────────────────────────
const InstructorPage = () => (
  <div>
    <div style={{marginBottom:'2rem'}}>
      <h1 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'2.5rem',margin:'0 0 0.5rem'}}>
         Giảng viên hướng dẫn
      </h1>
    </div>

    {/* Profile card */}
    <div style={{
      background:'linear-gradient(135deg,#0d1b2a,rgba(99,179,237,0.15))',
      borderRadius:'20px', border:'1px solid rgba(99,179,237,0.3)',
      padding:'2.5rem', marginBottom:'2rem', position:'relative', overflow:'hidden'
    }}>
      <div style={{position:'absolute',top:'-5%',right:'-3%',fontSize:'10rem',opacity:0.05}}>🎓</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:'2rem',alignItems:'flex-start'}}>
        {/* Avatar */}
        <div style={{
          width:120,height:120,borderRadius:'50%',flexShrink:0,
          background:'linear-gradient(135deg,#63b3ed,#9f7aea)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'3.5rem',border:'3px solid rgba(99,179,237,0.4)',
          boxShadow:'0 0 30px rgba(99,179,237,0.3)'
        }}>
          {instructor.avatar}
        </div>

        {/* Info */}
        <div style={{flex:1,minWidth:250}}>
          <div style={{color:'#63b3ed',fontFamily:'Quicksand',fontSize:'0.75rem',letterSpacing:'0.2em',marginBottom:'0.3rem'}}>
            GIẢNG VIÊN
          </div>
          <h2 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'2rem',margin:'0 0 0.25rem'}}>
            {instructor.fullName}
          </h2>
          <p style={{color:'#a0aec0',fontFamily:'Quicksand',fontSize:'0.85rem',margin:'0 0 1rem'}}>
            {instructor.title}
          </p>
          <p style={{color:'#81e6d9',fontFamily:'Be Vietnam Pro',fontWeight:600,fontSize:'0.9rem',margin:'0 0 1.5rem'}}>
             {instructor.university}
          </p>

          {/* Contact */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>
            {[
              {icon:'✉️', label:'Email', val: instructor.email, href:`mailto:${instructor.email}`},
              {icon:'📞', label:'Điện thoại', val: instructor.phone, href:`tel:${instructor.phone.replace(/\s/g,'')}`},
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                display:'flex',alignItems:'center',gap:'0.5rem',
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'10px', padding:'0.6rem 1rem', textDecoration:'none',
                color:'white', fontFamily:'Quicksand', fontSize:'0.82rem',
                transition:'all 0.2s'
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,179,237,0.15)';e.currentTarget.style.borderColor='#63b3ed';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}
              >
                <span>{item.icon}</span>
                <div>
                  <div style={{color:'#718096',fontSize:'0.7rem'}}>{item.label}</div>
                  <div style={{color:'#63b3ed'}}>{item.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Details grid */}
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
      {/* Bio */}
      <div style={{background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.06)',padding:'1.5rem',gridColumn:'1/-1'}}>
        <h3 style={{color:'#f1fa8c',fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'0.75rem'}}> Giới thiệu</h3>
        <p style={{color:'#e2e2e2',lineHeight:'1.7',fontFamily:'Quicksand',fontSize:'0.85rem',margin:0}}>{instructor.bio}</p>
      </div>

      {/* Office info */}
      <div style={{background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(99,179,237,0.15)',padding:'1.5rem'}}>
        <h3 style={{color:'#63b3ed',fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'1rem'}}> Hướng nghiên cứu</h3>
        <p style={{color:'#ccc',fontFamily:'Quicksand',fontSize:'0.82rem',marginBottom:'0.75rem'}}>
           {instructor.office}
        </p>
        <div style={{background:'rgba(99,179,237,0.1)',borderRadius:'8px',padding:'0.75rem',border:'1px solid rgba(99,179,237,0.2)'}}>
          <div style={{color:'#63b3ed',fontFamily:'Quicksand',fontSize:'0.78rem',marginBottom:'0.25rem'}}>Email:</div>
          <div style={{color:'#e2e2e2',fontFamily:'Quicksand',fontSize:'0.78rem'}}>{instructor.officeHours}</div>
        </div>
      </div>

      {/* Subjects */}
      <div style={{background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(159,122,234,0.15)',padding:'1.5rem'}}>
        <h3 style={{color:'#9f7aea',fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'1rem'}}> Môn học phụ trách</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          {instructor.subjects.map((s,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.4rem 0.75rem',background:'rgba(159,122,234,0.1)',borderRadius:'8px',color:'#e2e2e2',fontFamily:'Quicksand',fontSize:'0.82rem'}}>
              <span style={{color:'#9f7aea'}}>▶</span>{s}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Quotes */}
    <div style={{marginBottom:'2rem'}}>
      <h3 style={{color:'#f1fa8c',fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'1rem'}}>💬 Quan điểm giảng dạy</h3>
      <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
        {instructor.quotes.map((q,i) => (
          <blockquote key={i} style={{
            background:'rgba(241,250,140,0.05)', borderLeft:'4px solid #f1fa8c',
            borderRadius:'0 12px 12px 0', padding:'1rem 1.5rem', margin:0,
            color:'#e2e2e2', fontFamily:'Quicksand', fontSize:'0.87rem',
            lineHeight:'1.7', fontStyle:'italic'
          }}>
            {q} <span style={{color:'#f1fa8c',fontStyle:'normal'}}>— {instructor.name}</span>
          </blockquote>
        ))}
      </div>
    </div>

    {/* Contact form hint */}
    <div style={{
      background:'linear-gradient(135deg,rgba(80,250,123,0.08),rgba(99,179,237,0.08))',
      borderRadius:'16px', border:'1px solid rgba(80,250,123,0.2)',
      padding:'1.5rem', textAlign:'center'
    }}>
      <p style={{color:'#50fa7b',fontFamily:'Be Vietnam Pro',fontWeight:700,fontSize:'1.1rem',marginBottom:'0.5rem'}}>
        📧 Liên hệ hỏi bài & hỗ trợ
      </p>
      <p style={{color:'#aaa',fontFamily:'Quicksand',fontSize:'0.83rem',margin:'0 0 1rem'}}>
        Sinh viên có thể liên hệ qua email hoặc số điện thoại
      </p>
      <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
        <a href={'mailto:'+instructor.email} style={{
          padding:'0.6rem 1.5rem', borderRadius:'8px', textDecoration:'none',
          background:'rgba(80,250,123,0.15)', border:'1px solid #50fa7b',
          color:'#50fa7b', fontFamily:'Be Vietnam Pro', fontWeight:700, fontSize:'0.85rem'
        }}>✉️ {instructor.email}</a>
        <a href={'tel:'+instructor.phone.replace(/\s/g,'')} style={{
          padding:'0.6rem 1.5rem', borderRadius:'8px', textDecoration:'none',
          background:'rgba(99,179,237,0.15)', border:'1px solid #63b3ed',
          color:'#63b3ed', fontFamily:'Be Vietnam Pro', fontWeight:700, fontSize:'0.85rem'
        }}>📞 {instructor.phone}</a>
      </div>
    </div>
  </div>
);

// ─── PRACTICE TESTS PAGE ────────────────────────────────────────────────────
const PracticeTestsPage = () => {
  const [openTest, setOpenTest] = useState(null);
  return (
    <div>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'2.5rem',margin:'0 0 0.5rem'}}>
          📝 Đề kiểm tra thực hành
        </h1>
        <p style={{color:'#888',fontFamily:'Quicksand',fontSize:'0.85rem'}}>
          Đề thi thực hành theo từng chương — in ra và làm trong thời gian quy định
        </p>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
        {practiceTests.map((test,ti) => (
          <div key={test.id} style={{background:'rgba(255,255,255,0.02)',borderRadius:'16px',border:'1px solid rgba(241,250,140,0.2)',overflow:'hidden'}}>
            {/* Header */}
            <div
              onClick={() => setOpenTest(openTest===ti?null:ti)}
              style={{
                padding:'1.5rem', cursor:'pointer', display:'flex',
                justifyContent:'space-between', alignItems:'center',
                background: openTest===ti ? 'rgba(241,250,140,0.07)' : 'transparent'
              }}
            >
              <div>
                <h2 style={{color:'#f1fa8c',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'1.2rem',margin:'0 0 0.4rem'}}>{test.title}</h2>
                <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                  <span style={{color:'#ffb86c',fontFamily:'Quicksand',fontSize:'0.78rem'}}>⏱ {test.duration}</span>
                  {test.chapters.map(c => (
                    <span key={c} style={{background:'rgba(241,250,140,0.1)',color:'#f1fa8c',borderRadius:'100px',padding:'1px 10px',fontFamily:'Quicksand',fontSize:'0.75rem'}}>{c}</span>
                  ))}
                  <span style={{color:'#50fa7b',fontFamily:'Quicksand',fontSize:'0.78rem'}}>
                    {test.problems.reduce((s,p)=>s+p.points,0)} điểm tổng
                  </span>
                </div>
              </div>
              <span style={{color:'#f1fa8c',fontSize:'1.2rem'}}>{openTest===ti?'▾':'▸'}</span>
            </div>

            {/* Problems */}
            {openTest===ti && (
              <div style={{padding:'0 1.5rem 1.5rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
                {test.problems.map((prob,pi) => (
                  <div key={pi} style={{background:'rgba(255,255,255,0.03)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.08)',padding:'1.25rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.75rem',flexWrap:'wrap',gap:'0.5rem'}}>
                      <h3 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:700,fontSize:'0.95rem',margin:0}}>{prob.title}</h3>
                      <span style={{background:'rgba(80,250,123,0.15)',color:'#50fa7b',borderRadius:'100px',padding:'2px 10px',fontFamily:'Quicksand',fontSize:'0.78rem',flexShrink:0}}>
                        {prob.points} điểm
                      </span>
                    </div>
                    <pre style={{color:'#ccc',fontFamily:'Quicksand',fontSize:'0.8rem',lineHeight:'1.7',whiteSpace:'pre-wrap',margin:0}}>{prob.desc}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── EXTRA EXERCISES PAGE ────────────────────────────────────────────────────
const ExtraExercisesPage = ({ chapterId, topicId, chapterColor, onBack }) => {
  const key = topicId;
  const exercises = extraExercises[key] || [];
  const labs = extraLabs[key] || [];
  const [openSol, setOpenSol] = useState(null);

  if (exercises.length === 0 && labs.length === 0) {
    return (
      <div style={{padding:'2rem',textAlign:'center',color:'#888',fontFamily:'Quicksand'}}>
        <p>Chưa có bài tập bổ sung cho chủ đề này.</p>
        <button onClick={onBack} style={{marginTop:'1rem',padding:'0.5rem 1.5rem',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'white',borderRadius:'8px',cursor:'pointer',fontFamily:'Be Vietnam Pro'}}>← Quay lại</button>
      </div>
    );
  }

  const color = chapterColor || '#00FF88';

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.5rem'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'white',borderRadius:'8px',padding:'0.5rem 1rem',cursor:'pointer',fontFamily:'Be Vietnam Pro',fontWeight:700}}>←</button>
        <h2 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:800,fontSize:'1.5rem',margin:0}}>
          📚 Bài tập bổ sung
        </h2>
      </div>

      {exercises.length > 0 && (
        <div style={{marginBottom:'2rem'}}>
          <h3 style={{color:color,fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'1rem'}}>🏋️ Bài tập thực hành ({exercises.length} bài)</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {exercises.map((ex,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.02)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.07)',overflow:'hidden'}}>
                <div style={{padding:'1.25rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem',flexWrap:'wrap',gap:'0.5rem'}}>
                    <h4 style={{color:'white',fontFamily:'Be Vietnam Pro',fontWeight:700,margin:0,fontSize:'0.95rem'}}>{ex.title}</h4>
                    {ex.level && <span style={{background:`rgba(${hexToRgb(color)},0.15)`,color:color,borderRadius:'100px',padding:'2px 10px',fontFamily:'Quicksand',fontSize:'0.75rem'}}>{ex.level}</span>}
                  </div>
                  <p style={{color:'#ccc',fontFamily:'Quicksand',fontSize:'0.82rem',lineHeight:'1.6',marginBottom:'0.75rem'}}>{ex.desc}</p>
                  <div style={{background:'rgba(0,0,0,0.3)',borderRadius:'8px',padding:'0.6rem 1rem',borderLeft:'3px solid #f1fa8c',marginBottom:'0.75rem'}}>
                    <span style={{color:'#f1fa8c',fontFamily:'Quicksand',fontSize:'0.78rem'}}>💡 {ex.hint}</span>
                  </div>
                  {ex.solution && (
                    <button onClick={()=>setOpenSol(openSol===i?null:i)} style={{
                      background:'rgba(80,250,123,0.1)',border:'1px solid rgba(80,250,123,0.3)',
                      color:'#50fa7b',borderRadius:'8px',padding:'0.4rem 1rem',
                      cursor:'pointer',fontFamily:'Quicksand',fontSize:'0.78rem'
                    }}>
                      {openSol===i?'🙈 Ẩn code mẫu':'👁 Xem code mẫu'}
                    </button>
                  )}
                </div>
                {openSol===i && ex.solution && (
                  <div style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                    <CodeBlock code={ex.solution} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {labs.length > 0 && (
        <div>
          <h3 style={{color:'#8be9fd',fontFamily:'Be Vietnam Pro',fontWeight:700,marginBottom:'1rem'}}>🔬 Lab bổ sung ({labs.length} lab)</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {labs.map((lab,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.02)',borderRadius:'12px',border:'1px solid rgba(139,233,253,0.15)',padding:'1.5rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.75rem',flexWrap:'wrap',gap:'0.5rem'}}>
                  <h4 style={{color:'#8be9fd',fontFamily:'Be Vietnam Pro',fontWeight:700,margin:0}}>{lab.title}</h4>
                  <div style={{display:'flex',gap:'0.5rem'}}>
                    {lab.difficulty && <span style={{background:'rgba(255,184,108,0.1)',color:'#ffb86c',borderRadius:'100px',padding:'2px 8px',fontFamily:'Quicksand',fontSize:'0.75rem'}}>{lab.difficulty}</span>}
                    {lab.duration && <span style={{background:'rgba(139,233,253,0.1)',color:'#8be9fd',borderRadius:'100px',padding:'2px 8px',fontFamily:'Quicksand',fontSize:'0.75rem'}}>⏱ {lab.duration}</span>}
                  </div>
                </div>
                {lab.desc && <p style={{color:'#aaa',fontFamily:'Quicksand',fontSize:'0.82rem',marginBottom:'1rem'}}>{lab.desc}</p>}
                <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                  {lab.steps.map((step,si) => (
                    <div key={si} style={{display:'flex',gap:'0.75rem',alignItems:'flex-start',padding:'0.4rem 0.75rem',background:'rgba(255,255,255,0.02)',borderRadius:'6px'}}>
                      <span style={{color:'#8be9fd',fontFamily:'JetBrains Mono',fontWeight:700,fontSize:'0.78rem',flexShrink:0}}>{si+1}.</span>
                      <span style={{color:'#ddd',fontFamily:'Quicksand',fontSize:'0.8rem',lineHeight:'1.5'}}>{step}</span>
                    </div>
                  ))}
                </div>
                {lab.expectedOutput && (
                  <div style={{marginTop:'1rem'}}>
                    <div style={{color:'#50fa7b',fontFamily:'Quicksand',fontSize:'0.75rem',marginBottom:'0.3rem'}}>Expected output:</div>
                    <pre style={{background:'#1e1f2e',borderRadius:'8px',padding:'0.75rem 1rem',color:'#f8f8f2',fontFamily:'JetBrains Mono',fontSize:'0.78rem',overflowX:'auto'}}>{lab.expectedOutput}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── APP ROOT ────────────────────────────────────────────────────────────────
// Error Boundary to prevent white screen on Vercel
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:'100vh',background:'#0a0a14',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif'}}>
          <div style={{textAlign:'center',maxWidth:500}}>
            <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🐍</div>
            <h2 style={{color:'#ff5555',marginBottom:'1rem',fontSize:'1.5rem'}}>Có lỗi xảy ra</h2>
            <p style={{color:'#888',marginBottom:'1.5rem',fontSize:'0.9rem'}}>{String(this.state.error?.message || '')}</p>
            <button onClick={()=>window.location.reload()} style={{padding:'0.75rem 2rem',background:'#50fa7b',color:'#0a0a14',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:700,fontSize:'1rem'}}>
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom hook for responsive breakpoint
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTopic,   setActiveTopic]   = useState(null);
  const [extraView,     setExtraView]     = useState(false);
  // On mobile default closed, on desktop default open
  const [sidebarOpen,   setSidebarOpen]   = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  // Close sidebar on mobile when navigating
  const handleSelect = (chapterIdx, topicIdx) => {
    setActiveChapter(chapterIdx);
    setActiveTopic(topicIdx);
    setExtraView(false);
    if (isMobile) setSidebarOpen(false);
  };

  // Also close sidebar on mobile when screen shrinks
  useEffect(() => {
    // Close sidebar automatically on screen resize
    if (isMobile && sidebarOpen) setSidebarOpen(false);
    if (!isMobile && !sidebarOpen) setSidebarOpen(true);
  }, [isMobile]); // eslint-disable-line

  const renderContent = () => {
    try {
      if (activeChapter === null)         return <HomePage onSelectChapter={ci => handleSelect(ci, null)} />;
      if (activeChapter === 'projects')   return <ProjectsPage />;
      if (activeChapter === 'tips')       return <TipsPage />;
      if (activeChapter === 'instructor') return <InstructorPage />;
      if (activeChapter === 'tests')      return <PracticeTestsPage />;

      const chapter = chapters[activeChapter];
      if (!chapter) return <HomePage onSelectChapter={ci => handleSelect(ci, null)} />;

      if (activeTopic === null) {
        return <ChapterPage chapter={chapter} onSelectTopic={ti => handleSelect(activeChapter, ti)} />;
      }

      const topic = chapter.topics[activeTopic];
      if (!topic) return <ChapterPage chapter={chapter} onSelectTopic={ti => handleSelect(activeChapter, ti)} />;

      if (extraView) {
        return (
          <ExtraExercisesPage
            chapterId={activeChapter}
            topicId={topic.id}
            chapterColor={chapter.color}
            onBack={() => setExtraView(false)}
          />
        );
      }

      return (
        <TopicPage
          chapter={chapter}
          topic={topic}
          onBack={() => handleSelect(activeChapter, null)}
          onShowExtra={() => setExtraView(true)}
          hasExtra={!!(extraExercises[topic.id]?.length || extraLabs[topic.id]?.length)}
        />
      );
    } catch (e) {
      return (
        <div style={{padding:'2rem',textAlign:'center',color:'#ff5555'}}>
          <p>Lỗi hiển thị nội dung. <button onClick={()=>handleSelect(null,null)} style={{color:'#50fa7b',background:'none',border:'none',cursor:'pointer',fontWeight:700}}>Về trang chủ</button></p>
        </div>
      );
    }
  };

  const SIDEBAR_W = 280;

  return (
    <ErrorBoundary>
      <div style={{ minHeight:'100vh', background:'#0a0a14', color:'white', fontFamily:"'Be Vietnam Pro', sans-serif" }}>

        {/* ── Global CSS ─────────────────────────────────────── */}
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :root { font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
          html, body { background: #0a0a14; width: 100%; overflow-x: hidden; }
          body { font-family: 'Be Vietnam Pro', sans-serif; }
          h1,h2,h3,h4,h5 { font-family: 'Be Vietnam Pro', sans-serif; }
          button { font-family: 'Be Vietnam Pro', sans-serif; }
          a     { font-family: 'Be Vietnam Pro', sans-serif; }
          ::-webkit-scrollbar       { width:6px; height:6px; }
          ::-webkit-scrollbar-track { background:#0a0a14; }
          ::-webkit-scrollbar-thumb { background:#313244; border-radius:3px; }
          ::-webkit-scrollbar-thumb:hover { background:#44475a; }
          .code-line { min-height:1.4em; font-family:'JetBrains Mono',monospace; }
          /* Mobile overlay when sidebar open */
          .sidebar-overlay {
            display: none;
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.6);
            z-index: 99;
            backdrop-filter: blur(2px);
          }
          @media (max-width: 767px) {
            .sidebar-overlay.open { display: block; }
            .main-content {
              margin-left: 0 !important;
              max-width: 100% !important;
              padding: 1rem !important;
            }
            .sidebar-toggle {
              left: 1rem !important;
            }
          }
          @media (min-width: 768px) {
            .sidebar-overlay { display: none !important; }
          }
        `}</style>

        {/* ── Mobile overlay (tap to close sidebar) ──────────── */}
        <div
          className={'sidebar-overlay' + (isMobile && sidebarOpen ? ' open' : '')}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── Sidebar ────────────────────────────────────────── */}
        <aside style={{
          position: 'fixed',
          top: 0, left: 0,
          height: '100vh',
          width: SIDEBAR_W,
          background: '#0d0d1a',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
          zIndex: 100,
          transform: sidebarOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
          transition: 'transform 0.3s ease',
          fontFamily: "'Be Vietnam Pro', sans-serif",
        }}>
          {/* Logo */}
          <div style={{padding:'1.25rem 1.5rem',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'linear-gradient(135deg,#0d0d1a,#1a0d2e)',display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <div style={{fontSize:'2rem',lineHeight:1}}>🐍</div>
            <div>
              <div style={{color:'#f1fa8c',fontWeight:800,fontSize:'1rem',letterSpacing:'0.05em'}}>PYTHON</div>
              <div style={{color:'#bd93f9',fontWeight:700,fontSize:'0.65rem',letterSpacing:'0.18em'}}>Phúc Trần (phuctv@dlu.edu.vn)</div>
            </div>
            {/* Close btn on mobile */}
            {isMobile && (
              <button onClick={()=>setSidebarOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'#888',cursor:'pointer',fontSize:'1.2rem',lineHeight:1,padding:'0.25rem'}}>✕</button>
            )}
          </div>

          {/* Nav */}
          <nav style={{padding:'0.75rem 0'}}>
            <SidebarBtn active={activeChapter===null} color='#f1fa8c' onClick={()=>handleSelect(null,null)}>🏠 Trang chủ</SidebarBtn>

            {chapters.map((ch, ci) => (
              <SidebarChapter key={ch.id} ch={ch} ci={ci} activeChapter={activeChapter} activeTopic={activeTopic} onSelect={handleSelect} />
            ))}

            <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'0.75rem',paddingTop:'0.75rem'}}>
              {[
                {id:'projects',   label:'🚀 Bài tập lớn',  color:'#ff79c6'},
                {id:'tests',      label:'📝 Đề kiểm tra',  color:'#ffb86c'},
                {id:'tips',       label:'💡 Tips & Tricks', color:'#50fa7b'},
                {id:'instructor', label:'👨‍💻 Giảng viên',   color:'#63b3ed'},
              ].map(pg => (
                <SidebarBtn key={pg.id} active={activeChapter===pg.id} color={pg.color} onClick={()=>handleSelect(pg.id,null)}>
                  {pg.label}
                </SidebarBtn>
              ))}
            </div>
          </nav>
        </aside>

        {/* ── Hamburger / Toggle btn ──────────────────────────── */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(o => !o)}
          style={{
            position: 'fixed',
            top: '1rem',
            left: sidebarOpen ? SIDEBAR_W + 16 : '1rem',
            zIndex: 200,
            background: '#1e1e2e',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'white',
            borderRadius: '8px',
            width: 38, height: 38,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
            transition: 'left 0.3s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            flexShrink: 0,
          }}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* ── Main content ────────────────────────────────────── */}
        <main
          className="main-content"
          style={{
            marginLeft: !isMobile && sidebarOpen ? SIDEBAR_W : 0,
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh',
            padding: '2rem 2.5rem',
            maxWidth: !isMobile && sidebarOpen ? `calc(100% - ${SIDEBAR_W}px)` : '100%',
          }}
        >
          {/* Spacer for toggle button */}
          <div style={{height:'3rem'}} />

          <div style={{maxWidth: 900, margin: '0 auto'}}>

            {/* Breadcrumb */}
            {activeChapter !== null && (
              <div style={{display:'flex',alignItems:'center',gap:'0.4rem',flexWrap:'wrap',marginBottom:'1.25rem',fontSize:'0.8rem',color:'#666'}}>
                <button onClick={()=>handleSelect(null,null)} style={{background:'none',border:'none',color:'#888',cursor:'pointer',fontSize:'0.8rem',padding:0}}>Trang chủ</button>
                {typeof activeChapter==='number' && chapters[activeChapter] && (
                  <><span>›</span>
                  <button onClick={()=>handleSelect(activeChapter,null)} style={{background:'none',border:'none',color:'#888',cursor:'pointer',fontSize:'0.8rem',padding:0}}>
                    {chapters[activeChapter].title}
                  </button></>
                )}
                {activeTopic!==null && typeof activeChapter==='number' && chapters[activeChapter]?.topics[activeTopic] && (
                  <><span>›</span><span style={{color:'white'}}>{chapters[activeChapter].topics[activeTopic].title}</span></>
                )}
                {activeChapter==='projects'   && <><span>›</span><span style={{color:'white'}}>Bài tập lớn</span></>}
                {activeChapter==='tips'        && <><span>›</span><span style={{color:'white'}}>Tips & Tricks</span></>}
                {activeChapter==='instructor' && <><span>›</span><span style={{color:'white'}}>Giảng viên</span></>}
                {activeChapter==='tests'      && <><span>›</span><span style={{color:'white'}}>Đề kiểm tra</span></>}
              </div>
            )}

            {renderContent()}

            {/* Footer */}
            <footer style={{marginTop:'4rem',paddingTop:'2rem',borderTop:'1px solid rgba(255,255,255,0.06)',textAlign:'center',color:'#444',fontSize:'0.78rem'}}>
              <p>🐍 Python Mastery — Học Python toàn diện</p>
              <p style={{marginTop:'0.3rem',color:'#555'}}>
                👨‍💻 GV: Trần Vĩnh Phúc — <a href="mailto:phuctv@dlu.edu.vn" style={{color:'#63b3ed',textDecoration:'none'}}>phuctv@dlu.edu.vn</a>
              </p>
            </footer>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

// ─── SMALL SIDEBAR HELPERS ───────────────────────────────────────────────────
function SidebarBtn({ active, color, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width:'100%', textAlign:'left', padding:'0.6rem 1.5rem',
      background: active ? `rgba(${hexToRgb(color)},0.12)` : 'transparent',
      border:'none', cursor:'pointer',
      color: active ? color : '#aaa',
      fontSize:'0.85rem', fontWeight: active ? 700 : 500,
      borderLeft: active ? `3px solid ${color}` : '3px solid transparent',
      transition:'all 0.15s', display:'block',
    }}>
      {children}
    </button>
  );
}

function SidebarChapter({ ch, ci, activeChapter, activeTopic, onSelect }) {
  const [open, setOpen] = useState(activeChapter === ci);
  useEffect(() => { if (activeChapter === ci) setOpen(true); }, [activeChapter, ci]);
  const color = ch.color;
  return (
    <div>
      <button onClick={() => setOpen(o => !o)} style={{
        width:'100%', textAlign:'left', padding:'0.65rem 1.5rem',
        background: activeChapter===ci ? `rgba(${hexToRgb(color)},0.1)` : 'transparent',
        border:'none', cursor:'pointer',
        color: activeChapter===ci ? color : '#ccc',
        fontSize:'0.85rem', fontWeight:600,
        borderLeft: activeChapter===ci ? `3px solid ${color}` : '3px solid transparent',
        transition:'all 0.15s', display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span>{ch.emoji} {ch.title}</span>
        <span style={{opacity:0.5, fontSize:'0.75rem'}}>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div style={{background:'rgba(0,0,0,0.15)'}}>
          {ch.topics.map((topic, ti) => (
            <button key={topic.id} onClick={() => onSelect(ci, ti)} style={{
              width:'100%', textAlign:'left', padding:'0.45rem 1.5rem 0.45rem 2.25rem',
              background: activeTopic===ti && activeChapter===ci ? `rgba(${hexToRgb(color)},0.15)` : 'transparent',
              border:'none', cursor:'pointer',
              color: activeTopic===ti && activeChapter===ci ? color : '#888',
              fontSize:'0.78rem', fontWeight: activeTopic===ti && activeChapter===ci ? 600 : 400,
              borderLeft: activeTopic===ti && activeChapter===ci ? `2px solid ${color}` : '2px solid transparent',
              transition:'all 0.12s', display:'block',
            }}>
              {topic.icon} {topic.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
