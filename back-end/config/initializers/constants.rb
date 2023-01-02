# frozen_string_literal: true

MAGIC_SCHOOL_NAMES = %w[
  abjuration
  conjuration
  divination
  enchantment
  evocation
  illusion
  necromancy
  transmutation
].freeze

COMPONENTS = %w[
  material
  somatic
  verbal
].freeze

# Load data from YAML files in public/data

CHARACTER_CLASSES = YAML.safe_load_file(Rails.public_path.join('data/character_classes.yml')).freeze
RACES = YAML.safe_load_file(Rails.public_path.join('data/races.yml')).freeze
LEVELS = YAML.safe_load_file(Rails.public_path.join('data/levels.yml')).freeze

SPELLS_PATH = Rails.public_path.join('data/spells').freeze
SPELLS = SPELLS_PATH.each_child.map { |filepath| YAML.safe_load_file(filepath) }.freeze
