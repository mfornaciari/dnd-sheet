# frozen_string_literal: true

FactoryBot.define do
  factory :level do
    level { 1 }
    min_experience { 1 }
    max_experience { 2 }
  end
end
