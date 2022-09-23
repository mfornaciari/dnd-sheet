# frozen_string_literal: true

class Level < ApplicationRecord
  validates :level, :min_experience, :max_experience, presence: true
  validates :level, :min_experience, :max_experience, uniqueness: true
end
