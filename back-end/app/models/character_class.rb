# frozen_string_literal: true

class CharacterClass < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :spell_character_classes, dependent: :destroy
  has_many :spells, through: :spell_character_classes

  default_scope -> { order(:name) }
end
