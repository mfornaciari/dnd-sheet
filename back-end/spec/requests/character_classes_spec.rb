# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns all classes' do
    character_classes = [
      { name: 'Bárbaro' },
      { name: 'Bardo' },
      { name: 'Bruxo' }
    ]
    create_classes(character_classes)
    class1, class2, class3 = CharacterClass.all
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
    character_classes = [
      { name: 'Bárbaro' },
      { name: 'Bardo' },
      { name: 'Bruxo' }
    ]
    create_classes(character_classes)
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

  def create_classes(class_hashes)
    class_hashes.each { |hash| create :character_class, hash }
  end
end
