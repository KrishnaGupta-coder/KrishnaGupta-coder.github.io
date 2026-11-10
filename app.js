/**
 * Krishna.OS — Personal AI Command Center
 * Shares AI Engine configuration across all *.github.io micro-apps via localStorage
 */
(function () {
  'use strict';

  const CONFIG_KEY = 'kg_ai_config';

  const APPS = [
    {
      day: 'DAY 1',
      title: 'GestureVision AI',
      emoji: '🖐️',
      category: 'vision',
      desc: '60 FPS browser hand-tracking HUD with 21 3D landmarks, pinch dials & synthesized audio feedback.',
      tags: ['MediaPipe', 'WebGL', 'Computer Vision'],
      liveUrl: 'https://krishnagupta-coder.github.io/GestureVision-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/GestureVision-AI'
    },
    {
      day: 'DAY 2',
      title: 'PromptShield AI',
      emoji: '🛡️',
      category: 'llm',
      desc: 'OWASP LLM01 scanner catching indirect RAG poisoning, tool-call delimiters, zero-width smuggling & DAN jailbreaks.',
      tags: ['LLM Security', 'Sanitizer', 'Zero-Latency'],
      liveUrl: 'https://krishnagupta-coder.github.io/PromptShield-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/PromptShield-AI'
    },
    {
      day: 'DAY 3',
      title: 'DocuVector AI',
      emoji: '🧭',
      category: 'llm',
      desc: 'Sublinear TF-IDF embedding engine & 2D polar cosine retrieval radar for local conceptual search.',
      tags: ['Vector Search', 'Cosine Sim', '2D Radar'],
      liveUrl: 'https://krishnagupta-coder.github.io/DocuVector-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/DocuVector-AI'
    },
    {
      day: 'DAY 4',
      title: 'TokenBudget AI',
      emoji: '💰',
      category: 'llm',
      desc: 'BPE token visualizer, 13-model pricing matrix (Gemini 3.8, Claude 4.6 Thinking, GPT-OSS, DeepSeek R1) & compressor.',
      tags: ['BPE Tokenizer', 'Cost Matrix', 'Compressor'],
      liveUrl: 'https://krishnagupta-coder.github.io/TokenBudget-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/TokenBudget-AI'
    },
    {
      day: 'DAY 5',
      title: 'ATS-Lens AI',
      emoji: '🎯',
      category: 'career',
      desc: 'Resume vs. Job Description ATS matcher, skill-gap detector, weak-bullet highlighter & AI rewrite assistant.',
      tags: ['PDF Parsing', 'ATS Score', 'Career'],
      liveUrl: 'https://krishnagupta-coder.github.io/ATS-Lens-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/ATS-Lens-AI'
    },
    {
      day: 'DAY 6',
      title: 'DiagramCraft AI',
      emoji: '📐',
      category: 'dev',
      desc: 'Plain-English & code-to-Mermaid diagram builder with GitHub-safe label quoting & instant SVG/PNG export.',
      tags: ['Mermaid.js', 'Architecture', 'SVG/PNG'],
      liveUrl: 'https://krishnagupta-coder.github.io/DiagramCraft-AI/',
      repoUrl: 'https://github.com/KrishnaGupta-coder/DiagramCraft-AI'
    },
    {
      day: 'AUTOMATION',
      title: 'AutoPilot Kit (Windows)',
      emoji: '🤖',
      category: 'automation',
      desc: 'Local Windows folder auto-organizer, system-wide AI clipboard hotkey & 1-command micro-app scaffolder.',
      tags: ['Python', 'PowerShell', 'Ollama Ready'],
      liveUrl: 'https://github.com/KrishnaGupta-coder/AutoPilot-Kit',
      repoUrl: 'https://github.com/KrishnaGupta-coder/AutoPilot-Kit',
      isRepoOnly: true
    },
    {
      day: 'DAEMON',
      title: 'Daily AI Intelligence Hub',
      emoji: '📡',
      category: 'automation',
      desc: 'Autonomous GitHub Action digest harvesting breaking arXiv CS.AI/CV/LG papers & trending HuggingFace models daily.',
      tags: ['GitHub Actions', 'arXiv', 'HuggingFace'],
      liveUrl: 'https://github.com/KrishnaGupta-coder/Daily-AI-Intelligence-Hub',
      repoUrl: 'https://github.com/KrishnaGupta-coder/Daily-AI-Intelligence-Hub',
      isRepoOnly: true
    }
  ];

  // DOM Elements
  const appsGrid = document.getElementById('appsGrid');
  const totalAppsCount = document.getElementById('totalAppsCount');
  const digestFeed = document.getElementById('digestFeed');
  const btnRefreshDigest = document.getElementById('btnRefreshDigest');
  const searchModal = document.getElementById('searchModal');
  const spotlightInput = document.getElementById('spotlightInput');
  const spotlightResults = document.getElementById('spotlightResults');
  const btnOpenSearch = document.getElementById('btnOpenSearch');

  // Settings Modal
  const settingsModal = document.getElementById('settingsModal');
  const btnOpenSettings = document.getElementById('btnOpenSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  const btnTestEngine = document.getElementById('btnTestEngine');
  const aiProvider = document.getElementById('aiProvider');
  const aiEndpoint = document.getElementById('aiEndpoint');
  const aiModel = document.getElementById('aiModel');
  const aiApiKey = document.getElementById('aiApiKey');
  const engineStatusDot = document.getElementById('engineStatusDot');
  const engineStatusText = document.getElementById('engineStatusText');
  const testResultMsg = document.getElementById('testResultMsg');

  let activeCategory = 'all';

  function renderApps() {
    const filtered = activeCategory === 'all' ? APPS : APPS.filter(a => a.category === activeCategory);
    totalAppsCount.textContent = APPS.filter(a => !a.isRepoOnly).length;
    appsGrid.innerHTML = '';

    filtered.forEach(app => {
      const card = document.createElement('article');
      card.className = 'app-card';
      card.innerHTML = `
        <div class="app-card-top">
          <div class="app-icon-title">
            <div class="app-emoji">${app.emoji}</div>
            <div>
              <span class="app-day">${app.day}</span>
              <h3>${app.title}</h3>
            </div>
          </div>
        </div>
        <p class="app-desc">${app.desc}</p>
        <div class="app-tags">
          ${app.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="app-actions">
          <a href="${app.liveUrl}" target="_blank" class="btn btn-primary">${app.isRepoOnly ? 'Open Toolkit' : 'Launch App'} &rarr;</a>
          <a href="${app.repoUrl}" target="_blank" class="btn btn-secondary">Repo</a>
        </div>
      `;
      appsGrid.appendChild(card);
    });
  }

  // Category Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.cat;
      renderApps();
    });
  });

  // Spotlight Search
  function openSearch() {
    searchModal.classList.remove('hidden');
    spotlightInput.value = '';
    renderSpotlight('');
    setTimeout(() => spotlightInput.focus(), 40);
  }

  function closeSearch() {
    searchModal.classList.add('hidden');
  }

  function renderSpotlight(query) {
    const q = query.trim().toLowerCase();
    const matches = APPS.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );

    spotlightResults.innerHTML = matches.map(m => `
      <a class="spot-item" href="${m.liveUrl}" target="_blank">
        <div class="spot-left">
          <span>${m.emoji}</span>
          <div>
            <b>${m.title}</b>
            <span class="spot-sub">${m.desc}</span>
          </div>
        </div>
        <span class="app-day">${m.day}</span>
      </a>
    `).join('') || '<div class="loading-box">No matching micro-app found.</div>';
  }

  btnOpenSearch.addEventListener('click', openSearch);
  spotlightInput.addEventListener('input', e => renderSpotlight(e.target.value));
  searchModal.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      settingsModal.classList.add('hidden');
    }
  });

  // Shared AI Config
  function getDefaultForProvider(provider) {
    switch (provider) {
      case 'ollama':
        return { endpoint: 'http://localhost:11434/api/chat', model: 'qwen2.5:7b' };
      case 'gemini':
        return { endpoint: 'https://generativelanguage.googleapis.com/v1beta/models', model: 'gemini-2.5-flash' };
      case 'groq':
        return { endpoint: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.3-70b-versatile' };
      case 'openai':
        return { endpoint: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' };
      default:
        return { endpoint: '', model: '' };
    }
  }

  function loadConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}');
      const provider = saved.provider || 'offline';
      aiProvider.value = provider;
      aiEndpoint.value = saved.endpoint || getDefaultForProvider(provider).endpoint;
      aiModel.value = saved.model || getDefaultForProvider(provider).model;
      aiApiKey.value = saved.apiKey || '';
      updateEngineBadge(saved);
    } catch {
      updateEngineBadge({ provider: 'offline' });
    }
  }

  function updateEngineBadge(cfg) {
    if (!cfg || !cfg.provider || cfg.provider === 'offline') {
      engineStatusDot.classList.remove('online');
      engineStatusText.textContent = 'AI Engine: Offline Mode';
    } else {
      engineStatusDot.classList.add('online');
      engineStatusText.textContent = `AI Engine: ${cfg.provider.toUpperCase()} (${cfg.model || 'Ready'})`;
    }
  }

  aiProvider.addEventListener('change', () => {
    const def = getDefaultForProvider(aiProvider.value);
    aiEndpoint.value = def.endpoint;
    aiModel.value = def.model;
  });

  btnOpenSettings.addEventListener('click', () => {
    loadConfig();
    testResultMsg.classList.add('hidden');
    settingsModal.classList.remove('hidden');
  });

  btnCloseSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));
  settingsModal.addEventListener('click', e => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });

  btnSaveSettings.addEventListener('click', () => {
    const cfg = {
      provider: aiProvider.value,
      endpoint: aiEndpoint.value.trim(),
      model: aiModel.value.trim(),
      apiKey: aiApiKey.value.trim()
    };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
    updateEngineBadge(cfg);
    settingsModal.classList.add('hidden');
  });

  btnTestEngine.addEventListener('click', async () => {
    const provider = aiProvider.value;
    testResultMsg.classList.remove('hidden', 'error');
    if (provider === 'offline') {
      testResultMsg.textContent = 'Offline deterministic mode active. Zero network calls required.';
      return;
    }
    testResultMsg.textContent = 'Testing connection...';
    try {
      if (provider === 'ollama') {
        const base = aiEndpoint.value.replace(/\/api\/.*$/, '');
        const res = await fetch(`${base}/api/tags`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        testResultMsg.textContent = `Connected to local Ollama! ${(data.models || []).length} models available.`;
      } else if (provider === 'gemini') {
        if (!aiApiKey.value.trim()) throw new Error('API key required for Gemini.');
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel.value.trim()}:generateContent?key=${aiApiKey.value.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: 'Reply with OK' }] }] })
        });
        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
        testResultMsg.textContent = `Gemini (${aiModel.value}) authenticated and ready!`;
      } else {
        if (!aiApiKey.value.trim()) throw new Error('API key required.');
        const res = await fetch(aiEndpoint.value.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiApiKey.value.trim()}`
          },
          body: JSON.stringify({
            model: aiModel.value.trim(),
            messages: [{ role: 'user', content: 'Reply OK' }],
            max_tokens: 5
          })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        testResultMsg.textContent = `Connected to ${provider.toUpperCase()} (${aiModel.value})!`;
      }
    } catch (err) {
      testResultMsg.classList.add('error');
      testResultMsg.textContent = `Connection failed: ${err.message}. Check CORS (for Ollama set OLLAMA_ORIGINS=*) or API key.`;
    }
  });

  // Live Daily AI Intelligence Feed from GitHub API
  async function fetchDigestFeed() {
    digestFeed.innerHTML = '<div class="loading-box">Fetching latest intelligence digests...</div>';
    try {
      const res = await fetch('https://api.github.com/repos/KrishnaGupta-coder/Daily-AI-Intelligence-Hub/contents/reports');
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const files = await res.json();
      const latest = files.filter(f => f.name.endsWith('.md')).sort((a, b) => b.name.localeCompare(a.name)).slice(0, 4);

      if (latest.length === 0) {
        digestFeed.innerHTML = '<div class="loading-box">No reports found yet.</div>';
        return;
      }

      // Fetch content of most recent digest for preview
      const rawRes = await fetch(latest[0].download_url);
      const mdText = await rawRes.text();
      const paperLines = mdText.split('\n').filter(l => l.startsWith('| **')).slice(0, 4);

      let html = paperLines.map(line => {
        const cols = line.split('|').map(c => c.trim());
        const title = (cols[1] || '').replace(/\*\*/g, '');
        const date = (cols[2] || '').replace(/`/g, '');
        const linkMatch = (cols[3] || '').match(/\((https?:\/\/[^)]+)\)/);
        const url = linkMatch ? linkMatch[1] : latest[0].html_url;
        return `
          <div class="digest-item">
            <a href="${url}" target="_blank">${title || 'AI Research Digest'}</a>
            <span class="digest-meta">arXiv &bull; ${date}</span>
          </div>
        `;
      }).join('');

      html += latest.slice(1).map(f => `
        <div class="digest-item">
          <a href="${f.html_url}" target="_blank">Intelligence Archive: ${f.name.replace('.md', '')}</a>
          <span class="digest-meta">Verified Daily Report</span>
        </div>
      `).join('');

      digestFeed.innerHTML = html || '<div class="loading-box">Digest parsed cleanly.</div>';
    } catch (err) {
      digestFeed.innerHTML = `<div class="loading-box">Offline / Rate-limited (${err.message}). View archive on GitHub.</div>`;
    }
  }

  btnRefreshDigest.addEventListener('click', fetchDigestFeed);

  renderApps();
  loadConfig();
  fetchDigestFeed();
})();
