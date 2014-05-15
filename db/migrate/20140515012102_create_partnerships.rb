class CreatePartnerships < ActiveRecord::Migration
  def change
    create_table :partnerships do |t|
      t.integer :in_partner
      t.integer :out_partner
      t.integer :project_id

      t.timestamps
    end
  end
end
