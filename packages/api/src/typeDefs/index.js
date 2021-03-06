import { gql } from 'apollo-server';

const typeDefs = gql`
  input FilterCharacter {
    name: String
    actor: String
  }

  input FilterCharacters {
    house: String
    gender: String
  }

  type Query {
    """
    Get a specific character by name or actor ~ I would avoid filtering by actor for now until all records are fully populated with correct actor.
    """
    character(filter: FilterCharacter!): Character
    """
    Get the list of all characters ~ I would avoid filtering by actor for now until all records are fully populated with correct actor.
    """
    characters(page: Int, filter: FilterCharacters): [Character]
    """
    Get the specified Hogwarts house by name.
    """
    house(name: String!): House
    """
    Get all Hogwarts houses.
    """
    houses: [House]
  }

  type Character {
    """
    The id of the character.
    """
    id: ID
    """
    The name of the individual character.
    """
    name: String
    """
    The house in which the character is part of: Gryffindor, Slytherin, Hufflepuff or Ravenclaw. If the character does not have a house on record or is a muggle, than thier house will reflect that and come back as Unknown or Muggle.
    """
    house: String
    """
    The gender of the character.
    """
    gender: String
    """
    The actor who played the character. (Some character's actors may not have been aggregated yet. Also, some characters did not appear in any of the movies.)
    """
    actor: String
  }

  type House {
    """
    The id of the individual house.
    """
    id: ID
    """
    The name of the house in which the characters are part of: Gryffindor, Slytherin, Hufflepuff or Ravenclaw. Characters who do not have a recorded house will be stored as Unknown, while others will be stored under Muggle.
    """
    name: String
    """
    Get the list of all characters that are part the of specified house.
    """
    characters: [Character]
  }
`;
export default typeDefs;
