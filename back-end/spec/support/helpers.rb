# frozen_string_literal: true

module Helpers
  def format(response_body)
    JSON.parse(response_body, symbolize_names: true)
  end
end

RSpec.configure do |config|
  config.include Helpers
end
