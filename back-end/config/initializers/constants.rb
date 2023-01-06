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

RACES_PATH = Rails.public_path.join('data/races').freeze
RACES = RACES_PATH.each_child.map { |filepath| YAML.safe_load_file(filepath) }.freeze

CHARACTER_CLASSES_PATH = Rails.public_path.join('data/character_classes').freeze
CHARACTER_CLASSES = CHARACTER_CLASSES_PATH.each_child.map { |filepath| YAML.safe_load_file(filepath) }.freeze

LEVELS_PATH = Rails.public_path.join('data/levels').freeze
LEVELS = LEVELS_PATH.each_child.map { |filepath| YAML.safe_load_file(filepath) }.freeze

SPELLS_PATH = Rails.public_path.join('data/spells').freeze
SPELLS = SPELLS_PATH.each_child.map { |filepath| YAML.safe_load_file(filepath) }.freeze
