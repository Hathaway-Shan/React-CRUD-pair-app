import React, { useContext } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../context/context';
import { authUser } from '../services/auth';

export default function Auth() {
  const { user, setUser, email, setEmail, password, setPassword } = useContext(UserContext);

  const { type } = useParams();

  const submitAuth = async () => {
    const userResp = await authUser(email, password, type);
    setUser(userResp);
    //reset inputs
    setEmail('');
    setPassword('');
  };
  //redirect to pets
  if (user) {
    return <Redirect to="/pets" />;
  }

  return (
    <div className="authBox">
      <div className="navLinks">
        <NavLink to="/auth/sign-in">Sign In</NavLink>
        <NavLink to="/auth/sign-up">Sign Up</NavLink>
      </div>
      <label className="label">Email</label>
      <div className="emailBox">
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <label className="label">Password</label>
      <div className="passwordBox">
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="control">
        <button onClick={submitAuth} className="button">
          Submit
        </button>
      </div>
    </div>
  );
}
