class Addsummarytousers < ActiveRecord::Migration
  def change
    add_column :users, :summary, :text
  end
end
