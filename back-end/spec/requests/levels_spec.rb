# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns all levels' do
    levels = [
      {
        level: 1,
        min_experience: 0,
        max_experience: 1
      },
      {
        level: 2,
        min_experience: 2,
        max_experience: 999_999
      }
    ]
    levels.each do |details|
      create :level, level: details[:level],
                     min_experience: details[:min_experience],
                     max_experience: details[:max_experience]
    end
    level1, level2 = Level.all
    expected_response = {
      data: {
        levels: [
          { id: level1.id.to_s, level: 1, minExperience: 0, maxExperience: 1 },
          { id: level2.id.to_s, level: 2, minExperience: 2, maxExperience: 999_999 }
        ]
      }
    }

    post '/graphql', params: { query: 'query { levels { id level minExperience maxExperience } }' }

    expect(format(response.body)).to eq(expected_response)
  end
end
