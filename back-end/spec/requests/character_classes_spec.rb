# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns all classes' do
    class_names = %w[Bárbaro Bardo Bruxo]
    class_names.each { |name| create :character_class, name: name }
    class1, class2, class3 = CharacterClass.where(name: class_names)
    expected_response = {
      data: {
        characterClasses: [
          { id: class1.id.to_s, name: 'Bárbaro' },
          { id: class2.id.to_s, name: 'Bardo' },
          { id: class3.id.to_s, name: 'Bruxo' }
        ]
      }
    }

    post '/graphql', params: { query: 'query { characterClasses { id name } }' }

    expect(format(response.body)).to eq(expected_response)
  end

  it 'finds a single class by ID and returns it' do
    class_names = %w[Bárbaro Bardo Bruxo]
    class_names.each { |name| create :character_class, name: name }
    class1 = CharacterClass.find_by(name: 'Bárbaro')
    expected_response = {
      data: {
        characterClass: {
          id: class1.id.to_s,
          name: 'Bárbaro'
        }
      }
    }

    post '/graphql', params: { query: "query { characterClass(id: #{class1.id}) { id name } }" }

    expect(format(response.body)).to eq(expected_response)
  end

  def format(response_body)
    JSON.parse(response_body, symbolize_names: true)
  end
end
