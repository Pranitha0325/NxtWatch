import styled from 'styled-components'

export const LoginContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
width:100vw;
background-size:cover;
`;

export const HomeContainer = styled.div`
  display:flex;
  background-color:${(props)=> (props.background ? "#181818" : "#f9f9f9")};
  color:${(props) =>(props.background ? "white" : "black") };
`;
export const Input = styled.input`
  margin-top:20px;
`
export const ListContainer = styled.li`
  display:flex;
  flex-wrap:wrap;
`