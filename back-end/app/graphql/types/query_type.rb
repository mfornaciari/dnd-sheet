# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    description 'Available queries'

    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :character_class,   description: 'Finds a character class by ID', resolver: Queries::CharacterClass
    field :character_classes, description: 'Finds all character classes',   resolver: Queries::CharacterClasses

    field :race,              description: 'Finds a race by ID',            resolver: Queries::Race
    field :races,             description: 'Finds all races',               resolver: Queries::Races

    field :level,             description: 'Finds a single level by ID',    resolver: Queries::Level
    field :levels,            description: 'Finds all levels',              resolver: Queries::Levels
  end
end
