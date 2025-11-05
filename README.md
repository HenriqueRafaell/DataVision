# 📊 DataVision — Dashboard de Estatísticas Interativo

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=recharts&logoColor=white" />
</p>

---

## 💡 Sobre o projeto

**DataVision** é uma aplicação web que apresenta um **painel de estatísticas dinâmico**, com gráficos interativos baseados em dados simulados de diferentes categorias (como vendas, marketing, suporte e operações).  
Foi desenvolvida para demonstrar **integração entre backend em Python (FastAPI)** e **frontend moderno em React**, com foco em visualização de dados e design responsivo.

Este projeto faz parte do meu portfólio como estudante de **Engenharia de Software**, mostrando domínio tanto no desenvolvimento de APIs quanto na criação de interfaces gráficas de alto impacto visual.

---

## 🧱 Tecnologias utilizadas

### 🔹 Backend
- **Python + FastAPI**
- **SQLite** (banco local simples)
- **SQLModel / Pandas**
- **Uvicorn** (servidor de desenvolvimento)

### 🔹 Frontend
- **React (Vite)**
- **TailwindCSS** (tema escuro responsivo)
- **Recharts** (gráficos e visualizações)
- **Axios** (integração com API)

---

## 🎨 Funcionalidades

✅ API REST com endpoints de estatísticas  
✅ Geração de dados simulados via botão *Seed data*  
✅ Gráficos de linha e barras com atualização dinâmica  
✅ Layout escuro, moderno e responsivo  
✅ Separação completa entre frontend e backend  

---

## ⚙️ Como rodar o projeto

<details>
<summary><b>🐍 Backend (FastAPI + SQLite)</b></summary>

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
