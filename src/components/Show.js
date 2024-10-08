import axios from "axios";
import { useState } from "react";

export default function Show() {
  function Deletefun(email) {
    axios
      .delete("http://localhost:8080/delete", {
        params: {
          email: email,
        },
      })
      .then((res) => {
        alert(res.data);
        setResult(null);
      });
  }

  function Editfun(name, role, email, password) {
    document.getElementsByName("e_name")[0].value = name;
    document.getElementsByName("e_role")[0].value = role;
    document.getElementsByName("e_pass")[0].value = password;
    document.getElementsByName("e_email")[0].value = email;
    document.getElementById("edit").style.display = "block";
  }

  function saveEdit() {
    axios
      .put("http://localhost:8080/update", {
        name: document.getElementsByName("e_name")[0].value,
        role: document.getElementsByName("e_role")[0].value,
        email: document.getElementsByName("e_email")[0].value,
        password: document.getElementsByName("e_pass")[0].value,
      })
      .then((res) => {
        alert(res.data);
        setResult(null);
      });
  }

  const [result, setResult] = useState(null);

  if (result == null) {
    axios.get("http://localhost:8080/all", {}).then((res) => {
      setResult(res.data);
    });
  }

  if (result == null) {
    return <div>Result is fetching...</div>;
  } else {
    return (
      <div>
        <table
          border="1"
          style={{
            color: "blue",
            width: "80%",
            margin: "auto",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "yellow" }}>
              <th style={{ padding: "10px" }}>NAME</th>
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>DELETE</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {result.map((obj, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "whiteblack",
                    padding: "5px",
                  }}
                >
                  <td style={{ padding: "10px" }}>{obj.name}</td>
                  <td>{obj.role}</td>
                  <td>{obj.email}</td>
                  <td>{obj.password}</td>
                  <td>
                    <button
                      onClick={() => Deletefun(obj.email)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        Editfun(obj.name, obj.role, obj.email, obj.password)
                      }
                      style={{
                        backgroundColor: "orange",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <div id="edit" style={{ display: "none", textAlign: "center" }}>
          <h3>Edit User Details</h3>
          <div style={{ marginBottom: "10px" }}>
            Name:{" "}
            <input
              type="text"
              name="e_name"
              style={{
                padding: "5px",
                margin: "5px",
                borderRadius: "5px",
                width: "200px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            Role:{" "}
            <select
              name="e_role"
              style={{
                padding: "5px",
                margin: "5px",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              <option value={1}>Admin</option>
              <option value={0}>Guest</option>
              <option value={2}>User</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            Password:{" "}
            <input
              type="password"
              name="e_pass"
              style={{
                padding: "5px",
                margin: "5px",
                borderRadius: "5px",
                width: "200px",
              }}
            />
          </div>
          <input type="text" name="e_email" style={{ display: "none" }} />
          <br />
          <button
            onClick={() => saveEdit()}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            SAVE EDIT
          </button>
        </div>
      </div>
    );
  }
}
