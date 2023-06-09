import { gql } from "apollo-angular";

const GETPRODUCTS = gql`
  query Products {
    products {
      id
      name
      type
    }
  }
`;

const CREATEPRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      type
    }
  }
`;

const CREATEUSER = gql`
  mutation Singup($signUpInput: SignUpInput!) {
    singup(signUpInput: $signUpInput) {
      token
      user {
        email
      }
    }
  }
`;
const LOGIN = gql`
  mutation Login($logInInput: LogInInput!) {
    login(logInInput: $logInInput) {
      token
      user {
        email
        fullName
        id
        roles
      }
    }
  }
`;

const DELETEPRODUCT = gql`
  mutation RemoveProduct($removeProductId: ID!) {
    removeProduct(id: $removeProductId) {
      id
      name
      type
    }
  }
`;
const UPDATEPRODUCT = gql`
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      name
      type
    }
  }
`;

export { GETPRODUCTS, CREATEUSER, LOGIN, CREATEPRODUCT, DELETEPRODUCT, UPDATEPRODUCT };
