class Addstatustoprojects < ActiveRecord::Migration
  def change
    add_column :projects, :status, :string
  end
end
