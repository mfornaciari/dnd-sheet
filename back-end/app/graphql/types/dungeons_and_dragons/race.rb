# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class Race < Types::BaseObject
      description 'A D&D 5th edition playable race'

      field :name, String, null: false, description: 'Capitalized race name'
    end
  end
end
