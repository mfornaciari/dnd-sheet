# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    SPELLS[0..20].each { |hash| create(:spell, hash) }
  end

  it 'returns all classes' do
    db_records = CharacterClass.includes(:spells)
    serialized_records = db_records.as_json(include: { spells: { only: :name } },
                                            except: %i[id created_at updated_at])
    expected_response = camelized_hash_array(serialized_records)

    graphql_query('characterClasses { name spells { name } }')

    expect(JSON.parse(response.body)['data']['characterClasses']).to eq(expected_response)
  end
end
