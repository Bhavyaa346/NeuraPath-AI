<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>
🧭 NeuraPath – AI Career & College Decision System

NeuraPath is an intelligent decision-support system designed to help students in India choose the right college, course, and career path using a combination of structured datasets and AI-based reasoning.

Instead of random suggestions, NeuraPath uses ranking logic + real college data + AI explanation layer to provide clear, data-driven guidance.
# Run app

View your app : (https://neurapath-ai-78215364900.asia-southeast1.run.app)

## Run Locally

**Prerequisites:**  Node.js
## 🚀 Features

- 🎯 Personalized college recommendations based on student profile  
- 🏫 AP & Telangana college dataset support  
- 📊 Ranking system using:
  - Branch fit  
  - Cutoff alignment  
  - Fee affordability  
  - Placement strength  
- ⚠️ Wrong-choice detection (low ROI / mismatch warnings)  
- 🧠 AI-based career explanation layer  
- 📈 Admission probability estimation  
- 🧭 Domain-based exploration (Engineering, Medical, Business, etc.)

---

## 🛠️ Tech Stack

- Python  
- Streamlit  
- Pandas  
- JSON / CSV Dataset  
- Gemini API (for AI explanations)

---

## 🧠 How It Works

1. User enters academic details (marks, interest, budget, etc.)  
2. System filters relevant colleges from dataset  
3. Ranking algorithm scores each college  
4. AI explains results and career outcomes  
5. Final ranked recommendations are shown to the user  

---

## 📊 Dataset

Includes structured information such as:

- College name and location  
- Branches offered (CSE, ECE, MECH, etc.)  
- Fees range  
- Cutoff range  
- Placement statistics (approximate)  
- State (AP / TS)

---

## 🎯 Goal

To help students make **clear, logical, and data-driven career decisions** instead of confusion-based choices.

---

## ⚠️ Disclaimer

This project is for educational and decision-support purposes only. Data may be approximate and not officially verified.

---

## 💡 Future Improvements

- Expand dataset to all India colleges  
- Improve ranking accuracy using ML models  
- Add real-time counseling integration  
- Add user accounts and saved preferences  

---

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
