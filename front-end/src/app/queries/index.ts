import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query GetData {
    races {
      id
      name
    }
    characterClasses {
      id
      name
    }
    levels {
      id
      level
      minExperience
      maxExperience
    }
  }
`;
