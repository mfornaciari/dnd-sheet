# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:races) do
    [
      { name: 'Anão' },
      { name: 'Draconato' },
      { name: 'Elfo' }
    ]
  end

  def create_races(race_hashes)
    race_hashes.each { |hash| create :race, hash }
  end

  it 'returns all races' do
    create_races(races)
    race1, race2, race3 = Race.all
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
    create_races(races)
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
end
