Battery Impedance Analysis Assignment

Overview
This assignment implements a battery impedance analysis system using a full-stack approach. 
The solution analyzes impedance spectroscopy data to visualize battery behavior and estimate the battery State of Health (SoH).

The system is designed with a React frontend and a FastAPI backend, demonstrating end-to-end data ingestion, processing, visualization, and health estimation.

Key Features
- Battery image upload and preview
- Impedance CSV upload
- Backend impedance data processing
- Bode magnitude and phase visualization
- Equivalent circuit parameter estimation (Rb, Rct)
- State of Health (SoH) calculation and classification

Technology Stack
Frontend: React, Plotly
Backend: FastAPI
Data Processing: Pandas, NumPy

Assumptions
- The CSV file contains frequency, real impedance, and imaginary impedance columns.
- SoH estimation uses a simplified resistance-based model suitable for screening-level diagnostics.

Setup Steps (If Code Review Is Required)

Backend:
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at http://localhost:8000
Interactive API documentation is available at http://localhost:8000/docs#
Frontend:
npm install
npm start

Frontend runs at http://localhost:3000

Results
- Bode plots show expected impedance trends across frequency.
- Extracted circuit parameters align with typical lithium-ion battery behavior.
- State of Health is displayed as a percentage with a qualitative health indicator.

Conclusion
This solution demonstrates a complete battery impedance analysis workflow, integrating data ingestion, signal processing, visualization, and health estimation in a clean and modular architecture.

