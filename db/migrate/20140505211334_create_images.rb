class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :project_id
      t.attachment :photo
      t.timestamps
    end
  end
end
