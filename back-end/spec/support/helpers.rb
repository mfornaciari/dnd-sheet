# frozen_string_literal: true

module TestHelpers
  ASSOCIATIONS = %w[character_class].freeze

  def graphql_query(query_string)
    post '/graphql', params: { query: "query { #{query_string} }" }
  end

  def expected_response(data, key:, first: false)
    formatted_data = data.map do |hash|
      formatted_hash = formatted_hash(hash)
      filled_hash(formatted_hash, model: modelize(key))
    end
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

  def filled_hash(hash, model:)
    missing_attributes = camelized_missing_attributes(hash, model: model)
    missing_attributes_hash = missing_attributes.index_with(nil)
    hash.merge(missing_attributes_hash).except('id')
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
    model_instance.as_json(except: %i[id created_at updated_at])
  end

  def find_association(model, instance_name)
    modelize(model).find_by(name: instance_name.capitalize)
  end

  def modelize(model_name)
    model_name.singularize.camelize.constantize
  end

  def camelized_missing_attributes(hash, model:)
    model.attribute_names.map { |name| name.camelize(:lower) } - %w[id createdAt updatedAt] - hash.keys
  end
end

RSpec.configure do |config|
  config.include TestHelpers
end
