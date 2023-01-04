# frozen_string_literal: true

require 'rails_helper'

describe SpellCharacterClass do
  it { is_expected.to belong_to(:spell) }
  it { is_expected.to belong_to(:character_class) }
end
