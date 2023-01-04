class CreateSpellCharacterClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :spell_character_classes do |t|
      t.belongs_to :spell, null: false, foreign_key: true
      t.belongs_to :character_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
