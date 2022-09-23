# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns all races' do
    race_names = %w[Anão Draconato Elfo]
    race_names.each { |name| create :race, name: name }
    race1, race2, race3 = Race.where(name: race_names)
    expected_response = {
      data: {
        races: [
          { id: race1.id.to_s, name: 'Anão' },
          { id: race2.id.to_s, name: 'Draconato' },
          { id: race3.id.to_s, name: 'Elfo' }
        ]
      }
    }

    post '/graphql', params: { query: 'query { races { id name } }' }

    expect(format(response.body)).to eq(expected_response)
  end

  it 'finds a single race by ID and returns it' do
    race_names = %w[Anão Draconato Elfo]
    race_names.each { |name| create :race, name: name }
    race1 = Race.find_by(name: 'Anão')
    expected_response = {
      data: {
        race: {
          id: race1.id.to_s,
          name: 'Anão'
        }
      }
    }

    post '/graphql', params: { query: "query { race(id: #{race1.id}) { id name } }" }

    expect(format(response.body)).to eq(expected_response)
  end

  def format(response_body)
    JSON.parse(response_body, symbolize_names: true)
  end
end
