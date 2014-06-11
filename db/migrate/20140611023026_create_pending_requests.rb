class CreatePendingRequests < ActiveRecord::Migration
  def change
    create_table :pending_requests do |t|
      t.integer :in_user_id
      t.integer :out_user_id
      t.boolean :in_user_accepted, default: false
      t.boolean :out_user_accepted, default: false
      t.timestamps
    end
  end
end
