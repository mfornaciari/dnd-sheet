# frozen_string_literal: true

require 'rails_helper'

describe CharacterClass do
  subject(:character_class) { create(:character_class, CHARACTER_CLASSES.first) }

  it { is_expected.to validate_presence_of(:name) }

  it { is_expected.to validate_uniqueness_of(:name) }

  it { is_expected.to have_many(:spell_character_classes).dependent(:destroy) }
  it { is_expected.to have_many(:spells).through(:spell_character_classes) }
end
