# frozen_string_literal: true

module TestHelpers
  ASSOCIATIONS = %w[character_class].freeze

  def graphql_query(query_string)
    post '/graphql', params: { query: "query { #{query_string} }" }
  end

  def expected_response(json_data, key:, first: false)
    parsed_data = JSON.parse(json_data)
    formatted_data = parsed_data.map { |hash| formatted_hash(hash) }
    returned_data = first ? formatted_data.first : formatted_data
    { 'data' => { key => returned_data } }
  end

  private

  def formatted_hash(hash)
    returned_hash = {}
    hash.each do |key, value|
      graphql_key = key.camelize(:lower)
      if association?(key.singularize)
        returned_hash[graphql_key] = value.is_a?(Array) ? value.map { |name| format_association(key, name) } : format_association(key, value)
      else
        returned_hash[graphql_key] = value
      end
    end
    returned_hash
  end

  def association?(key)
    ASSOCIATIONS.include?(key)
  end

  def format_association(key, value)
    model_instance = find_association(key, value)
    model_hash = model_instance.as_json(except: %i[created_at updated_at])
    stringify_id(model_hash)
  end

  def find_association(model, name)
    modelize(model).find_by(name: name)
  end

  def stringify_id(model_hash)
    model_hash['id'] = model_hash['id'].to_s
    model_hash
  end

  def modelize(model_name)
    model_name.singularize.camelize.constantize
  end
end

RSpec.configure do |config|
  config.include TestHelpers
end
