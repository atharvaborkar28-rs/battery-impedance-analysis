import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function App() {
  const [image, setImage] = useState(null);
  const [cellId, setCellId] = useState(null);
  const [condition, setCondition] = useState("Recycled");
  const [csvFile, setCsvFile] = useState(null);
  const [bodeData, setBodeData] = useState(null);
  const [sohData, setSohData] = useState(null);

  // ---------------- IMAGE UPLOAD ----------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // ---------------- CSV SELECT ----------------
  const handleCsvUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // ---------------- CSV UPLOAD ----------------
  const uploadCsvToBackend = () => {
    if (!csvFile) {
      alert("Please select a CSV file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    fetch("http://localhost:8000/upload-csv", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error("CSV upload error:", err));
  };

  // ---------------- CELL ID ----------------
  useEffect(() => {
    fetch("http://localhost:8000/generate-cell")
      .then((res) => res.json())
      .then((data) => setCellId(data.cell_id))
      .catch((err) => console.error("Cell ID fetch error:", err));
  }, []);

  // ---------------- BODE DATA ----------------
  useEffect(() => {
    fetch("http://localhost:8000/bode-data")
      .then((res) => res.json())
      .then((data) => setBodeData(data))
      .catch((err) => console.error("Bode fetch error:", err));
  }, []);

  // ---------------- SOH DATA ----------------
  useEffect(() => {
    fetch("http://localhost:8000/soh")
      .then((res) => res.json())
      .then((data) => {
        console.log("SoH data:", data); // DEBUG
        setSohData(data);
      })
      .catch((err) => console.error("SoH fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Battery Cell Information</h1>

      <p>
        <b>Cell ID:</b> {cellId ? cellId : "Loading..."}
      </p>

      {/* -------- IMAGE -------- */}
      <h3>Upload Battery Image</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <div style={{ marginTop: "10px" }}>
          <p>Battery Image Preview:</p>
          <img src={image} alt="Battery" width="200" />
        </div>
      )}

      {/* -------- META -------- */}
      <h3>Meta Information</h3>
      <label>Cell Condition: </label>
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option>New</option>
        <option>Recycled</option>
      </select>

      {/* -------- ELECTRICAL -------- */}
      <h3>Electrical Parameters</h3>
      <p>Nominal Voltage: <input defaultValue="3.6" /></p>
      <p>Nominal Energy: <input defaultValue="16.2" /></p>
      <p>Capacity (Ah): <input defaultValue="4.5" /></p>
      <p>Voltage Range: <input defaultValue="2.5 - 4.2" /></p>
      <p>Continuous Current: <input defaultValue="8.61" /></p>
      <p>Peak Current: <input defaultValue="17.5" /></p>
      <p>Continuous Power: <input defaultValue="25.6" /></p>
      <p>Peak Power: <input defaultValue="50" /></p>

      {/* -------- BODE PLOTS -------- */}
      {bodeData && (
        <>
          <h3>Bode Plot – Magnitude</h3>
          <Plot
            data={[
              {
                x: bodeData.frequency,
                y: bodeData.magnitude,
                type: "scatter",
                mode: "lines",
              },
            ]}
            layout={{
              xaxis: { title: "Frequency (Hz)", type: "log" },
              yaxis: { title: "|Z| (Ohms)", type: "log" },
            }}
          />

          <h3>Bode Plot – Phase</h3>
          <Plot
            data={[
              {
                x: bodeData.frequency,
                y: bodeData.phase,
                type: "scatter",
                mode: "lines",
              },
            ]}
            layout={{
              xaxis: { title: "Frequency (Hz)", type: "log" },
              yaxis: { title: "Phase (degrees)" },
            }}
          />
        </>
      )}

      {/* -------- SOH -------- */}
      {sohData && (
        <>
          <h3>Circuit Parameters</h3>

          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rb (Bulk Resistance)</td>
                <td>{sohData.Rb}</td>
                <td>Ohms</td>
              </tr>
              <tr>
                <td>Rct (Charge Transfer Resistance)</td>
                <td>{sohData.Rct}</td>
                <td>Ohms</td>
              </tr>
            </tbody>
          </table>

          <h3>State of Health (SoH)</h3>
          <p>
            <b>{sohData.SoH_percent}%</b> –{" "}
            {sohData.SoH_percent > 90
              ? "Healthy"
              : sohData.SoH_percent > 75
              ? "Moderate"
              : "Degraded"}
          </p>
        </>
      )}

      {/* -------- CSV -------- */}
      <h3>Upload Impedance CSV File</h3>
      <input type="file" accept=".csv" onChange={handleCsvUpload} />
      <br /><br />
      <button onClick={uploadCsvToBackend}>
        Upload CSV to Backend
      </button>
    </div>
  );
}

export default App;
