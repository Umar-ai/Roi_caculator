# ROI Calculator for Refurbishers 🧠💰

This project is a smart **ROI calculator** built to help **refurbishers** make data-driven decisions on whether to sell a product as **refurbished** or **used**, based on profitability. It combines market data with intelligent AI-powered summaries to make the process fast, clear, and actionable.

---

## 🧩 What It Does

- Takes device model and defect info as input
- Fetches current market prices using:
  - **eBay API** 📦
  - **Tavily** (web scraping tool) 🌐
- Uses **Gemini AI** via **LangChain** to:
  - Summarize ROI
  - Recommend whether to sell as refurbished or used
- Outputs a clean markdown report with profit/loss for both options

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
git clone https://github.com/Umar-ai/Roi_calculator.git
cd Roi_calculator

npm install


4. Import n8n workflow
Open your n8n instance.

Paste the contents of workflows/n8n.json into a new workflow.

Update any required credentials (e.g., API Keys).

5. Run the server
bash
Copy
Edit
npm run dev

👨‍💻 Author
Developed by Umar Farooq Abbasi