import { gql } from '@apollo/client';

export default gql`
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
