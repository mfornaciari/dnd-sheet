# frozen_string_literal: true

FactoryBot.define do
  factory :spell do
    name { 'acid splash' }
    level { 0 }
    school { 1 }
    casting_time { '1 action' }
    range { '120 feet' }
    components { %w[verbal somatic] }
    duration { 'instantaneous' }
    description { 'acid splash description' }
    at_higher_levels { 'Blah' }
  end
end
