# == Schema Information
#
# Table name: partnerships
#
#  id          :integer          not null, primary key
#  in_partner  :integer
#  out_partner :integer
#  project_id  :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Partnership < ActiveRecord::Base
  belongs_to :user, foreign_key: :in_partner
  belongs_to :partner, foreign_key: :out_partner, class_name: "User"
  belongs_to :project
end
