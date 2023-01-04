class CreateRaces < ActiveRecord::Migration[7.0]
  def change
    create_table :races do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_index :races, :name, unique: true
  end
end
