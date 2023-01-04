# frozen_string_literal: true

FactoryBot.define do
  factory :level do
    number { 1 }
    min_experience { 0 }
    max_experience { 299 }
  end
end
