import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo/logo.png";
import { useAuth } from "../../contexts/Auth";

export default function Sigup() {
  const { singup } = useAuth();

  const history = useHistory();

  const [error, setError] = useState();
  const [firtName, setFirtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState(1);
  const [monthOfBirth, setMonthOfBirth] = useState("Jan");
  const [yearOfBirth, setYearOfBirth] = useState(1960);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await singup(
        firtName,
        lastName,
        username,
        password,
        dayOfBirth,
        monthOfBirth,
        yearOfBirth
      );
      history.push("/");
    } catch (err) {
      console.log(err);
      if (err?.response?.error) {
        setError(err.response.error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <a href="/" className="float-left">
          <h2>
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ marginRight: 10 }}
            />
            spruce
          </h2>
        </a>
      </div>
      <br />
      <div className="col-sm-6 col-sm-offset-3">
        {/* <!-- show any messages that come back with authentication --> */}
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {/* <!-- Signup FORM --> */}
        <form onSubmit={(event) => handleSubmit(event)}>
          <label className="text-muted">Full name</label>
          <div className="form-group">
            <input
              type="text"
              placeholder="first_name"
              className="form-control"
              style={{ float: "left", width: "48%" }}
              name="fn"
              value={firtName}
              onChange={(event) => setFirtName(event.target.value)}
              required=""
            />
            <input
              type="text"
              placeholder="last_name"
              className="form-control"
              style={{ float: "rigth", width: "48%" }}
              name="ln"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required=""
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Username</label>
            <input
              type="text"
              placeholder="your_nick_name"
              className="form-control"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required=""
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              placeholder="the_secret"
              className="form-control"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required=""
            />
          </div>
          <label className="text-muted">Date of birth</label>
          <div className="form-group">
            <select
              className="form-control"
              name="day"
              value={dayOfBirth}
              onChange={(event) => setDayOfBirth(event.target.value)}
              style={{ float: "left", width: "33%" }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
            </select>
            <select
              className="form-control"
              name="month"
              value={monthOfBirth}
              onChange={(event) => setMonthOfBirth(event.target.value)}
              style={{ float: "left", width: "33%" }}
            >
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>Aug</option>
              <option>Sept</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <select
              className="form-control"
              name="year"
              value={yearOfBirth}
              onChange={(event) => setYearOfBirth(event.target.value)}
              style={{ float: "left", width: "33%" }}
            >
              <option>1960</option>
              <option>1961</option>
              <option>1962</option>
              <option>1963</option>
              <option>1964</option>
              <option>1965</option>
              <option>1966</option>
              <option>1967</option>
              <option>1968</option>
              <option>1969</option>
              <option>1970</option>
              <option>1971</option>
              <option>1972</option>
              <option>1973</option>
              <option>1974</option>
              <option>1975</option>
              <option>1976</option>
              <option>1977</option>
              <option>1978</option>
              <option>1979</option>
              <option>1980</option>
              <option>1981</option>
              <option>1982</option>
              <option>1983</option>
              <option>1984</option>
              <option>1985</option>
              <option>1986</option>
              <option>1987</option>
              <option>1988</option>
              <option>1989</option>
              <option>1990</option>
              <option>1991</option>
              <option>1992</option>
              <option>1993</option>
              <option>1994</option>
              <option>1995</option>
              <option>1996</option>
              <option>1997</option>
              <option>1998</option>
              <option>1999</option>
              <option>2000</option>
              <option>2001</option>
              <option>2002</option>
              <option>2003</option>
              <option>2004</option>
              <option>2005</option>
              <option>2006</option>
              <option>2007</option>
              <option>2008</option>
              <option>2009</option>
              <option>2010</option>
              <option>2011</option>
              <option>2012</option>
            </select>
          </div>
          <br />
          <br />
          <button type="submit" className="btn btn-success btn-action">
            GET STARTED
          </button>
        </form>
        <hr />
        <p className="text-muted">
          Already a part of it? <a href="/">login now!</a>
        </p>
        <script
          type="text/javascript"
          src="/javascripts/jquery.min.js"
        ></script>
        <script type="text/javascript" src="/javascripts/dom.js"></script>
        <script type="text/javascript" src="/javascripts/socket.io.js"></script>
        <script type="text/javascript" src="/javascripts/connect.js"></script>
      </div>
    </>
  );
}
