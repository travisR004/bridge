# == Schema Information
#
# Table name: images
#
#  id                 :integer          not null, primary key
#  project_id         :integer
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  created_at         :datetime
#  updated_at         :datetime
#  user_id            :integer
#

class Image < ActiveRecord::Base
  has_attached_file :photo, styles: { :medium => "400x400>", :thumb => "200x200>" }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
  
  belongs_to :project
  belongs_to :user
end
