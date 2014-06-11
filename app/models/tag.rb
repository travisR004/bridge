# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  parent_id  :integer
#

class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :name, length: {maximum: 20}
  
  has_many :passion_joins, dependent: :destroy
  has_many :users_with_passion, through: :passion_joins, source: :users
  
  has_many :skill_joins, dependent: :destroy
  has_many :users_with_skill, through: :skill_joins, source: :users
  
  has_many :children, foreign_key: :parent_id, class_name: "Tag"
  belongs_to :parent, class_name: "Tag"
end
