# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class Spell < Types::BaseObject
      description 'A D&D 5th edition magic spell'

      CharacterClassType = Types::DungeonsAndDragons::CharacterClass
      MagicSchoolType = Types::DungeonsAndDragons::MagicSchool
      ComponentType = Types::DungeonsAndDragons::Component

      field :name,                String,               null: false, description: 'Capitalized spell name'
      field :level,               Integer,              null: false, description: 'Spell level (cantrips are 0)'
      field :character_classes,   [CharacterClassType], null: false, description: 'Classes that may cast it'
      field :school,              MagicSchoolType,      null: false, description: 'Magic school it belongs to'
      field :casting_time,        String,               null: false, description: 'Time it takes to cast'
      field :range,               String,               null: false, description: 'Range of effect'
      field :components,          [ComponentType],      null: false, description: 'Components needed'
      field :material_components, String,               null: true,  description: 'Material components needed'
      field :duration,            String,               null: false, description: 'Time the effect lasts'
      field :description,         String,               null: false, description: 'Explanation of the spell'
      field :at_higher_levels,    String,               null: true,  description: 'Effect at higher levels'
      field :ritual,              Boolean,              null: false, description: 'Whether it can be cast as a ritual'
      field :in_srd,              Boolean,              null: false, description: 'Whether it is in the D&D 5e SRD'
    end
  end
end
