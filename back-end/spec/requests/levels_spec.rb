# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:levels) do
    [
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
  end

  def create_levels(level_hashes)
    level_hashes.each { |hash| create :level, hash }
  end

  it 'returns all levels' do
    create_levels(levels)
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

  it 'finds a single level by ID and returns it' do
    create_levels(levels)
    level1 = Level.find_by(level: 1)
    expected_response = {
      data: {
        level: {
          id: level1.id.to_s, level: 1, minExperience: 0, maxExperience: 1
        }
      }
    }

    post '/graphql', params: { query: "query { level(id: #{level1.id}) { id level minExperience maxExperience } }" }

    expect(format(response.body)).to eq(expected_response)
  end
end
