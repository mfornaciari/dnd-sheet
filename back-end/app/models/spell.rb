# frozen_string_literal: true

class Spell < ApplicationRecord
  has_many :spell_character_classes, dependent: :destroy
  has_many :character_classes, through: :spell_character_classes
end
