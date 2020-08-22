import React, { Component, useState } from "react";
import './App.css';


const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px"
    }
  }
};

function PhoneBookForm(props) {
  const [user, setUser] = useState({
    userFirstname: "Coder",
    userLastname: "Byte",
    userPhone: "8885559999"
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handledSubmit(event) {
    event.preventDefault();
    props.onSubmit(user);
  }

  return (
    <form onSubmit={handledSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        onChange={handleChange}
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={user.userFirstname}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        onChange={handleChange}
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={user.userLastname}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        onChange={handleChange}
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="number"
        value={user.userPhone}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props) {
  //  assuming the name doesn't
  // repeat in order to use it as key
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{user.userFirstname}</td>
            <td style={style.tableCell}>{user.userLastname}</td>
            <td style={style.tableCell}>{user.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handledSubmit = this.handledSubmit.bind(this);
  }

  sort_users(users) {
    users.sort((a, b) => (a.userLastname < b.userLastname ? 1 : -1));
  }

  handledSubmit(user) {
    let users = this.state.users;
    users.push(user);
    this.sort_users(users);
    this.setState({ users });
  }
  render() {
    return (
      <section>
        <PhoneBookForm onSubmit={this.handledSubmit} />
        <InformationTable users={this.state.users} />
      </section>
    );
  }
}
export default App;