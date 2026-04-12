# ariarch.dev — Projeto completo

Quatro páginas independentes conectadas por navegação compartilhada.

## 📁 Estrutura de arquivos

```
ariarch-final/
├── index.html              ← Portfólio principal (hero, projetos, experiência, contato)
├── .gitignore
│
├── pages/
│   ├── bio.html            ← Bio / Link in bio (Instagram-style)
│   ├── precos.html         ← Tabela de preços detalhada
│   └── contato.html        ← Formulário de contato
│
├── assets/
│   ├── css/
│   │   ├── portfolio.css   ← Estilos do portfólio principal (brand kit v2)
│   │   └── shared.css      ← Brand tokens + navbar das páginas secundárias
│   ├── js/
│   │   ├── portfolio.js    ← Scripts do portfólio (cursor, typed, counters…)
│   │   └── shared-nav.js   ← Lógica do hamburger + active state das páginas secundárias
│   ├── fonts/              ← Fontes locais futuras
│   └── icons/              ← Favicon / ícones futuros
│
├── components/             ← Snippets reutilizáveis futuros
│
└── docs/
    └── README.md
```

## 🔗 Mapa de navegação

```
index.html (Portfólio)
├── → pages/bio.html       (Bio / Links)
├── → pages/precos.html    (Tabela de Preços)
└── → pages/contato.html   (Formulário de Contato)

pages/bio.html
├── → ../index.html        (Portfólio)
├── → precos.html
└── → contato.html

pages/precos.html
├── → ../index.html        (Portfólio)
├── → bio.html
└── → contato.html

pages/contato.html
├── → ../index.html        (Portfólio)
├── → bio.html
└── → precos.html
```

## 🚀 Acesse
https://arianearchanjo.github.io/ariane-dev-services/

---
*Design & Código por ariarch.dev · 2026*
