# frozen_string_literal: true

classes_json = File.read(Rails.public_path.join('data/character_classes.json'))
JSON.parse(classes_json, symbolize_names: true).each { |hash| FactoryBot.create :character_class, hash }

races_json = File.read(Rails.public_path.join('data/races.json'))
JSON.parse(races_json, symbolize_names: true).each { |hash| FactoryBot.create :race, hash }

levels_json = File.read(Rails.public_path.join('data/levels.json'))
JSON.parse(levels_json, symbolize_names: true).each { |hash| FactoryBot.create :level, hash }
