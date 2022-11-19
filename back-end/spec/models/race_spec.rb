# frozen_string_literal: true

require 'rails_helper'

describe Race do
  subject(:race) { create(:race, JSON.parse(races_json, symbolize_names: true).first) }

  let(:races_json) { Rails.public_path.join('data/races.json').read }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
end
