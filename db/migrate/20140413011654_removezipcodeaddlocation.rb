class Removezipcodeaddlocation < ActiveRecord::Migration
  def change
    remove_column :users, :zip_code
    add_column :users, :location, :string
  end
end
