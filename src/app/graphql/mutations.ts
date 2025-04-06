export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $department: String!, $position: String!) {
    addEmployee(name: $name, department: $department, position: $position) {
      id
      name
      department
      position
    }
  }
`;
