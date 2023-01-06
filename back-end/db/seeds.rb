# frozen_string_literal: true

# Constants set in config/initializers/constants.rb

CHARACTER_CLASSES.each { |hash| FactoryBot.create :character_class, hash }
RACES.each { |hash| FactoryBot.create :race, hash }
LEVELS.each { |hash| FactoryBot.create :level, hash }
SPELLS.each { |hash| FactoryBot.create :spell, hash }
