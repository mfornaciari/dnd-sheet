# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :character_class,   description: 'A single character class', resolver: Queries::CharacterClass
    field :character_classes, description: 'All character classes',    resolver: Queries::CharacterClasses

    field :race,              description: 'A single race',            resolver: Queries::Race
    field :races,             description: 'All races',                resolver: Queries::Races

    field :level,             description: 'A single level',           resolver: Queries::Level
    field :levels,            description: 'All levels',               resolver: Queries::Levels
  end
end
