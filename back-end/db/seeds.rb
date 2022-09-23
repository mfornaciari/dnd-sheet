# frozen_string_literal: true

class_names = %w[Bárbaro Bardo Bruxo Clérigo Druida Feiticeiro Guardião Guerreiro Ladino Mago Monge Paladino]
class_names.each { |name| FactoryBot.create :character_class, name: name }

race_names = %w[Anão Draconato Elfo Gnomo Humano Meio-elfo Meio-orc Pequenino Tiferino]
race_names.each { |name| FactoryBot.create :race, name: name }

puts 'Seeding finished'
