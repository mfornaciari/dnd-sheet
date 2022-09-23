# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns all classes' do
    class_names = %w[Bárbaro Bardo Bruxo]
    class_names.each { |name| create :character_class, name: name }
    expected_response = {
      data: {
        characterClasses: [
          { id: '1', name: 'Bárbaro' },
          { id: '2', name: 'Bardo' },
          { id: '3', name: 'Bruxo' }
        ]
      }
    }

    post '/graphql', params: { query: 'query { characterClasses { name } }' }

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
