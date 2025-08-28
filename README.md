# ROI Calculator for Refurbishers 🧠💰

This project is a smart **ROI calculator** built to help **refurbishers** make data-driven decisions on whether to sell a product as **refurbished** or **used**, based on profitability. It combines market data with intelligent AI-powered summaries to make the process fast, clear, and actionable.

---

## Features  
- Input device model and defects directly via a simple form  
- Fetches **real-time market prices** from trusted sources  
- AI-powered decision support to compare **refurbished vs used resale value**  
- Generates a **profit/loss ROI summary** in clear, structured markdown format  
- Provides actionable recommendations for refurbishers to maximize revenue  
- Integrates seamlessly with **n8n workflows** for automation  

---

## 🔧 Technologies Used

| Tool | Purpose |
|------|---------|
| [n8n](https://n8n.io/) | Workflow automation engine |
| [LangChain](https://www.langchain.com/) | AI summary generation |
| [Gemini AI](https://ai.google.dev/gemini-api) | LLM for smart decisions |
| [Tavily](https://www.tavily.com/) | Web scraping tool for real-time prices |
| [eBay API](https://developer.ebay.com/) | Market data and product prices |
| Node.js | Server runtime |
| JSON | Input/output formatting |

---


---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/KeenSight-AI-Demo-Apps/Roi_calculator.git
cd Roi_calculator

npm install


4. Import n8n workflow from n8n.json file
Open your n8n instance.

Paste the contents of workflows/n8n.json into a new workflow.

Update any required credentials (e.g., API Keys).

5. Run the server

npm run dev

👨‍💻 Author
Developed by Umar Farooq Abbasi