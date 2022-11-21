# frozen_string_literal: true

class SpellCharacterClass < ApplicationRecord
  belongs_to :spell
  belongs_to :character_class
end
