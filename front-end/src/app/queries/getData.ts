import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query GetData {
    races {
      name
    }
    characterClasses {
      name
    }
    spells {
      name
      level
      characterClasses {
        name
      }
      school
      castingTime
      range
      components
      materialComponents
      duration
      description
      atHigherLevels
      ritual
      inSrd
    }
    levels {
      number
      minExperience
      maxExperience
    }
  }
`;
