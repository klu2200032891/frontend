import React, { useState, useEffect } from 'react';
import axios from "axios";
import AdminAppBar from './AdminAppBar'; // Ensure correct navbar import

export default function Show() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/all").then((res) => {
      setResult(res.data);
    });
  }, [result]);

  function Deletefun(email) {
    axios.delete("http://localhost:8080/delete", { params: { email } })
      .then((res) => {
        alert(res.data);
        setResult(null);
      });
  }

  function Editfun(name, email, password) {
    document.getElementsByName("e_name")[0].value = name;
    document.getElementsByName("e_pass")[0].value = password;
    document.getElementsByName("e_email")[0].value = email;
    document.getElementById("edit").style.display = "block";
  }

  function saveEdit() {
    axios.put("http://localhost:8080/update", {
      name: document.getElementsByName("e_name")[0].value,
      email: document.getElementsByName("e_email")[0].value,
      password: document.getElementsByName("e_pass")[0].value,
    }).then((res) => {
      alert(res.data);
      setResult(null);
      document.getElementById("edit").style.display = "none";
    });
  }

  if (result == null) {
    return <div style={styles.loader}>Fetching Data...</div>;
  }

  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>User Management</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Email</th>
            <th style={styles.headerCell}>Password</th>
            <th style={styles.headerCell}>Delete</th>
            <th style={styles.headerCell}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {result.map((obj, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.cell}>{obj.name}</td>
              <td style={styles.cell}>{obj.email}</td>
              <td style={styles.cell}>{obj.password}</td>
              <td style={styles.cell}>
                <button onClick={() => Deletefun(obj.email)} style={styles.deleteButton}>
                  DELETE
                </button>
              </td>
              <td style={styles.cell}>
                <button onClick={() => Editfun(obj.name, obj.email, obj.password)} style={styles.editButton}>
                  EDIT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="edit" style={styles.editContainer}>
        <h3 style={styles.editTitle}>Edit User Details</h3>
        <div style={styles.inputGroup}>
          <label>Name: </label>
          <input type="text" name="e_name" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label>Password: </label>
          <input type="password" name="e_pass" style={styles.input} />
        </div>
        <input type="text" name="e_email" style={{ display: "none" }} />
        <button onClick={saveEdit} style={styles.saveButton}>
          SAVE EDIT
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#4a90e2",
    marginBottom: "20px",
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerRow: {
    backgroundColor: "#4a90e2",
    color: "white",
  },
  headerCell: {
    padding: "10px",
    fontWeight: "bold",
  },
  row: {
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.3s",
  },
  cell: {
    padding: "10px",
  },
  rowHover: {
    backgroundColor: "#f1f1f1",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#f39c12",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editContainer: {
    display: "none",
    margin: "20px auto",
    padding: "20px",
    width: "50%",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  editTitle: {
    color: "#4a90e2",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "10px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loader: {
    fontSize: "24px",
    color: "#4a90e2",
    margin: "100px auto",
  },
};
