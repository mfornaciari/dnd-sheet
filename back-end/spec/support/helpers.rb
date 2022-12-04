# frozen_string_literal: true

module TestHelpers
  ASSOCIATIONS = %w[character_class].freeze

  def graphql_query(query_string)
    post '/graphql', params: { query: "query { #{query_string} }" }
  end

  def expected_response(data, key:, first: false)
    formatted_data = data.map { |hash| formatted_hash(hash) }
    returned_data = first ? formatted_data.first : formatted_data
    { 'data' => { key => returned_data } }
  end

  private

  def formatted_hash(hash)
    hash.to_h do |attribute, value|
      graphql_key = attribute.camelize(:lower)
      association?(attribute.singularize) ? [graphql_key, graphql_association(attribute, value)] : [graphql_key, value]
    end
  end

  def association?(key)
    ASSOCIATIONS.include?(key)
  end

  def graphql_association(model, value)
    value.is_a?(Array) ? graphql_association_array(model, value) : graphql_association_instance(model, value)
  end

  def graphql_association_array(model, name_array)
    name_array.map { |name| graphql_association_instance(model, name) }
  end

  def graphql_association_instance(model, instance_name)
    model_instance = find_association(model, instance_name)
    model_hash = model_instance.as_json(except: %i[created_at updated_at])
    stringify_id(model_hash)
  end

  def find_association(model, instance_name)
    modelize(model).find_by(name: instance_name)
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
