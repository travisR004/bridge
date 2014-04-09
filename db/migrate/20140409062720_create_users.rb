class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :zip_code
      t.text :interest

      t.timestamps
    end
  end
end
