class CreateLevels < ActiveRecord::Migration[7.0]
  def change
    create_table :levels do |t|
      t.integer :number, null: false
      t.integer :min_experience, null: false
      t.integer :max_experience, null: false

      t.timestamps
    end

    add_index :levels, :number, unique: true
    add_index :levels, :min_experience, unique: true
    add_index :levels, :max_experience, unique: true
  end
end
