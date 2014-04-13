class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  
  has_many :user_join_tags
  has_many :users
end
