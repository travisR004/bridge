# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :name, length: {maximum: 20}
  
  has_many :passion_joins, dependent: :destroy
  has_many :users_with_passion, through: :passion_joins, source: :users
  
  has_many :skill_joins, dependent: :destroy
  has_many :users_with_skill, through: :skill_joins, source: :users
end
