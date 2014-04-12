class CreateUserJoinTags < ActiveRecord::Migration
  def change
    create_table :user_join_tags do |t|
      t.integer :user_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
