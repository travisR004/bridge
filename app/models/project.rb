# == Schema Information
#
# Table name: projects
#
#  id                 :integer          not null, primary key
#  title              :string(255)
#  description        :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#  public_description :text
#  user_id            :integer
#

class Project < ActiveRecord::Base
  validates :title, :description, presence: true
  belongs_to :user
end
