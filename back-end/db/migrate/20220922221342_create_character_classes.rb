class CreateCharacterClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :character_classes do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
