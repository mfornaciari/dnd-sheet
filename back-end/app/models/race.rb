# frozen_string_literal: true

class Race < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
end
