class Addpublicdescriptiontoprojects < ActiveRecord::Migration
  def change
    add_column :projects, :public_description, :text
    add_column :projects, :user_id, :integer
  end
end
