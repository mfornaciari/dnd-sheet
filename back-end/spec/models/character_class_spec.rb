# frozen_string_literal: true

require 'rails_helper'

describe CharacterClass do
  subject(:character_class) { create(:character_class, name: 'bard') }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
end
