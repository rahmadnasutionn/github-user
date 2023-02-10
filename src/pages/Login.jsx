import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components"
import loginImage from '../assets/icons/login-img.svg';

export default function Login() {
  const { loginWithRedirect } = useAuth0()
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImage} alt="Login Image" />
        <h1>
          Github user
        </h1>
        <button className="btn" onClick={() => loginWithRedirect()}>
          Log in / sign up 
        </button>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
 min-height: 100vh;
 display: grid;
 place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
    img {
      margin-bottom: 2rem;
    }
    h1 {
      margin-bottom: 1.5rem;
    }
 }
`