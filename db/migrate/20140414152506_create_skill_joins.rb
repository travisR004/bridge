class CreateSkillJoins < ActiveRecord::Migration
  def change
    create_table :skill_joins do |t|
      t.integer :user_id
      t.integer :tag_id
      
      t.timestamps
    end
  end
end
