import {gql} from 'apollo-angular'

const GETPRODUCTS = gql`
query Products {
  products {
    id
    name
    type
  }
}
`

const CREATEUSER = gql`
mutation Singup($signUpInput: SignUpInput!) {
  singup(signUpInput: $signUpInput) {
    token
    user {
      email
    }
  }
}
`
const LOGIN = gql`
mutation Login($logInInput: LogInInput!) {
  login(logInInput: $logInInput) {
    token,
    user {
      email,
      fullName,
      id,
      roles
    }
  }
}
`

export {GETPRODUCTS,CREATEUSER,LOGIN}