# frozen_string_literal: true

class CharacterClass < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
end
