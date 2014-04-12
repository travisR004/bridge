class Tag < ActiveRecord::Base
  validates :name, presence: true
  
  has_many :user_join_tags
  has_many :users
end
