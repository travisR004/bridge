# == Schema Information
#
# Table name: user_join_tags
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  tag_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class UserJoinTag < ActiveRecord::Base
  belongs_to :user
  belongs_to :tag
end
