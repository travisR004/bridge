class Addlatlong < ActiveRecord::Migration
  def change
    add_column :users, :lat, :float
    add_column :users, :long, :float
  end
end
