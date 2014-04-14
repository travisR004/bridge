class CreatePassionJoins < ActiveRecord::Migration
  def change
    create_table :passion_joins do |t|
      t.integer :user_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
