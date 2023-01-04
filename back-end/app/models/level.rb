# frozen_string_literal: true

class Level < ApplicationRecord
  validates :number, :min_experience, :max_experience, presence: true
  validates :number, :min_experience, :max_experience, uniqueness: true

  default_scope -> { order(:number) }
end
