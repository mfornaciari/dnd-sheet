# frozen_string_literal: true

classes_json = Rails.public_path.join('data/character_classes.json').read
JSON.parse(classes_json, symbolize_names: true).each { |hash| FactoryBot.create :character_class, hash }

races_json = Rails.public_path.join('data/races.json').read
JSON.parse(races_json, symbolize_names: true).each { |hash| FactoryBot.create :race, hash }

levels_json = Rails.public_path.join('data/levels.json').read
JSON.parse(levels_json, symbolize_names: true).each { |hash| FactoryBot.create :level, hash }

spells_json = Rails.public_path.join('data/spells.json').read
JSON.parse(spells_json, symbolize_names: true).each { |hash| FactoryBot.create :spell, hash}
