# == Schema Information
#
# Table name: pending_requests
#
#  id                :integer          not null, primary key
#  in_user_id        :integer
#  out_user_id       :integer
#  in_user_accepted  :boolean          default(FALSE)
#  out_user_accepted :boolean          default(FALSE)
#  created_at        :datetime
#  updated_at        :datetime
#

class PendingRequest < ActiveRecord::Base
  
  belongs_to :in_user, class_name: "User"
  belongs_to :out_user, class_name: "User"
end
