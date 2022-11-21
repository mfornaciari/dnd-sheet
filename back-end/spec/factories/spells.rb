# frozen_string_literal: true

FactoryBot.define do
  factory :spell do
    name { 'acid arrow' }
    level { 2 }
    school { :evocation }
    casting_time { '1 action' }
    range { '120 feet' }
    components { %i[verbal somatic material] }
    material_components { 'acid arrow material components' }
    duration { 'instantaneous' }
    description { 'acid arrow description' }
    at_higher_levels { 'acid arrow at higher levels' }
    ritual { false }
    in_srd { true }

    initialize_with { new(character_classes: CharacterClass.where(name: character_classes)) }
  end
end
