# Event Hero - 活動宣傳文案生成器

Event Hero 是一個全端網頁應用程式，能夠幫助活動主辦方快速生成專業的活動宣傳文案。使用 Together AI 的語言模型和 Google Maps API 來提供智能文案生成和地點驗證功能。

## 功能特點

- 🎯 智能文案生成：根據活動資訊自動生成三種不同風格的宣傳文案
- 📍 地點驗證：使用 Google Maps API 驗證並格式化地址
- 📝 表單生成：自動建立活動報名表單（即將推出）
- 🎨 現代化 UI：使用 Tailwind CSS 打造的響應式介面

## 技術棧

### 前端
- React + Vite
- React Router DOM
- Tailwind CSS
- Axios

### 後端
- Python + Flask
- Together AI API
- Google Maps API
- Google Apps Script（即將推出）

## 快速開始

### 前端設置

```bash
cd client
npm install
npm run dev
```

### 後端設置

```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 環境變數

在 `server/.env` 文件中設置：

```
TOGETHER_API_KEY=your_together_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FLASK_ENV=development
FLASK_APP=app.py
```

## 部署

### 前端部署（Vercel）
1. Fork 此專案
2. 在 Vercel 中導入專案
3. 設置環境變數
4. 部署！

### 後端部署（Render）
1. 在 Render 中建立新的 Web Service
2. 連接 GitHub 倉庫
3. 設置環境變數
4. 部署！

## 開發建議

- 使用 VS Code 或 Cursor IDE 進行開發
- 安裝 ESLint 和 Prettier 插件
- 遵循 Python PEP 8 風格指南
- 定期更新依賴包

## 貢獻指南

歡迎提交 Pull Request！請確保：

1. 程式碼遵循現有的風格
2. 新功能包含適當的測試
3. 更新相關文檔

## 授權

MIT 