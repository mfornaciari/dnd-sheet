# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class SpellType < Types::BaseObject
      field :id,                  ID,                                       null: false,
                                                                            description: "Spell's ID in the database"
      field :name,                String,                                   null: false,
                                                                            description: "Spell's name"
      field :level,               Integer,                                  null: false,
                                                                            description: 'Spell level (cantrips are 0)'
      field :character_classes,   [Types::DungeonsAndDragons::CharacterClassType], null: false,
                                                                                   description: 'Character classes that can cast'
      field :school,              Types::DungeonsAndDragons::MagicSchool,   null: false,
                                                                            description: 'Magic school it belongs to'
      field :casting_time,        String,                                   null: false,
                                                                            description: 'Time it takes to cast'
      field :range,               String,                                   null: false,
                                                                            description: 'Range of effect'
      field :components,          [Types::DungeonsAndDragons::Component],   null: false,
                                                                            description: 'Components required'
      field :material_components, String,                                   description: 'Material components required'
      field :duration,            String,                                   null: false,
                                                                            description: 'Time the effect lasts'
      field :description,         String,                                   null: false,
                                                                            description: 'Description'
      field :at_higher_levels,    String,                                   description: 'Effect at higher levels'
      field :ritual,              Boolean,                                  null: false,
                                                                            description: 'Can be cast as a ritual?'
      field :in_srd,              Boolean,                                  null: false,
                                                                            description: 'Is in the D&D SRD?'
    end
  end
end
